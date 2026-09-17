import { useState } from "react";
import { useLocation } from "wouter";
import { Category } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Filter3Line, SortDesc } from "@/lib/icons";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
  onSelectCategory?: (categorySlug: string) => void;
  showHeading?: boolean;
}

export default function CategoryFilter({ 
  categories, 
  activeCategory,
  onSelectCategory,
  showHeading = false
}: CategoryFilterProps) {
  const [, navigate] = useLocation();
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  
  const handleCategoryClick = (categorySlug: string) => {
    if (onSelectCategory) {
      onSelectCategory(categorySlug === 'all' ? '' : categorySlug);
      return;
    }

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
    <div className="mb-6">
      {showHeading && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">Today''s Best Deals</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="text-xs bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800">
              <Filter3Line className="mr-1 h-3.5 w-3.5" /> Filter
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800"
              onClick={toggleSort}
            >
              <SortDesc className="mr-1 h-3.5 w-3.5" /> Sort
            </Button>
          </div>
        </div>
      )}
      
      {/* Category Filter Tabs */}
      <div className="flex overflow-x-auto space-x-2 pb-2 no-scrollbar">
        <Button 
          variant={activeCategory === undefined || activeCategory === '' ? 'default' : 'outline'}
          size="sm"
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeCategory === undefined || activeCategory === ''
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm' 
              : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-emerald-500/50 hover:text-white'
          }`}
          onClick={() => handleCategoryClick('all')}
        >
          All Categories
        </Button>
        
        {categories.map((category) => (
          <Button 
            key={category.id}
            variant={activeCategory === category.slug ? 'default' : 'outline'}
            size="sm"
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === category.slug 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm' 
                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-emerald-500/50 hover:text-white'
            }`}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}