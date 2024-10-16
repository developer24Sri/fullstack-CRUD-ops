const { mongoose } = require("mongoose");
const taskService = require("../services/taskService");

// To create a Task:
const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = await taskService.createTask({ title, description });
    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// To read all tasks:
const getAllTask = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// To get a single task:
const getSingleTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task not found" });
  }
  try {
    const singleTask = await taskService.getSingleTask(id);
    res.status(200).json(singleTask);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// To update a Task:
const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task not found" });
  }
  try {
    const taskUpdate = await taskService.updateTask(id, { ...req.body });
    res.status(200).json(taskUpdate);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// To delete a Task:
const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task not found" });
  }
  try {
    const taskDelete = await taskService.deleteTask(id);
    res.status(200).json(taskDelete);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  createTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
