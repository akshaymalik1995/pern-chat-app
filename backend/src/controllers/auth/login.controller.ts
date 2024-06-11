import { Request, Response } from 'express';
import prisma from "../../db/prisma";
import bcrypt from "bcryptjs";
import generateToken from '../../utils/generateToken';
import addTokenToCookie from '../../utils/addTokenToCookie';


/**
 * Handles the login functionality.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response indicating the success or failure of the login attempt.
 */
export default async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            // Return error response if username or password is missing
            return res.status(400).json({
                error: "Please fill in all fields"
            });
        }


        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            // Return error response if user is not found
            return res.status(400).json({
                error: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // Return error response if password is incorrect
            return res.status(400).json({
                error: "Invalid credentials"
            });
        }

        const token = generateToken(user.id)


        addTokenToCookie(res, token);

        return res.status(200).json({
            message: "Login successful",
            data: {
                id: user.id,
                fullname: user.fullname,
                username: user.username,
                profilePic: user.profilePic
            }
        });


    } catch (error: any) {
        console.log("Error in login controller", error.message)
        // Return error response for any other errors
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}