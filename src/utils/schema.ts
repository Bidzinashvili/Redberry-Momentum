import Joi from "joi";

export const schema = Joi.object({
    name: Joi.string().min(2).max(255).required().messages({
        'string.min': 'მინიმუმ 2 სიმბოლო',
        'string.max': 'მაქსიმუმ 255 სიმბოლო',
        'string.empty': 'სათაური სავალდებულოა'
    }),
    description: Joi.string().min(2).max(255).required().messages({
        'string.min': 'მინიმუმ 2 სიმბოლო',
        'string.max': 'მაქსიმუმ 255 სიმბოლო',
        'string.empty': 'აღწერა სავალდებულოა'
    })
});