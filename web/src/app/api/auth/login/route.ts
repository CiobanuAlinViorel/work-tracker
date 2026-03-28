import { encode } from "next-auth/jwt";
import authorize from "@/src/lib/auth/authHelper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and password are required" },
                { status: 400 }
            );
        }

        // reuses the same verify logic as the web login
        const user = await authorize({ email, password });

        const token = await encode({
            token: { id: user.id, email: user.email, name: user.name },
            secret: process.env.NEXTAUTH_SECRET!,
        });

        return NextResponse.json(
            { success: true, token },
            { status: 200 }
        );

    } catch (error) {
        // authorize() throws "Invalid credentials" on wrong email/password
        if (error instanceof Error && error.message === "Invalid credentials") {
            return NextResponse.json(
                { success: false, message: "Invalid email or password" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
