"use server";
import { NextRequest, NextResponse } from "next/server";
import { upsertToken, retrieveToken } from "../../lib/tokenService";

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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json(
        { error: "Missing user_id in query params" },
        { status: 400 }
      );
    }

    const result = await retrieveToken(user_id);
    return NextResponse.json(result, { status: result.success ? 200 : 404 });
  } catch (error) {
    console.error("Error retrieving token:", error);
    return NextResponse.json(
      { error: "Failed to retrieve token" },
      { status: 500 }
    );
  }
}
