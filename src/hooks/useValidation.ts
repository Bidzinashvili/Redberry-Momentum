import { useState } from "react";
import Joi from "joi";

interface ValidationHookProps<T> {
    schema: Joi.ObjectSchema<T>;
    formData: T;
}

export default function useValidation<T>({ schema, formData }: ValidationHookProps<T>) {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        setErrors({});

        const { error } = schema.validate(formData, { abortEarly: false });

        if (error) {
            const validationErrors: { [key: string]: string } = {};
            error.details.forEach(err => {
                const key = String(err.path[0]);
                validationErrors[key] = err.message;
            });
            setErrors(validationErrors);
            return false;
        }

        return true;
    };

    const validateField = (name: keyof T, value: any) => {
        const fieldSchema = schema.extract(name as string);
        const { error } = fieldSchema.validate(value);

        setErrors(prevErrors => {
            if (error) {
                return { ...prevErrors, [String(name)]: error.message };
            } else {
                const { [String(name)]: _, ...rest } = prevErrors;
                return rest;
            }
        });
    };

    return { errors, setErrors, validateField, validateForm };
}
