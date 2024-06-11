// Importing the jsonwebtoken library for handling JWTs (JSON Web Tokens)
import jwt from "jsonwebtoken"

import { Response } from "express"

const generateToken = (userId: string) => {
    // Generating a JWT token with the user's ID
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: "7 days"
    })

    return token
}

export default generateToken