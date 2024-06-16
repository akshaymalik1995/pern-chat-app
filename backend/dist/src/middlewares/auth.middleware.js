"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../db/prisma"));
exports.default = async (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).json({
                error: "Invalid token"
            });
        }
        const user = await prisma_1.default.user.findUnique({
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
    }
    catch (error) {
        // Return an error response if the token is invalid
        return res.status(400).json({
            error: "Invalid token"
        });
    }
};
