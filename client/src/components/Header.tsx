import { Link } from "wouter";
import { useIsMobile } from "@/hooks/use-mobile";
import { HeartLine } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { useBasket } from "@/lib/basketContext";
import { useWishlist } from "@/lib/wishlistContext";

export default function Header() {
  const isMobile = useIsMobile();
  const { totalCount } = useBasket();
  const { wishlist, alerts } = useWishlist();

  const handleOpenAI = () => {
    window.dispatchEvent(new CustomEvent('open-dealhunter-ai'));
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-6xl">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center text-lg shadow-sm mr-2.5 group-hover:scale-105 transition-transform">
              ⚡
            </span>
            <div className="flex flex-col">
              <span className="font-black text-xl text-white tracking-tight leading-none">
                DealHunter<span className="text-emerald-400">Smart</span>
              </span>
              <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">
                South Africa 🇿🇦
              </span>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7">
          <Link href="/" className="text-neutral-300 hover:text-emerald-400 text-sm font-semibold transition">
            Home
          </Link>
          <Link href="/search?category=groceries" className="text-neutral-300 hover:text-emerald-400 text-sm font-semibold transition">
            Groceries & Braai
          </Link>
          <Link href="/search?category=loadshedding" className="text-neutral-300 hover:text-emerald-400 text-sm font-semibold transition flex items-center gap-1">
            <span className="text-amber-400">⚡</span> Loadshedding
          </Link>
          <Link href="/wishlist" className="text-neutral-300 hover:text-emerald-400 text-sm font-semibold transition flex items-center gap-1">
            <span>❤️ Wishlist</span>
            {alerts.length > 0 && (
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {alerts.length} alerts
              </span>
            )}
          </Link>
          <Link href="/search" className="text-neutral-300 hover:text-emerald-400 text-sm font-semibold transition">
            All Deals
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Wishlist & Alerts Button */}
          <Link href="/wishlist">
            <button 
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-emerald-500/50 text-neutral-200 transition shadow-xs cursor-pointer"
              title="Saved Wishlist & Price Alerts"
            >
              <HeartLine className="h-4 w-4 text-rose-400" />
              <span className="hidden sm:inline text-xs font-bold">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-black text-[11px] flex items-center justify-center ml-0.5">
                  {wishlist.length}
                </span>
              )}
            </button>
          </Link>

          {/* Smart Basket Button */}
          <Link href="/basket">
            <button className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-emerald-500/50 text-neutral-200 transition shadow-xs cursor-pointer">
              <span className="text-base">🛒</span>
              <span className="hidden sm:inline text-xs font-bold">Basket</span>
              {totalCount > 0 ? (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 font-black text-[11px] flex items-center justify-center ml-0.5 animate-pulse">
                  {totalCount}
                </span>
              ) : (
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-400 font-bold text-[10px] flex items-center justify-center ml-0.5">
                  0
                </span>
              )}
            </button>
          </Link>

          {/* AI Deal Assistant Header Pill */}
          <button
            onClick={handleOpenAI}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-500/50 text-xs font-extrabold transition shadow-sm cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">🤖 Ask AI</span>
            <span className="sm:hidden">🤖 AI</span>
          </button>

          {!isMobile && (
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
