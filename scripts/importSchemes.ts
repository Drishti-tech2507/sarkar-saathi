import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import Scheme from "../src/models/Scheme";

dotenv.config({
  path: ".env.local",
});

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not found in .env.local");
}

async function importSchemes() {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGODB_URI!);

    console.log("Connected");

    const filePath = path.join(
      process.cwd(),
      "scripts",
      "schemes.json"
    );

    const fileContent = fs.readFileSync(
      filePath,
      "utf8"
    );

    const schemes = JSON.parse(fileContent);

    console.log(
      `Found ${schemes.length} schemes`
    );

    console.log(
      "Deleting existing schemes..."
    );

    await Scheme.deleteMany({});

    console.log(
      "Importing schemes..."
    );

    const insertedSchemes =
      await Scheme.insertMany(schemes);

    console.log(
      `Successfully inserted ${insertedSchemes.length} schemes`
    );

    await mongoose.disconnect();

    console.log(
      "Database connection closed"
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Import failed:",
      error
    );

    await mongoose.disconnect();

    process.exit(1);
  }
}

importSchemes();