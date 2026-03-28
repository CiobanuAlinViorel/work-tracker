import register from "@/src/features/authentication/services/Register.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const result = await register(body);

        if (!result.success) {
            return NextResponse.json(
                { success: false, message: result.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: true, user: result.user },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}