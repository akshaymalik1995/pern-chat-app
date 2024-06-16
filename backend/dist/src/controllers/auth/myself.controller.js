"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../db/prisma"));
exports.default = async (req, res) => {
    try {
        const user = await prisma_1.default.user.findUnique({
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
    }
    catch (error) {
        console.error("Get current user error: ", error.message);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};
