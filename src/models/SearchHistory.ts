import mongoose from "mongoose";

const SearchHistorySchema =
  new mongoose.Schema(
    {
      uid: String,
      query: String,
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models.SearchHistory ||
  mongoose.model(
    "SearchHistory",
    SearchHistorySchema
  );