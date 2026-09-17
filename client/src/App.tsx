import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BasketProvider } from "@/lib/basketContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import SearchResults from "@/pages/SearchResults";
import ProductDetail from "@/pages/ProductDetail";
import Basket from "@/pages/Basket";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/search" component={SearchResults} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/basket" component={Basket} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BasketProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </BasketProvider>
    </QueryClientProvider>
  );
}

export default App;