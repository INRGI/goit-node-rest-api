import express from 'express';

import { login, register, logout, current } from '../controllers/usersControllers.js';
import validateBody from '../helpers/validateBody.js';
import { registerSchema, loginSchema } from '../schemas/usersSchemas.js';
import { authenticate } from '../helpers/authenticate.js';

const authRouter = express.Router();

authRouter.get("/current", authenticate, current);
authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post('/login', validateBody(loginSchema), login);
authRouter.post('/logout', authenticate, logout);

export default authRouter;