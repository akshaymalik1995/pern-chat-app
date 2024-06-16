"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing the Prisma client from the local database configuration file
const prisma_1 = __importDefault(require("../../db/prisma"));
const socket_1 = require("../../socket/socket");
// Exporting the default function which is an asynchronous function that takes a request and a response
exports.default = async (req, res) => {
    try {
        // Extracting the text property from the request body
        const { message } = req.body;
        // If there is no text in the request body, return a 400 status code with an error message
        if (!message) {
            return res.status(400).json({
                error: "Please provide a message"
            });
        }
        // Extracting the id property from the request parameters and renaming it to receiverId
        const { id: receiverId } = req.params;
        // Getting the sender's id from the request user object
        const senderId = req.user.id;
        // Finding the first conversation that includes both the sender and receiver
        let conversation = await prisma_1.default.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, receiverId]
                }
            }
        });
        // If no such conversation exists, create a new one with the sender and receiver as participants
        if (!conversation) {
            conversation = await prisma_1.default.conversation.create({
                data: {
                    participantIds: {
                        set: [senderId, receiverId]
                    }
                }
            });
        }
        // Create a new message with the text from the request body, the sender's id, and the conversation id
        const newMessage = await prisma_1.default.message.create({
            data: {
                body: message,
                senderId,
                conversationId: conversation.id
            }
        });
        // If the new message was successfully created, update the conversation to include the new message
        if (newMessage) {
            conversation = await prisma_1.default.conversation.update({
                where: {
                    id: conversation.id
                },
                data: {
                    messages: {
                        connect: {
                            id: newMessage.id
                        }
                    }
                }
            });
        }
        const receiverSocketId = (0, socket_1.getReceiverSocketId)(receiverId); // Get the receiver's socket ID
        // If the receiver is online, emit a 'newMessage' event to the receiver with the new message data
        if (receiverSocketId) {
            socket_1.io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        // Return a 201 status code with a success message and the new message data
        res.status(201).json({
            message: "Message sent",
            data: newMessage
        });
        // If there was an error at any point in the try block, catch it
    }
    catch (error) {
        // Log the error message to the console
        console.error("Send message error: ", error.message);
        // Return a 500 status code with an error message
        res.status(500).json({
            error: "Internal server error"
        });
    }
};
