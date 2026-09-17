import { Store } from "@shared/schema";
import { Store2Line } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { formatZAR, getStoreBrandTheme } from "@/lib/utils";

interface PriceComparisonProps {
  stores: Store[];
  productId: number;
}

export default function PriceComparison({ stores, productId }: PriceComparisonProps) {
  // Filter stores by product ID and sort by effective price (cheapest first)
  const filteredStores = stores
    .filter(store => store.productId === productId)
    .sort((a, b) => {
      const priceA = a.loyaltyPrice ?? a.price;
      const priceB = b.loyaltyPrice ?? b.price;
      return priceA - priceB;
    });

  if (filteredStores.length === 0) {
    return (
      <div className="text-center py-6 text-neutral-500">
        No store prices currently listed for this item.
      </div>
    );
  }

  // Find the best price (lowest effective)
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
                ? 'border-2 border-emerald-500 bg-emerald-50/50 shadow-sm' 
                : 'border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/60'
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
                  <h5 className="font-bold text-neutral-900 text-sm">{store.name}</h5>
                  {isBestDeal && (
                    <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Best Deal
                    </span>
                  )}
                  {store.deliverySpeed && (
                    <span className="bg-neutral-100 text-neutral-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {store.deliverySpeed.includes("60") ? "⚡ " : "🚚 "}
                      {store.deliverySpeed}
                    </span>
                  )}
                </div>

                <div className="text-xs text-neutral-500 mt-0.5">
                  {store.shippingInfo || "Standard shipping rates apply"}
                </div>

                {hasLoyalty && (
                  <div className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                    Special price with {store.loyaltyProgram || "Loyalty Card"} (Regular: {formatZAR(store.price)})
                  </div>
                )}
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-100">
              <div className="text-right">
                <div className={`text-xl font-extrabold ${isBestDeal ? 'text-emerald-700' : 'text-neutral-900'}`}>
                  {formatZAR(effectivePrice)}
                </div>
                {priceDifference > 0 ? (
                  <div className="text-[11px] font-medium text-amber-700">
                    +{formatZAR(priceDifference)} vs best deal
                  </div>
                ) : (
                  <div className="text-[11px] font-semibold text-emerald-700">
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
                    className={`text-xs px-3 py-1.5 h-8 font-semibold shadow-xs ${
                      isBestDeal 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                        : 'bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100'
                    }`}
                  >
                    View on Store
                  </Button>
                </a>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between text-xs text-neutral-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live price comparison across South African retail</span>
        </div>
        <div>
          Verified today (SAST)
        </div>
      </div>
    </div>
  );
}