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
    firstName: Joi.string()
        .min(2)
        .max(255)
        .pattern(/^[a-zA-Zა-ჰ]+$/)
        .required()
        .messages({
            'string.min': 'მინიმუმ 2 სიმბოლო',
            'string.max': 'მაქსიმუმ 255 სიმბოლო',
            'string.empty': 'სახელი სავალდებულოა',
            'string.pattern.base': 'მხოლოდ ლათინური ან ქართული ასოები'
        }),
    lastName: Joi.string()
        .min(2)
        .max(255)
        .pattern(/^[a-zA-Zა-ჰ]+$/)
        .required()
        .messages({
            'string.min': 'მინიმუმ 2 სიმბოლო',
            'string.max': 'მაქსიმუმ 255 სიმბოლო',
            'string.empty': 'გვარი სავალდებულოა',
            'string.pattern.base': 'მხოლოდ ლათინური ან ქართული ასოები'
        }),
    photo: Joi.string()
        .custom((value, helpers) => {
            if (!value) return value;
            const sizeInKB = Buffer.byteLength(value) / 1024;
            if (sizeInKB > 600) {
                return helpers.error('file.tooLarge');
            }
            return value;
        })
        .messages({
            'file.tooLarge': 'ფოტოს ზომა არ უნდა აღემატებოდეს 600KB-ს'
        }),
    department: Joi.object()
        .required()
        .messages({
            'any.required': 'დეპარტამენტი სავალდებულოა',
            'object.base': 'დეპარტამენტი სავალდებულოა'
        })
    // empty
});