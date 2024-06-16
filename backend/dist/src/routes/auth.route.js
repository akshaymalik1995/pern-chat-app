"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controller_1 = __importDefault(require("../controllers/auth/login.controller"));
const signup_controller_1 = __importDefault(require("../controllers/auth/signup.controller"));
const logout_controller_1 = __importDefault(require("../controllers/auth/logout.controller"));
const myself_controller_1 = __importDefault(require("../controllers/auth/myself.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post("/login", login_controller_1.default);
router.post("/logout", logout_controller_1.default);
router.post("/signup", signup_controller_1.default);
router.get("/myself", auth_middleware_1.default, myself_controller_1.default);
exports.default = router;
