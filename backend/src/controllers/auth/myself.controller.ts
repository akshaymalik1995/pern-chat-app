import prisma from "../../db/prisma";
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
        });

        if (!user) {
            return res.status(400).json({
                error: "User not found"
            });
        }

        res.status(200).json({
            data: {
                id: user.id,
                fullname: user.fullname,
                username: user.username,
                profilePic: user.profilePic
            }
        });

    } catch (error: any) {
        console.error("Get current user error: ", error.message);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}