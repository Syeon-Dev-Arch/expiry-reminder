import { Product } from "@/models/productsModel";
import { connectDB } from "@/db/dbConfig";
import { sendReminder } from "@/helpers/mail";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
  try {
    const products = await Product.find({});
    let emailsSent = 0;
    for (const product of products) {
      const daysLeft = Math.ceil(
        (new Date(product.expiryDate).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24),
      );

      if (
        daysLeft > 0 &&
        daysLeft <= product.reminderDays &&
        product.reminderSent === false
      ) {
        console.log("lets send the email");
        await sendReminder({ daysLeft, product, userId: product.owner });
        product.reminderSent = true;
        await product.save();
        emailsSent++;
      }
    }

    return NextResponse.json({
      message: `${emailsSent} reminder emails sent`,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
