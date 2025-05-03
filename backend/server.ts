import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import societyHomeRoutes from './routes/Society/homeRoutes.ts'
import { connectDb } from './database/db.ts';
import { corsMiddleware, corsOptions } from './middlewares/corsMiddlewares.ts';
import { initSocketServer } from './sockets/socket.ts';  // Import the function to initialize socket server
import { redisClient } from './redis.ts'; // Import the Redis client


dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '10mb' })); // Set limit for JSON bodies (10MB)
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); // Set limit for URL-encoded bodies (10MB)

app.use(corsMiddleware);  // Apply CORS middleware
app.options('*', corsMiddleware);  // Handle preflight requests for all routes

connectDb();

app.use('/society', societyHomeRoutes);


redisClient.on('connect', () => {
  console.log('Redis is connected in server.js');
});

// Initialize the socket server by passing the Express app and CORS options
const { server, io } = initSocketServer(app, corsOptions);

// Export the server for listening later
export { server, io };
