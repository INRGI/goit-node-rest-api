import express from 'express';

import { login, register, logout, current, updateAvatar } from '../controllers/usersControllers.js';
import validateBody from '../helpers/validateBody.js';
import { registerSchema, loginSchema } from '../schemas/usersSchemas.js';
import { authenticate } from '../helpers/authenticate.js';
import { upload } from '../helpers/uploadAvatar.js';

const authRouter = express.Router();

authRouter.get("/current", authenticate, current);
authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post('/login', validateBody(loginSchema), login);
authRouter.post('/logout', authenticate, logout);
authRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

export default authRouter;