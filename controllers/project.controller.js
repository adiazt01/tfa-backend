import Project from "../models/project.model.js";
import Activity from "../models/activity.model.js";

export const getProjects = async (req, res) => {
  const { user } = req;
  try {
    const projectsFound = await Project.find({ user: user._id });
    res.json(projectsFound);
  } catch (error) {
    if (!res.headersSent) {
      res.json({ error });
    }
  }
};

export const getProject = async (req, res) => {
  const { user } = req;
  const { id_project } = req.params;
  try {
    const projectsFound = await Project.findOne({
      user: user._id,
      _id: id_project,
    });
    res.json(projectsFound);
  } catch (error) {
    res.json({ error });
  }
};

export const createProject = async (req, res) => {
  const { user } = req;
  const { title, description } = req.body;

  try {
    const newProject = new Project({
      title,
      description,
      user: user._id,
    });
    await newProject.save();
    res.json(newProject);
  } catch (error) {
    res.json({ error });
  }
};

export const updateProject = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  try {
    const updateProject = await Project.findByIdAndUpdate(
      { _id: id, user: user },
      req.body
    );
    res.json(updateProject);
  } catch (error) {
    res.json(error);
  }
};

export const deleteProject = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  try {
    await Project.findOneAndDelete({ _id: id, user: user });
    res.json(200);
  } catch (error) {
    res.json(error);
  }
};
