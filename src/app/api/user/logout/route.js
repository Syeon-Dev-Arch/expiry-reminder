import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const response = NextResponse.json({ message: "Logout successful" });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
