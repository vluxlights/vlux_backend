import express from "express"
import { Router } from "express"
import { register,login } from "../controllers/authControllers.js"


const routes = Router()

routes.post("/register",register)
routes.post("/login",login)


export default routes

