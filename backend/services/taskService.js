const taskModel = require("../models/TaskModel");

// Service to create a task
const createTask = async (data) => {
  const task = await taskModel.create(data);
  return task;
};

// Service to get all tasks
const getAllTasks = async () => {
  const tasks = await taskModel.find({});
  return tasks;
};

// Service to get a single task by ID
const getSingleTask = async (id) => {
  const singleTask = await taskModel.findById(id);
  return singleTask;
};

// Service to update a task by ID
const updateTask = async (id, data) => {
  const updatedTask = await taskModel.findByIdAndUpdate({ _id: id }, data);
  return updatedTask;
};

// Service to delete a task by ID
const deleteTask = async (id) => {
  const deletedTask = await taskModel.findByIdAndDelete(id);
  return deletedTask;
};

module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
