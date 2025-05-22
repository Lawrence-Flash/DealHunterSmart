import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
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

  // Filter products based on search query and/or category
  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !categorySlug || 
      product.categorySlug === categorySlug;

    return matchesSearch && matchesCategory;
  });

  const selectedCategory = categories.find(c => c.slug === categorySlug);

  return (
    <>
      {/* Search Header */}
      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
            {searchQuery 
              ? `Search results for "${searchQuery}"` 
              : selectedCategory 
                ? `Browse ${selectedCategory.name}` 
                : 'Browse All Products'
            }
          </h1>
          <SearchBar />
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <CategoryFilter 
            categories={categories} 
            activeCategory={categorySlug}
          />
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-neutral-600">
                Try adjusting your search or browse all categories.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    stores={stores.filter(store => store.productId === product.id)}
                  />
                ))}
              </div>
              
              <div className="text-center mt-10">
                <button className="bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-medium py-2 px-6 rounded-lg transition duration-300">
                  Load More Results
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
