import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import societyHomeRoutes from './routes/Society/homeRoutes'
import societyAuthRoutes from './routes/Society/authRoutes'
import companyAuthRoutes from './routes/Company/authRoutes'
import { connectDb } from './database/db';
import { corsMiddleware, corsOptions } from './middlewares/corsMiddlewares';
import { initSocketServer } from './sockets/socket';  // Import the function to initialize socket server
// import { redisClient } from './redis.ts'; // Import the Redis client


dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '10mb' })); // Set limit for JSON bodies (10MB)
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); // Set limit for URL-encoded bodies (10MB)

app.use(corsMiddleware);  // Apply CORS middleware
app.options('*', corsMiddleware);  // Handle preflight requests for all routes

connectDb();

app.use('/society', societyHomeRoutes);
app.use('/society/auth', societyAuthRoutes);
app.use('/company/auth', companyAuthRoutes);


// redisClient.on('connect', () => {
//   console.log('Redis is connected in server.js');
// });

// Initialize the socket server by passing the Express app and CORS options
const { server, io } = initSocketServer(app, corsOptions);

// Debug: Log all registered routes
(app._router?.stack || []).forEach((middleware: any) => {
  if (middleware.route) {
    // This is a route middleware
    const method = Object.keys(middleware.route.methods)[0].toUpperCase();
    const path = middleware.route.path;
    console.log(`ROUTE: [${method}] ${path}`);
  } else if (middleware.name === 'router') {
    // This is a router middleware with multiple routes
    middleware.handle.stack.forEach((handler: any) => {
      const method = Object.keys(handler.route.methods)[0].toUpperCase();
      const path = handler.route.path;
      console.log(`ROUTE (router): [${method}] ${path}`);
    });
  }
});

// Export the server for listening later
export { server, io };
