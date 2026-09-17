import { 
  FacebookFill, 
  TwitterFill, 
  InstagramFill, 
  LinkedinFill,
  SendPlaneFill
} from "@/lib/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-14 pb-8 border-t border-neutral-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-base mr-2 shadow-xs">
                ⚡
              </span>
              <span className="font-black text-lg tracking-tight">
                DealHunter<span className="text-emerald-500">Smart</span>
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Empowering South Africans to beat inflation. Real-time price tracking across Checkers Sixty60, Pick n Pay, Takealot, Makro, Amazon SA, Woolworths, and Dis-Chem.
            </p>
            <div className="flex space-x-3 pt-1">
              <a href="#" className="text-neutral-400 hover:text-emerald-400 transition">
                <FacebookFill className="h-4 w-4" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-emerald-400 transition">
                <TwitterFill className="h-4 w-4" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-emerald-400 transition">
                <InstagramFill className="h-4 w-4" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-emerald-400 transition">
                <LinkedinFill className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold text-sm text-white mb-3 uppercase tracking-wider">Top Categories</h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="/search?category=groceries" className="hover:text-emerald-400 transition">Groceries & Braai</Link></li>
              <li><Link href="/search?category=loadshedding" className="hover:text-emerald-400 transition">Load Shedding & Solar</Link></li>
              <li><Link href="/search?category=electronics" className="hover:text-emerald-400 transition">Tech & Electronics</Link></li>
              <li><Link href="/search?category=appliances" className="hover:text-emerald-400 transition">Airfryers & Appliances</Link></li>
              <li><Link href="/search?category=baby-health" className="hover:text-emerald-400 transition">Baby Care & Health</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold text-sm text-white mb-3 uppercase tracking-wider">Featured Retailers</h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>Checkers (Xtra Savings)</li>
              <li>Pick n Pay (Smart Shopper)</li>
              <li>Takealot (Daily Deals)</li>
              <li>Amazon South Africa</li>
              <li>Makro & Game</li>
              <li>Woolworths (WRewards)</li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold text-sm text-white mb-3 uppercase tracking-wider">Weekly Deal Alerts</h5>
            <p className="text-neutral-400 text-xs leading-relaxed mb-3">
              Get the top 5 South African grocery and tech specials sent straight to your inbox.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-neutral-800 border-neutral-700 text-white text-xs rounded-r-none focus:ring-emerald-500 h-9"
              />
              <Button 
                type="submit" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-l-none h-9 px-3"
              >
                <SendPlaneFill className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-neutral-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} DealHunterSmart South Africa. All rights reserved.
          </div>
          <div className="mt-2 sm:mt-0 flex gap-4 text-[11px]">
            <span>Made with 🇿🇦 for South African Shoppers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}