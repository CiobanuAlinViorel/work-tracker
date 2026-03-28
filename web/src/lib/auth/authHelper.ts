import bcrypt from "bcryptjs";
import userRepository from "@/src/features/authentication/repository/User.repository";

export default async function authorize(credentials: { email?: string; password?: string } | undefined) {
    if (!credentials?.email || !credentials?.password) {
        throw new Error("Invalid credentials");
    }

    const user = await userRepository.getUserByEmail(credentials.email)

    if (!user || !user.hashedPassword) {
        throw new Error("Invalid credentials");
    }

    const isCorrectPassword = await bcrypt.compare(
        credentials.password,
        user.hashedPassword
    );

    if (!isCorrectPassword) {
        throw new Error("Invalid credentials");
    }

    return {
        id: user.id,
        email: user.email,
        name: user.username,
    };
}
