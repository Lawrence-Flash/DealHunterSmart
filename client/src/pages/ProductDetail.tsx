import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
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
import ProductCard from "@/components/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { formatZAR } from "@/lib/utils";

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
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-neutral-800">Product Not Found</h2>
        <p className="text-neutral-600 mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link href="/">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Return to Home
          </Button>
        </Link>
      </div>
    );
  }

  // Calculate prices
  const storePrices = productStores.map(store => store.loyaltyPrice ?? store.price);
  const lowestPrice = storePrices.length > 0 ? Math.min(...storePrices) : 0;
  const highestPrice = productStores.length > 0 ? Math.max(...productStores.map(s => s.price)) : 0;
  const savings = Math.max(0, highestPrice - lowestPrice);
  const savingsPercentage = highestPrice > 0 ? Math.round((savings / highestPrice) * 100) : 0;

  // Similar products in same category
  const similarProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-neutral-50/50 py-10 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-medium text-neutral-500">
          <Link href="/" className="hover:text-emerald-700 transition">Home</Link>
          <span>/</span>
          <Link href={`/search?category=${product.categorySlug}`} className="hover:text-emerald-700 capitalize transition">
            {product.categorySlug.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-neutral-800 font-semibold truncate">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image Gallery Card */}
          <div className="lg:w-5/12">
            <Card className="border-neutral-200 shadow-sm overflow-hidden sticky top-24">
              <CardContent className="p-6">
                <div className="relative rounded-xl overflow-hidden bg-neutral-100 mb-4">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full object-cover aspect-square hover:scale-105 transition-transform duration-500"
                  />
                  {savingsPercentage > 0 && (
                    <div className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-extrabold shadow-sm">
                      Save {savingsPercentage}%
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg text-xs gap-1.5 text-neutral-600">
                      <HeartLine className="h-4 w-4" /> Save
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg text-xs gap-1.5 text-neutral-600">
                      <ShareLine className="h-4 w-4" /> Share
                    </Button>
                  </div>
                  <div className="text-xs text-neutral-500 font-medium">
                    {productStores.length} SA Stores Tracking
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details & Comparisons */}
          <div className="lg:w-7/12 space-y-6">
            <Card className="border-neutral-200 shadow-sm">
              <CardContent className="p-6 md:p-8">
                {product.brand && (
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                    {product.brand} {product.unit ? `• ${product.unit}` : ''}
                  </div>
                )}
                
                <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-3 leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex">
                    <StarFill className="text-amber-400 h-4 w-4" />
                    <StarFill className="text-amber-400 h-4 w-4" />
                    <StarFill className="text-amber-400 h-4 w-4" />
                    <StarFill className="text-amber-400 h-4 w-4" />
                    <StarHalfFill className="text-amber-400 h-4 w-4" />
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">4.7 (184 ratings across SA)</span>
                </div>
                
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-6">
                  {product.description}
                </p>
                
                {/* Price highlight banner */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 mb-6 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold text-neutral-600 block">Lowest Price Available</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl font-extrabold text-emerald-700 tracking-tight">
                        {formatZAR(lowestPrice)}
                      </span>
                      {highestPrice > lowestPrice && (
                        <span className="text-sm text-neutral-400 line-through">
                          {formatZAR(highestPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {savings > 0 && (
                    <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs">
                      Max Savings: {formatZAR(savings)}
                    </div>
                  )}
                </div>

                {/* Features list */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2.5">
                    Features & Specifications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, idx) => (
                      <span key={idx} className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-lg text-xs font-medium">
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price comparison section */}
                <div className="border-t border-neutral-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-neutral-900">
                      Compare Prices in South Africa
                    </h3>
                    <span className="text-xs text-neutral-500">Sorted cheapest first</span>
                  </div>
                  <PriceComparison stores={productStores} productId={product.id} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-6">
              More Deals in this Category
            </h2>
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
        )}
      </div>
    </div>
  );
}