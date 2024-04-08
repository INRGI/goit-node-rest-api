import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    phone: Joi.string().min(3).required(),
    favorite: Joi.boolean().default(false),
})

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().min(3),
    phone: Joi.string().min(3),
    favorite: Joi.boolean(),
})

export const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});