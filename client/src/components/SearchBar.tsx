import { useState } from "react";
import { useLocation } from "wouter";
import { SearchLine } from "@/lib/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [, navigate] = useLocation();

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const saCategories = [
    { name: "Groceries & Braai", slug: "groceries" },
    { name: "⚡ Load Shedding", slug: "loadshedding" },
    { name: "Tech & Gadgets", slug: "electronics" },
    { name: "Airfryers & Home", slug: "appliances" },
    { name: "Baby & Health", slug: "baby-health" },
  ];

  const handleCategoryClick = (slug: string) => {
    navigate(`/search?category=${encodeURIComponent(slug)}`);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <div className="flex shadow-lg rounded-2xl overflow-hidden border border-white/20 bg-white">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
              <SearchLine className="text-neutral-400 h-5 w-5" />
            </div>
            <Input 
              type="text" 
              placeholder="Search Checkers, Takealot, Makro, Amazon SA, PnP..." 
              className="w-full bg-white border-0 py-6 pl-11 pr-4 text-neutral-800 placeholder:text-neutral-400 text-sm md:text-base focus:ring-0 focus-visible:ring-0 focus:outline-none"
              value={searchTerm}
              onChange={handleSearchInput}
            />
          </div>
          <Button 
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 md:px-8 py-6 font-bold text-sm transition duration-200 h-auto rounded-none"
          >
            Find Best Deal
          </Button>
        </div>
      </form>

      <div className="flex overflow-x-auto py-3 space-x-2 no-scrollbar">
        {saCategories.map((cat) => (
          <Button 
            key={cat.slug}
            variant="outline" 
            size="sm"
            className="px-3 py-1 bg-white/90 backdrop-blur-xs text-neutral-800 rounded-full border border-neutral-200/80 text-xs font-medium whitespace-nowrap hover:bg-white hover:text-emerald-700 shadow-2xs"
            onClick={() => handleCategoryClick(cat.slug)}
          >
            {cat.name}
          </Button>
        ))}
      </div>
    </div>
  );
}