import { useState } from "react";
import { useLocation } from "wouter";
import { Category } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Filter3Line, SortDesc } from "@/lib/icons";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
}

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const [, navigate] = useLocation();
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  
  const handleCategoryClick = (categorySlug: string) => {
    if (categorySlug === 'all') {
      navigate('/search');
    } else {
      navigate(`/search?category=${categorySlug}`);
    }
  };
  
  const toggleSort = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc');
  };
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Today's Best Deals</h2>
        <div className="flex space-x-2">
          <Button variant="outline" className="py-2 px-4 text-sm bg-white border border-neutral-200 rounded-lg hover:bg-neutral-100 transition">
            <Filter3Line className="mr-1 h-4 w-4" /> Filter
          </Button>
          <Button 
            variant="outline" 
            className="py-2 px-4 text-sm bg-white border border-neutral-200 rounded-lg hover:bg-neutral-100 transition"
            onClick={toggleSort}
          >
            <SortDesc className="mr-1 h-4 w-4" /> Sort
          </Button>
        </div>
      </div>
      
      {/* Category Filter Tabs */}
      <div className="flex overflow-x-auto space-x-2 mb-8 no-scrollbar">
        <Button 
          className={`px-4 py-2 ${activeCategory === undefined ? 'bg-primary-500 text-white' : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'} rounded-lg font-medium whitespace-nowrap`}
          onClick={() => handleCategoryClick('all')}
        >
          All Categories
        </Button>
        
        {categories.map((category) => (
          <Button 
            key={category.id}
            className={`px-4 py-2 ${activeCategory === category.slug ? 'bg-primary-500 text-white' : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'} rounded-lg font-medium whitespace-nowrap`}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
