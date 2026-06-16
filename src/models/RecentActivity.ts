import mongoose from "mongoose";

const RecentActivitySchema =
  new mongoose.Schema(
    {
      uid: String,

      action: String,

      description: String,
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models.RecentActivity ||
  mongoose.model(
    "RecentActivity",
    RecentActivitySchema
  );