'use server';

import { Prisma } from "@/src/generated/prisma/client";
import Register from "../types/Register.type";
import registerSchema from "../validators/Register.validator";
import bcrypt from "bcryptjs";
import userRepository from "../repository/User.repository";

export default async function register(user: Register) {
    try {

        //validate the user
        const validatedUser = registerSchema.safeParse(user);

        if (!validatedUser.success) {
            return {
                success: false,
                message: validatedUser.error
            }
        }

        // hash the password
        const hashed = await bcrypt.hash(user.password, 10);

        // create the user — if email/username already exists, Prisma throws P2002
        const createdUser = await userRepository.createUser({
            username: user.username,
            email: user.email,
            password: hashed
        });

        const { hashedPassword, ...returnedUser } = createdUser;

        return {
            success: true,
            user: returnedUser
        }

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return {
                success: false,
                message: "An account with this email or username already exists"
            };
        }

        console.error("Something went wrong. The error is: ", error)
        return {
            success: false,
            message: "A server error occurs: " + error
        };
    }
}