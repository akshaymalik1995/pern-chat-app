import express from "express"
import loginController from "../controllers/auth/login.controller"
import signupController from "../controllers/auth/signup.controller"
import logoutController from "../controllers/auth/logout.controller"
import myselfController from "../controllers/auth/myself.controller"
import authMiddleware from "../middlewares/auth.middleware"

const router = express.Router()

router.post("/login", loginController)

router.post("/logout", logoutController)

router.post("/signup", signupController)

router.get("/myself", authMiddleware, myselfController)

export default router