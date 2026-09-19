import React, { useState } from "react";
import { Link } from "wouter";
import { useDelivery } from "@/lib/deliveryContext";
import { ALL_SUBURBS, RETAILER_METADATA, SuburbLocation } from "@/lib/deliveryData";
import { formatZAR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function DeliveryChecker() {
  const { currentSuburb, setSuburb, openLocationModal } = useDelivery();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSub, setSelectedSub] = useState<SuburbLocation>(currentSuburb);

  const filteredSuburbs = ALL_SUBURBS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.postalCode.includes(searchQuery) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (sub: SuburbLocation) => {
    setSelectedSub(sub);
    setSuburb(sub);
  };

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8 pb-6 border-b border-neutral-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-xs font-black uppercase tracking-wider mb-2">
            <span>🇿🇦 Option C: South African Retail Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <span>🚚 Suburb Delivery Availability & Fee Calculator</span>
          </h1>
          <p className="text-neutral-400 text-sm mt-2 max-w-3xl">
            Compare 60-minute express coverage, delivery fees, order cut-off times, and distribution hubs across Checkers Sixty60, Pick n Pay asap!, Woolworths Dash, Takealot, Amazon.co.za, and Makro for your exact neighborhood.
          </p>
        </div>

        {/* Suburb Search & Quick Select Bar */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5 block">
                Select Your Suburb or Enter 4-Digit Postal Code:
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="e.g. 2196, Sandton, Sea Point, Umhlanga, Centurion, Soweto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-neutral-950 border-neutral-800 text-white rounded-xl px-4 py-2.5 text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 md:pt-5">
              <Button
                onClick={openLocationModal}
                className="bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                📍 Change Location Modal
              </Button>
            </div>
          </div>

          {/* Quick Metro Chips */}
          <div className="mt-4 pt-4 border-t border-neutral-800/80">
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Quick Select Metros:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ALL_SUBURBS.slice(0, 8).map((sub) => {
                const isActive = selectedSub.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => handleSelect(sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                      isActive
                        ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                        : "bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white"
                    }`}
                  >
                    {sub.name} ({sub.postalCode})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search match dropdown list */}
          {searchQuery.trim().length > 0 && (
            <div className="mt-3 bg-neutral-950 border border-neutral-800 rounded-xl p-3 max-h-48 overflow-y-auto">
              {filteredSuburbs.length === 0 ? (
                <div className="text-xs text-neutral-500 py-2 text-center">
                  No matching suburbs found for "{searchQuery}". Try a postal code or city.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {filteredSuburbs.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        handleSelect(sub);
                        setSearchQuery("");
                      }}
                      className={`text-left p-2 rounded-lg text-xs border transition cursor-pointer ${
                        selectedSub.id === sub.id
                          ? "bg-emerald-950 text-emerald-300 border-emerald-500/60 font-bold"
                          : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700"
                      }`}
                    >
                      <div className="font-bold">{sub.name} ({sub.postalCode})</div>
                      <div className="text-[10px] text-neutral-400">{sub.city}, {sub.province}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Active Suburb Status Banner */}
        <div className="bg-gradient-to-r from-emerald-950/60 via-neutral-900 to-neutral-900 border border-emerald-500/30 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active Coverage Analysis</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              📍 {selectedSub.name}, {selectedSub.city} ({selectedSub.postalCode})
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Province: <strong className="text-neutral-200">{selectedSub.province}</strong> • Municipality: <strong className="text-neutral-200">{selectedSub.metro}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/basket">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-black text-xs px-4 py-2 rounded-xl shadow-sm">
                🛒 Test Grocery Basket Total
              </Button>
            </Link>
            <Link href="/search?category=groceries">
              <Button variant="outline" className="border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 text-xs font-bold">
                Browse Deals in {selectedSub.name}
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Retailer Cards Grid */}
        <div className="mb-10">
          <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
            <span>⚡ Retailer Delivery Status & Rates for {selectedSub.name}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RETAILER_METADATA.map((meta) => {
              const info = selectedSub.retailers[meta.id];
              if (!info) return null;

              return (
                <Card
                  key={meta.id}
                  className="bg-neutral-900 border-neutral-800 hover:border-emerald-500/40 transition-all rounded-2xl overflow-hidden shadow-md flex flex-col justify-between"
                >
                  <CardContent className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="text-xs font-bold text-neutral-400">{meta.badge}</div>
                        <div className="text-base font-black text-white tracking-tight">{meta.name}</div>
                      </div>
                      {info.isAvailable ? (
                        <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          Available
                        </span>
                      ) : (
                        <span className="bg-red-950 text-red-400 border border-red-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          Limited / Collect
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-neutral-400 mb-4 line-clamp-2">
                      {meta.tagline}
                    </p>

                    {/* Delivery Details */}
                    <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-3 space-y-2 mb-4 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Delivery Speed:</span>
                        <strong className="text-emerald-400 font-extrabold">{info.estimatedTime}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Standard Delivery Fee:</span>
                        <strong className="text-white font-black">
                          {info.deliveryFee === 0 ? "FREE" : formatZAR(info.deliveryFee)}
                        </strong>
                      </div>
                      {info.freeThreshold && (
                        <div className="flex items-center justify-between text-emerald-400 font-bold text-[11px]">
                          <span>Free Delivery Over:</span>
                          <span>{formatZAR(info.freeThreshold)}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Today's Order Cut-Off:</span>
                        <strong className="text-amber-400 font-bold">{info.cutoffTime}</strong>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-neutral-500">Operating Hours:</span>
                        <span className="text-neutral-300">{info.operatingHours}</span>
                      </div>
                    </div>

                    {/* Fulfillment Hub */}
                    <div className="text-[11px] text-neutral-400 bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-850/80">
                      <div className="text-neutral-500 font-bold text-[10px] uppercase">Nearest Distribution Hub:</div>
                      <div className="text-neutral-200 font-semibold mt-0.5">{info.hubName}</div>
                      {info.notes && (
                        <div className="text-emerald-400/90 text-[10px] mt-1">{info.notes}</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-10 shadow-xl overflow-x-auto">
          <h3 className="text-lg font-black text-white mb-2">
            📊 South African Retail Delivery Specs At A Glance
          </h3>
          <p className="text-xs text-neutral-400 mb-4">
            Comparison of standard rates, free delivery thresholds, loyalty cards, and operating rules.
          </p>

          <table className="w-full text-left text-xs border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-3">Service</th>
                <th className="py-3 px-3">Delivery Model</th>
                <th className="py-3 px-3">Base Fee</th>
                <th className="py-3 px-3">Free Threshold</th>
                <th className="py-3 px-3">Cut-off Time</th>
                <th className="py-3 px-3">Loyalty Program</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
              <tr>
                <td className="py-3 px-3 font-bold text-teal-400">Checkers Sixty60</td>
                <td className="py-3 px-3">⚡ 60-Minute On-Demand</td>
                <td className="py-3 px-3 font-bold">R 35.00</td>
                <td className="py-3 px-3 text-neutral-400">Flat rate</td>
                <td className="py-3 px-3">20:00</td>
                <td className="py-3 px-3 font-semibold text-emerald-400">Xtra Savings</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-red-400">Pick n Pay asap!</td>
                <td className="py-3 px-3">⚡ 60-Minute On-Demand</td>
                <td className="py-3 px-3 font-bold">R 35.00</td>
                <td className="py-3 px-3 text-neutral-400">Promotional only</td>
                <td className="py-3 px-3">19:45</td>
                <td className="py-3 px-3 font-semibold text-emerald-400">Smart Shopper</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-neutral-100">Woolworths Dash</td>
                <td className="py-3 px-3">🚚 Same-Day Express</td>
                <td className="py-3 px-3 font-bold">R 35.00</td>
                <td className="py-3 px-3 text-neutral-400">First order free</td>
                <td className="py-3 px-3">19:00</td>
                <td className="py-3 px-3 font-semibold text-emerald-400">WRewards</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-blue-400">Takealot</td>
                <td className="py-3 px-3">📦 Next-Day / Standard</td>
                <td className="py-3 px-3 font-bold">R 65.00</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Free over R 500</td>
                <td className="py-3 px-3">23:59</td>
                <td className="py-3 px-3 text-neutral-400">None</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-amber-400">Amazon.co.za</td>
                <td className="py-3 px-3">🚚 Next-Day / 2-Day</td>
                <td className="py-3 px-3 font-bold">R 65.00</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Free over R 500</td>
                <td className="py-3 px-3">22:00</td>
                <td className="py-3 px-3 text-neutral-400">Prime (Upcoming)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-blue-300">Makro</td>
                <td className="py-3 px-3">🏬 Bulk Courier / Collect</td>
                <td className="py-3 px-3 font-bold">R 70.00</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Free Click & Collect</td>
                <td className="py-3 px-3">17:00</td>
                <td className="py-3 px-3 font-semibold text-emerald-400">mCard</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-emerald-400">Dis-Chem DeliverD</td>
                <td className="py-3 px-3">💊 60-Minute Health</td>
                <td className="py-3 px-3 font-bold">R 35.00</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Free over R 500</td>
                <td className="py-3 px-3">18:30</td>
                <td className="py-3 px-3 font-semibold text-emerald-400">Benefit Card</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* South African Delivery FAQs & Local Insights */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-black text-white mb-4">
            🇿🇦 South African On-Demand Delivery FAQs & Tips
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-neutral-950 border border-neutral-850 p-4 rounded-xl">
              <div className="font-bold text-emerald-400 mb-1">
                ⚡ Why does Sixty60 & asap! charge a flat R35 delivery fee?
              </div>
              <p className="text-neutral-300 leading-relaxed">
                South African on-demand grocery apps use a dedicated motorcycle driver fleet with temperature-controlled thermal cooler boxes. The flat R35 fee covers immediate dispatch from your nearest neighborhood dark store or supermarket branch within 60 minutes.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-850 p-4 rounded-xl">
              <div className="font-bold text-emerald-400 mb-1">
                💡 Do delivery apps still run during Loadshedding?
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Yes. Checkers, Pick n Pay, and Woolworths supermarkets are equipped with backup generators, solar inverters, and offline checkout terminals. Deliveries continue during Stage 1–6 loadshedding, though heavy traffic during peak load shedding hours may add 10–15 minutes.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-850 p-4 rounded-xl">
              <div className="font-bold text-emerald-400 mb-1">
                📦 How do Takealot Pickup Points save you money?
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Takealot operates over 100 dedicated Pickup Points across South Africa. If your order is between R450 and R500, delivery to a Pickup Point is completely free, compared to R65 standard courier home delivery.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-850 p-4 rounded-xl">
              <div className="font-bold text-emerald-400 mb-1">
                🛵 How much should you tip your driver in South Africa?
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Standard tipping courtesy in South Africa for Sixty60, asap!, and Dash drivers is between R20.00 and R35.00, especially during rainy weather or evening night runs. You can tip directly in the app or hand cash upon arrival.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
