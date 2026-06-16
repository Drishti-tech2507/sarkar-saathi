import mongoose from "mongoose";

const EligibilitySchema = new mongoose.Schema(
  {
    gender: {
      type: [String],
      default: [],
    },

    occupation: {
      type: [String],
      default: [],
    },

    education: {
      type: [String],
      default: [],
    },

    categories: {
      type: [String],
      default: [],
    },

    ageMin: {
      type: Number,
      default: 0,
    },

    ageMax: {
      type: Number,
      default: 120,
    },

    incomeLimit: {
      type: Number,
      default: 999999999,
    },

    bplOnly: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const SchemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    benefit: {
      type: String,
      required: true,
    },

    ministry: {
      type: String,
      default: "",
    },

    state: {
      type: [String],
      default: ["All"],
    },

    documents: {
      type: [String],
      default: [],
    },

    keywords: {
      type: [String],
      default: [],
    },

    officialWebsite: {
      type: String,
      default: "",
    },

    applyLink: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      default: "manual",
    },

    sourceId: {
      type: String,
      default: "",
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },

    active: {
      type: Boolean,
      default: true,
    },

    eligibility: {
      type: EligibilitySchema,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Scheme ||
  mongoose.model("Scheme", SchemeSchema);