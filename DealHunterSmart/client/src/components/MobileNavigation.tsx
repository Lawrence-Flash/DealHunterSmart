import { useLocation, Link } from "wouter";
import { Home5Line, SearchLine, PriceTag3Line, HeartLine, UserLine } from "@/lib/icons";

export default function MobileNavigation() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path ? "text-primary-500" : "text-neutral-500 hover:text-primary-500";
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-neutral-200">
      <div className="flex justify-around">
        <Link href="/" className={`flex flex-col items-center py-2 px-3 ${isActive('/')}`}>
          <Home5Line className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/search" className={`flex flex-col items-center py-2 px-3 ${isActive('/search')}`}>
          <SearchLine className="h-5 w-5" />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link href="/search" className={`flex flex-col items-center py-2 px-3 ${isActive('/deals')}`}>
          <PriceTag3Line className="h-5 w-5" />
          <span className="text-xs mt-1">Deals</span>
        </Link>
        <Link href="/saved" className={`flex flex-col items-center py-2 px-3 ${isActive('/saved')}`}>
          <HeartLine className="h-5 w-5" />
          <span className="text-xs mt-1">Saved</span>
        </Link>
        <Link href="/profile" className={`flex flex-col items-center py-2 px-3 ${isActive('/profile')}`}>
          <UserLine className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
}
