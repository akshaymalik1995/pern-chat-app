import { Request, Response } from 'express';

/**
 * Logout controller function.
 * Clears the JWT cookie and sends a response indicating successful logout.
 * If an error occurs, it logs the error and sends a response with an internal server error status.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
export default async (req: Request, res: Response) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({
            message: "Logout successful"
        });
    } catch (error: any) {
        console.error("Logout error: ", error.message);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}