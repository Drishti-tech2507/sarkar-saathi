import mongoose from "mongoose";

const TranslationSchema = new mongoose.Schema(
  {
    sourceText: String,
    language: String,
    translatedText: String,
  },
  { timestamps: true }
);

export default mongoose.models.Translation ||
  mongoose.model("Translation", TranslationSchema);