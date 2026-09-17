import { Product, Store } from "@shared/schema";
import { StarFill, StarHalfFill } from "@/lib/icons";
import PriceComparison from "@/components/PriceComparison";
import { formatZAR } from "@/lib/utils";

interface DetailedComparisonProps {
  product: Product;
  stores: Store[];
}

export default function DetailedComparison({ product, stores }: DetailedComparisonProps) {
  const relevantStores = stores.filter(s => s.productId === product.id);
  
  if (relevantStores.length === 0) return null;

  const prices = relevantStores.map(s => s.loyaltyPrice ?? s.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...relevantStores.map(s => s.price));
  const savings = Math.max(0, maxPrice - minPrice);

  return (
    <section className="py-14 bg-neutral-950 border-y border-neutral-850">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-xs font-bold mb-3 uppercase tracking-wider">
              Featured Deal Analysis
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              See How Much You Can Save in SA
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md mt-2 md:mt-0">
            Real prices compared in real-time across top South African retailers with cardholder discounts factored in.
          </p>
        </div>
        
        <div className="bg-neutral-900/90 rounded-2xl p-6 md:p-8 border border-neutral-800 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image & Info */}
            <div className="lg:w-1/3 flex flex-col justify-between">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-4 shadow-sm bg-neutral-950">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-56 object-cover opacity-90"
                  />
                  {savings > 0 && (
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      Save {formatZAR(savings)}
                    </div>
                  )}
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                  {product.brand} {product.unit ? `• ${product.unit}` : ''}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                  {product.name}
                </h3>
                <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    <StarFill className="text-amber-400 h-4 w-4" />
                    <StarFill className="text-amber-400 h-4 w-4" />
                    <StarFill className="text-amber-400 h-4 w-4" />
                    <StarFill className="text-amber-400 h-4 w-4" />
                    <StarHalfFill className="text-amber-400 h-4 w-4" />
                  </div>
                  <span className="text-neutral-400 text-xs font-medium">4.8 (142 verified SA buyers)</span>
                </div>
              </div>
              
              <div className="border-t border-neutral-800 pt-4">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Key Highlights:</div>
                <div className="flex flex-wrap gap-1.5">
                  {product.features.map((feature, index) => (
                    <span key={index} className="bg-neutral-950 border border-neutral-800 text-neutral-300 px-2.5 py-1 rounded-lg text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Comparison Table */}
            <div className="lg:w-2/3">
              <div className="bg-neutral-950 rounded-xl shadow-xs border border-neutral-800 p-5 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-white text-base">
                    Store Price Breakdown
                  </h4>
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                    {relevantStores.length} Stores Tracked
                  </span>
                </div>
                <PriceComparison stores={relevantStores} productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}