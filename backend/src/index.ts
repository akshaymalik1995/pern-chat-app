import express from "express"
import authRoutes from "./routes/auth.route"
import messagesRoute from "./routes/messages.route"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { app, server } from "./socket/socket"
import path from "path"
import { Request, Response } from "express"

// Load environment variables from .env file
dotenv.config()

app.use(express.json()) // Middleware for parsing application/json data

app.use(cookieParser()) // Middleware for parsing cookies

app.use("/api/auth", authRoutes) // Mount the auth routes at /api/auth

app.use("/api/messages", messagesRoute) // Mount the messages routes at /api/messages

const PORT = process.env.PORT || 5000 // Define the port number

const __dirname = path.resolve() // Define the current directory

if (process.env.NODE_ENV === "production") { // Check if the environment is production
    app.use(express.static(path.join(__dirname, "../frontend/dist/"))) // Serve the static files from the frontend/dist directory
    app.get("*", (req: Request, res: Response) => { // Route to handle all other requests
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html")) // Send the index.html file
    }
        
    )
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
