import { Router } from "express";
import { register, login } from "../controllers/authenticationControllers";

export const routes = Router()

routes.post('register', register)
routes.post('login', login)