import { useLocation, Link } from "wouter";
import { Home5Line, SearchLine, PriceTag3Line, HeartLine, UserLine } from "@/lib/icons";

export default function MobileNavigation() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path ? "text-emerald-600 font-bold" : "text-neutral-500 hover:text-emerald-600";
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 border-t border-neutral-200">
      <div className="flex justify-around py-1">
        <Link href="/" className={`flex flex-col items-center py-1.5 px-3 ${isActive('/')}`}>
          <Home5Line className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>
        <Link href="/search" className={`flex flex-col items-center py-1.5 px-3 ${isActive('/search')}`}>
          <SearchLine className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Search</span>
        </Link>
        <Link href="/search?category=groceries" className={`flex flex-col items-center py-1.5 px-3 ${isActive('/search?category=groceries')}`}>
          <PriceTag3Line className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Groceries</span>
        </Link>
        <Link href="/search?category=loadshedding" className={`flex flex-col items-center py-1.5 px-3 ${isActive('/search?category=loadshedding')}`}>
          <span className="text-amber-500 text-sm">⚡</span>
          <span className="text-[10px] mt-0.5">Power</span>
        </Link>
        <Link href="/search" className={`flex flex-col items-center py-1.5 px-3 ${isActive('/profile')}`}>
          <UserLine className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Account</span>
        </Link>
      </div>
    </div>
  );
}