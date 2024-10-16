import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addTasksToServer } from "../slices/TasksSlice";
import { useDispatch } from "react-redux";

const AddTask = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    console.log({ title, description });
    dispatch(addTasksToServer({ title, description }));
    setTitle("");
    setDescription("");
  };
  return (
    <>
      <section className="my-5">
        <Form onSubmit={addTask}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>TASK TITLE</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Task description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task decryption"
            />
          </Form.Group>
          <div className="text-end">
            <Button variant="primary" type="submit" onClick={(e) => addTask(e)}>
              Add Task
            </Button>
          </div>
        </Form>
      </section>
    </>
  );
};

export default AddTask;
