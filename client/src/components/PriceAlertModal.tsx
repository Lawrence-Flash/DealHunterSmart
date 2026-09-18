import React, { useState } from "react";
import { Product } from "@shared/schema";
import { useWishlist } from "@/lib/wishlistContext";
import { formatZAR } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PriceAlertModalProps {
  product: Product;
  currentLowestPrice: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function PriceAlertModal({
  product,
  currentLowestPrice,
  isOpen,
  onClose,
}: PriceAlertModalProps) {
  const { addAlert, getAlertForProduct, removeAlert } = useWishlist();
  const existingAlert = getAlertForProduct(product.id);

  const [targetPrice, setTargetPrice] = useState<number>(
    existingAlert ? existingAlert.targetPrice : Math.round(currentLowestPrice * 0.9)
  );
  const [channel, setChannel] = useState<"whatsapp" | "email" | "browser">(
    existingAlert ? existingAlert.channel : "whatsapp"
  );
  const [contact, setContact] = useState<string>(
    existingAlert ? existingAlert.contact : "+27 "
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const discountPercent = Math.round(((currentLowestPrice - targetPrice) / currentLowestPrice) * 100);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addAlert({
      productId: product.id,
      productName: product.name,
      targetPrice: Number(targetPrice),
      currentLowestPrice,
      channel,
      contact: contact.trim(),
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleTestWhatsApp = () => {
    const text = `🔔 *DealHunterSmart Price Drop Alert Triggered!*

📦 *Product:* ${product.name}
🎯 *Target Alert Price:* ${formatZAR(targetPrice)}
⚡ *Current Best Price:* ${formatZAR(currentLowestPrice)} (Save ${formatZAR(Math.max(0, currentLowestPrice - targetPrice))})
🇿🇦 *Verified SA Stores:* Checkers Sixty60, Pick n Pay asap!, Takealot & Makro

👉 *View Live Deal:* ${window.location.origin}/product/${product.id}

_Sent via DealHunterSmart South Africa_`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              🔔
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Set Price Drop Alert</h3>
              <p className="text-xs text-neutral-400">We will notify you the second this item drops in price</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-lg px-2 py-1 rounded-lg hover:bg-neutral-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="p-5 space-y-4">
          {/* Product Summary */}
          <div className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-14 h-14 object-contain rounded-lg bg-neutral-900 p-1"
            />
            <div className="overflow-hidden">
              <h4 className="font-bold text-sm text-white truncate">{product.name}</h4>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xs text-neutral-400">Current Best:</span>
                <span className="text-sm font-black text-emerald-400">{formatZAR(currentLowestPrice)}</span>
              </div>
            </div>
          </div>

          {/* Target Price Configuration */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Notify me when price drops to or below (ZAR):
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-sm font-bold text-neutral-400">R</span>
              <input 
                type="number" 
                step="1"
                min="1"
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-emerald-500 rounded-xl pl-8 pr-3 py-2 text-white font-bold text-base outline-hidden transition"
                required
              />
            </div>

            {/* Quick Discount Presets */}
            <div className="grid grid-cols-4 gap-1.5 mt-2">
              {[5, 10, 15, 20].map((pct) => {
                const discounted = Math.round(currentLowestPrice * (1 - pct / 100));
                return (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setTargetPrice(discounted)}
                    className="py-1 px-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-emerald-500/60 text-[11px] font-semibold text-neutral-300 hover:text-emerald-400 text-center transition"
                  >
                    -{pct}% ({formatZAR(discounted)})
                  </button>
                );
              })}
            </div>

            {discountPercent > 0 && (
              <div className="text-[11px] text-emerald-400 font-medium mt-1.5">
                Target discount: {discountPercent}% off current price (Saves {formatZAR(currentLowestPrice - targetPrice)})
              </div>
            )}
          </div>

          {/* Notification Channel */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Notification Channel:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setChannel("whatsapp")}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  channel === "whatsapp"
                    ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                <span>💬</span>
                <span>WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => setChannel("email")}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  channel === "email"
                    ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                <span>✉️</span>
                <span>Email</span>
              </button>
              <button
                type="button"
                onClick={() => setChannel("browser")}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  channel === "browser"
                    ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                <span>🔔</span>
                <span>In-App</span>
              </button>
            </div>
          </div>

          {/* Contact Input */}
          {channel !== "browser" && (
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                {channel === "whatsapp" ? "South African WhatsApp Number:" : "Your Email Address:"}
              </label>
              <input 
                type={channel === "whatsapp" ? "tel" : "email"}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={channel === "whatsapp" ? "+27 82 123 4567" : "name@example.co.za"}
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-white text-sm outline-hidden transition"
                required
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex gap-2">
            <Button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer shadow-xs"
            >
              {savedSuccess ? "✓ Alert Saved!" : existingAlert ? "Update Alert" : "Activate Price Alert"}
            </Button>

            <button
              type="button"
              onClick={handleTestWhatsApp}
              className="py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-neutral-700"
              title="Test WhatsApp message formatting"
            >
              <span>Test WhatsApp</span>
              <span className="text-[10px]">↗</span>
            </button>

            {existingAlert && (
              <button
                type="button"
                onClick={() => {
                  removeAlert(existingAlert.id);
                  onClose();
                }}
                className="py-2.5 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-300 text-xs font-bold transition cursor-pointer"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
