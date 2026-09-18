import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@shared/schema";

export interface PriceAlert {
  id: string;
  productId: number;
  productName: string;
  targetPrice: number;
  currentLowestPrice: number;
  channel: "whatsapp" | "email" | "browser";
  contact: string; // WhatsApp number or email
  createdAt: string;
  isTriggered: boolean;
}

interface WishlistContextType {
  wishlist: Product[];
  alerts: PriceAlert[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (product: Product) => boolean;
  addAlert: (alert: Omit<PriceAlert, "id" | "createdAt" | "isTriggered">) => void;
  removeAlert: (alertId: string) => void;
  getAlertForProduct: (productId: number) => PriceAlert | undefined;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = "dealhunter_wishlist_v1";
const ALERTS_STORAGE_KEY = "dealhunter_alerts_v1";

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [alerts, setAlerts] = useState<PriceAlert[]>(() => {
    try {
      const saved = localStorage.getItem(ALERTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts));
    } catch (e) {
      console.error("Failed to save alerts to localStorage", e);
    }
  }, [alerts]);

  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      if (prev.some(p => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(p => p.id === productId);
  };

  const toggleWishlist = (product: Product): boolean => {
    const exists = wishlist.some(p => p.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
      return false;
    } else {
      addToWishlist(product);
      return true;
    }
  };

  const addAlert = (alertData: Omit<PriceAlert, "id" | "createdAt" | "isTriggered">) => {
    const newAlert: PriceAlert = {
      ...alertData,
      id: `alert_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      isTriggered: alertData.currentLowestPrice <= alertData.targetPrice,
    };

    setAlerts(prev => {
      // Replace existing alert for this product or append
      const filtered = prev.filter(a => a.productId !== alertData.productId);
      return [...filtered, newAlert];
    });

    // Also send to backend
    fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAlert),
    }).catch(err => console.error("Error persisting alert to server:", err));
  };

  const removeAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const getAlertForProduct = (productId: number) => {
    return alerts.find(a => a.productId === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        alerts,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        addAlert,
        removeAlert,
        getAlertForProduct,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
