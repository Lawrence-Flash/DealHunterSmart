import { Product, Category, Store } from "@shared/schema";

// South African categories
export const mockCategories: Omit<Category, "id">[] = [
  {
    name: "Groceries & Braai",
    slug: "groceries",
    icon: "shopping-bag"
  },
  {
    name: "Load Shedding & Power",
    slug: "loadshedding",
    icon: "zap"
  },
  {
    name: "Electronics & Tech",
    slug: "electronics",
    icon: "tv"
  },
  {
    name: "Home & Kitchen",
    slug: "appliances",
    icon: "home"
  },
  {
    name: "Baby & Health",
    slug: "baby-health",
    icon: "heart"
  }
];

// South African products (12 essential staples)
export const mockProducts: Omit<Product, "id">[] = [
  {
    name: "Sunfoil Pure Sunflower Oil 2L",
    description: "Triple refined 100% pure sunflower oil for everyday cooking, crisp frying, and baking.",
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    categorySlug: "groceries",
    brand: "Sunfoil",
    unit: "2L Bottle",
    features: ["Triple Refined", "Naturally Cholesterol Free", "High in Omega 6", "Ideal for Crisp Frying"]
  },
  {
    name: "Gizzu 30W Mini DC 8800mAh UPS for Wi-Fi Router",
    description: "Keep your home fibre router and ONT powered seamlessly through loadshedding and power outages for up to 4 hours.",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    categorySlug: "loadshedding",
    brand: "Gizzu",
    unit: "30W / 8800mAh",
    features: ["8800mAh Battery", "Dual Output (12V & 9V)", "PoE Supported", "Up to 4 Hours Runtime", "Plug & Play"]
  },
  {
    name: "Philips Essential Airfryer XL 6.2L",
    description: "Rapid Air technology with digital touch screen, 7 quick presets, and keep warm function for guilt-free crispy meals.",
    imageUrl: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    categorySlug: "appliances",
    brand: "Philips",
    unit: "6.2L Basket",
    features: ["Rapid Air Technology", "6.2L Pan Capacity", "Digital Touchscreen", "Dishwasher Safe", "Keep Warm Function"]
  },
  {
    name: "Samsung 55\" Crystal UHD 4K Smart TV (CU7000)",
    description: "Vibrant Crystal 4K processor with PurColor, HDR10+, Tizen Smart TV, and ultra-smooth gaming mode.",
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    categorySlug: "electronics",
    brand: "Samsung",
    unit: "55-inch",
    features: ["Crystal Processor 4K", "PurColor HDR10+", "Tizen Smart TV Hub", "Object Tracking Sound", "Voice Assistant Ready"]
  },
  {
    name: "Pampers Premium Care Nappies Size 4 Jumbo Pack (104s)",
    description: "Ultra-soft with 3 absorbing channels, wetness indicator, and breathable layers for up to 12 hours of leakage protection.",
    imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    categorySlug: "baby-health",
    brand: "Pampers",
    unit: "104 Nappies",
    features: ["104 Nappies", "Breathable Layers", "Up to 12 Hours Dryness", "Wetness Indicator", "Hypoallergenic"]
  },
  {
    name: "Rainbow Mixed Chicken Braai Pack 2kg",
    description: "Freshly frozen mixed chicken portions with savoury brine marinade, perfect for weekend family braais.",
    imageUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    categorySlug: "groceries",
    brand: "Rainbow",
    unit: "2kg Bag",
    features: ["2kg Family Pack", "Mixed Drumsticks & Thighs", "Locally Produced in SA", "Halaal Certified"]
  },
  {
    name: "Clover Full Cream Fresh Milk 2L",
    description: "Pasteurised fresh full cream South African cows milk, source of calcium, protein, and essential vitamins.",
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    categorySlug: "groceries",
    brand: "Clover",
    unit: "2L Bottle",
    features: ["Full Cream", "Pasteurised", "Good Source of Calcium", "Fresh SA Dairy"]
  },
  {
    name: "Albany Superior Sliced White Bread 700g",
    description: "Thick sliced, oven-baked white bread fortified with vitamins and minerals for energy and freshness.",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    categorySlug: "groceries",
    brand: "Albany",
    unit: "700g Loaf",
    features: ["Thick Sliced", "Fortified with Vitamins", "Fresh Soft Crust", "Everyday Toast & Sandwiches"]
  },
  {
    name: "Tastic Parboiled Long Grain Rice 2kg",
    description: "Specially selected long grain parboiled rice that cooks separately and fluffily every time.",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    categorySlug: "groceries",
    brand: "Tastic",
    unit: "2kg Bag",
    features: ["Cooks Fluffy & Separate", "Parboiled Long Grain", "Naturally Gluten Free", "Pantry Staple"]
  },
  {
    name: "OMO Auto Washing Powder 2kg",
    description: "Formulated with built-in stain removers and fabric care enzymes for tough dirt in top and front loader machines.",
    imageUrl: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    categorySlug: "groceries",
    brand: "OMO",
    unit: "2kg Box",
    features: ["Tough Stain Removal in Quick Wash", "Front & Top Loader", "Fresh Long-lasting Fragrance", "Fabric Care"]
  },
  {
    name: "Jacobs Krönung Instant Coffee 200g",
    description: "Premium freeze-dried instant coffee made from high quality Arabica and Robusta beans with signature rich aroma.",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    categorySlug: "groceries",
    brand: "Jacobs",
    unit: "200g Jar",
    features: ["Rich & Aromatic", "Freeze-Dried Instant", "Signature Krönung Roast", "Yields approx. 110 Cups"]
  },
  {
    name: "Coca-Cola Original Taste Less Sugar 2L",
    description: "The refreshing taste of Coca-Cola with iconic bubbles, perfect chilled for Sunday lunches and braais.",
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    categorySlug: "groceries",
    brand: "Coca-Cola",
    unit: "2L Bottle",
    features: ["Original Crisp Taste", "Best Served Ice Cold", "Ideal for Braais & Parties", "Recyclable PET Bottle"]
  }
];

