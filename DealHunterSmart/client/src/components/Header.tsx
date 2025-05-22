import { Link } from "wouter";
import { useIsMobile } from "@/hooks/use-mobile";
import { PriceTag3Fill, HeartLine, Notification3Line } from "@/lib/icons";
import { Button } from "@/components/ui/button";

export default function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-primary-500 text-2xl mr-2">
              <PriceTag3Fill />
            </span>
            <span className="font-bold text-xl text-neutral-800">
              Deal<span className="text-primary-500">Hunt</span>
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-neutral-700 hover:text-primary-500 font-medium">
            Home
          </Link>
          <Link href="/search" className="text-neutral-700 hover:text-primary-500 font-medium">
            Categories
          </Link>
          <Link href="/search" className="text-neutral-700 hover:text-primary-500 font-medium">
            Top Deals
          </Link>
          <Link href="/" className="text-neutral-700 hover:text-primary-500 font-medium">
            How It Works
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-neutral-700 hover:text-primary-500">
            <HeartLine className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-neutral-700 hover:text-primary-500">
            <Notification3Line className="h-5 w-5" />
          </Button>
          {!isMobile && (
            <Button className="bg-primary-500 text-white hover:bg-primary-600">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
