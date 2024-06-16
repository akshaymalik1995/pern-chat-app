import { Server } from "socket.io"; // Importing the Server class from the "socket.io" module
import http from "http"; // Importing the "http" module
import express from "express"; // Importing the "express" module
import dotenv from "dotenv"; // Importing the "dotenv" module

const app = express(); // Creating an instance of the Express application
dotenv.config()
export const getReceiverSocketId = (receiverId: string) => {
    // Function to get the socket ID of the receiver user
    return userSockets.get(receiverId); // Returning the socket ID of the receiver user from the userSockets Map
}

const server = http.createServer(app); // Creating an HTTP server using the Express application

const io = new Server(server, { // Creating a new instance of the Socket.IO server
    cors: {
        origin: "*", // Allowing requests from the specified client URL
        methods: ["GET", "POST"], // Allowing only GET and POST methods
    },
});

const userSockets = new Map<string, string>(); // Creating a new Map to store user IDs and socket IDs

io.on("connection", (socket) => { // Event handler for when a client connects to the server
    const userId = socket.handshake.query.userId as string; // Extracting the user ID from the socket handshake query
    console.log(`User connected: ${userId}`); // Logging the user ID to the console
    if (userId) {
        userSockets.set(userId, socket.id); // Storing the user ID and socket ID in the userSockets Map
    }

    io.emit("getOnlineUsers", Array.from(userSockets.keys())); // Emitting the "getOnlineUsers" event to all connected clients with the list of online user IDs

    socket.on("disconnect", () => { // Event handler for when a client disconnects from the server
        userSockets.delete(userId); // Removing the user ID and socket ID from the userSockets Map
        setTimeout(() => {
            io.emit("getOnlineUsers", Array.from(userSockets.keys())); // Emitting the "getOnlineUsers" event to all connected clients with the updated list of online user IDs
        }, 5000); // Delaying the emission of the event to allow the user to reconnect
    });
});

export {app, io, server}; // Exporting the Express application, Socket.IO server, and HTTP server