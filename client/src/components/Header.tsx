import { Link } from "wouter";
import { useIsMobile } from "@/hooks/use-mobile";
import { PriceTag3Fill, HeartLine, Notification3Line } from "@/lib/icons";
import { Button } from "@/components/ui/button";

export default function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-6xl">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center text-lg shadow-xs mr-2.5 group-hover:scale-105 transition-transform">
              ⚡
            </span>
            <div className="flex flex-col">
              <span className="font-black text-xl text-neutral-900 tracking-tight leading-none">
                DealHunter<span className="text-emerald-600">Smart</span>
              </span>
              <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">
                South Africa 🇿🇦
              </span>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7">
          <Link href="/" className="text-neutral-600 hover:text-emerald-600 text-sm font-semibold transition">
            Home
          </Link>
          <Link href="/search?category=groceries" className="text-neutral-600 hover:text-emerald-600 text-sm font-semibold transition">
            Groceries & Braai
          </Link>
          <Link href="/search?category=loadshedding" className="text-neutral-600 hover:text-emerald-600 text-sm font-semibold transition flex items-center gap-1">
            <span className="text-amber-500">⚡</span> Loadshedding
          </Link>
          <Link href="/search" className="text-neutral-600 hover:text-emerald-600 text-sm font-semibold transition">
            All Deals
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <Link href="/search">
            <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-emerald-600 rounded-lg">
              <HeartLine className="h-5 w-5" />
            </Button>
          </Link>
          {!isMobile && (
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}