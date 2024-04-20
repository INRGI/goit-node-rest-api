import HttpError from '../helpers/HttpError.js';
import { createContactSchema, updateContactSchema } from '../schemas/contactsSchemas.js';
import { Contact } from '../models/contactModels.js';

export const getAllContacts = async (req, res, next) => {
    try {
      const { _id: owner } = req.user;
       
      const result = await Contact.find({owner});
      res.json(result);
    } catch (error) {
      next(error)
    }
};

export const getOneContact = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { _id: owner } = req.user;
      
      const result = await Contact.findOne({ _id: id }).where("owner").equals(owner);
      
      if (!result) throw HttpError(404);
      
        res.json(result);
    } catch (error) {
        next(error)
    }
};

export const deleteContact = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { _id: owner } = req.user;
      
      const result = await Contact.findByIdAndDelete(id).where("owner").equals(owner);
      if (!result) throw HttpError(404);
        
      res.json({
        message:'Delete success', result
      })
    } catch (error) {
        next(error)
    }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);
    
    const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result)

    } catch (error) {
        next(error)
    }
};

export const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }
      const { id } = req.params;
      const { _id: owner } = req.user;
      const result = await Contact.findByIdAndUpdate(id, req.body, { new: true }).where("owner").equals(owner);
      if (!result) throw HttpError(400, "Not Found")
        
      res.json(result);
    } catch (error) {
        next(error)
    }
};


export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const { error } = updateContactSchema.validate(req.body);

    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    if (error) throw HttpError(400, error.message);
    
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true }).where("owner").equals(owner);
    if (!result) throw HttpError(400, "Not Found")
        
    res.json(result);
  } catch (error) {
    next(error);
  }
};