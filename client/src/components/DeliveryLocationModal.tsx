import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDelivery } from "@/lib/deliveryContext";
import { SuburbLocation, RETAILER_METADATA } from "@/lib/deliveryData";
import { formatZAR } from "@/lib/utils";

export default function DeliveryLocationModal() {
  const {
    currentSuburb,
    allSuburbs,
    popularSuburbs,
    isLocationModalOpen,
    closeLocationModal,
    setSuburb
  } = useDelivery();

  const [search, setSearch] = useState("");
  const [previewSuburb, setPreviewSuburb] = useState<SuburbLocation>(currentSuburb);

  const filteredSuburbs = allSuburbs.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.postalCode.includes(search) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.province.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (suburb: SuburbLocation) => {
    setPreviewSuburb(suburb);
  };

  const handleConfirm = () => {
    setSuburb(previewSuburb);
  };

  return (
    <Dialog open={isLocationModalOpen} onOpenChange={(open) => !open && closeLocationModal()}>
      <DialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100 max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-2xl">
        <DialogHeader className="mb-4">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span>🇿🇦 South African Delivery Coverage</span>
          </div>
          <DialogTitle className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>📍 Select Your Suburb or Postal Code</span>
          </DialogTitle>
          <DialogDescription className="text-neutral-400 text-sm">
            Check real-time 60-minute express availability, courier cutoff times, and live delivery fees for your neighborhood.
          </DialogDescription>
        </DialogHeader>

        {/* Search Input */}
        <div className="relative mb-5">
          <Input
            type="text"
            placeholder="Search by suburb (e.g. Sandton, Sea Point) or postal code (e.g. 2196, 8001)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-950 border-neutral-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500"
            autoFocus
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 text-xs font-bold"
            >
              ✕ Clear
            </button>
          )}
        </div>

        {/* Popular Quick Chips */}
        <div className="mb-6">
          <div className="text-xs font-bold text-neutral-400 mb-2 uppercase tracking-wider">
            Popular Metro Hubs:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {popularSuburbs.map((suburb) => {
              const isSelected = previewSuburb.id === suburb.id;
              return (
                <button
                  key={suburb.id}
                  onClick={() => handleSelect(suburb)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
                    isSelected
                      ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                      : "bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white"
                  }`}
                >
                  {suburb.name} ({suburb.postalCode})
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Results if typing */}
        {search.trim().length > 0 && (
          <div className="mb-6 bg-neutral-950 border border-neutral-800 rounded-xl p-3 max-h-48 overflow-y-auto">
            <div className="text-xs font-semibold text-neutral-400 mb-2">Matching Areas ({filteredSuburbs.length}):</div>
            {filteredSuburbs.length === 0 ? (
              <div className="text-xs text-neutral-500 py-3 text-center">
                No matching South African suburb found. Try searching by metro or 4-digit postal code.
              </div>
            ) : (
              <div className="space-y-1">
                {filteredSuburbs.map((suburb) => (
                  <button
                    key={suburb.id}
                    onClick={() => handleSelect(suburb)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition cursor-pointer ${
                      previewSuburb.id === suburb.id
                        ? "bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500/50"
                        : "text-neutral-300 hover:bg-neutral-850"
                    }`}
                  >
                    <span>
                      {suburb.name}, {suburb.city} ({suburb.postalCode})
                    </span>
                    <span className="text-[10px] text-neutral-400">{suburb.province}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Selected Location Coverage Breakdown Card */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-850 gap-2 mb-4">
            <div>
              <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Live Coverage for
              </div>
              <div className="text-lg font-black text-white flex items-center gap-2">
                <span>📍 {previewSuburb.name}</span>
                <span className="text-xs font-bold text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                  {previewSuburb.postalCode}
                </span>
              </div>
              <div className="text-xs text-neutral-400">
                {previewSuburb.city} • {previewSuburb.province} ({previewSuburb.metro})
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-extrabold text-emerald-400">
                {previewSuburb.retailers["sixty60"]?.isAvailable || previewSuburb.retailers["asap"]?.isAvailable
                  ? "60-Min Express Active"
                  : "Standard Delivery Only"}
              </span>
            </div>
          </div>

          {/* Retailers Grid */}
          <div className="space-y-2.5">
            {RETAILER_METADATA.map((meta) => {
              const info = previewSuburb.retailers[meta.id];
              if (!info) return null;

              return (
                <div
                  key={meta.id}
                  className="bg-neutral-900/80 border border-neutral-800/90 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center font-black text-sm text-white shrink-0">
                      {meta.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">{meta.name}</span>
                        {info.isAvailable ? (
                          <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold px-1.5 py-0.2 rounded">
                            {info.serviceType === "express_60min" ? "⚡ 60-Min Express" : info.serviceType === "same_day" ? "🚚 Same-Day" : "📦 Next-Day"}
                          </span>
                        ) : (
                          <span className="bg-neutral-800 text-neutral-400 text-[10px] font-bold px-1.5 py-0.2 rounded">
                            Pickup Only
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-neutral-400 flex items-center gap-2 mt-0.5">
                        <span>Speed: <strong className="text-neutral-200">{info.estimatedTime}</strong></span>
                        <span>•</span>
                        <span>Cutoff: <strong className="text-neutral-200">{info.cutoffTime}</strong></span>
                      </div>
                      {info.hubName && (
                        <div className="text-[10px] text-neutral-500 mt-0.5">
                          Hub: {info.hubName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right sm:self-center shrink-0">
                    <div className="text-xs font-black text-white">
                      {info.deliveryFee === 0 ? (
                        <span className="text-emerald-400 font-bold">FREE</span>
                      ) : (
                        <span>{formatZAR(info.deliveryFee)} fee</span>
                      )}
                    </div>
                    {info.freeThreshold && (
                      <div className="text-[10px] text-emerald-400">
                        Free over {formatZAR(info.freeThreshold)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
          <Button
            variant="outline"
            onClick={closeLocationModal}
            className="border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 text-xs font-bold"
          >
            Cancel
          </Button>

          <Button
            onClick={handleConfirm}
            className="bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-md transition"
          >
            Confirm Location: {previewSuburb.name} ({previewSuburb.postalCode})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
