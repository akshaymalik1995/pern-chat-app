"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../db/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../../utils/generateToken"));
const addTokenToCookie_1 = __importDefault(require("../../utils/addTokenToCookie"));
/**
 * Handles the login functionality.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response indicating the success or failure of the login attempt.
 */
exports.default = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            // Return error response if username or password is missing
            return res.status(400).json({
                error: "Please fill in all fields"
            });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { username }
        });
        if (!user) {
            // Return error response if user is not found
            return res.status(400).json({
                error: "Invalid credentials"
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            // Return error response if password is incorrect
            return res.status(400).json({
                error: "Invalid credentials"
            });
        }
        const token = (0, generateToken_1.default)(user.id);
        (0, addTokenToCookie_1.default)(res, token);
        return res.status(200).json({
            message: "Login successful",
            data: {
                id: user.id,
                fullname: user.fullname,
                username: user.username,
                profilePic: user.profilePic
            }
        });
    }
    catch (error) {
        console.log("Error in login controller", error.message);
        // Return error response for any other errors
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};
