import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product, Store, Category } from "@shared/schema";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import DetailedComparison from "@/components/DetailedComparison";
import CTADownload from "@/components/CTADownload";
import CategoryFilter from "@/components/CategoryFilter";
import { Link } from "wouter";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const { data: stores = [] } = useQuery<Store[]>({
    queryKey: ['/api/stores'],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Featured product (Samsung 55" 4K Smart TV)
  const featuredProduct = products.find(p => p.id === 4) || products[0];
  const relevantStores = stores.filter(s => s.productId === featuredProduct?.id);

  // Filter products if a category pill is selected on Home
  const displayedProducts = selectedCategory 
    ? products.filter(p => p.categorySlug === selectedCategory)
    : products;

  const quickSearchTags = [
    { label: "⚡ Load Shedding UPS", query: "UPS" },
    { label: "🍳 Airfryer", query: "Airfryer" },
    { label: "🌻 Sunflower Oil", query: "Sunflower Oil" },
    { label: "🍗 Braai Pack", query: "Chicken" },
    { label: "👶 Pampers Size 4", query: "Pampers" },
    { label: "📺 4K Smart TV", query: "Smart TV" },
  ];

  const triggerAIPrompt = (promptText: string) => {
    window.dispatchEvent(new CustomEvent('open-dealhunter-ai', { detail: { prompt: promptText } }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-neutral-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-7/12 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold mb-4 tracking-wide uppercase">
                🇿🇦 South Africa''s Smartest Deal Hunter
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
                Never Overpay on <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                  Groceries, Tech & Essentials
                </span>
              </h1>
              
              <p className="text-emerald-100/80 text-base sm:text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Compare real-time prices across <strong className="font-semibold text-white">Checkers Sixty60, Pick n Pay asap!, Takealot, Makro, Amazon SA</strong> and more. Includes Xtra Savings & Smart Shopper card discounts.
              </p>
              
              <div className="max-w-xl mx-auto lg:mx-0">
                <SearchBar />
                
                {/* Quick Search Chips */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-emerald-300/70 font-medium">Popular:</span>
                  {quickSearchTags.map((tag, i) => (
                    <Link 
                      key={i} 
                      href={`/search?q=${encodeURIComponent(tag.query)}`}
                      className="bg-white/10 hover:bg-white/20 border border-white/10 text-emerald-100 px-2.5 py-1 rounded-full transition-all duration-150 backdrop-blur-xs"
                    >
                      {tag.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:w-5/12 w-full max-w-md">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-900/60 p-2 backdrop-blur-md">
                <img 
                  src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="DealHunterSmart Price Comparison App" 
                  className="rounded-xl w-full h-72 sm:h-80 object-cover"
                />
                <div className="absolute bottom-5 left-5 right-5 bg-neutral-900/90 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-xs">
                  <div className="flex items-center justify-between font-bold text-white mb-1">
                    <span>Average User Monthly Savings</span>
                    <span className="text-emerald-400 font-extrabold text-sm">R 1,480.00</span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">
                    Calculated across grocery staples, weekly braais & household electronics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Interactive Callout Banner */}
      <section className="bg-emerald-900/10 border-b border-emerald-900/10 py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-neutral-900 rounded-2xl p-5 sm:p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-500/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                🤖
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base sm:text-lg text-white">
                    Need Help Finding the Best Deal?
                  </h3>
                  <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                    AI Deal Advisor
                  </span>
                </div>
                <p className="text-emerald-100/80 text-xs sm:text-sm mt-0.5">
                  Ask our AI Assistant to calculate braai budgets, compare loadshedding power kits, or find who has the cheapest groceries right now.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto shrink-0 justify-start md:justify-end">
              <button
                onClick={() => triggerAIPrompt("Plan a braai for 6 people under R500")}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold px-3 py-2 rounded-xl transition"
              >
                🍗 Braai Under R500
              </button>
              <button
                onClick={() => triggerAIPrompt("Wi-Fi router backup for loadshedding under R1,000")}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold px-3 py-2 rounded-xl transition"
              >
                ⚡ Router Backup
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-dealhunter-ai'))}
                className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-black px-4 py-2 rounded-xl transition shadow-xs"
              >
                Chat with AI →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals & Categories */}
      <section className="py-14 bg-neutral-50/60">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider mb-1">
                Verified South African Specials
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight">
                Top Deals Today
              </h2>
            </div>
            <p className="text-neutral-500 text-xs md:text-sm mt-1 md:mt-0">
              Prices updated daily with loyalty discounts calculated automatically.
            </p>
          </div>

          <CategoryFilter 
            categories={categories} 
            activeCategory={selectedCategory || undefined}
            onSelectCategory={(slug) => setSelectedCategory(slug === selectedCategory ? null : slug)}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {displayedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                stores={stores.filter(store => store.productId === product.id)}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/search">
              <button className="bg-white border-2 border-neutral-300 hover:border-emerald-600 hover:text-emerald-700 text-neutral-800 font-bold py-3 px-8 rounded-xl transition duration-200 shadow-xs">
                Browse All South African Deals →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Detailed Featured Product Comparison */}
      {featuredProduct && (
        <DetailedComparison 
          product={featuredProduct} 
          stores={relevantStores}
        />
      )}

      {/* How It Works */}
      <HowItWorks />
      
      {/* Testimonials */}
      <Testimonials />

      {/* CTA Download */}
      <CTADownload />
    </>
  );
}