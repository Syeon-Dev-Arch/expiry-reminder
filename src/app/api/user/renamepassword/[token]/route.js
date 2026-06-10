import { User } from "@/models/userModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/db/dbConfig";
import crypto from "crypto";
connectDB();

export async function POST(request, { params }) {
  try {
    const reqBody = await request.json();
    const { newPassword } = reqBody;
    const { token } = await params;

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "The token and the new password is needed" },
        { status: 400 },
      );
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(user);

    user.password = newPassword;
    user.forgotPasswordTokenExpiry = undefined;
    user.forgotPasswordToken = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