// South African stores & pricing data
export const mockStores: Omit<Store, "id">[] = [
  // Stores for Sunfoil 2L Sunflower Oil (Product 1)
  {
    name: "Checkers Sixty60",
    productId: 1,
    price: 74.99,
    loyaltyPrice: 62.99,
    loyaltyProgram: "Xtra Savings",
    shippingInfo: "R35 Sixty60 delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.checkers.co.za",
    inStock: true
  },
  {
    name: "Pick n Pay asap!",
    productId: 1,
    price: 78.99,
    loyaltyPrice: 64.99,
    loyaltyProgram: "Smart Shopper",
    shippingInfo: "R35 asap! delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.pnp.co.za",
    inStock: true
  },
  {
    name: "Woolworths Dash",
    productId: 1,
    price: 84.99,
    loyaltyPrice: 79.99,
    loyaltyProgram: "WRewards",
    shippingInfo: "R35 Dash delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.woolworths.co.za",
    inStock: true
  },
  {
    name: "Makro",
    productId: 1,
    price: 69.99,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "In-store & delivery from R55",
    deliverySpeed: "2-4 days",
    productUrl: "https://www.makro.co.za",
    inStock: true
  },
  {
    name: "Takealot",
    productId: 1,
    price: 89.00,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "Free delivery over R500",
    deliverySpeed: "Next-day",
    productUrl: "https://www.takealot.com",
    inStock: true
  },

  // Stores for Gizzu 30W Mini DC UPS (Product 2)
  {
    name: "Amazon.co.za",
    productId: 2,
    price: 749.00,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "Free delivery over R500",
    deliverySpeed: "Next-day",
    productUrl: "https://www.amazon.co.za",
    inStock: true
  },
  {
    name: "Takealot",
    productId: 2,
    price: 799.00,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "Free delivery over R500",
    deliverySpeed: "Next-day",
    productUrl: "https://www.takealot.com",
    inStock: true
  },
  {
    name: "Makro",
    productId: 2,
    price: 849.00,
    loyaltyPrice: 799.00,
    loyaltyProgram: "mCard Special",
    shippingInfo: "Delivery or In-Store Pickup",
    deliverySpeed: "2-3 days",
    productUrl: "https://www.makro.co.za",
    inStock: true
  },
  {
    name: "Incredible Connection",
    productId: 2,
    price: 899.00,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "Click & Collect in 2h",
    deliverySpeed: "Same-day pickup",
    productUrl: "https://www.incredible.co.za",
    inStock: true
  },

  // Stores for Philips Airfryer XL (Product 3)
  {
    name: "Amazon.co.za",
    productId: 3,
    price: 1899.00,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "Free express shipping",
    deliverySpeed: "Next-day",
    productUrl: "https://www.amazon.co.za",
    inStock: true
  },
  {
    name: "Makro",
    productId: 3,
    price: 2199.00,
    loyaltyPrice: 1949.00,
    loyaltyProgram: "mCard Deal",
    shippingInfo: "Free delivery",
    deliverySpeed: "2-4 days",
    productUrl: "https://www.makro.co.za",
    inStock: true
  },
  {
    name: "Takealot",
    productId: 3,
    price: 2199.00,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "Free delivery",
    deliverySpeed: "Next-day",
    productUrl: "https://www.takealot.com",
    inStock: true
  },
  {
    name: "Woolworths",
    productId: 3,
    price: 2499.00,
    loyaltyPrice: 2249.00,
    loyaltyProgram: "WRewards",
    shippingInfo: "Free delivery over R450",
    deliverySpeed: "3-5 days",
    productUrl: "https://www.woolworths.co.za",
    inStock: true
  },

  // Stores for Samsung 55" 4K Smart TV (Product 4 - Featured)
  {
    name: "Makro",
    productId: 4,
    price: 7299.00,
    loyaltyPrice: 6899.00,
    loyaltyProgram: "mCard Exclusive",
    shippingInfo: "Delivery or Free Store Pickup",
    deliverySpeed: "2-4 days",
    productUrl: "https://www.makro.co.za",
    inStock: true
  },
  {
    name: "Amazon.co.za",
    productId: 4,
    price: 6999.00,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "Free scheduled delivery",
    deliverySpeed: "2-3 days",
    productUrl: "https://www.amazon.co.za",
    inStock: true
  },
  {
    name: "Takealot",
    productId: 4,
    price: 7499.00,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "Free delivery",
    deliverySpeed: "2-3 days",
    productUrl: "https://www.takealot.com",
    inStock: true
  },
  {
    name: "HiFi Corp",
    productId: 4,
    price: 7499.00,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "Delivery from R150",
    deliverySpeed: "3-5 days",
    productUrl: "https://www.hificorp.co.za",
    inStock: true
  },
  {
    name: "Incredible Connection",
    productId: 4,
    price: 7999.00,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "Free delivery + 2-year warranty",
    deliverySpeed: "Next-day",
    productUrl: "https://www.incredible.co.za",
    inStock: true
  },

  // Stores for Pampers Premium Care Nappies (Product 5)
  {
    name: "Checkers Sixty60",
    productId: 5,
    price: 419.99,
    loyaltyPrice: 349.99,
    loyaltyProgram: "Xtra Savings",
    shippingInfo: "R35 Sixty60 delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.checkers.co.za",
    inStock: true
  },
  {
    name: "Dis-Chem",
    productId: 5,
    price: 429.95,
    loyaltyPrice: 359.95,
    loyaltyProgram: "Dis-Chem Benefit",
    shippingInfo: "Free delivery over R600",
    deliverySpeed: "Next-day",
    productUrl: "https://www.dischem.co.za",
    inStock: true
  },
  {
    name: "Clicks",
    productId: 5,
    price: 439.99,
    loyaltyPrice: 369.99,
    loyaltyProgram: "Clicks ClubCard",
    shippingInfo: "Free delivery over R450",
    deliverySpeed: "1-3 days",
    productUrl: "https://www.clicks.co.za",
    inStock: true
  },
  {
    name: "Takealot",
    productId: 5,
    price: 399.00,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "Free delivery over R500",
    deliverySpeed: "Next-day",
    productUrl: "https://www.takealot.com",
    inStock: true
  },

  // Stores for Rainbow Mixed Chicken Braai Pack 2kg (Product 6)
  {
    name: "Checkers Sixty60",
    productId: 6,
    price: 94.99,
    loyaltyPrice: 79.99,
    loyaltyProgram: "Xtra Savings",
    shippingInfo: "R35 Sixty60 delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.checkers.co.za",
    inStock: true
  },
  {
    name: "Pick n Pay asap!",
    productId: 6,
    price: 96.99,
    loyaltyPrice: 84.99,
    loyaltyProgram: "Smart Shopper",
    shippingInfo: "R35 asap! delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.pnp.co.za",
    inStock: true
  },
  {
    name: "Spar",
    productId: 6,
    price: 92.99,
    loyaltyPrice: 86.99,
    loyaltyProgram: "Spar Rewards",
    shippingInfo: "Spar2U on-demand",
    deliverySpeed: "60 mins",
    productUrl: "https://www.spar.co.za",
    inStock: true
  },
  {
    name: "Makro",
    productId: 6,
    price: 89.99,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "In-store pickup & delivery",
    deliverySpeed: "Same-day pickup",
    productUrl: "https://www.makro.co.za",
    inStock: true
  },

  // Stores for Clover Fresh Milk 2L (Product 7)
  {
    name: "Checkers Sixty60",
    productId: 7,
    price: 36.99,
    loyaltyPrice: 31.99,
    loyaltyProgram: "Xtra Savings",
    shippingInfo: "R35 Sixty60 delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.checkers.co.za",
    inStock: true
  },
  {
    name: "Pick n Pay asap!",
    productId: 7,
    price: 37.99,
    loyaltyPrice: 32.99,
    loyaltyProgram: "Smart Shopper",
    shippingInfo: "R35 asap! delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.pnp.co.za",
    inStock: true
  },
  {
    name: "Woolworths Dash",
    productId: 7,
    price: 39.99,
    loyaltyPrice: 36.99,
    loyaltyProgram: "WRewards",
    shippingInfo: "R35 Dash delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.woolworths.co.za",
    inStock: true
  },
  {
    name: "Spar",
    productId: 7,
    price: 38.99,
    loyaltyPrice: 34.99,
    loyaltyProgram: "Spar Rewards",
    shippingInfo: "Spar2U delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.spar.co.za",
    inStock: true
  },

  // Stores for Albany Sliced White Bread 700g (Product 8)
  {
    name: "Checkers Sixty60",
    productId: 8,
    price: 18.99,
    loyaltyPrice: 16.99,
    loyaltyProgram: "Xtra Savings",
    shippingInfo: "R35 Sixty60 delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.checkers.co.za",
    inStock: true
  },
  {
    name: "Pick n Pay asap!",
    productId: 8,
    price: 19.49,
    loyaltyPrice: 16.49,
    loyaltyProgram: "Smart Shopper",
    shippingInfo: "R35 asap! delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.pnp.co.za",
    inStock: true
  },
  {
    name: "Woolworths Dash",
    productId: 8,
    price: 21.99,
    loyaltyPrice: 19.99,
    loyaltyProgram: "WRewards",
    shippingInfo: "R35 Dash delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.woolworths.co.za",
    inStock: true
  },
  {
    name: "Spar",
    productId: 8,
    price: 19.99,
    loyaltyPrice: 17.99,
    loyaltyProgram: "Spar Rewards",
    shippingInfo: "Spar2U delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.spar.co.za",
    inStock: true
  },

  // Stores for Tastic Rice 2kg (Product 9)
  {
    name: "Checkers Sixty60",
    productId: 9,
    price: 44.99,
    loyaltyPrice: 38.99,
    loyaltyProgram: "Xtra Savings",
    shippingInfo: "R35 Sixty60 delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.checkers.co.za",
    inStock: true
  },
  {
    name: "Pick n Pay asap!",
    productId: 9,
    price: 46.99,
    loyaltyPrice: 40.99,
    loyaltyProgram: "Smart Shopper",
    shippingInfo: "R35 asap! delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.pnp.co.za",
    inStock: true
  },
  {
    name: "Makro",
    productId: 9,
    price: 39.99,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "In-store & delivery",
    deliverySpeed: "2-4 days",
    productUrl: "https://www.makro.co.za",
    inStock: true
  },
  {
    name: "Woolworths Dash",
    productId: 9,
    price: 49.99,
    loyaltyPrice: 44.99,
    loyaltyProgram: "WRewards",
    shippingInfo: "R35 Dash delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.woolworths.co.za",
    inStock: true
  },

  // Stores for OMO Auto Washing Powder 2kg (Product 10)
  {
    name: "Checkers Sixty60",
    productId: 10,
    price: 92.99,
    loyaltyPrice: 79.99,
    loyaltyProgram: "Xtra Savings",
    shippingInfo: "R35 Sixty60 delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.checkers.co.za",
    inStock: true
  },
  {
    name: "Pick n Pay asap!",
    productId: 10,
    price: 94.99,
    loyaltyPrice: 76.99,
    loyaltyProgram: "Smart Shopper",
    shippingInfo: "R35 asap! delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.pnp.co.za",
    inStock: true
  },
  {
    name: "Makro",
    productId: 10,
    price: 79.99,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "In-store & delivery",
    deliverySpeed: "2-4 days",
    productUrl: "https://www.makro.co.za",
    inStock: true
  },
  {
    name: "Takealot",
    productId: 10,
    price: 99.00,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "Free delivery over R500",
    deliverySpeed: "Next-day",
    productUrl: "https://www.takealot.com",
    inStock: true
  },

  // Stores for Jacobs Krönung Instant Coffee 200g (Product 11)
  {
    name: "Checkers Sixty60",
    productId: 11,
    price: 149.99,
    loyaltyPrice: 129.99,
    loyaltyProgram: "Xtra Savings",
    shippingInfo: "R35 Sixty60 delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.checkers.co.za",
    inStock: true
  },
  {
    name: "Pick n Pay asap!",
    productId: 11,
    price: 152.99,
    loyaltyPrice: 128.99,
    loyaltyProgram: "Smart Shopper",
    shippingInfo: "R35 asap! delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.pnp.co.za",
    inStock: true
  },
  {
    name: "Makro",
    productId: 11,
    price: 129.99,
    loyaltyPrice: 124.99,
    loyaltyProgram: "mCard Special",
    shippingInfo: "In-store & delivery",
    deliverySpeed: "2-4 days",
    productUrl: "https://www.makro.co.za",
    inStock: true
  },
  {
    name: "Woolworths Dash",
    productId: 11,
    price: 159.99,
    loyaltyPrice: 144.99,
    loyaltyProgram: "WRewards",
    shippingInfo: "R35 Dash delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.woolworths.co.za",
    inStock: true
  },

  // Stores for Coca-Cola 2L (Product 12)
  {
    name: "Checkers Sixty60",
    productId: 12,
    price: 27.99,
    loyaltyPrice: 22.99,
    loyaltyProgram: "Xtra Savings",
    shippingInfo: "R35 Sixty60 delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.checkers.co.za",
    inStock: true
  },
  {
    name: "Pick n Pay asap!",
    productId: 12,
    price: 28.99,
    loyaltyPrice: 23.99,
    loyaltyProgram: "Smart Shopper",
    shippingInfo: "R35 asap! delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.pnp.co.za",
    inStock: true
  },
  {
    name: "Woolworths Dash",
    productId: 12,
    price: 31.99,
    loyaltyPrice: 27.99,
    loyaltyProgram: "WRewards",
    shippingInfo: "R35 Dash delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.woolworths.co.za",
    inStock: true
  },
  {
    name: "Spar",
    productId: 12,
    price: 28.49,
    loyaltyPrice: 24.99,
    loyaltyProgram: "Spar Rewards",
    shippingInfo: "Spar2U delivery",
    deliverySpeed: "60 mins",
    productUrl: "https://www.spar.co.za",
    inStock: true
  },
  {
    name: "Makro",
    productId: 12,
    price: 24.99,
    loyaltyPrice: null,
    loyaltyProgram: null,
    shippingInfo: "In-store & delivery",
    deliverySpeed: "2-4 days",
    productUrl: "https://www.makro.co.za",
    inStock: true
  }
];