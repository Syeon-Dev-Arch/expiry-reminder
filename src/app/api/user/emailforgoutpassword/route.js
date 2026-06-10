import { connectDB } from "@/db/dbConfig";
import { sendEmail } from "@/helpers/mail";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await sendEmail({ email, userId: user._id });

    return NextResponse.json(
      { message: `Password reset link sent successfully! on ${email}` },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
