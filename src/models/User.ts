import mongoose from "mongoose";

const UserSchema =
  new mongoose.Schema(
    {
      uid: String,

      name: String,

      email: String,

      photoURL: String,

      lastLogin: {
        type: Date,
        default: Date.now,
      },

      language: {
        type: String,
        default: "English",
      },

      profileCompleted: {
        type: Boolean,
        default: false,
      },

      profileCompletion: {
        type: Number,
        default: 0,
      },
      
      welcomeMailSent: {
        type: Boolean,
        default: false,
      },
      
      profileMailSent: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models
  .User ||
  mongoose.model(
    "User",
    UserSchema
  );