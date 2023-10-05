import mongoose from "mongoose";
import Activity from "../models/activity.model.js";
import Task from "../models/task.model.js";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.pre("findOneAndDelete", async function (next) {
  const docToDelete = await this.model.findOne(this.getFilter());
  await Activity.deleteMany({ project: docToDelete._id });
  await Task.deleteMany({ project: docToDelete._id });
  next();
});

export default mongoose.model("Project", projectSchema);
