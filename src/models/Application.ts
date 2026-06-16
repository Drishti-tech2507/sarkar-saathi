import mongoose from "mongoose";

const ApplicationSchema =
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

      schemeName: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "Applied",
          "Under Review",
          "Approved",
          "Rejected",
        ],
        default: "Applied",
      },

      appliedDate: {
        type: Date,
        default: Date.now,
      },

      remarks: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models
  .Application ||
  mongoose.model(
    "Application",
    ApplicationSchema
  );