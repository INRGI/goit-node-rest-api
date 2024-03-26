import * as contactsServices from "../services/contactsServices.js";
import HttpError from '../helpers/HttpError.js';
import validateBody from '../helpers/validateBody.js';
import { createContactSchema, updateContactSchema } from '../schemas/contactsSchemas.js';

export const getAllContacts = async (req, res, next) => {
    try {
        const result = await contactsServices.listContacts();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsServices.getContactById(id);
        if (!result) {
            throw HttpError(404);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsServices.removeContact(id);
        if (!result) {
            throw HttpError(404);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const result = await contactsServices.addContact(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (Object.keys(req.body).length === 0) {
            throw HttpError(400, "Body must have at least one field");
        }

        const result = await contactsServices.updateContact(id, req.body);
        if (!result) {
            throw HttpError(404);
        }

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};