import React, { useState } from "react";
import { Link } from "wouter";
import { Product, Store } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatZAR, getStoreBrandTheme } from "@/lib/utils";
import { useBasket } from "@/lib/basketContext";

interface ProductCardProps {
  product: Product;
  stores: Store[];
}

export default function ProductCard({ product, stores }: ProductCardProps) {
  const { addItem } = useBasket();
  const [justAdded, setJustAdded] = useState(false);

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

  const handleAddToBasket = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl hover:shadow-emerald-950/30 transition-all duration-300 border-neutral-800 hover:border-emerald-500/50 bg-neutral-900 group flex flex-col justify-between">
      <div>
        <div className="relative overflow-hidden bg-neutral-950 flex items-center justify-center p-2 min-h-[200px]">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            loading="lazy"
            className="w-full h-44 object-contain group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2.5 left-2.5 bg-neutral-950/90 backdrop-blur-xs text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Verified</span>
          </div>

          {savingsPercentage > 0 && (
            <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-md tracking-wide">
              Save {savingsPercentage}%
            </div>
          )}
          {product.brand && (
            <div className="absolute bottom-2.5 left-2.5 bg-neutral-900/90 backdrop-blur-xs text-neutral-300 border border-neutral-800 px-2 py-0.5 rounded text-[11px] font-semibold shadow-xs">
              {product.brand} {product.unit ? `• ${product.unit}` : ''}
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-bold text-white text-base mb-1 line-clamp-1 group-hover:text-emerald-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-neutral-400 text-xs mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-3 flex items-baseline justify-between">
            <div>
              <div className="text-[11px] text-neutral-400 font-medium">Best Deal From</div>
              <div className="text-xl font-black text-emerald-400 tracking-tight">
                {formatZAR(lowestPrice)}
              </div>
            </div>
            {maxSavings > 0 && (
              <div className="text-right">
                <span className="text-xs text-neutral-500 line-through mr-1.5">{formatZAR(highestPrice)}</span>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                  Save {formatZAR(maxSavings)}
                </span>
              </div>
            )}
          </div>
          
          {/* Quick Store Price Preview */}
          <div className="border-t border-neutral-800 pt-3 space-y-1.5">
            <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
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
                    isBest 
                      ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-200' 
                      : 'bg-neutral-950/70 border border-neutral-800/80 text-neutral-300'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 truncate">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: theme.accentHex }} />
                    <span className="font-medium truncate text-neutral-200">{store.name}</span>
                    {store.loyaltyProgram && (
                      <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 border border-emerald-800/60 px-1 rounded">
                        {store.loyaltyProgram}
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-white shrink-0 ml-2">
                    {formatZAR(storeEffectivePrice)}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </div>

      <div className="p-4 pt-0 grid grid-cols-5 gap-2">
        <Link href={`/product/${product.id}`} className="col-span-3">
          <Button className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-bold text-xs py-2 shadow-xs transition duration-200 cursor-pointer">
            Compare ({productStores.length})
          </Button>
        </Link>
        <button
          onClick={handleAddToBasket}
          className={`col-span-2 py-2 px-2 rounded-lg font-bold text-xs transition duration-200 cursor-pointer flex items-center justify-center gap-1 shadow-xs ${
            justAdded
              ? 'bg-emerald-500 text-neutral-950 scale-105'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          {justAdded ? (
            <span>✓ Added</span>
          ) : (
            <span>+ Basket</span>
          )}
        </button>
      </div>
    </Card>
  );
}
