"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const sendMessage_controller_1 = __importDefault(require("../controllers/messages/sendMessage.controller"));
const getMessages_controller_1 = __importDefault(require("../controllers/messages/getMessages.controller"));
const conversations_controllers_1 = __importDefault(require("../controllers/messages/conversations.controllers"));
const router = express_1.default.Router();
router.post("/send/:id", auth_middleware_1.default, sendMessage_controller_1.default);
router.get("/conversations", auth_middleware_1.default, conversations_controllers_1.default);
router.get("/:id", auth_middleware_1.default, getMessages_controller_1.default);
exports.default = router;
