import { StarFill, StarLine, UserLine } from "@/lib/icons";

export default function Testimonials() {
  const testimonials = [
    {
      rating: 5,
      text: "I saved over $200 on a laptop by using DealHunt! The price comparison was fast and showed me options I wouldn't have found on my own.",
      name: "Michael Thompson",
      title: "Tech Enthusiast"
    },
    {
      rating: 4.5,
      text: "DealHunt is my go-to for weekly grocery shopping. It's helped me cut my monthly grocery bill by almost 15% by finding the best deals in my area.",
      name: "Sarah Jenkins",
      title: "Budget Shopper"
    },
    {
      rating: 4,
      text: "This app is a game-changer for holiday shopping. I was able to find the best prices for gifts for my entire family without visiting dozens of websites.",
      name: "David Rodriguez",
      title: "Parent & Shopper"
    }
  ];

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarFill key={i} className="text-amber-400" />);
      } else if (i - 0.5 === rating) {
        stars.push(<StarFill key={i} className="text-amber-400" />); // Should be half star
      } else {
        stars.push(<StarLine key={i} className="text-amber-400" />);
      }
    }
    return stars;
  };

  return (
    <section className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-neutral-600">{testimonial.rating.toFixed(1)}</span>
              </div>
              <p className="text-neutral-700 mb-4">{testimonial.text}</p>
              <div className="flex items-center">
                <div className="bg-neutral-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <UserLine className="text-neutral-700" />
                </div>
                <div>
                  <h5 className="font-medium">{testimonial.name}</h5>
                  <div className="text-xs text-neutral-500">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
