# DealHunterSmart 🇿🇦
> **South Africa''s Smart Deal & Grocery Price Comparison Assistant**

DealHunterSmart is a modern full-stack web application engineered to help South Africans beat inflation and find the lowest verified prices across groceries, loadshedding essentials, appliances, baby care, and electronics.

---

## 🚀 Key Features

- **🇿🇦 South African Retail Intelligence**:
  - Live price comparisons across **Checkers (Sixty60)**, **Pick n Pay (asap!)**, **Takealot**, **Amazon.co.za**, **Makro**, **Woolworths (Dash)**, **Dis-Chem**, and **Clicks**.
- **💳 Cardholder & Loyalty Dual-Pricing**:
  - Automatically factors in **Checkers Xtra Savings**, **Pick n Pay Smart Shopper**, **Woolworths WRewards**, and **Clicks ClubCard** discounts to show true checkout costs.
- **⚡ Load Shedding & Grocery Focus**:
  - Tailored categories for high-demand South African needs: Wi-Fi UPS batteries, portable power stations, cooking oil, braai meat packs, and air fryers.
- **🚚 On-Demand vs. Parcel Delivery Awareness**:
  - Compares 60-minute on-demand grocery delivery (Sixty60 / asap! / Dash) alongside traditional standard parcel shipping.
- **🤖 Shopping AI Assistant (Roadmap)**:
  - Natural language deal hunter for queries like *"Braai shopping list for 6 people under R500"* and upcoming WhatsApp integration.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Wouter (lightweight routing), TanStack React Query v5, Tailwind CSS, shadcn/ui (Radix UI primitives).
- **Backend**: Express.js, TypeScript (`tsx`), Drizzle ORM.
- **Database**: PostgreSQL (with in-memory fallback for rapid local prototyping).
- **Currency**: South African Rand (`ZAR / R`) with standardized formatting.

---

## 📂 Project Structure

```
DealHunterSmart/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components (ProductCard, PriceComparison, etc.)
│   │   ├── pages/          # Home, SearchResults, ProductDetail, NotFound
│   │   ├── lib/            # Utilities, formatZAR, icons, query client
│   │   └── hooks/          # Responsive hooks & state
│   └── index.html
├── server/                 # Express backend API
│   ├── data/               # Mock data seeded with authentic SA retail products
│   ├── routes.ts           # REST API routes (/api/products, /api/stores, etc.)
│   ├── storage.ts          # Storage interface & MemStorage implementation
│   └── index.ts            # Server entry point
├── shared/                 # Shared TypeScript types & Drizzle schemas
│   └── schema.ts           # Products, stores, categories, and users
├── package.json
└── README.md
```

---

## 🏁 Getting Started

### Prerequisites
- [Node.js (LTS version 20+)](https://nodejs.org/)
- `npm` or `pnpm`

### Installation
```bash
# Clone the repository
git clone git@github.com:Lawrence-Flash/DealHunterSmart.git
cd DealHunterSmart

# Install dependencies
npm install
```

### Development
```bash
# Start Vite client + Express API concurrently
npm run dev
```

### Building for Production
```bash
npm run build
npm run start
```

---

## 🗺️ South African Roadmap

- [x] **Phase 1**: Flatten repository structure, standardize ZAR (`R`) currency formatting, and seed South African retailers & essentials.
- [ ] **Phase 2**: Conversational AI Deal Finder modal (Gemini / OpenAI powered).
- [ ] **Phase 3**: Multi-Item Smart Grocery Basket Comparison (Sixty60 vs. asap! vs. Dash basket total optimizer).
- [ ] **Phase 4**: Takealot & Amazon.co.za API/Scraper pipeline + PostgreSQL storage.
- [ ] **Phase 5**: WhatsApp Bot for low-data deal hunting & till-slip OCR scanning.

---

## 📄 License
MIT