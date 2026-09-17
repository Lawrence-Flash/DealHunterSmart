import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { Product, Store, Category } from "@shared/schema";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";

export default function SearchResults() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1] || '');
  const searchQuery = params.get('q') || '';
  const categorySlug = params.get('category') || undefined;

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const { data: stores = [] } = useQuery<Store[]>({
    queryKey: ['/api/stores'],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Filter products based on search query, brand, or category
  const filteredProducts = products.filter(product => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      product.name.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      (product.brand && product.brand.toLowerCase().includes(q)) ||
      product.features.some(f => f.toLowerCase().includes(q));
    
    const matchesCategory = !categorySlug || 
      product.categorySlug === categorySlug;

    return matchesSearch && matchesCategory;
  });

  const selectedCategory = categories.find(c => c.slug === categorySlug);

  return (
    <div className="min-h-screen bg-neutral-50/50">
      {/* Search Header */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-neutral-900 text-white py-10 shadow-inner">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-4">
            <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1">
              DealHunter Search
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {searchQuery 
                ? `Deals matching "${searchQuery}"` 
                : selectedCategory 
                  ? `${selectedCategory.name} Deals` 
                  : 'All South African Deals'
              }
            </h1>
            <p className="text-emerald-100/70 text-xs md:text-sm mt-1">
              Showing {filteredProducts.length} verified item{filteredProducts.length === 1 ? '' : 's'} across Checkers, Pick n Pay, Takealot, Makro and more.
            </p>
          </div>
          
          <div className="max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Search Results Content */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <CategoryFilter 
            categories={categories} 
            activeCategory={categorySlug}
          />
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 p-8 shadow-xs">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🔍
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">No matching deals found</h3>
              <p className="text-neutral-500 text-sm max-w-md mx-auto mb-6">
                We couldn't find any items matching "{searchQuery}". Try searching for popular items like "Oil", "UPS", "Airfryer", or "TV".
              </p>
              <Link href="/search">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-6 rounded-xl transition shadow-xs">
                  View All Products
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  stores={stores.filter(store => store.productId === product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}