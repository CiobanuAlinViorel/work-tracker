import z from "zod"

const registerSchema = z.object({
    email: z.email("Invalid email").min(5, "The email is mandatory!"),
    username: z.string("Invalid type of username").min(2, "An username must have minimum 2 characters"),
    password: z.string()
        .min(12, "The password must have minimum 12 characters")
        // Must contain at least one uppercase letter
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        // Must contain at least one lowercase letter
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        // Must contain at least one digit
        .regex(/[0-9]/, "Password must contain at least one number")
        // Must contain at least one special character
        .regex(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
        ),
    passwordConfirmation: z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
});

export type RegisterValidationSchema = z.infer<typeof registerSchema>;

export default registerSchema;