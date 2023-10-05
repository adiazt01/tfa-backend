import mongoose from "mongoose";
import Task from '../models/task.model.js'

const activitySchema = new mongoose.Schema(
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
    project: {
      ref: "Project",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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

activitySchema.pre("findOneAndDelete", async function(next) {
  const docToDelete = await this.model.findOne(this.getFilter());
  await Task.deleteMany({activity: docToDelete._id});
  next();
});


export default mongoose.model("Activity", activitySchema);
