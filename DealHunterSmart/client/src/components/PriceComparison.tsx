import { Store } from "@shared/schema";
import { Store2Line } from "@/lib/icons";
import { Button } from "@/components/ui/button";

interface PriceComparisonProps {
  stores: Store[];
  productId: number;
}

export default function PriceComparison({ stores, productId }: PriceComparisonProps) {
  // Filter stores by product ID and sort by price (highest to lowest)
  const filteredStores = stores
    .filter(store => store.productId === productId)
    .sort((a, b) => b.price - a.price);

  // Find the best price (lowest)
  const bestPrice = Math.min(...filteredStores.map(store => store.price));
  
  return (
    <div className="space-y-4">
      {filteredStores.map((store, index) => {
        const priceDifference = store.price - bestPrice;
        const isLastStore = index === filteredStores.length - 1;
        
        let storeClasses = "flex flex-col md:flex-row md:items-center justify-between p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition";
        let priceDifferenceText = null;
        
        if (isLastStore) {
          // Best deal - lowest price
          storeClasses = "flex flex-col md:flex-row md:items-center justify-between p-3 border-2 border-primary-500 rounded-lg bg-primary-50 hover:bg-primary-100 transition";
          const savingsPercentage = Math.round(((filteredStores[0].price - bestPrice) / filteredStores[0].price) * 100);
          priceDifferenceText = <div className="text-sm text-primary-700">You save ${(filteredStores[0].price - bestPrice).toFixed(2)} ({savingsPercentage}%)</div>;
        } else {
          priceDifferenceText = <div className="text-sm text-amber-600">+${priceDifference.toFixed(2)} more than best price</div>;
          
          // Highest price store (first in the sorted list)
          if (index === 0) {
            priceDifferenceText = <div className="text-sm text-red-600">+${priceDifference.toFixed(2)} more than best price</div>;
          }
        }

        return (
          <div key={store.id} className={storeClasses}>
            <div className="flex items-center mb-2 md:mb-0">
              <div className={`${isLastStore ? 'bg-primary-100' : 'bg-neutral-100'} rounded-full p-2 mr-3`}>
                <Store2Line className={`${isLastStore ? 'text-primary-600' : 'text-neutral-700'} h-5 w-5`} />
              </div>
              <div>
                <div className="flex items-center">
                  <h5 className="font-medium">{store.name}</h5>
                  {isLastStore && (
                    <span className="ml-2 bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">BEST PRICE</span>
                  )}
                </div>
                <div className="text-xs text-neutral-500">{store.shippingInfo}</div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className={`text-xl font-bold ${isLastStore ? 'text-primary-600' : 'text-neutral-800'}`}>
                ${store.price.toFixed(2)}
              </div>
              {priceDifferenceText}
            </div>
          </div>
        );
      })}
      
      <div className="mt-6">
        <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center h-auto">
          <Store2Line className="mr-2 h-5 w-5" /> Go to Best Deal
        </Button>
      </div>
      
      <div className="mt-4 text-center text-sm text-neutral-500">
        Last price check: Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}
