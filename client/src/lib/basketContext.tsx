import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Store } from "@shared/schema";
import { SuburbLocation } from "./deliveryData";

export interface BasketItem {
  product: Product;
  quantity: number;
}

export interface StoreBasketComparison {
  storeName: string;
  itemsAvailable: number;
  totalItems: number;
  subtotal: number;
  loyaltySavings: number;
  deliveryFee: number;
  finalTotal: number;
  isComplete: boolean;
  missingProducts: string[];
  isDeliveryAvailable: boolean;
  deliverySpeed: string;
  deliveryNote?: string;
}

export interface SmartSplitResult {
  store1: string;
  store2: string;
  store1Items: { name: string; price: number; store: string }[];
  store2Items: { name: string; price: number; store: string }[];
  store1Total: number;
  store2Total: number;
  combinedDeliveryFees: number;
  totalWithDelivery: number;
  singleCheapestTotal: number;
  extraSavings: number;
}

interface BasketContextType {
  items: BasketItem[];
  totalCount: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  clearBasket: () => void;
  computeStoreComparisons: (allStores: Store[], suburb?: SuburbLocation) => StoreBasketComparison[];
  computeSmartSplit: (allStores: Store[], suburb?: SuburbLocation) => SmartSplitResult | null;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

const STORAGE_KEY = "dealhunter_smart_basket";

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save basket to localStorage", e);
    }
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is BasketItem => item !== null)
    );
  };

  const clearBasket = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  /**
   * Computes totals across popular South African retailers for current basket items,
   * factoring in destination suburb delivery availability and fee rules.
   */
  const computeStoreComparisons = (allStores: Store[], suburb?: SuburbLocation): StoreBasketComparison[] => {
    if (items.length === 0) return [];

    const targetRetailers = [
      { name: "Checkers Sixty60", key: "sixty60", fallbackFee: 35.0, defaultSpeed: "45 - 60 mins" },
      { name: "Pick n Pay asap!", key: "asap", fallbackFee: 35.0, defaultSpeed: "40 - 55 mins" },
      { name: "Woolworths Dash", key: "dash", fallbackFee: 35.0, defaultSpeed: "Same-Day / 60 mins" },
      { name: "Takealot", key: "takealot", fallbackFee: 65.0, defaultSpeed: "Next-Day Delivery" },
      { name: "Makro", key: "makro", fallbackFee: 70.0, defaultSpeed: "2 - 3 business days" },
    ];

    return targetRetailers.map((retailer) => {
      let subtotal = 0;
      let loyaltySavings = 0;
      let itemsAvailable = 0;
      const missingProducts: string[] = [];

      items.forEach((item) => {
        const storeMatch = allStores.find(
          (s) => s.productId === item.product.id && s.name.toLowerCase().includes(retailer.name.toLowerCase().split(' ')[0])
        );

        if (storeMatch) {
          itemsAvailable++;
          const regPrice = storeMatch.price * item.quantity;
          const effectivePrice = (storeMatch.loyaltyPrice ?? storeMatch.price) * item.quantity;
          subtotal += effectivePrice;
          loyaltySavings += Math.max(0, regPrice - effectivePrice);
        } else {
          missingProducts.push(item.product.name);
        }
      });

      // Suburb delivery lookup
      const retailerInfo = suburb?.retailers[retailer.key];
      const isDeliveryAvailable = retailerInfo ? retailerInfo.isAvailable : true;
      const deliverySpeed = retailerInfo ? retailerInfo.estimatedTime : retailer.defaultSpeed;
      const deliveryNote = retailerInfo?.notes;

      let deliveryFee = retailerInfo ? retailerInfo.deliveryFee : retailer.fallbackFee;
      
      // Threshold rules (e.g. Takealot free over R500)
      if (retailer.key === "takealot") {
        if (subtotal >= 500) {
          deliveryFee = 0.0;
        } else if (subtotal > 0) {
          deliveryFee = 65.0;
        }
      }

      return {
        storeName: retailer.name,
        itemsAvailable,
        totalItems: items.length,
        subtotal,
        loyaltySavings,
        deliveryFee: itemsAvailable > 0 && isDeliveryAvailable ? deliveryFee : 0,
        finalTotal: itemsAvailable > 0 ? subtotal + (isDeliveryAvailable ? deliveryFee : 0) : 0,
        isComplete: itemsAvailable === items.length,
        missingProducts,
        isDeliveryAvailable,
        deliverySpeed,
        deliveryNote,
      };
    }).sort((a, b) => {
      // Prioritize stores that have all items, then available delivery, then lowest final total
      if (a.isComplete && !b.isComplete) return -1;
      if (!a.isComplete && b.isComplete) return 1;
      if (a.isDeliveryAvailable && !b.isDeliveryAvailable) return -1;
      if (!a.isDeliveryAvailable && b.isDeliveryAvailable) return 1;
      return a.finalTotal - b.finalTotal;
    });
  };

  /**
   * Computes optimal 2-store split (e.g. Checkers Sixty60 + Pick n Pay asap!)
   */
  const computeSmartSplit = (allStores: Store[], suburb?: SuburbLocation): SmartSplitResult | null => {
    if (items.length < 2) return null;

    const store1Name = "Checkers Sixty60";
    const store2Name = "Pick n Pay asap!";

    const store1Items: { name: string; price: number; store: string }[] = [];
    const store2Items: { name: string; price: number; store: string }[] = [];

    let store1Total = 0;
    let store2Total = 0;

    items.forEach((item) => {
      const match1 = allStores.find(
        (s) => s.productId === item.product.id && s.name.includes("Checkers")
      );
      const match2 = allStores.find(
        (s) => s.productId === item.product.id && s.name.includes("Pick n Pay")
      );

      const price1 = match1 ? (match1.loyaltyPrice ?? match1.price) * item.quantity : 999999;
      const price2 = match2 ? (match2.loyaltyPrice ?? match2.price) * item.quantity : 999999;

      if (price1 <= price2 && match1) {
        store1Items.push({ name: item.product.name, price: price1, store: store1Name });
        store1Total += price1;
      } else if (match2) {
        store2Items.push({ name: item.product.name, price: price2, store: store2Name });
        store2Total += price2;
      } else if (match1) {
        store1Items.push({ name: item.product.name, price: price1, store: store1Name });
        store1Total += price1;
      }
    });

    if (store1Items.length === 0 || store2Items.length === 0) {
      return null;
    }

    const fee1 = suburb?.retailers["sixty60"]?.deliveryFee ?? 35.0;
    const fee2 = suburb?.retailers["asap"]?.deliveryFee ?? 35.0;
    const combinedDeliveryFees = fee1 + fee2;
    const totalWithDelivery = store1Total + store2Total + combinedDeliveryFees;

    // Single store comparisons
    const comparisons = computeStoreComparisons(allStores, suburb);
    const completeComparisons = comparisons.filter((c) => c.isComplete && c.isDeliveryAvailable);
    if (completeComparisons.length === 0) return null;

    const singleCheapest = completeComparisons[0].finalTotal;
    const extraSavings = singleCheapest - totalWithDelivery;

    return {
      store1: store1Name,
      store2: store2Name,
      store1Items,
      store2Items,
      store1Total,
      store2Total,
      combinedDeliveryFees,
      totalWithDelivery,
      singleCheapestTotal: singleCheapest,
      extraSavings,
    };
  };

  return (
    <BasketContext.Provider
      value={{
        items,
        totalCount,
        addItem,
        removeItem,
        updateQuantity,
        clearBasket,
        computeStoreComparisons,
        computeSmartSplit,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
}
