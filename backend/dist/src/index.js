"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const messages_route_1 = __importDefault(require("./routes/messages.route"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_1 = require("./socket/socket");
const path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config();
socket_1.app.use(express_1.default.json()); // Middleware for parsing application/json data
socket_1.app.use((0, cookie_parser_1.default)()); // Middleware for parsing cookies
socket_1.app.use("/api/auth", auth_route_1.default); // Mount the auth routes at /api/auth
socket_1.app.use("/api/messages", messages_route_1.default); // Mount the messages routes at /api/messages
const PORT = process.env.PORT || 5000; // Define the port number
const dirname = path_1.default.resolve(); // Define the current directory
if (process.env.NODE_ENV === "production") { // Check if the environment is production
    socket_1.app.use(express_1.default.static(path_1.default.join(dirname, "../frontend/dist/"))); // Serve the static files from the frontend/dist directory
    socket_1.app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(dirname, "frontend", "dist", "index.html")); // Send the index.html file
    });
}
socket_1.server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
