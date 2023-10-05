import Activity from "../models/activity.model.js";

export const checkActivity = async (req, res, next) => {
  try {
    const { id_activity } = req.params;
    const foundActivity = await Activity.findById(id_activity);
    if (!foundActivity) return res.json({ message: "Activity not found" });
    next();
  } catch (error) {
    res.json(error);
  }
};
