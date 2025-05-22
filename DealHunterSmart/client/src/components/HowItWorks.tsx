import { SearchLine, Scales3Line, MoneyDollarCircleLine } from "@/lib/icons";

export default function HowItWorks() {
  const steps = [
    {
      icon: <SearchLine className="text-primary-500 text-2xl" />,
      title: "Search Products",
      description: "Enter what you're looking for and we'll find it across multiple stores.",
      bgColor: "bg-primary-100",
    },
    {
      icon: <Scales3Line className="text-secondary-500 text-2xl" />,
      title: "Compare Prices",
      description: "We instantly compare prices from different retailers to find the best deals.",
      bgColor: "bg-secondary-100",
    },
    {
      icon: <MoneyDollarCircleLine className="text-accent-500 text-2xl" />,
      title: "Save Money",
      description: "Choose the best deal and save both time and money on your purchases.",
      bgColor: "bg-accent-100",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How DealHunt Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-neutral-50">
              <div className={`${step.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-neutral-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
