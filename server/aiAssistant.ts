import { storage } from "./storage";
import { Product, Store } from "@shared/schema";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface EnrichedProduct extends Product {
  bestStore: string;
  lowestPrice: number;
  savingsText?: string;
}

interface AIResponse {
  reply: string;
  suggestedProducts: EnrichedProduct[];
  followUps: string[];
}

/**
 * Format ZAR amount helper for server
 */
function formatZAR(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount).replace("ZAR", "R").trim();
}

/**
 * South African Shopping AI Deal Advisor Engine
 */
export async function processAIChat(
  userMessage: string,
  _history?: ChatMessage[]
): Promise<AIResponse> {
  const query = userMessage.toLowerCase();
  const allProducts = await storage.getAllProducts();
  const allStores = await storage.getAllStores();

  // Enhance products with lowest price & best store
  const enrichedProducts: EnrichedProduct[] = allProducts.map((product) => {
    const stores = allStores.filter((s) => s.productId === product.id);
    if (stores.length === 0) {
      return { 
        ...product, 
        bestStore: "Online", 
        lowestPrice: 0,
        savingsText: undefined 
      };
    }
    const sorted = [...stores].sort((a, b) => {
      const priceA = a.loyaltyPrice ?? a.price;
      const priceB = b.loyaltyPrice ?? b.price;
      return priceA - priceB;
    });

    const best = sorted[0];
    const highest = Math.max(...stores.map((s) => s.price));
    const lowest = best.loyaltyPrice ?? best.price;
    const savings = highest - lowest;

    return {
      ...product,
      bestStore: best.name,
      lowestPrice: lowest,
      savingsText:
        savings > 0
          ? `Save ${formatZAR(savings)} vs ${highest > lowest ? "highest" : ""}`
          : undefined,
    };
  });

  // Intent 1: Braai / Weekend Braai Planning
  if (query.includes("braai") || query.includes("meat") || query.includes("chicken")) {
    const chicken = enrichedProducts.find((p) => p.name.includes("Chicken"));
    const oil = enrichedProducts.find((p) => p.name.includes("Oil"));

    const matchedProducts: EnrichedProduct[] = [chicken, oil].filter(
      (p): p is EnrichedProduct => p !== undefined
    );

    const totalEstimate = (chicken?.lowestPrice || 0) + (oil?.lowestPrice || 0);

    return {
      reply: `### 🥩 South African Braai Deal Breakdown\n\nHere is how to get the most value for your weekend braai:\n\n* **Main Meat:** The **Rainbow Mixed Chicken Braai Pack 2kg** is currently best priced at **Checkers Sixty60** for **${formatZAR(
        chicken?.lowestPrice || 79.99
      )}** when using **Xtra Savings** (Regular price is R 94.99).\n* **Cooking & Marinade Prep:** **Sunfoil 2L Sunflower Oil** is also cheapest at **Checkers Sixty60** at **${formatZAR(
        oil?.lowestPrice || 62.99
      )}** with Xtra Savings.\n* **Estimated Staples Total:** Around **${formatZAR(
        totalEstimate
      )}**.\n\n💡 **Pro-Tip:** Add braai rolls from Pick n Pay or Checkers (usually 6 for R18.99) and 2L cooldrink (around R24.99). You can easily host a great 4-6 person braai for well under **R 250.00**!`,
      suggestedProducts: matchedProducts,
      followUps: [
        "Where is 2L Sunflower Oil cheapest?",
        "Show me on-demand Sixty60 grocery deals",
        "Compare airfryers for braai sides",
      ],
    };
  }

  // Intent 2: Loadshedding / Inverter / Power Bank / UPS
  if (
    query.includes("loadshedding") ||
    query.includes("power") ||
    query.includes("ups") ||
    query.includes("wifi") ||
    query.includes("inverter") ||
    query.includes("battery")
  ) {
    const ups = enrichedProducts.find((p) => p.categorySlug === "loadshedding");
    const matchedProducts: EnrichedProduct[] = ups ? [ups] : [];

    return {
      reply: `### ⚡ Load Shedding & Power Backup Deals\n\nKeeping your Wi-Fi and work running through load shedding doesn't have to cost thousands:\n\n* **Top Pick:** **${ups?.name}**\n* **Best Price:** **${formatZAR(
        ups?.lowestPrice || 749.0
      )}** on **Amazon.co.za** with free delivery.\n* **Runner Up:** **Takealot** has it at **R 799.00** with next-day courier delivery.\n* **Runtime:** Powers standard 12V fiber ONT + Wi-Fi routers for **up to 4 hours** (covers Stage 2 through Stage 4 outages).\n\n💡 **Deal Tip:** Avoid high-street electronics markups—buying on Amazon SA or Takealot saves you **up to R 150.00** compared to brick-and-mortar retail!`,
      suggestedProducts: matchedProducts,
      followUps: [
        "How long does the Gizzu UPS run during Stage 4?",
        "Compare TV deals for load shedding backup",
        "Browse all Load Shedding gear",
      ],
    };
  }

  // Intent 3: Cooking Oil / Groceries
  if (query.includes("oil") || query.includes("sunflower") || query.includes("grocery")) {
    const oil = enrichedProducts.find((p) => p.name.includes("Oil"));
    const chicken = enrichedProducts.find((p) => p.name.includes("Chicken"));
    const matched: EnrichedProduct[] = [oil, chicken].filter(
      (p): p is EnrichedProduct => p !== undefined
    );

    return {
      reply: `### 🌻 2L Sunflower Oil Price Comparison\n\nCooking oil prices have fluctuated a lot in SA recently. Here are current verified prices:\n\n* **1st Place:** **Checkers Sixty60** — **${formatZAR(
        oil?.lowestPrice || 62.99
      )}** (with Xtra Savings card)\n* **2nd Place:** **Pick n Pay asap!** — **R 64.99** (with Smart Shopper)\n* **3rd Place:** **Makro** — **R 69.99** (bulk multi-buy available)\n* **Standard Retail:** Woolworths (**R 79.99**) & Takealot (**R 89.00**)\n\n🛒 **Savings Verdict:** Swiping your **Checkers Xtra Savings card** saves you **R 26.00** per bottle compared to unpromoted retail!`,
      suggestedProducts: matched,
      followUps: [
        "Plan a braai basket under R500",
        "Show me Pick n Pay Smart Shopper deals",
        "Pampers nappies size 4 specials",
      ],
    };
  }

  // Intent 4: Airfryer / Kitchen Appliances
  if (query.includes("airfryer") || query.includes("air fryer") || query.includes("appliance")) {
    const airfryer = enrichedProducts.find((p) => p.name.includes("Airfryer"));
    const matched: EnrichedProduct[] = airfryer ? [airfryer] : [];

    return {
      reply: `### 🍳 Philips Essential XL Airfryer Deal Finder\n\nAir fryers are one of the most popular kitchen appliances in South Africa due to speed and energy efficiency:\n\n* **Best Current Deal:** **Amazon.co.za** at **${formatZAR(
        airfryer?.lowestPrice || 1899.0
      )}** with free express delivery.\n* **Makro:** **R 1,949.00** with an mCard special (down from R 2,299.00).\n* **Takealot:** **R 2,199.00** with standard delivery.\n* **Woolworths:** **R 2,249.00** with WRewards.\n\n💡 **Total Savings:** Buying via **Amazon.co.za** saves you **R 600.00** compared to standard department store pricing!`,
      suggestedProducts: matched,
      followUps: [
        "Show Samsung 55 inch 4K TV deals",
        "Find loadshedding router backup",
        "Browse Home & Kitchen specials",
      ],
    };
  }

  // Intent 5: Baby / Nappies
  if (query.includes("nappy") || query.includes("nappies") || query.includes("pampers") || query.includes("baby")) {
    const pampers = enrichedProducts.find((p) => p.name.includes("Pampers"));
    const matched: EnrichedProduct[] = pampers ? [pampers] : [];

    return {
      reply: `### 👶 Pampers Size 4 Jumbo Pack (104s) Specials\n\nNappies are a major monthly line item for SA families. Here is how pharmacy and supermarket prices compare:\n\n* **1st Place:** **Checkers Sixty60** — **${formatZAR(
        pampers?.lowestPrice || 349.99
      )}** with Xtra Savings.\n* **2nd Place:** **Dis-Chem** — **R 359.95** with Dis-Chem Benefit card.\n* **3rd Place:** **Clicks** — **R 369.99** with Clicks ClubCard.\n* **Takealot:** **R 399.00** (Free delivery over R500).\n\n💡 **Cost Per Nappy:** At **R 349.99** for 104 nappies, you are paying just **R 3.36 per nappy** at Checkers Sixty60.`,
      suggestedProducts: matched,
      followUps: [
        "Compare Dis-Chem vs Clicks specials",
        "Cheapest 2L sunflower oil",
        "Show me all Baby & Health deals",
      ],
    };
  }

  // Intent 6: Smart TV / Electronics
  if (query.includes("tv") || query.includes("samsung") || query.includes("electronics") || query.includes("screen")) {
    const tv = enrichedProducts.find((p) => p.name.includes("TV"));
    const matched: EnrichedProduct[] = tv ? [tv] : [];

    return {
      reply: `### 📺 Samsung 55" Crystal UHD 4K Smart TV Deals\n\nLooking for a big screen upgrade for sports and streaming? Here is the price breakdown:\n\n* **Best Promo Price:** **Makro** at **${formatZAR(
        tv?.lowestPrice || 6899.0
      )}** with **mCard Exclusive**.\n* **Amazon.co.za:** **R 6,999.00** with free scheduled delivery.\n* **Takealot & HiFi Corp:** **R 7,499.00**.\n* **Incredible Connection:** **R 7,999.00** (includes extended 2-year warranty).\n\n💡 **Buying Advice:** If you have an mCard or Makro account, Makro saves you **R 1,100.00** compared to Incredible Connection.`,
      suggestedProducts: matched,
      followUps: [
        "Compare with Takealot delivery fees",
        "Find a Wi-Fi UPS for movie streaming",
        "Browse all Tech & Gadgets",
      ],
    };
  }

  // Generic Search / Fallback matching
  const matching = enrichedProducts.filter((p) => {
    const nameMatch = p.name.toLowerCase().includes(query);
    const descMatch = p.description.toLowerCase().includes(query);
    const brandMatch = p.brand && p.brand.toLowerCase().includes(query);
    return nameMatch || descMatch || brandMatch;
  });

  if (matching.length > 0) {
    return {
      reply: `### 🇿🇦 DealHunter Match for "${userMessage}"\n\nI found **${matching.length} deal${matching.length === 1 ? "" : "s"}** matching your search across South African retailers:\n\n` +
        matching
          .map(
            (p) =>
              `* **${p.name}** — Best from **${p.bestStore}** at **${formatZAR(
                p.lowestPrice
              )}** ${p.savingsText ? `(${p.savingsText})` : ""}`
          )
          .join("\n") +
        `\n\nClick on any product below to view detailed comparisons across Checkers, Pick n Pay, Takealot, Makro, and Amazon SA!`,
      suggestedProducts: matching,
      followUps: [
        "Where is 2L Sunflower Oil cheapest?",
        "Plan a braai under R500",
        "Show loadshedding backup gear",
      ],
    };
  }

  // General Welcoming Fallback
  return {
    reply: `### 🇿🇦 Howzit! I'm your DealHunter AI Assistant\n\nI can help you find verified specials and compare prices across South Africa's leading retailers:\n\n* **Groceries & Braai:** Checkers Sixty60, Pick n Pay asap!, Woolies Dash, Spar\n* **Tech & General:** Takealot, Amazon.co.za, Makro, Incredible Connection\n* **Pharmacy & Baby:** Clicks, Dis-Chem\n\nTry asking me:\n* *"Where is 2L Sunflower Oil cheapest right now?"*\n* *"Plan a braai for 6 people under R500"*\n* *"Find me a loadshedding Wi-Fi backup under R1,000"*\n* *"Compare prices on Samsung 55-inch 4K TV"*`,
    suggestedProducts: enrichedProducts.slice(0, 3),
    followUps: [
      "⚡ Wi-Fi router backup for loadshedding",
      "🍗 Plan a braai under R500",
      "🌻 Cheapest 2L sunflower oil",
    ],
  };
}