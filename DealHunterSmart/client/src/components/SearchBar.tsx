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
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const categories = [
    "Groceries",
    "Electronics",
    "Home Goods",
    "Fashion",
    "Toys"
  ];

  const handleCategoryClick = (category: string) => {
    navigate(`/search?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="relative search-animation">
      <form onSubmit={handleSearch}>
        <div className="flex">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchLine className="text-neutral-400 h-5 w-5" />
            </div>
            <Input 
              type="text" 
              placeholder="Search for products..." 
              className="w-full bg-white rounded-l-lg border-0 py-6 pl-10 pr-4 text-neutral-700 focus:ring-2 focus:ring-primary-500 focus:outline-none shadow-lg"
              value={searchTerm}
              onChange={handleSearchInput}
            />
          </div>
          <Button 
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 md:px-6 py-6 rounded-r-lg font-medium transition duration-300 h-auto"
          >
            Search
          </Button>
        </div>
      </form>

      <div className="flex overflow-x-auto py-3 space-x-2 no-scrollbar">
        {categories.map((category) => (
          <Button 
            key={category}
            variant="outline" 
            className="px-3 py-1 bg-white text-neutral-700 rounded-full border border-neutral-200 text-sm whitespace-nowrap hover:bg-neutral-100"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
