import mongoose from "mongoose";

const NotificationSchema =
  new mongoose.Schema(
    {
      uid: String,

      title: String,

      message: String,

      read: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models.Notification ||
  mongoose.model(
    "Notification",
    NotificationSchema
  );