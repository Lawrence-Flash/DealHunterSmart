import { SearchLine, Scales3Line } from "@/lib/icons";

export default function HowItWorks() {
  const steps = [
    {
      icon: <SearchLine className="text-emerald-600 text-2xl h-6 w-6" />,
      title: "1. Search Any SA Product",
      description: "Search groceries, braai packs, backup power, airfryers, or tech. We track prices across Checkers, Pick n Pay, Takealot, Makro & Amazon SA.",
      bgColor: "bg-emerald-100",
    },
    {
      icon: <Scales3Line className="text-teal-600 text-2xl h-6 w-6" />,
      title: "2. Compare Loyalty & Delivery",
      description: "We factor in Checkers Xtra Savings, PnP Smart Shopper, and WRewards discounts, plus Sixty60 and asap! delivery fees.",
      bgColor: "bg-teal-100",
    },
    {
      icon: <span className="text-amber-600 text-2xl font-black">R</span>,
      title: "3. Save More Rands Every Run",
      description: "Pick the verified cheapest option, click straight to the retailer or app, and save hundreds of Rands every single week.",
      bgColor: "bg-amber-100",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
            Simple & Transparent
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight">
            How DealHunterSmart Works
          </h2>
          <p className="text-neutral-500 text-sm mt-2">
            No gimmicks, no paywalls. Just pure price transparency for South African shoppers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-7 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 hover:shadow-md transition-shadow">
              <div className={`${step.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-2xs`}>
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2.5">{step.title}</h3>
              <p className="text-neutral-600 text-xs leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}