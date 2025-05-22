import { Product, Category, Store } from "@shared/schema";

// Mock categories data
export const mockCategories: Omit<Category, "id">[] = [
  {
    name: "Groceries",
    slug: "groceries"
  },
  {
    name: "Electronics",
    slug: "electronics"
  },
  {
    name: "Home Goods",
    slug: "home-goods"
  },
  {
    name: "Fashion",
    slug: "fashion"
  },
  {
    name: "Toys",
    slug: "toys"
  }
];

// Mock products data
export const mockProducts: Omit<Product, "id">[] = [
  {
    name: "Wireless Earbuds Pro 2",
    description: "Premium wireless earbuds with noise cancellation and 24-hour battery life",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    categorySlug: "electronics",
    features: ["Noise Cancellation", "24-hour Battery", "Water Resistant", "Bluetooth 5.2"]
  },
  {
    name: "Smart Coffee Maker",
    description: "Wi-Fi enabled coffee machine with scheduled brewing and temperature control",
    imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    categorySlug: "home-goods",
    features: ["Wi-Fi Enabled", "Scheduled Brewing", "Temperature Control", "10-cup Capacity"]
  },
  {
    name: "Galaxy S23 Ultra",
    description: "Latest flagship smartphone with 108MP camera and 6.8\" display",
    imageUrl: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    categorySlug: "electronics",
    features: ["108MP Camera", "6.8\" AMOLED Display", "5G", "8K Video Recording"]
  },
  {
    name: "Ultra 4K Smart TV 55-inch",
    description: "Premium 4K resolution smart TV with HDR support, built-in streaming apps, and voice control",
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    categorySlug: "electronics",
    features: ["4K Resolution", "Smart TV", "HDR", "Voice Control", "120Hz Refresh Rate"]
  },
  {
    name: "Organic Grocery Box",
    description: "Weekly box of fresh, organic produce and groceries delivered to your door",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    categorySlug: "groceries",
    features: ["Organic", "Locally Sourced", "Weekly Delivery", "Seasonal Produce"]
  },
  {
    name: "Smart Home Security System",
    description: "Complete home security system with cameras, motion sensors, and smartphone control",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055e2dae1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    categorySlug: "home-goods",
    features: ["HD Cameras", "Motion Detection", "Smartphone App", "Cloud Storage", "24/7 Monitoring"]
  }
];

// Mock stores data
export const mockStores: Omit<Store, "id">[] = [
  // Stores for Wireless Earbuds Pro 2
  {
    name: "ElectroMart",
    productId: 1,
    price: 199.99,
    shippingInfo: "Free shipping"
  },
  {
    name: "TechZone",
    productId: 1,
    price: 169.99,
    shippingInfo: "Free shipping, 30-day returns"
  },
  {
    name: "ValueTech",
    productId: 1,
    price: 149.99,
    shippingInfo: "$4.99 shipping, extended warranty available"
  },
  
  // Stores for Smart Coffee Maker
  {
    name: "HomeStore",
    productId: 2,
    price: 129.99,
    shippingInfo: "Free shipping on orders over $50"
  },
  {
    name: "KitchenPlus",
    productId: 2,
    price: 119.95,
    shippingInfo: "Free shipping, 14-day returns"
  },
  {
    name: "SuperMarket",
    productId: 2,
    price: 106.49,
    shippingInfo: "$5.99 shipping"
  },
  
  // Stores for Galaxy S23 Ultra
  {
    name: "MobileMasters",
    productId: 3,
    price: 1199.99,
    shippingInfo: "Free shipping, 30-day returns"
  },
  {
    name: "PhoneWorld",
    productId: 3,
    price: 1099.99,
    shippingInfo: "Free shipping, 14-day returns"
  },
  {
    name: "TechDeals",
    productId: 3,
    price: 959.99,
    shippingInfo: "Free shipping, extended warranty available"
  },
  
  // Stores for Ultra 4K Smart TV 55-inch
  {
    name: "ElectroCity",
    productId: 4,
    price: 649.99,
    shippingInfo: "Free shipping over $50"
  },
  {
    name: "BigBox Electronics",
    productId: 4,
    price: 579.99,
    shippingInfo: "Free shipping, 30-day returns"
  },
  {
    name: "TechWarehouse",
    productId: 4,
    price: 529.99,
    shippingInfo: "$9.99 shipping, extended warranty available"
  },
  {
    name: "SuperDeals",
    productId: 4,
    price: 499.99,
    shippingInfo: "Free shipping, 14-day returns"
  },
  
  // Stores for Organic Grocery Box
  {
    name: "FreshMarket",
    productId: 5,
    price: 89.99,
    shippingInfo: "Free delivery"
  },
  {
    name: "OrganicDirect",
    productId: 5,
    price: 79.99,
    shippingInfo: "Free delivery, subscription available"
  },
  {
    name: "GreenGrocer",
    productId: 5,
    price: 74.99,
    shippingInfo: "$4.99 delivery fee"
  },
  
  // Stores for Smart Home Security System
  {
    name: "SafeHome",
    productId: 6,
    price: 349.99,
    shippingInfo: "Free shipping, professional installation available"
  },
  {
    name: "SecurityPlus",
    productId: 6,
    price: 329.99,
    shippingInfo: "Free shipping, 30-day returns"
  },
  {
    name: "SmartLiving",
    productId: 6,
    price: 299.99,
    shippingInfo: "Free shipping, 24/7 customer support"
  }
];
