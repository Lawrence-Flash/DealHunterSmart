import { AppleFill, GooglePlayFill } from "@/lib/icons";
import { Button } from "@/components/ui/button";

export default function CTADownload() {
  return (
    <section className="py-12 bg-gradient-to-r from-primary-600 to-secondary-700 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Saving?</h2>
            <p className="text-white/90 mb-6">
              Download the DealHunt app today and never overpay again. Available for iOS and Android devices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-black hover:bg-neutral-800 text-white py-3 px-6 h-auto"
              >
                <AppleFill className="h-6 w-6 mr-2" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-medium">App Store</div>
                </div>
              </Button>
              <Button 
                className="bg-black hover:bg-neutral-800 text-white py-3 px-6 h-auto"
              >
                <GooglePlayFill className="h-6 w-6 mr-2" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-medium">Google Play</div>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-8">
            <img 
              src="https://images.unsplash.com/photo-1543269664-7eef42226a21?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="DealHunt mobile app being used in a store" 
              className="rounded-xl shadow-xl w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
