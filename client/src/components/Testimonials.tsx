import { StarFill, StarLine } from "@/lib/icons";

export default function Testimonials() {
  const testimonials = [
    {
      rating: 5,
      text: "Saved R 450 on a Gizzu mini UPS router battery. Was about to buy it on Takealot until DealHunterSmart showed me Amazon SA had it on promo with free delivery.",
      name: "Sipho Khumalo",
      title: "Sandton, Johannesburg"
    },
    {
      rating: 5,
      text: "DealHunterSmart is essential for our monthly family grocery run. Comparing Checkers Sixty60 and Pick n Pay asap! saves us over R 1,200 every month on pantry essentials.",
      name: "Nadia van der Merwe",
      title: "Centurion, Pretoria"
    },
    {
      rating: 4.5,
      text: "Bought a 55\" Samsung 4K TV and Philips Airfryer. The dual-pricing feature that showed Makro''s mCard price vs Takealot made the decision super easy. Kept R 800 in my pocket.",
      name: "Thabo Molefe",
      title: "Umhlanga, Durban"
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarFill key={i} className="text-amber-400 h-4 w-4" />);
      } else {
        stars.push(<StarLine key={i} className="text-neutral-600 h-4 w-4" />);
      }
    }
    return stars;
  };

  return (
    <section className="py-16 bg-neutral-950 border-t border-neutral-850">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
            Community Love
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Loved by Smart South African Shoppers
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-neutral-900/80 p-6 rounded-2xl border border-neutral-800 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition">
              <div>
                <div className="flex items-center mb-3">
                  <div className="flex mr-2">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="text-neutral-400 text-xs font-bold">{testimonial.rating.toFixed(1)}</span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-5 italic">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="flex items-center pt-3 border-t border-neutral-800">
                <div className="bg-emerald-950 text-emerald-400 border border-emerald-800/80 rounded-full w-9 h-9 flex items-center justify-center font-bold text-xs mr-3 shrink-0">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h5 className="font-bold text-white text-xs">{testimonial.name}</h5>
                  <div className="text-[11px] text-neutral-400">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}