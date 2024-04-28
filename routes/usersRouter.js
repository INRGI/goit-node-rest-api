import express from 'express';

import { login, register, logout, current, updateAvatar, verify, verifyAgain } from '../controllers/usersControllers.js';
import validateBody from '../helpers/validateBody.js';
import { registerSchema, loginSchema, emailSchema } from '../schemas/usersSchemas.js';
import { authenticate } from '../helpers/authenticate.js';
import { upload } from '../helpers/uploadAvatar.js';

const authRouter = express.Router();

authRouter.get("/current", authenticate, current);
authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post('/login', validateBody(loginSchema), login);
authRouter.post('/logout', authenticate, logout);
authRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

authRouter.get("/verify/:verificationToken", verify);
authRouter.post("/verify", validateBody(emailSchema), verifyAgain);

export default authRouter;