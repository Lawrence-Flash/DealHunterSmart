import { 
  User, 
  InsertUser, 
  Category, 
  InsertCategory, 
  Product, 
  InsertProduct, 
  Store, 
  InsertStore 
} from "@shared/schema";
import { mockProducts, mockCategories, mockStores } from "./data/mockData";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  searchProducts(query: string, categorySlug?: string): Promise<Product[]>;
  
  // Category operations
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Store operations
  getAllStores(): Promise<Store[]>;
  getStoresByProductId(productId: number): Promise<Store[]>;
  createStore(store: InsertStore): Promise<Store>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private categories: Map<string, Category>;
  private stores: Map<number, Store>;
  
  private currentUserId: number;
  private currentProductId: number;
  private currentCategoryId: number;
  private currentStoreId: number;

  constructor() {
    // Initialize collections
    this.users = new Map();
    this.products = new Map();
    this.categories = new Map();
    this.stores = new Map();
    
    // Initialize IDs
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentCategoryId = 1;
    this.currentStoreId = 1;
    
    // Initialize with mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    // Add mock categories
    mockCategories.forEach(category => {
      const newCategory: Category = {
        ...category,
        id: this.currentCategoryId++,
        icon: (category as any).icon ?? null,
      };
      this.categories.set(newCategory.slug, newCategory);
    });

    // Add mock products
    mockProducts.forEach(product => {
      const newProduct: Product = {
        ...product,
        id: this.currentProductId++,
        brand: (product as any).brand ?? null,
        unit: (product as any).unit ?? null,
      };
      this.products.set(newProduct.id, newProduct);
    });

    // Add mock stores
    mockStores.forEach(store => {
      const newStore: Store = {
        ...store,
        id: this.currentStoreId++,
        loyaltyPrice: store.loyaltyPrice ?? null,
        loyaltyProgram: store.loyaltyProgram ?? null,
        shippingInfo: store.shippingInfo ?? null,
        deliverySpeed: store.deliverySpeed ?? null,
        productUrl: store.productUrl ?? null,
        inStock: store.inStock ?? true,
      };
      this.stores.set(newStore.id, newStore);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id,
      brand: insertProduct.brand ?? null,
      unit: insertProduct.unit ?? null,
    };
    this.products.set(id, product);
    return product;
  }

  async searchProducts(query: string, categorySlug?: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => {
      const categoryMatch = !categorySlug || product.categorySlug === categorySlug;
      const q = query.toLowerCase();
      const queryMatch = !query || 
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        (product.brand && product.brand.toLowerCase().includes(q));
      
      return categoryMatch && queryMatch;
    });
  }

  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return this.categories.get(slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { 
      ...insertCategory, 
      id,
      icon: insertCategory.icon ?? null,
    };
    this.categories.set(category.slug, category);
    return category;
  }

  // Store methods
  async getAllStores(): Promise<Store[]> {
    return Array.from(this.stores.values());
  }

  async getStoresByProductId(productId: number): Promise<Store[]> {
    return Array.from(this.stores.values()).filter(
      store => store.productId === productId
    );
  }

  async createStore(insertStore: InsertStore): Promise<Store> {
    const id = this.currentStoreId++;
    const store: Store = { 
      ...insertStore, 
      id,
      loyaltyPrice: insertStore.loyaltyPrice ?? null,
      loyaltyProgram: insertStore.loyaltyProgram ?? null,
      shippingInfo: insertStore.shippingInfo ?? null,
      deliverySpeed: insertStore.deliverySpeed ?? null,
      productUrl: insertStore.productUrl ?? null,
      inStock: insertStore.inStock ?? true,
    };
    this.stores.set(id, store);
    return store;
  }
}

// Export singleton
export const storage = new MemStorage();