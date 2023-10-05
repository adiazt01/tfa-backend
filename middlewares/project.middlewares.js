import Project from "../models/project.model.js";

export const checkProject = async (req, res, next) => {
  try {
    const { id_project } = req.params;
    const foundProject = await Project.findById(id_project);
    console.log(foundProject);
    if (!foundProject) return res.json({ message: "Project not found" });
    next();
  } catch (error) {
    res.json(error);
  }
};
