"use server";
import { NextRequest, NextResponse } from "next/server";
import { upsertToken } from "../../lib/tokenService"; // Adjust path as needed

export async function POST(req: NextRequest) {
  try {
    const { user_id, token } = await req.json();

    if (!user_id || !token) {
      return NextResponse.json(
        { error: "Missing user_id or token in request body" },
        { status: 400 }
      );
    }

    const result = await upsertToken(user_id, token);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error upserting token:", error);
    return NextResponse.json(
      { error: "Failed to upsert token" },
      { status: 500 }
    );
  }
}
