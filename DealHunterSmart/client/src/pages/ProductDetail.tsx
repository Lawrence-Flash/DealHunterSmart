import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Product, Store } from "@shared/schema";
import { 
  StarFill, 
  StarHalfFill, 
  HeartLine, 
  ShareLine,
  Store2Line
} from "@/lib/icons";
import { Button } from "@/components/ui/button";
import PriceComparison from "@/components/PriceComparison";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const { data: stores = [] } = useQuery<Store[]>({
    queryKey: ['/api/stores'],
  });

  const product = products.find(p => p.id === productId);
  const productStores = stores.filter(s => s.productId === productId);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-neutral-600">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  // Find the lowest price
  const lowestPrice = Math.min(...productStores.map(store => store.price));
  const highestPrice = Math.max(...productStores.map(store => store.price));
  const savingsPercentage = Math.round(((highestPrice - lowestPrice) / highestPrice) * 100);

  // Similar products (example)
  const similarProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <div className="bg-neutral-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image Gallery */}
            <div className="lg:w-1/3">
              <Card>
                <CardContent className="p-6">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full rounded-lg shadow-md object-cover aspect-square"
                  />
                  <div className="flex justify-center gap-2 mt-4">
                    <Button variant="outline" className="rounded-full p-3">
                      <HeartLine className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" className="rounded-full p-3">
                      <ShareLine className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Details */}
            <div className="lg:w-2/3">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        <StarFill className="text-amber-400" />
                        <StarFill className="text-amber-400" />
                        <StarFill className="text-amber-400" />
                        <StarFill className="text-amber-400" />
                        <StarHalfFill className="text-amber-400" />
                      </div>
                      <span className="text-neutral-600">4.5 (238 reviews)</span>
                    </div>
                    <p className="text-lg text-neutral-700 mb-4">{product.description}</p>
                    
                    <div className="flex items-center my-4 space-x-2">
                      <div className="px-3 py-1 bg-primary-500 text-white rounded-lg">
                        Save {savingsPercentage}%
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-primary-600">${lowestPrice.toFixed(2)}</span>
                        <span className="ml-2 text-neutral-500 line-through">${highestPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="my-4">
                      <h3 className="font-semibold mb-2">Features:</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, idx) => (
                          <span key={idx} className="bg-neutral-200 text-neutral-700 px-2 py-1 rounded-md text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-lg mb-4">Price Comparison Across Stores</h3>
                    <PriceComparison stores={productStores} productId={product.id} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Similar Products */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProducts.map(similarProduct => (
                <ProductCard 
                  key={similarProduct.id} 
                  product={similarProduct} 
                  stores={stores.filter(store => store.productId === similarProduct.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
