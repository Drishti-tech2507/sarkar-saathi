import mongoose from "mongoose";

const SavedSchemeSchema =
  new mongoose.Schema(
    {
      uid: {
        type: String,
        required: true,
      },

      schemeId: {
        type: String,
        required: true,
      },

      schemeName: String,

      category: String,

      benefit: String,

      savedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

const SavedScheme =
  mongoose.models.SavedScheme ||
  mongoose.model(
    "SavedScheme",
    SavedSchemeSchema
  );

export default SavedScheme;