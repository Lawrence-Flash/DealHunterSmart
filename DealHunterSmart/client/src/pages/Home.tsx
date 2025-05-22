import { useQuery } from "@tanstack/react-query";
import { Product, Store, Category } from "@shared/schema";
import { useIsMobile } from "@/hooks/use-mobile";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import DetailedComparison from "@/components/DetailedComparison";
import CTADownload from "@/components/CTADownload";
import CategoryFilter from "@/components/CategoryFilter";

export default function Home() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const { data: stores = [] } = useQuery<Store[]>({
    queryKey: ['/api/stores'],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const isMobile = useIsMobile();

  // Get the featured product for the detailed comparison
  const featuredProduct = products.find(p => p.id === 4); // TV product
  const relevantStores = stores.filter(s => s.productId === 4);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-4">
                Find the <span className="text-primary-500">Best Deals</span> in Seconds
              </h1>
              <p className="text-neutral-600 text-lg mb-6">
                DealHunt compares prices across multiple stores, saving you time and money on everything from groceries to gadgets.
              </p>
              
              <SearchBar />
            </div>
            
            <div className="md:w-1/2 md:pl-8">
              <img 
                src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="DealHunt mobile app interface showing price comparisons" 
                className="rounded-xl shadow-xl w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Featured Deals */}
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <CategoryFilter categories={categories} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                stores={stores.filter(store => store.productId === product.id)}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button className="bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-medium py-2 px-6 rounded-lg transition duration-300">
              Show More Deals
            </button>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Example */}
      {featuredProduct && (
        <DetailedComparison 
          product={featuredProduct} 
          stores={relevantStores}
        />
      )}
      
      {/* Testimonials */}
      <Testimonials />

      {/* CTA Download */}
      <CTADownload />

      {/* Mobile Navigation is handled by Layout component */}
      {/* Footer is handled by Layout component */}
    </>
  );
}
