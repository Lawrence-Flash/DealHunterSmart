import { Link } from "wouter";
import { Product, Store } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatZAR, getStoreBrandTheme } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  stores: Store[];
}

export default function ProductCard({ product, stores }: ProductCardProps) {
  // Calculate effective price for each store (loyalty price if available, otherwise regular price)
  const productStores = stores.filter(store => store.productId === product.id);

  if (productStores.length === 0) {
    return null;
  }

  // Sort stores by effective price ascending (cheapest first)
  const sortedStores = [...productStores].sort((a, b) => {
    const priceA = a.loyaltyPrice ?? a.price;
    const priceB = b.loyaltyPrice ?? b.price;
    return priceA - priceB;
  });

  const lowestStore = sortedStores[0];
  const lowestPrice = lowestStore.loyaltyPrice ?? lowestStore.price;
  
  const highestStore = sortedStores[sortedStores.length - 1];
  const highestPrice = highestStore.price;
  
  const maxSavings = Math.max(0, highestPrice - lowestPrice);
  const savingsPercentage = highestPrice > 0 ? Math.round((maxSavings / highestPrice) * 100) : 0;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-neutral-200/80 hover:border-primary-400 group flex flex-col justify-between">
      <div>
        <div className="relative overflow-hidden bg-neutral-100">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {savingsPercentage > 0 && (
            <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-sm tracking-wide">
              Save {savingsPercentage}%
            </div>
          )}
          {product.brand && (
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-neutral-800 px-2.5 py-0.5 rounded text-xs font-semibold shadow-xs">
              {product.brand} {product.unit ? `• ${product.unit}` : ''}
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-bold text-neutral-900 text-base mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-neutral-500 text-xs mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="mb-3 flex items-baseline justify-between">
            <div>
              <div className="text-xs text-neutral-500 font-medium">Best Deal From</div>
              <div className="text-xl font-extrabold text-emerald-600 tracking-tight">
                {formatZAR(lowestPrice)}
              </div>
            </div>
            {maxSavings > 0 && (
              <div className="text-right">
                <span className="text-xs text-neutral-400 line-through mr-1.5">{formatZAR(highestPrice)}</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  Save {formatZAR(maxSavings)}
                </span>
              </div>
            )}
          </div>
          
          {/* Quick Store Price Preview */}
          <div className="border-t border-neutral-100 pt-3 space-y-1.5">
            <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              Top Compare Stores ({productStores.length})
            </div>
            
            {sortedStores.slice(0, 3).map((store, index) => {
              const theme = getStoreBrandTheme(store.name);
              const storeEffectivePrice = store.loyaltyPrice ?? store.price;
              const isBest = index === 0;

              return (
                <div 
                  key={store.id} 
                  className={`flex justify-between items-center text-xs p-1.5 rounded-md transition ${
                    isBest ? 'bg-emerald-50/80 border border-emerald-200' : 'bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 truncate">
                    <span className={`w-2 h-2 rounded-full`} style={{ backgroundColor: theme.accentHex }} />
                    <span className="font-medium text-neutral-800 truncate">{store.name}</span>
                    {store.loyaltyProgram && (
                      <span className="text-[10px] text-primary-700 font-semibold bg-primary-100/70 px-1 rounded">
                        {store.loyaltyProgram}
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-neutral-900 shrink-0 ml-2">
                    {formatZAR(storeEffectivePrice)}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </div>

      <div className="p-4 pt-0">
        <Link href={`/product/${product.id}`}>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 shadow-xs transition duration-200">
            Compare All Deals ({productStores.length})
          </Button>
        </Link>
      </div>
    </Card>
  );
}