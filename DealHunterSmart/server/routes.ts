import express, { type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a router for API routes
  const apiRouter = express.Router();
  app.use('/api', apiRouter);

  // Get all products
  apiRouter.get('/products', async (req: Request, res: Response) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products' });
    }
  });

  // Get a specific product by ID
  apiRouter.get('/products/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch product' });
    }
  });

  // Get all categories
  apiRouter.get('/categories', async (req: Request, res: Response) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch categories' });
    }
  });

  // Get a specific category by slug
  apiRouter.get('/categories/:slug', async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch category' });
    }
  });

  // Get all stores
  apiRouter.get('/stores', async (req: Request, res: Response) => {
    try {
      const stores = await storage.getAllStores();
      res.json(stores);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch stores' });
    }
  });

  // Get stores for a specific product
  apiRouter.get('/products/:id/stores', async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.id);
      const stores = await storage.getStoresByProductId(productId);
      res.json(stores);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch stores for product' });
    }
  });

  // Search products
  apiRouter.get('/search', async (req: Request, res: Response) => {
    try {
      const query = (req.query.q as string) || '';
      const category = (req.query.category as string) || '';
      
      const products = await storage.searchProducts(query, category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to search products' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
