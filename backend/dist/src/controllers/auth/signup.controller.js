"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../db/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../../utils/generateToken"));
const addTokenToCookie_1 = __importDefault(require("../../utils/addTokenToCookie"));
exports.default = async (req, res) => {
    try {
        // Destructure the request body to get user details
        const { fullname, username, password, confirmPassword, gender } = req.body;
        console.log(req.body);
        // Check if all required fields are provided
        if (!fullname || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({
                error: "Please fill in all fields"
            });
        }
        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({
                error: "Passwords don't match"
            });
        }
        // Check if the username already exists in the database
        const user = await prisma_1.default.user.findUnique({
            where: { username }
        });
        if (user) {
            return res.status(400).json({
                error: "Username already exists"
            });
        }
        // Generate a salt and hash the password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // Define profile picture URLs based on gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        // Create a new user in the database
        const newUser = await prisma_1.default.user.create({
            data: {
                fullname,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === "male" ? boyProfilePic : girlProfilePic
            }
        });
        // If user creation is successful, return the user data
        if (newUser) {
            const token = (0, generateToken_1.default)(newUser.id);
            // Setting the token as a cookie in the response
            (0, addTokenToCookie_1.default)(res, token);
            res.status(201).json({
                data: {
                    id: newUser.id,
                    fullName: newUser.fullname,
                    username: newUser.username,
                    profilePic: newUser.profilePic
                },
                message: "User successfully created."
            });
        }
        else {
            // If user creation fails, return an error
            res.status(400).json({
                error: "Invalid user data"
            });
        }
    }
    catch (error) {
        // Log the error and return a server error response
        console.log("ERROR in signup controller", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};
