import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "Task without title",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      default: "To complete", //complete, doing,
      trim: true,
      type: String,
    },
    priority: {
      default: "Medium", //Low, Medium, High
      trim: true,
      type: String,
    },
    tags: [{ type: String, trim: true }],
    /* User and category */
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    project: {
      ref: "Project",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    activity: {
      ref: "Activity",
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
