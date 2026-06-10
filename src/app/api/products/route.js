import { Product } from "@/models/productsModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/db/dbConfig";
import jwt from "jsonwebtoken";
import { User } from "@/models/userModel";

connectDB();

export async function GET(request) {
  try {
    const hashtoken = request.cookies.get("token")?.value || "";

    if (hashtoken === "") {
      return NextResponse.json({ error: "Token not found" }, { status: 400 });
    }
    const token = await jwt.verify(hashtoken, process.env.TOKEN_SECRET);

    const products = await Product.find({ owner: token.userId });

    return NextResponse.json(
      { message: "Products fetch", data: products },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong", error },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { name, category, expiryDate, reminderDays } = reqBody;

    if (
      [name, category, expiryDate, reminderDays].some(
        (field) => !String(field ?? "").trim(),
      )
    ) {
      return NextResponse.json(
        { message: "All fields are requried" },
        { status: 400 },
      );
    }

    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.json(
        { message: "User is not logged in" },
        { status: 400 },
      );
    }

    const user = jwt.verify(token, process.env.TOKEN_SECRET).userId;

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const product = await Product.create({
      name,
      category,
      expiryDate,
      reminderDays,
      owner: user,
      reminderSent: false,
    });

    if (!product) {
      return NextResponse.json(
        { message: "Error in saving the produect" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Product added sucessfully", data: product },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong", error },
      { status: 500 },
    );
  }
}
