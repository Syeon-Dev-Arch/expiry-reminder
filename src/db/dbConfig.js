import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected succssfully");
    });

    connection.on("error", (err) => {
      console.log(
        "mongodb connection error place make sure mongodb is running" + err,
      );
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
};
