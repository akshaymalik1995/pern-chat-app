"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (res, token) => {
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days   
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });
};
