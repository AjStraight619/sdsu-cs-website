import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const verificationToken = req.nextUrl.searchParams.get("token");
  const userId = req.nextUrl.searchParams.get("userId");

  console.log("token: ", verificationToken)
  console.log("user id: ", userId)

  if (!verificationToken) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const tokenRecord = await db.verificationToken.findUnique({
      where: { token: verificationToken },
      include: { user: true },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date() || tokenRecord.userId !== userId) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    await db.user.update({
      where: { id: userId },
      data: { emailVerified: new Date() },
    });

    await db.verificationToken.delete({
      where: { token: verificationToken },
    });

    return NextResponse.redirect(new URL("/", req.url));

  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

