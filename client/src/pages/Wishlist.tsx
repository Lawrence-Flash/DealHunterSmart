import React, { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product, Store } from "@shared/schema";
import { useWishlist } from "@/lib/wishlistContext";
import { useBasket } from "@/lib/basketContext";
import { formatZAR, getStoreBrandTheme } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PriceAlertModal from "@/components/PriceAlertModal";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, alerts, removeAlert } = useWishlist();
  const { addItem } = useBasket();
  const [activeTab, setActiveTab] = useState<"wishlist" | "alerts" | "drops">("wishlist");
  const [selectedProductForAlert, setSelectedProductForAlert] = useState<{
    product: Product;
    lowestPrice: number;
  } | null>(null);

  const { data: stores = [] } = useQuery<Store[]>({
    queryKey: ['/api/stores'],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Calculate lowest price helper
  const getProductLowestPrice = (productId: number) => {
    const productStores = stores.filter(s => s.productId === productId);
    if (productStores.length === 0) return 0;
    const effectivePrices = productStores.map(s => s.loyaltyPrice ?? s.price);
    return Math.min(...effectivePrices);
  };

  const getProductCheapestStore = (productId: number) => {
    const productStores = stores.filter(s => s.productId === productId);
    if (productStores.length === 0) return null;
    return [...productStores].sort((a, b) => {
      const pA = a.loyaltyPrice ?? a.price;
      const pB = b.loyaltyPrice ?? b.price;
      return pA - pB;
    })[0];
  };

  // Products with highest savings for the "Drops" tab
  const productsWithSavings = products.map(p => {
    const pStores = stores.filter(s => s.productId === p.id);
    const regularMax = pStores.length > 0 ? Math.max(...pStores.map(s => s.price)) : 0;
    const lowest = getProductLowestPrice(p.id);
    const savings = Math.max(0, regularMax - lowest);
    return { product: p, lowest, regularMax, savings };
  }).filter(item => item.savings > 0)
    .sort((a, b) => b.savings - a.savings);

  return (
    <div className="bg-neutral-950 min-h-screen text-white pb-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🇿🇦</span>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Wishlist & Price Alerts
              </h1>
            </div>
            <p className="text-xs md:text-sm text-neutral-400">
              Track real-time price drops across Checkers, Takealot, Makro, and Pick n Pay with WhatsApp notifications
            </p>
          </div>

          <div className="flex gap-2">
            <Link href="/basket">
              <Button variant="outline" className="text-xs bg-neutral-900 border-neutral-700 text-neutral-200 hover:bg-neutral-800">
                🛒 View Grocery Basket
              </Button>
            </Link>
            <Link href="/">
              <Button className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
                + Browse All Deals
              </Button>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-neutral-800/80 pb-3">
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "wishlist"
                ? "bg-emerald-950 border border-emerald-500 text-emerald-300"
                : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            <span>❤️ Saved Items</span>
            <span className="bg-emerald-900 text-emerald-300 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
              {wishlist.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("alerts")}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "alerts"
                ? "bg-emerald-950 border border-emerald-500 text-emerald-300"
                : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            <span>🔔 Active Price Alerts</span>
            <span className="bg-emerald-900 text-emerald-300 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
              {alerts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("drops")}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "drops"
                ? "bg-emerald-950 border border-emerald-500 text-emerald-300"
                : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            <span>🔥 Hot SA Price Drops</span>
            <span className="bg-emerald-900 text-emerald-300 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
              {productsWithSavings.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Saved Wishlist */}
        {activeTab === "wishlist" && (
          <div>
            {wishlist.length === 0 ? (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center max-w-md mx-auto my-8">
                <div className="text-4xl mb-3">❤️</div>
                <h3 className="font-bold text-lg text-white mb-2">Your Wishlist is Empty</h3>
                <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                  Save airfryers, load-shedding UPS devices, or grocery staples to monitor price drops across South African stores.
                </p>
                <Link href="/">
                  <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-5">
                    Start Browsing Deals
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map(product => {
                  const lowestPrice = getProductLowestPrice(product.id);
                  const cheapestStore = getProductCheapestStore(product.id);
                  const theme = cheapestStore ? getStoreBrandTheme(cheapestStore.name) : null;

                  return (
                    <div 
                      key={product.id}
                      className="bg-neutral-900 border border-neutral-800 hover:border-emerald-500/40 rounded-2xl p-4 flex flex-col justify-between transition group shadow-md"
                    >
                      <div>
                        {/* Image & Badges */}
                        <div className="relative rounded-xl bg-neutral-950 p-4 mb-3 flex items-center justify-center min-h-[160px]">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-36 object-contain group-hover:scale-105 transition duration-300"
                          />
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-neutral-900/80 hover:bg-red-950/80 text-neutral-400 hover:text-red-400 flex items-center justify-center text-xs transition"
                            title="Remove from Wishlist"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Title & Brand */}
                        {product.brand && (
                          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                            {product.brand} {product.unit ? `• ${product.unit}` : ""}
                          </div>
                        )}
                        <h3 className="font-bold text-sm text-white line-clamp-1 mb-2">
                          {product.name}
                        </h3>

                        {/* Current Lowest Price */}
                        <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 mb-3 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-neutral-400 block font-medium">Best Price</span>
                            <span className="text-base font-black text-emerald-400">
                              {formatZAR(lowestPrice)}
                            </span>
                          </div>
                          {cheapestStore && (
                            <div className="flex items-center gap-1.5 text-right">
                              <span 
                                className="w-2 h-2 rounded-full shrink-0" 
                                style={{ backgroundColor: theme?.accentHex }} 
                              />
                              <span className="text-xs font-semibold text-neutral-300">
                                {cheapestStore.name}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action CTAs */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800">
                        <button
                          onClick={() => {
                            addItem(product);
                          }}
                          className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition shadow-xs"
                        >
                          <span>+ Basket</span>
                        </button>
                        <button
                          onClick={() => setSelectedProductForAlert({ product, lowestPrice })}
                          className="py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition border border-neutral-700"
                        >
                          <span>🔔 Alert</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Active Price Alerts */}
        {activeTab === "alerts" && (
          <div>
            {alerts.length === 0 ? (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center max-w-md mx-auto my-8">
                <div className="text-4xl mb-3">🔔</div>
                <h3 className="font-bold text-lg text-white mb-2">No Active Price Alerts</h3>
                <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                  Set a price alert on any product and get notified automatically via WhatsApp or email the instant the price drops.
                </p>
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-5 rounded-xl cursor-pointer"
                >
                  View Saved Wishlist to Add Alert
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {alerts.map(alert => {
                  const currentLowest = getProductLowestPrice(alert.productId);
                  const isMet = currentLowest <= alert.targetPrice;
                  const priceToDrop = Math.max(0, currentLowest - alert.targetPrice);

                  return (
                    <div 
                      key={alert.id}
                      className={`p-5 rounded-2xl border transition ${
                        isMet 
                          ? "bg-emerald-950/40 border-emerald-500/50 shadow-md"
                          : "bg-neutral-900 border-neutral-800"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                              {alert.channel === "whatsapp" ? "💬 WhatsApp" : alert.channel === "email" ? "✉️ Email" : "🔔 In-App"}
                            </span>
                            {isMet ? (
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-neutral-950">
                                ✓ Target Price Reached!
                              </span>
                            ) : (
                              <span className="text-xs font-medium text-neutral-400">
                                Tracking 24/7 across 6 SA stores
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-base text-white">
                            {alert.productName}
                          </h3>
                          <div className="text-xs text-neutral-400 mt-1">
                            Alert Contact: <span className="text-neutral-300 font-medium">{alert.contact || "Browser"}</span>
                          </div>
                        </div>

                        {/* Price Metrics */}
                        <div className="flex items-center gap-6">
                          <div>
                            <span className="text-[11px] text-neutral-400 block font-medium">Target Price</span>
                            <span className="text-lg font-black text-amber-400">
                              {formatZAR(alert.targetPrice)}
                            </span>
                          </div>
                          <div>
                            <span className="text-[11px] text-neutral-400 block font-medium">Current Best</span>
                            <span className="text-lg font-black text-emerald-400">
                              {formatZAR(currentLowest)}
                            </span>
                          </div>
                          <div className="text-right">
                            {isMet ? (
                              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-1 rounded-md">
                                Ready to Buy!
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-neutral-400">
                                Needs {formatZAR(priceToDrop)} drop
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <Link href={`/product/${alert.productId}`}>
                            <Button size="sm" variant="outline" className="text-xs bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700">
                              View Deal
                            </Button>
                          </Link>
                          <button
                            onClick={() => removeAlert(alert.id)}
                            className="p-2 rounded-lg bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 text-xs transition cursor-pointer"
                            title="Delete Alert"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Hot Price Drops */}
        {activeTab === "drops" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsWithSavings.map(({ product, lowest, regularMax, savings }) => {
              const cheapestStore = getProductCheapestStore(product.id);
              const theme = cheapestStore ? getStoreBrandTheme(cheapestStore.name) : null;
              const discountPct = Math.round((savings / regularMax) * 100);

              return (
                <div 
                  key={product.id}
                  className="bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 rounded-2xl p-4 flex flex-col justify-between transition group shadow-md"
                >
                  <div>
                    <div className="relative rounded-xl bg-neutral-950 p-4 mb-3 flex items-center justify-center min-h-[160px]">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-36 object-contain group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-xs">
                        Save {discountPct}%
                      </div>
                    </div>

                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                      {product.brand} {product.unit ? `• ${product.unit}` : ""}
                    </div>
                    <h3 className="font-bold text-sm text-white line-clamp-1 mb-2">
                      {product.name}
                    </h3>

                    <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 mb-3 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-neutral-500 line-through">
                          {formatZAR(regularMax)}
                        </div>
                        <div className="text-base font-black text-emerald-400">
                          {formatZAR(lowest)}
                        </div>
                      </div>
                      {cheapestStore && (
                        <div className="text-right">
                          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 border border-emerald-800/80 px-2 py-0.5 rounded-md block mb-0.5">
                            Save {formatZAR(savings)}
                          </span>
                          <span className="text-[11px] text-neutral-300 font-medium">
                            at {cheapestStore.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800">
                    <button
                      onClick={() => addItem(product)}
                      className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition"
                    >
                      + Basket
                    </button>
                    <button
                      onClick={() => setSelectedProductForAlert({ product, lowestPrice: lowest })}
                      className="py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition border border-neutral-700"
                    >
                      🔔 Track
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Price Alert Modal */}
        {selectedProductForAlert && (
          <PriceAlertModal
            product={selectedProductForAlert.product}
            currentLowestPrice={selectedProductForAlert.lowestPrice}
            isOpen={true}
            onClose={() => setSelectedProductForAlert(null)}
          />
        )}
      </div>
    </div>
  );
}
