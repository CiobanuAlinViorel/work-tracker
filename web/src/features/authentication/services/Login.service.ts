import { signIn } from "next-auth/react";

export default async function login(email: string, password: string) {
    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            return {
                success: false,
                message: "Invalid email or password",
            };
        }

        return {
            success: true,
            message: "Authenticated successfully",
        };
    } catch (error) {
        console.error("Login error: ", error);
        return {
            success: false,
            message: "An unexpected error occurred",
        };
    }
}
