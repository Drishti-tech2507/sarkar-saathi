import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import Scheme from "../src/models/Scheme";

const MONGODB_URI =
  process.env.MONGODB_URI!;

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);

    const filePath = path.join(
      process.cwd(),
      "data",
      "schemes.json"
    );

    const schemes = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );

    for (const scheme of schemes) {
      await Scheme.findOneAndUpdate(
        { name: scheme.name },
        scheme,
        {
          upsert: true,
          new: true,
        }
      );
    }

    console.log(
      `Imported ${schemes.length} schemes`
    );

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();