import express from "express"
import { Router } from "express"
import { register, login, forgotPassword, resetPassword } from "../controllers/authControllers.js";

const routes = Router()

routes.post("/register",register)
routes.post("/login",login)

routes.post("/forgot-password", forgotPassword);
routes.post("/reset-password", resetPassword);


export default routes

