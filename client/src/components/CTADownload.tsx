import { AppleFill, GooglePlayFill } from "@/lib/icons";
import { Button } from "@/components/ui/button";

export default function CTADownload() {
  return (
    <section className="py-16 bg-gradient-to-br from-emerald-950 via-neutral-950 to-neutral-900 text-white relative overflow-hidden border-t border-neutral-850">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2">
              Save on the Go
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight text-white">
              Get DealHunterSmart on Your Phone
            </h2>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6 max-w-lg">
              Compare prices while standing in the aisle at Checkers or Pick n Pay, scan barcodes, and receive instant WhatsApp alerts when your favourite products drop in price.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                className="bg-neutral-900 hover:bg-neutral-800 text-white py-2.5 px-5 h-auto rounded-xl border border-neutral-700 shadow-lg"
              >
                <AppleFill className="h-5 w-5 mr-2 text-white" />
                <div className="text-left">
                  <div className="text-[10px] text-neutral-400 leading-none">Download on the</div>
                  <div className="font-bold text-xs leading-tight">App Store</div>
                </div>
              </Button>
              <Button 
                className="bg-neutral-900 hover:bg-neutral-800 text-white py-2.5 px-5 h-auto rounded-xl border border-neutral-700 shadow-lg"
              >
                <GooglePlayFill className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="text-[10px] text-neutral-400 leading-none">Get it on</div>
                  <div className="font-bold text-xs leading-tight">Google Play</div>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 max-w-sm">
              <img 
                src="https://images.unsplash.com/photo-1543269664-7eef42226a21?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Shopper using DealHunterSmart in South Africa" 
                className="w-full h-64 object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-5">
                <div className="text-xs text-neutral-200 font-medium">
                  Scan any till slip or flyer to instantly find cheaper alternatives nearby.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}