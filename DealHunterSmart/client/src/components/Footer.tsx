import { 
  PriceTag3Fill, 
  FacebookFill, 
  TwitterFill, 
  InstagramFill, 
  LinkedinFill,
  SendPlaneFill
} from "@/lib/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-primary-500 text-2xl mr-2">
                <PriceTag3Fill />
              </span>
              <span className="font-bold text-xl">
                Deal<span className="text-primary-500">Hunt</span>
              </span>
            </div>
            <p className="text-neutral-400 mb-4">
              Smart price comparison to help you shop smarter and save more.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary-500 transition">
                <FacebookFill className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary-500 transition">
                <TwitterFill className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary-500 transition">
                <InstagramFill className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary-500 transition">
                <LinkedinFill className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold text-lg mb-4">Company</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition">About Us</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition">How It Works</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition">Careers</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition">Press</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-lg mb-4">Support</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition">FAQs</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-lg mb-4">Stay Updated</h5>
            <p className="text-neutral-400 mb-4">Subscribe to our newsletter for the latest deals and updates.</p>
            <form className="flex">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-neutral-700 text-white rounded-r-none focus:ring-primary-500"
              />
              <Button 
                type="submit" 
                className="bg-primary-500 hover:bg-primary-600 text-white rounded-l-none"
              >
                <SendPlaneFill className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-10 pt-6 text-center text-neutral-500 text-sm">
          &copy; 2023 DealHunt. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
