import { connectDB } from "@/db/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  try {
    const reqbody = await request.json();
    const { username, email, password } = reqbody;

    if ([username, email, password].some((field) => !field?.trim())) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },
        { status: 400 },
      );
    }

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return NextResponse.json(
        {
          error: "User already exists Login",
        },
        { status: 400 },
      );
    }

    const savedUser = await User.create({ username, email, password });
    console.log(savedUser);
    return NextResponse.json(
      {
        message: "User signup successfull",
        data: savedUser,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
