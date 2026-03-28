"use server";

import { redirect } from "next/navigation";
import login from "../services/Login.service";

export default async function loginAction({ email, password }: { email: string, password: string }) {
    const loginStatus = await login(email, password);

    if (!loginStatus.success) {
        return loginStatus.message;
    }

    redirect("/");
}