"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing the jsonwebtoken library for handling JWTs (JSON Web Tokens)
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId) => {
    // Generating a JWT token with the user's ID
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7 days"
    });
    return token;
};
exports.default = generateToken;
