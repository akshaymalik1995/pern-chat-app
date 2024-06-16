"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.io = exports.app = exports.getReceiverSocketId = void 0;
const socket_io_1 = require("socket.io"); // Importing the Server class from the "socket.io" module
const http_1 = __importDefault(require("http")); // Importing the "http" module
const express_1 = __importDefault(require("express")); // Importing the "express" module
const app = (0, express_1.default)(); // Creating an instance of the Express application
exports.app = app;
const getReceiverSocketId = (receiverId) => {
    // Function to get the socket ID of the receiver user
    return userSockets.get(receiverId); // Returning the socket ID of the receiver user from the userSockets Map
};
exports.getReceiverSocketId = getReceiverSocketId;
const server = http_1.default.createServer(app); // Creating an HTTP server using the Express application
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // Allowing requests from the specified client URL
        methods: ["GET", "POST"], // Allowing only GET and POST methods
    },
});
exports.io = io;
const userSockets = new Map(); // Creating a new Map to store user IDs and socket IDs
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId; // Extracting the user ID from the socket handshake query
    console.log(`User connected: ${userId}`); // Logging the user ID to the console
    if (userId) {
        userSockets.set(userId, socket.id); // Storing the user ID and socket ID in the userSockets Map
    }
    io.emit("getOnlineUsers", Array.from(userSockets.keys())); // Emitting the "getOnlineUsers" event to all connected clients with the list of online user IDs
    socket.on("disconnect", () => {
        userSockets.delete(userId); // Removing the user ID and socket ID from the userSockets Map
        setTimeout(() => {
            io.emit("getOnlineUsers", Array.from(userSockets.keys())); // Emitting the "getOnlineUsers" event to all connected clients with the updated list of online user IDs
        }, 5000); // Delaying the emission of the event to allow the user to reconnect
    });
});
