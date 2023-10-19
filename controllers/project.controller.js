import Project from "../models/project.model.js";

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
  const { user: { _id: userId }, params: { id_project } } = req;
  try {
    const projectsFound = await Project.findOne({
      user: userId,
      _id: id_project,
    });
    if (!projectsFound) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(projectsFound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the project' });
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
