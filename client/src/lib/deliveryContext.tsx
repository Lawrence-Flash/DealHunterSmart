import React, { createContext, useContext, useState, useEffect } from "react";
import { SuburbLocation, RetailerDeliveryInfo, ALL_SUBURBS, POPULAR_SUBURBS } from "./deliveryData";

interface DeliveryContextType {
  currentSuburb: SuburbLocation;
  allSuburbs: SuburbLocation[];
  popularSuburbs: SuburbLocation[];
  isLocationModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;
  setSuburb: (suburb: SuburbLocation) => void;
  setSuburbById: (suburbId: string) => void;
  getRetailerCoverage: (storeName: string) => RetailerDeliveryInfo | null;
  hasExpressDelivery: boolean;
  filterByDelivery: boolean;
  setFilterByDelivery: (val: boolean) => void;
}

const STORAGE_KEY = "dealhunter_smart_suburb";
const DEFAULT_SUBURB = ALL_SUBURBS[0]; // Sandton 2196

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export function DeliveryProvider({ children }: { children: React.ReactNode }) {
  const [currentSuburb, setCurrentSuburb] = useState<SuburbLocation>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const match = ALL_SUBURBS.find((s) => s.id === parsed.id || s.postalCode === parsed.postalCode);
        if (match) return match;
      }
    } catch (e) {
      console.error("Failed to read delivery suburb from localStorage", e);
    }
    return DEFAULT_SUBURB;
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [filterByDelivery, setFilterByDelivery] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentSuburb));
    } catch (e) {
      console.error("Failed to save delivery suburb to localStorage", e);
    }
  }, [currentSuburb]);

  const openLocationModal = () => setIsLocationModalOpen(true);
  const closeModal = () => setIsLocationModalOpen(false);

  const setSuburb = (suburb: SuburbLocation) => {
    setCurrentSuburb(suburb);
    setIsLocationModalOpen(false);
  };

  const setSuburbById = (suburbId: string) => {
    const found = ALL_SUBURBS.find((s) => s.id === suburbId);
    if (found) {
      setSuburb(found);
    }
  };

  /**
   * Matches a store name (e.g. "Checkers Sixty60", "Woolworths", "Takealot")
   * to the active suburb's delivery capability.
   */
  const getRetailerCoverage = (storeName: string): RetailerDeliveryInfo | null => {
    const s = storeName.toLowerCase();
    const r = currentSuburb.retailers;

    if (s.includes("checkers") || s.includes("sixty60")) {
      return r["sixty60"] || null;
    }
    if (s.includes("pick n pay") || s.includes("pnp") || s.includes("asap")) {
      return r["asap"] || null;
    }
    if (s.includes("woolworths") || s.includes("woolies") || s.includes("dash")) {
      return r["dash"] || null;
    }
    if (s.includes("takealot")) {
      return r["takealot"] || null;
    }
    if (s.includes("amazon")) {
      return r["amazon"] || null;
    }
    if (s.includes("makro")) {
      return r["makro"] || null;
    }
    if (s.includes("dischem") || s.includes("dis-chem")) {
      return r["dischem"] || null;
    }

    return null;
  };

  const hasExpressDelivery = Boolean(
    currentSuburb.retailers["sixty60"]?.isAvailable ||
    currentSuburb.retailers["asap"]?.isAvailable
  );

  return (
    <DeliveryContext.Provider
      value={{
        currentSuburb,
        allSuburbs: ALL_SUBURBS,
        popularSuburbs: POPULAR_SUBURBS,
        isLocationModalOpen,
        openLocationModal,
        closeLocationModal: closeModal,
        setSuburb,
        setSuburbById,
        getRetailerCoverage,
        hasExpressDelivery,
        filterByDelivery,
        setFilterByDelivery,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error("useDelivery must be used within a DeliveryProvider");
  }
  return context;
}
