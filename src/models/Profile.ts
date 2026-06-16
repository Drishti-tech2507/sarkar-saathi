import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    // Firebase User ID
    uid: {
      type: String,
      required: true,
      unique: true,
    },

    // Personal Information
    name: String,

    age: Number,

    gender: String,

    state: String,

    district: String,

    // Family Information
    maritalStatus: String,

    children: Number,

    dependents: Number,

    // Education & Employment
    education: String,

    occupation: String,

    // Benefits User Wants
    benefitsInterested: [
      {
        type: String,
      },
    ],

    // Financial Details
    income: Number,

    bpl: String,

    rationCard: String,

    // Categories
    categories: [
      {
        type: String,
      },
    ],

    // Identity
    aadhaar: String,

    mobile: String,

    // Future Features
    profileCompleted: {
      type: Boolean,
      default: false,
    },

    profileCompletion: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Profile =
  mongoose.models.Profile ||
  mongoose.model(
    "Profile",
    ProfileSchema
  );

export default Profile;