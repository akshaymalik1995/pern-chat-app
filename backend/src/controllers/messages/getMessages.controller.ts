import { Request, Response } from "express";
import prisma from "../../db/prisma";

// Controller function to get messages for a conversation
export default async (req: Request, res: Response) => {
    try {
        const { id: userToChatId } = req.params; // Get the userToChatId from request parameters
        const { id: userId } = req.user; // Get the userId from authenticated user
        
        // Find the conversation between the two users
        const conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [userId, userToChatId] // Check if the conversation has both userId and userToChatId as participants
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc" // Order messages by createdAt in ascending order
                    },
                    // take: 10 // Limit the number of messages to 10
                }
            }
        });

        

        if (!conversation) {
            // If conversation doesn't exist, return an empty array
            return res.status(200).json({
                data: []
            });
        }

        // Return the messages of the conversation
        res.status(200).json({
            data: conversation.messages
        });

    } catch (error: any) {
        console.error("Get message error: ", error.message);
        // If there's an error, return internal server error
        res.status(500).json({
            error: "Internal server error"
        });
    }
}