import { prisma } from "@/src/lib/db/prisma";
import Register from "../types/Register.type";


class UserRepository {
    private constructor() { }

    static instance: UserRepository

    static getInstance() {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    // important functions 
    async getUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }

    async createUser(user: Register) {
        return await prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                hashedPassword: user.password
            }
        });
    }

    async updateUser(id: string, username?: string, password?: string) {
        await prisma.user.update({
            where: { id: id },
            data: {
                ...(username && { username: username }),
                ...(password && { hashedPassword: password })
            }
        })
    };

    async deleteUser(id: string) {
        await prisma.user.delete({
            where: { id: id }
        });
    }
}
const userRepository = UserRepository.getInstance();

export default userRepository;