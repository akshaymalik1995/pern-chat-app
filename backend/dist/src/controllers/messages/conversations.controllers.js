"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../db/prisma"));
/**
 * Controller function to get the list of active chat users for the authenticated user.
 * @param req - The request object containing user information.
 * @param res - The response object to send the active chat users.
 */
exports.default = async (req, res) => {
    try {
        const { id: userId } = req.user; // Get the userId from authenticated user
        // Find all the users with whom the authenticated user has an active conversation
        const users = await prisma_1.default.conversation.findMany({
            where: {
                participantIds: {
                    has: userId // Check if the conversation has userId as a participant
                }
            },
            select: {
                participantIds: true,
            }
        });
        // If there are no users, return an empty array
        if (!users.length) {
            return res.status(200).json({
                data: []
            });
        }
        // Extract the participantIds from the users
        const participantIds = users.map(user => user.participantIds).flat();
        // Find the active chat users
        const activeChatUserIds = participantIds.filter(id => id !== userId);
        const activeChatUsers = await prisma_1.default.user.findMany({
            where: {
                id: {
                    in: activeChatUserIds
                }
            },
            select: {
                id: true,
                username: true,
                profilePic: true,
                fullname: true
            }
        });
        // Return the active chat users
        res.status(200).json({
            data: activeChatUsers
        });
    }
    catch (error) {
        console.error("Get message error: ", error.message);
        // If there's an error, return internal server error
        res.status(500).json({
            error: "Internal server error"
        });
    }
};
