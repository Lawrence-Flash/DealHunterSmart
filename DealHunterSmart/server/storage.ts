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
  // User operations (from template)
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
        id: this.currentCategoryId++
      };
      this.categories.set(newCategory.slug, newCategory);
    });

    // Add mock products
    mockProducts.forEach(product => {
      const newProduct: Product = {
        ...product,
        id: this.currentProductId++
      };
      this.products.set(newProduct.id, newProduct);
    });

    // Add mock stores
    mockStores.forEach(store => {
      const newStore: Store = {
        ...store,
        id: this.currentStoreId++
      };
      this.stores.set(newStore.id, newStore);
    });
  }

  // User methods (from template)
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
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async searchProducts(query: string, categorySlug?: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => {
      // Filter by category if provided
      const categoryMatch = !categorySlug || product.categorySlug === categorySlug;
      
      // Filter by search query if provided
      const queryMatch = !query || 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());
      
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
    const category: Category = { ...insertCategory, id };
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
      shippingInfo: insertStore.shippingInfo || null 
    };
    this.stores.set(id, store);
    return store;
  }
}

// Export a singleton instance
export const storage = new MemStorage();
