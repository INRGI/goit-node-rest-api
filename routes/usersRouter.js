import express from 'express';

import { login, register, logout, current } from '../controllers/usersControllers';
import validateBody from '../helpers/validateBody.js';
import { registerSchema, loginSchema } from '../schemas/usersSchemas.js';

const authRouter = express.Router();

authRouter.get("/current", current);
authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post('/login', validateBody(loginSchema), login);
authRouter.post('/logout', logout);

export default authRouter;