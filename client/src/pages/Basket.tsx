import React from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Store, Product } from "@shared/schema";
import { useBasket } from "@/lib/basketContext";
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

  const { data: stores = [] } = useQuery<Store[]>({
    queryKey: ['/api/stores'],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const storeComparisons = computeStoreComparisons(stores);
  const smartSplit = computeSmartSplit(stores);

  // Quick staple suggestions if basket has few items
  const suggestedStaples = products.filter(
    (p) => !items.some((item) => item.product.id === p.id)
  ).slice(0, 4);

  // Handle WhatsApp Share
  const handleWhatsAppShare = () => {
    if (items.length === 0) return;

    const winningStore = storeComparisons.find((c) => c.isComplete) || storeComparisons[0];

    let message = `🛒 *My DealHunterSmart Grocery Run* 🇿🇦\n\n`;
    if (winningStore) {
      message += `🏆 *Cheapest Single Store:* ${winningStore.storeName}\n`;
      message += `💰 *Items Total:* ${formatZAR(winningStore.subtotal)}\n`;
      if (winningStore.loyaltySavings > 0) {
        message += `💳 *Cardholder Savings:* ${formatZAR(winningStore.loyaltySavings)}\n`;
      }
      message += `🚚 *Delivery Fee:* ${formatZAR(winningStore.deliveryFee)}\n`;
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
          <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-10 sm:p-16 text-center max-w-2xl mx-auto shadow-xl">
            <div className="w-20 h-20 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-4xl mx-auto mb-5 shadow-lg">
              🛒
            </div>
            <h2 className="text-2xl font-black text-white mb-2">
              Your Grocery Basket is Empty
            </h2>
            <p className="text-neutral-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Add everyday essentials like milk, bread, cooking oil, or braai meat packs to calculate which South African store will give you the cheapest checkout total.
            </p>

            {suggestedStaples.length > 0 && (
              <div className="text-left mb-8 pt-6 border-t border-neutral-800">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 text-center">
                  Quick Add Popular South African Staples:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suggestedStaples.map((staple) => (
                    <div
                      key={staple.id}
                      className="flex items-center justify-between bg-neutral-950 p-3 rounded-xl border border-neutral-800 hover:border-emerald-500/50 transition"
                    >
                      <div className="flex items-center space-x-3 truncate mr-2">
                        <img
                          src={staple.imageUrl}
                          alt={staple.name}
                          className="w-10 h-10 rounded-lg object-cover bg-neutral-900 shrink-0"
                        />
                        <div className="truncate">
                          <div className="font-bold text-white text-xs truncate">
                            {staple.name}
                          </div>
                          <div className="text-[11px] text-neutral-500">
                            {staple.brand} {staple.unit ? `• ${staple.unit}` : ''}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addItem(staple)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 h-auto shrink-0 cursor-pointer"
                      >
                        + Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link href="/">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl shadow-md cursor-pointer">
                Explore Deals on Home →
              </Button>
            </Link>
          </div>
        ) : (
          /* Populated Basket Grid */
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Basket Line Items */}
            <div className="lg:w-7/12 space-y-4">
              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-5 shadow-xl">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
                  <h3 className="font-extrabold text-white text-base">
                    Basket Items ({items.length})
                  </h3>
                  <span className="text-xs text-neutral-400">
                    Adjust quantities or remove
                  </span>
                </div>

                <div className="space-y-3">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 hover:border-neutral-700 transition"
                    >
                      <div className="flex items-center space-x-3.5 mb-3 sm:mb-0">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-14 h-14 rounded-xl object-cover bg-neutral-900 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">
                            {product.name}
                          </div>
                          <div className="text-xs text-neutral-400">
                            {product.brand} {product.unit ? `• ${product.unit}` : ''}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800">
                        <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="w-7 h-7 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 rounded font-bold text-sm transition cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-white">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="w-7 h-7 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 rounded font-bold text-sm transition cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(product.id)}
                          className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-red-950/60 border border-neutral-800 hover:border-red-500/50 text-neutral-400 hover:text-red-400 flex items-center justify-center text-xs transition cursor-pointer"
                          aria-label="Remove item"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Add Staple Pills */}
                {suggestedStaples.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-neutral-800">
                    <div className="text-xs font-bold text-neutral-400 mb-2">
                      Add other essentials to your run:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {suggestedStaples.map((staple) => (
                        <button
                          key={staple.id}
                          onClick={() => addItem(staple)}
                          className="text-xs bg-neutral-950 hover:bg-emerald-950/60 border border-neutral-800 hover:border-emerald-500/50 text-neutral-300 hover:text-emerald-300 px-3 py-1.5 rounded-full transition cursor-pointer flex items-center gap-1.5"
                        >
                          <span>+</span>
                          <span>{staple.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Multi-Store Comparison */}
            <div className="lg:w-5/12 space-y-6">
              {/* WhatsApp Share Action Banner */}
              <div className="bg-gradient-to-r from-emerald-900/70 via-emerald-800/80 to-teal-900/70 border border-emerald-500/40 rounded-2xl p-5 shadow-xl text-white">
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
                        Includes loyalty cards & delivery fees
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded uppercase">
                      Live SA Pricing
                    </span>
                  </div>

                  <div className="space-y-3">
                    {storeComparisons.map((store, index) => {
                      const theme = getStoreBrandTheme(store.storeName);
                      const isCheapest = index === 0 && store.isComplete;

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
                              <span className="font-semibold text-neutral-200">{formatZAR(store.deliveryFee)}</span>
                            </div>
                          </div>

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
                    Even after paying two R35 delivery fees, splitting your order saves money:
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