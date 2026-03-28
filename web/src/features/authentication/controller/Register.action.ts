"use server";

import login from "../services/Login.service";
import register from "../services/Register.service";
import Register from "../types/Register.type";
import { redirect } from "next/navigation";

export default async function registerAction(user: Register) {
    const registerStatus = await register(user);

    if (!registerStatus.success) {
        return registerStatus.message;
    }

    redirect("/auth/signin");
}