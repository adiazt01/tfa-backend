import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  const { user } = req;
  const { id_project, id_activity } = req.params;

  try {
    const TaskFound = await Task.find({
      user: user._id,
      project: id_project,
      activity: id_activity,
    });
    console.log(TaskFound);
    res.json(TaskFound);
  } catch (error) {
    res.json({ error });
  }
};

export const getTask = async (req, res) => {
  const { user } = req;
  const { id_project, id_activity, id_task } = req.params;
  try {
    const taskFound = await Task.findOne({
      user: user._id,
      _id: id_task,
      project: id_project,
      activity: id_activity,
    });
    res.json(taskFound);
  } catch (error) {
    res.json({ error });
  }
};

export const createTask = async (req, res) => {
  const { user } = req;
  const { title, description } = req.body;
  const { id_project, id_activity } = req.params;

  try {
    const newTask = new Task({
      title,
      description,
      user: user._id,
      project: id_project,
      activity: id_activity,
    });
    console.log(newTask);
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.json({ error });
  }
};

export const updateTask = async (req, res) => {
  const { user } = req;
  const { id_project, id_task, id_activity } = req.params;
  console.log(req.body);
  try {
    const updateTask = await Task.findByIdAndUpdate(
      {
        _id: id_task,
        user: user._id,
        project: id_project,
        activity: id_activity,
      },
      req.body
    );
    updateTask.save()
    res.json(updateTask);
  } catch (error) {
    res.json(error);
  }
};

export const deleteTask = async (req, res) => {
  const { user } = req;
  const { id_project, id_task, id_activity } = req.params;

  try {
    await Task.findOneAndDelete({
        _id: id_task,
        user: user._id,
        project: id_project,
        activity: id_activity,
    });
    res.json(200);
  } catch (error) {
    res.json(error);
  }
};
