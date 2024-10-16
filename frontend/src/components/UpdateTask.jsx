import propTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskInServer } from "../slices/TasksSlice";

const MyVerticallyCenteredModal = (props) => {
  const { selectedTask } = useSelector((state) => state.tasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  const updateTask = (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      alert("Title and description cannot be empty.");
      return;
    }
    dispatch(updateTaskInServer({ _id: id, title, description }));
    props.onHide();
  };

  useEffect(() => {
    if (Object.keys(selectedTask).length !== 0) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setId(selectedTask._id);
    }
  }, [selectedTask]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
            <div className="text-end"></div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => updateTask(e)}
          >
            Update Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

MyVerticallyCenteredModal.propTypes = {
  onHide: propTypes.func.isRequired,
  selectedTask: propTypes.object,
};

export default MyVerticallyCenteredModal;
