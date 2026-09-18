import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BasketProvider } from "@/lib/basketContext";
import { WishlistProvider } from "@/lib/wishlistContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import SearchResults from "@/pages/SearchResults";
import ProductDetail from "@/pages/ProductDetail";
import Basket from "@/pages/Basket";
import Wishlist from "@/pages/Wishlist";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/search" component={SearchResults} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/basket" component={Basket} />
        <Route path="/wishlist" component={Wishlist} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BasketProvider>
        <WishlistProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </WishlistProvider>
      </BasketProvider>
    </QueryClientProvider>
  );
}

export default App;
