import { Store } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { formatZAR, getStoreBrandTheme } from "@/lib/utils";

interface PriceComparisonProps {
  stores: Store[];
  productId: number;
}

export default function PriceComparison({ stores, productId }: PriceComparisonProps) {
  const filteredStores = stores
    .filter(store => store.productId === productId)
    .sort((a, b) => {
      const priceA = a.loyaltyPrice ?? a.price;
      const priceB = b.loyaltyPrice ?? b.price;
      return priceA - priceB;
    });

  if (filteredStores.length === 0) {
    return (
      <div className="text-center py-6 text-neutral-400">
        No store prices currently listed for this item.
      </div>
    );
  }

  const bestPrice = filteredStores[0].loyaltyPrice ?? filteredStores[0].price;
  const highestPrice = Math.max(...filteredStores.map(s => s.price));

  return (
    <div className="space-y-3">
      {filteredStores.map((store, index) => {
        const theme = getStoreBrandTheme(store.name);
        const effectivePrice = store.loyaltyPrice ?? store.price;
        const isBestDeal = index === 0;
        const priceDifference = effectivePrice - bestPrice;
        const hasLoyalty = store.loyaltyPrice !== null && store.loyaltyPrice !== undefined && store.loyaltyPrice < store.price;

        return (
          <div 
            key={store.id} 
            className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
              isBestDeal 
                ? 'border-2 border-emerald-500 bg-emerald-950/40 shadow-sm' 
                : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/90 hover:bg-neutral-850'
            }`}
          >
            {/* Store details */}
            <div className="flex items-start sm:items-center space-x-3 mb-3 sm:mb-0">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-xs"
                style={{ backgroundColor: theme.accentHex }}
              >
                {store.name.substring(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="flex items-center flex-wrap gap-1.5">
                  <h5 className="font-bold text-white text-sm">{store.name}</h5>
                  {isBestDeal && (
                    <span className="bg-emerald-500 text-neutral-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Best Deal
                    </span>
                  )}
                  {store.deliverySpeed && (
                    <span className="bg-neutral-800 text-neutral-300 border border-neutral-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {store.deliverySpeed.includes("60") ? "⚡ " : "🚚 "}
                      {store.deliverySpeed}
                    </span>
                  )}
                </div>

                <div className="text-xs text-neutral-400 mt-0.5">
                  {store.shippingInfo || "Standard shipping rates apply"}
                </div>

                {hasLoyalty && (
                  <div className="text-[11px] font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Special price with {store.loyaltyProgram || "Loyalty Card"} (Regular: {formatZAR(store.price)})
                  </div>
                )}
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-800">
              <div className="text-right">
                <div className={`text-xl font-black ${isBestDeal ? 'text-emerald-400' : 'text-white'}`}>
                  {formatZAR(effectivePrice)}
                </div>
                {priceDifference > 0 ? (
                  <div className="text-[11px] font-medium text-amber-400">
                    +{formatZAR(priceDifference)} vs best deal
                  </div>
                ) : (
                  <div className="text-[11px] font-semibold text-emerald-400">
                    Saves {formatZAR(highestPrice - bestPrice)} vs highest
                  </div>
                )}
              </div>

              <div className="mt-2 sm:mt-1.5">
                <a 
                  href={store.productUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button 
                    size="sm" 
                    className={`text-xs px-3 py-1.5 h-8 font-bold shadow-xs flex items-center gap-1 ${
                      isBestDeal 
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                        : 'bg-neutral-800 border border-neutral-700 text-neutral-200 hover:bg-neutral-700'
                    }`}
                  >
                    <span>Shop {store.name}</span>
                    <span className="text-[10px]">↗</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live price comparison across South African retail</span>
        </div>
        <div className="text-[11px] text-neutral-400">
          Verified live today (SAST)
        </div>
      </div>
    </div>
  );
}
