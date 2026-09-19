import React from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Store, Product } from "@shared/schema";
import { useBasket } from "@/lib/basketContext";
import { useDelivery } from "@/lib/deliveryContext";
import { formatZAR, getStoreBrandTheme } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Basket() {
  const { 
    items, 
    totalCount, 
    removeItem, 
    updateQuantity, 
    clearBasket, 
    computeStoreComparisons, 
    computeSmartSplit,
    addItem
  } = useBasket();

  const { currentSuburb, openLocationModal } = useDelivery();

  const { data: stores = [] } = useQuery<Store[]>({
    queryKey: ['/api/stores'],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const storeComparisons = computeStoreComparisons(stores, currentSuburb);
  const smartSplit = computeSmartSplit(stores, currentSuburb);

  // Quick staple suggestions if basket has few items
  const suggestedStaples = products.filter(
    (p) => !items.some((item) => item.product.id === p.id)
  ).slice(0, 4);

  // Handle WhatsApp Share
  const handleWhatsAppShare = () => {
    if (items.length === 0) return;

    const winningStore = storeComparisons.find((c) => c.isComplete && c.isDeliveryAvailable) || storeComparisons[0];

    let message = `🛒 *My DealHunterSmart Grocery Run* 🇿🇦\n`;
    message += `📍 *Delivery Destination:* ${currentSuburb.name} (${currentSuburb.postalCode})\n\n`;

    if (winningStore) {
      message += `🏆 *Cheapest Single Store:* ${winningStore.storeName}\n`;
      message += `💰 *Items Total:* ${formatZAR(winningStore.subtotal)}\n`;
      if (winningStore.loyaltySavings > 0) {
        message += `💳 *Cardholder Savings:* ${formatZAR(winningStore.loyaltySavings)}\n`;
      }
      message += `🚚 *Delivery Fee:* ${formatZAR(winningStore.deliveryFee)} (${winningStore.deliverySpeed})\n`;
      message += `🏷️ *Final Total:* ${formatZAR(winningStore.finalTotal)}\n\n`;
    }

    message += `*Items in Basket (${totalCount}):*\n`;
    items.forEach((item) => {
      message += `• ${item.quantity}x ${item.product.name}\n`;
    });

    if (smartSplit && smartSplit.extraSavings > 0) {
      message += `\n💡 *Smart Split Tip:* Split between ${smartSplit.store1} & ${smartSplit.store2} to save an extra *${formatZAR(smartSplit.extraSavings)}*!\n`;
    }

    message += `\nTracked live on DealHunterSmart: http://localhost:5000/basket`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-850">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              South African Grocery Run Optimizer
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>🛒 Smart Grocery Basket</span>
              <span className="text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                {totalCount} item{totalCount === 1 ? '' : 's'}
              </span>
            </h1>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={clearBasket}
                className="text-xs text-neutral-400 hover:text-red-400 font-medium transition cursor-pointer"
              >
                Clear Basket
              </button>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center max-w-xl mx-auto my-12 shadow-2xl">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-xl font-bold text-white mb-2">Your Basket is Empty</h2>
            <p className="text-neutral-400 text-xs sm:text-sm mb-6 leading-relaxed">
              Add staple items like Clover Milk, Albany Bread, Tastic Rice, or Sunflower Oil to see real-time price comparisons across Checkers Sixty60, Pick n Pay asap!, and Woolworths Dash.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/search?category=groceries">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm">
                  Browse Everyday Essentials
                </Button>
              </Link>
              <Link href="/delivery-checker">
                <Button variant="outline" className="border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 text-xs font-bold">
                  🚚 Check Suburb Delivery Coverage
                </Button>
              </Link>
            </div>

            {/* Quick Suggested Staples */}
            {suggestedStaples.length > 0 && (
              <div className="mt-8 pt-8 border-t border-neutral-800 text-left">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                  Quick Add South African Staples:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestedStaples.map((staple) => (
                    <div
                      key={staple.id}
                      className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5 truncate mr-2">
                        <img
                          src={staple.imageUrl}
                          alt={staple.name}
                          className="w-9 h-9 object-contain bg-neutral-900 rounded p-1"
                        />
                        <div className="truncate">
                          <div className="text-xs font-bold text-white truncate">{staple.name}</div>
                          <div className="text-[10px] text-neutral-400">{staple.unit}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => addItem(staple)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Active Basket Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Basket Items (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                  <h2 className="font-extrabold text-white text-base">
                    Basket Items ({totalCount})
                  </h2>
                  <Link href="/search?category=groceries" className="text-xs text-emerald-400 hover:text-emerald-300 font-bold transition">
                    + Add More Items
                  </Link>
                </div>

                <div className="divide-y divide-neutral-850">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="py-4 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-12 h-12 object-contain bg-neutral-950 rounded-lg p-1.5 border border-neutral-800 shrink-0"
                        />
                        <div className="truncate">
                          <Link href={`/product/${item.product.id}`}>
                            <h3 className="text-sm font-bold text-white hover:text-emerald-400 transition truncate cursor-pointer">
                              {item.product.name}
                            </h3>
                          </Link>
                          <div className="text-[11px] text-neutral-400">
                            {item.product.brand} {item.product.unit ? `• ${item.product.unit}` : ''}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        {/* Quantity Buttons */}
                        <div className="flex items-center border border-neutral-800 bg-neutral-950 rounded-xl overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="px-2.5 py-1 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white font-black transition cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-emerald-400">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="px-2.5 py-1 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white font-black transition cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove item */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-neutral-500 hover:text-red-400 text-xs transition cursor-pointer"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Multi-Store Comparison & Delivery Fees (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Delivery Suburb Indicator Banner */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400 text-lg">📍</span>
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      Delivery Destination
                    </div>
                    <div className="text-xs font-black text-white">
                      {currentSuburb.name} ({currentSuburb.postalCode}) • {currentSuburb.city}
                    </div>
                  </div>
                </div>
                <button
                  onClick={openLocationModal}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-lg transition cursor-pointer"
                >
                  Change
                </button>
              </div>

              {/* WhatsApp Share Card */}
              <div className="bg-gradient-to-br from-emerald-950 via-neutral-900 to-neutral-900 border border-emerald-500/40 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-white">
                      Share List to WhatsApp
                    </h3>
                    <p className="text-emerald-200 text-xs mt-0.5">
                      Send this grocery run & store recommendation to family or roommates.
                    </p>
                  </div>
                  <div className="text-3xl">📱</div>
                </div>

                <Button
                  onClick={handleWhatsAppShare}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs py-2.5 rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Share Basket via WhatsApp</span>
                  <span>→</span>
                </Button>
              </div>

              {/* Multi-Store Comparison Table */}
              <Card className="border-neutral-800 bg-neutral-900 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
                    <div>
                      <h3 className="font-extrabold text-white text-base">
                        Store Comparison
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Includes loyalty cards & delivery to {currentSuburb.name}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded uppercase">
                      Live SA Pricing
                    </span>
                  </div>

                  <div className="space-y-3">
                    {storeComparisons.map((store, index) => {
                      const theme = getStoreBrandTheme(store.storeName);
                      const isCheapest = index === 0 && store.isComplete && store.isDeliveryAvailable;

                      return (
                        <div
                          key={store.storeName}
                          className={`p-4 rounded-xl border transition-all ${
                            isCheapest
                              ? 'bg-emerald-950/50 border-2 border-emerald-500 shadow-md'
                              : 'bg-neutral-950/80 border-neutral-800'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex flex-col">
                              <div className="flex items-center space-x-2">
                                <span
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ backgroundColor: theme.accentHex }}
                                />
                                <span className="font-bold text-white text-sm">
                                  {store.storeName}
                                </span>
                                {isCheapest && (
                                  <span className="bg-emerald-500 text-neutral-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Cheapest Run
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center gap-1.5">
                                <span className="text-emerald-400">🚚</span>
                                <span>{store.deliverySpeed}</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className={`text-lg font-black ${isCheapest ? 'text-emerald-400' : 'text-white'}`}>
                                {store.itemsAvailable > 0 ? formatZAR(store.finalTotal) : 'N/A'}
                              </div>
                              <span className="text-[10px] text-neutral-400">
                                Total with delivery
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-neutral-850 text-neutral-400">
                            <div>
                              <span className="block text-neutral-500 text-[10px]">Items Subtotal</span>
                              <span className="font-semibold text-neutral-200">{formatZAR(store.subtotal)}</span>
                            </div>
                            <div>
                              <span className="block text-neutral-500 text-[10px]">Card Savings</span>
                              <span className="font-bold text-emerald-400">
                                {store.loyaltySavings > 0 ? `-${formatZAR(store.loyaltySavings)}` : 'R 0.00'}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="block text-neutral-500 text-[10px]">Delivery Fee</span>
                              <span className="font-semibold text-neutral-200">
                                {store.deliveryFee === 0 ? "FREE" : formatZAR(store.deliveryFee)}
                              </span>
                            </div>
                          </div>

                          {!store.isDeliveryAvailable && (
                            <div className="mt-2 text-[10px] text-red-400 bg-red-950/40 p-1.5 rounded border border-red-500/30">
                              ⚠️ Express on-demand not active in {currentSuburb.name} (Click & Collect or scheduled only).
                            </div>
                          )}

                          {!store.isComplete && (
                            <div className="mt-2 text-[10px] text-amber-400/90 italic">
                              ⚠️ Missing {store.totalItems - store.itemsAvailable} item{store.totalItems - store.itemsAvailable > 1 ? 's' : ''} at this retailer.
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Smart Split Dual-Store Recommendation */}
              {smartSplit && smartSplit.extraSavings > 0 && (
                <div className="bg-neutral-900 border border-emerald-500/40 rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-emerald-400 text-lg">💡</span>
                    <h4 className="font-extrabold text-white text-sm">
                      Smart Split Recommendation
                    </h4>
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2 py-0.5 rounded-full ml-auto">
                      Save Extra {formatZAR(smartSplit.extraSavings)}
                    </span>
                  </div>

                  <p className="text-neutral-300 text-xs leading-relaxed mb-3">
                    Even after paying two R35 delivery fees to {currentSuburb.name}, splitting your order saves money:
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                      <div className="font-bold text-emerald-400 text-xs mb-1">
                        1. Order from {smartSplit.store1} ({formatZAR(smartSplit.store1Total)}):
                      </div>
                      <div className="text-neutral-400 text-[11px]">
                        {smartSplit.store1Items.map((i) => i.name).join(', ')}
                      </div>
                    </div>

                    <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                      <div className="font-bold text-sky-400 text-xs mb-1">
                        2. Order from {smartSplit.store2} ({formatZAR(smartSplit.store2Total)}):
                      </div>
                      <div className="text-neutral-400 text-[11px]">
                        {smartSplit.store2Items.map((i) => i.name).join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
