import { User } from "@/models/userModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/db/dbConfig";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request) {
  try {
    const reqbody = await request.json();
    const { email, password } = reqbody;

    if ([email, password].some((field) => !field?.trim())) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 401 });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while logging in." },
      { status: 500 },
    );
  }
}
