import { Product, Store } from "@shared/schema";
import { StarFill, StarHalfFill } from "@/lib/icons";
import PriceComparison from "@/components/PriceComparison";

interface DetailedComparisonProps {
  product: Product;
  stores: Store[];
}

export default function DetailedComparison({ product, stores }: DetailedComparisonProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Detailed Comparison Example</h2>
        
        <div className="bg-neutral-50 rounded-xl p-6 shadow-md">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Product Image & Info */}
            <div className="md:w-1/3">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-60 object-cover rounded-lg mb-4 shadow-md"
              />
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-neutral-600 mb-4">{product.description}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-4">
                  <StarFill className="text-amber-400" />
                  <StarFill className="text-amber-400" />
                  <StarFill className="text-amber-400" />
                  <StarFill className="text-amber-400" />
                  <StarHalfFill className="text-amber-400" />
                </div>
                <span className="text-neutral-600">4.5 (238 reviews)</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {product.features.map((feature, index) => (
                  <span key={index} className="bg-neutral-200 text-neutral-700 px-2 py-1 rounded-md text-xs">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Comparison Table */}
            <div className="md:w-2/3">
              <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
                <h4 className="font-semibold text-lg mb-4">Price Comparison Across Stores</h4>
                <PriceComparison stores={stores} productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
