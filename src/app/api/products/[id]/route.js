import { connectDB } from "@/db/dbConfig";
import { Product } from "@/models/productsModel";
import { getUser } from "@/utils/getUser";
import { NextResponse } from "next/server";

connectDB();

// get one product
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const user = await getUser(request);

    if (!user) {
      return NextResponse.json({ message: "Token not found" }, { status: 404 });
    }

    const product = await Product.findOne({
      _id: id,
      owner: user,
    });

    if (!product) {
      return NextResponse.json(
        { message: "Products not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Producet found", data: product },
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

// update one
export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const { name, category, expiryDate } = await request.json();

    const user = await getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 });
    }

    const product = await Product.findOneAndUpdate(
      { _id: id, owner: user },
      {
        name,
        category,
        expiryDate,
      },
    );

    if (!product) {
      return NextResponse.json({ error: "Product not saved" }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Product updated", data: product },
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

// delete one
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const user = await getUser(request);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const product = await Product.findOneAndDelete({ _id: id, owner: user });

    if (!product) {
      return NextResponse.json(
        { message: "Something went wrong while deleting" },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong", error },
      { status: 500 },
    );
  }
}
