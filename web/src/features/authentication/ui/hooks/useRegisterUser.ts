'use client';

import { useForm } from "react-hook-form";
import registerSchema, { RegisterValidationSchema } from '../../validators/Register.validator'
import { zodResolver } from "@hookform/resolvers/zod";
import registerAction from "../../controller/Register.action";

export default function useRegisterUser() {
    // create the form stuff that will be exported
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RegisterValidationSchema>(
        {
            resolver: zodResolver(registerSchema)
        }
    );

    // handleSubmit(fn) returns the actual event handler — assign it directly
    const handleRegister = handleSubmit(async (data) => {
        await registerAction(data);
    });

    return {
        register,
        handleRegister,
        errors,
        isLoading: isSubmitting
    };

}