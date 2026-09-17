# DealHunt - Price Comparison App

## Overview

DealHunt is a web application that helps users compare product prices across different stores to save money. The application allows users to search for products, browse by categories, view detailed price comparisons, and find the best deals. The system includes a product database, store information, and price comparison functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture:

1. **Frontend**: React application with Tailwind CSS for styling and shadcn/ui component library
2. **Backend**: Express.js API server
3. **Database**: PostgreSQL with Drizzle ORM
4. **State Management**: React Query for server state management
5. **Routing**: Wouter for frontend routing

The application is structured as a monorepo with shared code between client and server. The server provides a REST API that the client consumes.

### Key Design Decisions

- **Monorepo Structure**: The application is organized with server and client directories, with shared types and schemas in a shared directory.
- **API-First Design**: The backend exposes a RESTful API with endpoints for products, categories, and stores.
- **Responsive Design**: The UI is designed to work on both mobile and desktop devices with appropriate navigation patterns.
- **Database ORM**: Drizzle ORM is used for database access with schema validation via Zod.

## Key Components

### Frontend

1. **Pages**:
   - `Home.tsx`: Landing page with featured products, testimonials, and explanation of how the service works
   - `SearchResults.tsx`: Displays filtered product search results
   - `ProductDetail.tsx`: Shows detailed information for a specific product with price comparisons
   - `NotFound.tsx`: 404 page

2. **Components**:
   - `Layout.tsx`: Main layout wrapper with header, footer, and mobile navigation
   - `SearchBar.tsx`: Search input for finding products
   - `ProductCard.tsx`: Card component for displaying product information
   - `PriceComparison.tsx`: Component for comparing prices across different stores
   - `CategoryFilter.tsx`: Filtering interface for product categories
   - UI Components: Extensive component library from shadcn/ui

3. **State Management**:
   - React Query for data fetching and caching
   - Custom hooks for UI state (e.g., `useIsMobile`)

### Backend

1. **API Routes**:
   - `/api/products`: Get all products or specific product by ID
   - `/api/categories`: Get all categories or specific category by slug
   - (Additional endpoints for user authentication and stores)

2. **Data Layer**:
   - `schema.ts`: Database schema definitions using Drizzle ORM
   - `storage.ts`: Interface and implementation for data storage operations

3. **Server Configuration**:
   - Express middleware for logging, error handling
   - Vite integration for development

## Data Flow

1. **Data Fetching**:
   - Client components use React Query to fetch data from API endpoints
   - API endpoints retrieve data from the database via the storage layer
   - Mock data is currently used for development

2. **User Interactions**:
   - User searches for products or browses categories
   - Results are filtered on the server and returned to the client
   - Product details show price comparisons across stores

3. **Rendering**:
   - Server responds with JSON data
   - Client renders the UI using React components
   - Responsive layout adapts to different screen sizes

## External Dependencies

### Frontend
- React for UI rendering
- Wouter for routing
- React Query for data fetching
- Tailwind CSS for styling
- shadcn/ui components (based on Radix UI primitives)

### Backend
- Express.js for the API server
- Drizzle ORM for database access
- Zod for schema validation
- Vite for development and production builds

## Deployment Strategy

The application is configured for deployment on Replit:

1. **Development**:
   - `npm run dev` starts the development server
   - Vite provides hot module reloading
   - API calls are proxied to the Express server

2. **Production Build**:
   - `npm run build` bundles the client-side assets and compiles the server
   - Vite builds the client-side code
   - esbuild bundles the server-side code

3. **Production Deployment**:
   - `npm run start` runs the compiled server in production mode
   - Static assets are served from the `dist/public` directory
   - The application is configured for autoscaling on Replit

### Database Setup

The application is designed to work with PostgreSQL. The Drizzle ORM configuration is set up to use the `DATABASE_URL` environment variable. The schema includes tables for users, products, categories, and stores.

### Considerations

1. **Environment Variables**:
   - `DATABASE_URL`: Required for database connection
   - `NODE_ENV`: Used to determine development/production mode

2. **Missing Features to Implement**:
   - User authentication and account management
   - Product searching functionality
   - Store data and pricing integrations
   - Admin interface for managing products and stores

3. **Potential Enhancements**:
   - Real-time price updates
   - User saved favorites
   - Price history tracking
   - Mobile app integration (as alluded to in the UI)