import Activity from "../models/activity.model.js";

export const getActivities = async (req, res) => {
  const { user } = req;
  const { id_project } = req.params;

  try {
    const ActivitiesFound = await Activity.find({
      user: user._id,
      project: id_project,
    });
    console.log(ActivitiesFound);
    res.json(ActivitiesFound);
  } catch (error) {
    res.json({ error });
  }
};

export const getActivity = async (req, res) => {
  const { user } = req;
  const { id_project, id_activity } = req.params;
  try {
    const ActivitiesFound = await Activity.findOne({
      user: user._id,
      _id: id_activity,
      project: id_project,
    });
    res.json(ActivitiesFound);
  } catch (error) {
    res.json({ error });
  }
};

export const createActivity = async (req, res) => {
  const { user } = req;
  const { title, description } = req.body;
  const { id_project } = req.params;

  try {
    const newActivity = new Activity({
      title,
      description,
      user: user._id,
      project: id_project,
    });
    await newActivity.save();
    res.json(newActivity);
  } catch (error) {
    res.json({ error });
  }
};

export const updateActivity = async (req, res) => {
  const { user } = req;
  const { id_project, id_activity } = req.params;
  try {
    const updateActivity = await Activity.findByIdAndUpdate(
      { _id: id_activity, user: user._id, project: id_project },
      req.body
    );
    res.json(updateActivity);
  } catch (error) {
    res.json(error);
  }
};

export const deleteActivity = async (req, res) => {
  const { user } = req;
  const { id_project, id_activity } = req.params;

  try {
    await Activity.findOneAndDelete({
      _id: id_activity,
      user: user._id,
      project: id_project,
    })
    res.json(200);
  } catch (error) {
    res.json(error);
  }
};
