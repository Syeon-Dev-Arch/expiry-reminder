import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function getUser(request) {
  try {
    const token = request.cookies.get("token");
    if (!token) return;
    console.log(token);

    const user = jwt.verify(token.value, process.env.TOKEN_SECRET).userId;
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Invalid token");
  }
}
