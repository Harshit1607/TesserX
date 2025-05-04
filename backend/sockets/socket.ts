import { Server } from 'socket.io';
import * as http from 'http';
import { Express } from 'express';
import { CorsOptions } from 'cors';

let io: Server;

// Export the io instance and server for use in other files
export const initSocketServer = (app: Express, corsOptions: CorsOptions) => {
  const server = http.createServer(app);  // Create HTTP server from Express app
  
  io = new Server(server, {
    pingTimeout: 100000, // Timeout if no ping received within 100 seconds
    cors: corsOptions,  // Apply CORS options for sockets
  });
  
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('disconnect', async () => {
      console.log('Socket disconnected:', socket.id);
    });
  });

  return { server, io };
};

export const getIo = (): Server => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};