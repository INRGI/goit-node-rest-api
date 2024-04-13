import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config/';

import HttpError from '../helpers/HttpError.js';
import { User } from '../models/userModels.js'; 


const { SECRET_KEY } = process.env;

export const register = () => { };

export const login = () => { };

export const logout = () => { };

export const current = () => { };

