import Header from "./Header";
import Footer from "./Footer";
import MobileNavigation from "./MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-800">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      {isMobile && <MobileNavigation />}
    </div>
  );
}
