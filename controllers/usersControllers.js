import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import gravatar from 'gravatar';
import fs from "fs/promises";
import path from "path";

import HttpError from '../helpers/HttpError.js';
import { User } from '../models/userModels.js'; 
import Jimp from 'jimp';
import { nanoid } from 'nanoid';
import { sendEmail } from '../helpers/sendEmail.js';


const { SECRET_KEY } = process.env;

export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) throw HttpError(409, "Email in use");

        const hashPassword = await bcrypt.hash(password, 8);
        
        const verifyToken = nanoid();

        const avatar = gravatar.url(email);
        const newUser = await User.create({
            ...req.body,
            password: hashPassword,
            avatarURL: avatar,
            verificationToken: verifyToken
        });

        const verifyEmail = {
            to: email,
            subject: "Verification Token",
            html: `
                <h2>Hello here your verification Token</h2>
                <a href="${req.protocol}://${req.get('host')}/users/verify/${verifyToken}">Click here to verify your account</a>
            `
        };

        sendEmail(verifyEmail);

        res.status(201).json(
            {
                "users": {
                    email: newUser.email,
                    subscription: newUser.subscription,
                }
            }
        );
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) throw HttpError(401, "Email or password is wrong");

        const chechPassword = await bcrypt.compare(password, user.password);
        if (!chechPassword) throw HttpError(401, "Email or password is wrong");

        const payload = { id: user._id };

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });

        await User.findOneAndUpdate(user._id, { token });

        res.json({
            token,
            "users": {
                email: user.email,
                subscription: user.subscription,
            }
        })
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const user = await User.findOneAndUpdate(_id, { token: "" });
        if (!user) throw HttpError(401);
        
        throw HttpError(204);
        
    } catch (error) {
        next(error);
    }
};

export const current = async (req, res, next) => {
    try {
        const { email, subscription } = req.user;

        const user = await User.findOne({ email });
        if (!user) throw HttpError(401);

        res.json({
            email,
            subscription,
        })
    } catch (error) {
        next(error)
    }
};

const avatarsPath = path.resolve("public", "avatars");


export const updateAvatar = async (req, res, next) => {
    try {
        const { _id } = req.user;

        if (!req.file || !req.file.path) {
            throw HttpError(400);
        }

        const { path: oldPath, filename } = req.file;

        Jimp.read(oldPath, (err, lenna) => {
            if (err) throw HttpError(401);
            lenna
                .resize(250, 250)
                .write(`${avatarsPath}\\${filename}`);
            fs.rm(oldPath);
        })

        const avatarURL = path.join("avatars", filename);
        
        const user = await User.findByIdAndUpdate(_id, { avatarURL });
        if (!user) throw HttpError(401);
        
        return res.json({ avatarURL });
    } catch (error) {
        next(error);
    }
};

