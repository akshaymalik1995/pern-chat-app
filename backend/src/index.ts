import express from "express"
import authRoutes from "./routes/auth.route"
import messagesRoute from "./routes/messages.route"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"


// Load environment variables from .env file
dotenv.config()

// Create an instance of the express application
const app = express()

app.use(express.json()) // For parsing application/json data

app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messagesRoute)



app.listen(5000, () => {
    console.log("Server is running on port 5000  ")
})