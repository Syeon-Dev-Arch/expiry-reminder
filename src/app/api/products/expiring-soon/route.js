import { Product } from "@/models/productsModel";
import { getUser } from "@/utils/getUser";
import { NextResponse } from "next/server";
import { connectDB } from "@/db/dbConfig";

connectDB();

export async function GET(request) {
  const { searchParams } = await new URL(request.url);
  const days = Number(searchParams.get("days"));
  console.log(days);

  const user = await getUser(request);

  if (!user) {
    return NextResponse.json(
      {
        message: "User not logged in or user not found",
      },
      { status: 400 },
    );
  }

  const today = new Date();
  const furture = new Date();

  furture.setDate(furture.getDate() + days);

  const products = await Product.find({
    owner: user,
    expiryDate: { $gte: today, $lte: furture },
  });

  if (!products || products.length === 0) {
    return NextResponse.json(
      { message: `No product is expirying in the next ${days} days` },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      message: `${products.length} ${products.length === 1 ? "Product" : "Products"} fetched successfull`,
      data: products,
    },
    { status: 200 },
  );
}
