import { Request, Response } from 'express';
import prisma from "../../db/prisma";
import bcrypt from "bcryptjs";
import generateToken from '../../utils/generateToken';
import addTokenToCookie from '../../utils/addTokenToCookie';

export default async (req: Request, res: Response) => {
    try {
        // Destructure the request body to get user details
        const { fullname, username, password, confirmPassword, gender } = req.body;
        console.log(req.body)
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
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (user) {
            return res.status(400).json({
                error: "Username already exists"
            });
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Define profile picture URLs based on gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create a new user in the database
        const newUser = await prisma.user.create({
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

            const token = generateToken(newUser.id)

            // Setting the token as a cookie in the response
            addTokenToCookie(res, token);

            res.status(201).json({
                data: {
                    id: newUser.id,
                    fullName: newUser.fullname,
                    username: newUser.username,
                    profilePic: newUser.profilePic
                },
                message: "User successfully created."
            });
        } else {
            // If user creation fails, return an error
            res.status(400).json({
                error: "Invalid user data"
            });
        }

    } catch (error: any) {
        // Log the error and return a server error response
        console.log("ERROR in signup controller", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};
