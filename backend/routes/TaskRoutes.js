const express = require("express");

const router = express.Router();

const {createTask, getAllTask, getSingleTask, updateTask, deleteTask} = require("../controllers/TaskController");

//Routes:
router.post("/",createTask);
router.get("/",getAllTask);
router.get("/:id",getSingleTask);
router.patch("/:id",updateTask);
router.delete("/:id",deleteTask);

module.exports = router;
