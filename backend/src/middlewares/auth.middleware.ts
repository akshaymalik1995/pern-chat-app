
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma';

interface DecodedToken extends jwt.JwtPayload {
    userId: string;
}

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
            };
        }
    }
}



export default async (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the cookie
    const token = req.cookies.jwt;

    // If no token is found in the header, return an error response
    if (!token) {
        return res.status(401).json({
            error: "Access denied. No token provided"
        });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        if (!decoded) {
            return res.status(400).json({
                error: "Invalid token"
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true
            }
        });

        if (!user) {
            return res.status(400).json({
                error: "Invalid token"
            });
        }

        req.user = user;

        next();
    } catch (error: any) {
        // Return an error response if the token is invalid
        return res.status(400).json({
            error: "Invalid token"
        });
    }
}   