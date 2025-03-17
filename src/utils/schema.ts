import Joi from "joi";

export const taskSchema = Joi.object({
    name: Joi.string().min(2).max(255).required().messages({
        'string.min': 'მინიმუმ 2 სიმბოლო',
        'string.max': 'მაქსიმუმ 255 სიმბოლო',
        'string.empty': 'სათაური სავალდებულოა'
    }),
    description: Joi.string().min(2).max(255).required().messages({
        'string.min': 'მინიმუმ 2 სიმბოლო',
        'string.max': 'მაქსიმუმ 255 სიმბოლო',
        'string.empty': 'აღწერა სავალდებულოა'
    }),
    deadline: Joi.date().min('now').required().messages({
        'date.base': 'თარიღის ფორმატი არასწორია',
        'date.min': 'დედლაინი არ შეიძლება იყოს წარსულში',
        'date.empty': 'დედლაინი სავალდებულოა',
        'any.required': 'დედლაინი სავალდებულოა'
    })
});

export const employeeSchema = Joi.object({
    firstName: Joi.string().min(2).max(255).required().messages({
        'string.min': 'მინიმუმ 2 სიმბოლო',
        'string.max': 'მაქსიმუმ 255 სიმბოლო',
        'string.empty': 'სათაური სავალდებულოა'
    }),
    lastName: Joi.string().min(2).max(255).required().messages({
        'string.min': 'მინიმუმ 2 სიმბოლო',
        'string.max': 'მაქსიმუმ 255 სიმბოლო',
        'string.empty': 'სათაური სავალდებულოა'
    }),
})