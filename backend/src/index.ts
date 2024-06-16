import express from "express"
import authRoutes from "./routes/auth.route"
import messagesRoute from "./routes/messages.route"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import {app, server} from "./socket/socket"

// Load environment variables from .env file
dotenv.config()

app.use(express.json()) // Middleware for parsing application/json data

app.use(cookieParser()) // Middleware for parsing cookies

app.use("/api/auth", authRoutes) // Mount the auth routes at /api/auth

app.use("/api/messages", messagesRoute) // Mount the messages routes at /api/messages

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
