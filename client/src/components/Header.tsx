import { Link } from "wouter";
import { useIsMobile } from "@/hooks/use-mobile";
import { HeartLine } from "@/lib/icons";
import { Button } from "@/components/ui/button";

export default function Header() {
  const isMobile = useIsMobile();

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
          <Link href="/search" className="text-neutral-300 hover:text-emerald-400 text-sm font-semibold transition">
            All Deals
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          {/* AI Deal Assistant Header Pill */}
          <button
            onClick={handleOpenAI}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-500/50 text-xs font-extrabold transition shadow-sm cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>🤖 Ask AI</span>
          </button>

          <Link href="/search">
            <Button variant="ghost" size="icon" className="text-neutral-300 hover:text-emerald-400 hover:bg-neutral-900 rounded-lg">
              <HeartLine className="h-5 w-5" />
            </Button>
          </Link>
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