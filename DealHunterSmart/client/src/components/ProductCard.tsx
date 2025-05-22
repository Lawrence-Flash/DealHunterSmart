import { Link } from "wouter";
import { Product, Store } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  stores: Store[];
}

export default function ProductCard({ product, stores }: ProductCardProps) {
  // Sort stores by price (highest to lowest)
  const sortedStores = [...stores]
    .filter(store => store.productId === product.id)
    .sort((a, b) => b.price - a.price);

  // Find the lowest price
  const lowestPrice = Math.min(...sortedStores.map(store => store.price));
  
  // Calculate the highest savings percentage
  const highestPrice = Math.max(...sortedStores.map(store => store.price));
  const savingsPercentage = Math.round(((highestPrice - lowestPrice) / highestPrice) * 100);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition duration-300">
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-primary-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
          Save {savingsPercentage}%
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-neutral-600 text-sm mb-4">{product.description}</p>
        
        <div className="comparison-appear border-t border-neutral-200 pt-3 mt-3">
          <div className="text-sm font-medium text-neutral-700 mb-2">Price Comparison</div>
          
          {/* Store Prices */}
          <div className="space-y-2">
            {sortedStores.map((store, index) => {
              let bgColor = 'bg-primary-50';
              let textColor = 'text-primary-600';
              
              if (index === 0) {
                bgColor = 'bg-red-50';
                textColor = 'text-red-600';
              } else if (index === 1) {
                bgColor = 'bg-amber-50';
                textColor = 'text-amber-600';
              }
              
              return (
                <div key={store.id} className={`flex justify-between items-center price-badge p-2 rounded-lg ${bgColor}`}>
                  <div className="flex items-center">
                    <span className="font-medium">{store.name}</span>
                  </div>
                  <div className={`font-bold ${textColor}`}>${store.price.toFixed(2)}</div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4">
            <Link href={`/product/${product.id}`}>
              <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white">
                View Best Deal
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
