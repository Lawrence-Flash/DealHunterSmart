import express, { type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { processAIChat } from "./aiAssistant";
import { liveStoreScraper } from "./services/liveStoreScraper";

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

  // AI Deal Assistant endpoint
  apiRouter.post('/ai/chat', async (req: Request, res: Response) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ message: 'A valid text message is required.' });
      }

      const response = await processAIChat(message, history);
      res.json(response);
    } catch (error) {
      console.error('Error in /api/ai/chat:', error);
      res.status(500).json({ message: 'Failed to process AI chat request' });
    }
  });

  // Live Store Scraper endpoints
  apiRouter.get('/live-sync/status', (req: Request, res: Response) => {
    res.json(liveStoreScraper.getStatus());
  });

  apiRouter.post('/live-sync/all', async (req: Request, res: Response) => {
    try {
      const results = await liveStoreScraper.syncAllLive();
      res.json({
        message: 'Live sync completed across all connected South African retailers',
        totalProductsSynced: results.length,
        results
      });
    } catch (error) {
      console.error('Error in /api/live-sync/all:', error);
      res.status(500).json({ message: 'Failed to complete live store synchronization' });
    }
  });

  apiRouter.post('/live-sync/:productId', async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.productId);
      const result = await liveStoreScraper.syncProductLive(productId);
      if (!result) {
        return res.status(404).json({ message: 'Product not found for live sync' });
      }
      res.json(result);
    } catch (error) {
      console.error(`Error in /api/live-sync/${req.params.productId}:`, error);
      res.status(500).json({ message: 'Failed to sync product with live retailer catalogs' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
