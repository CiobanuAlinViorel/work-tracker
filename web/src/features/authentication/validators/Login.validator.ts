import z from "zod"

const loginValidationSchema = z.object({
    email: z.email("The email is wrong defined").min(5, "The email address must have minimum 5 characters"),
    password: z.string()
});

export type LoginValidationType = z.infer<typeof loginValidationSchema>;

export default loginValidationSchema;