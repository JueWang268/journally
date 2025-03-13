"use server";
import * as admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = require("@/serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(req: NextRequest) {
  const { token, title, message, link } = await req.json();

  const payload: Message = {
    token,
    notification: {
      title: title,
      body: message,
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  };

  try {
    await admin.messaging().send(payload);
    return NextResponse.json({ success: true, message: "Sent notification" });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to send notification",
    });
  }
}
