import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tasksList: [],
  selectedTask: {},
  isLoading: false,
  error: "",
};

//Thunk action creator:(For asynchronous ops):

const BASE_URL = "http://localhost:4000/api/tasks";

//GET - READ all Tasks:
export const getTasksFromServer = createAsyncThunk(
  "tasks/getTasksFromServer",
  async (_, { rejectWithValue }) => {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "No Task found" });
    }
  }
);

//POST - CREATE a Task:
export const addTasksToServer = createAsyncThunk(
  "tasks/AddTasksToServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify({ ...task, id: Math.floor(Math.random() * 100) }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(BASE_URL, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Task was not added" });
    }
  }
);

//PATCH - UPDATE a task:
export const updateTaskInServer = createAsyncThunk(
  "tasks/updateTaskInServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(`${BASE_URL}/${task._id}`, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Task was not updated" });
    }
  }
);

//DELETE - DELETE a task:
export const deleteTaskInServer = createAsyncThunk(
  "tasks/deleteTaskInServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "DELETE",
    };
    const response = await fetch(BASE_URL + "/" + task._id, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Task was not deleted" });
    }
  }
);

//Redux createSlice: (for synchronous operations):

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    addTaskToList: (state, action) => {
      const id = Math.floor(Math.random() * 100);
      let task = { ...action.payload, id };
      state.tasksList.push(task);
    },
    removeTaskFromList: (state, action) => {
      state.tasksList = state.tasksList.filter(
        (task) => task._id !== action.payload._id
      );
    },
    updateTaskInList: (state, action) => {
      state.tasksList = state.tasksList.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },

  //Extra reducers for handling async actions:(Life-Cycles of promise)
  extraReducers: (builder) => {
    builder
      .addCase(getTasksFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasksFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        const tasksWithNumberIds = action.payload.map((task) => ({
          ...task,
          id: Number(task.id), // Ensure id is a number
        }));
        state.tasksList = action.payload;
        state.tasksList = tasksWithNumberIds;
      })
      .addCase(getTasksFromServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
        state.tasksList = [];
      })
      .addCase(addTasksToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTasksToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList.push(action.payload);
      })
      .addCase(addTasksToServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })
      .addCase(updateTaskInServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskInServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        const updatedTask = {
          ...action.payload,
          id: Number(action.payload._id),
        };
        state.tasksList = state.tasksList.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
      })
      .addCase(updateTaskInServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })
      .addCase(deleteTaskInServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTaskInServer.fulfilled, (state) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(deleteTaskInServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      });
  },
});

export const {
  addTaskToList,
  removeTaskFromList,
  updateTaskInList,
  setSelectedTask,
} = taskSlice.actions;

export default taskSlice.reducer;

/*
NOTE:
In the thunk action creators, we use `createAsyncThunk` to handle asynchronous operations like fetching, adding, updating, and deleting tasks from a server. Each action creator follows a consistent pattern:
1. **Action Type**: The first argument is a unique string that defines the action's type, such as `"tasks/getTasksFromServer"`.
2. **Payload Creator**: The second argument is an async function that performs the desired HTTP operation (GET, POST, PATCH, DELETE) and returns the result. It also receives two arguments:
   - `args`: Any parameters required by the async action (e.g., the task data).
   - `thunkAPI`: Provides helper methods like `dispatch`, `getState`, and `rejectWithValue` for managing the logic and error handling.

### Action Creators Explained:
- **getTasksFromServer**: This performs a `GET` request to retrieve all tasks from the server. The payload is ignored (hence the `_` argument).
- **addTasksToServer**: This sends a `POST` request to add a new task. The task object is passed in as `args`, and the payload returned is the newly created task.
- **updateTaskInServer**: This sends a `PATCH` request to update an existing task on the server. The task object, including the `id`, is passed as `args` to identify which task to update.
- **deleteTaskInServer**: This sends a `DELETE` request to remove a task from the server by its `id`.

### Extra Reducers:
`extraReducers` handles the different promise states (pending, fulfilled, and rejected) for each thunk action:
1. **Pending**: When the async request is initiated, we typically set `isLoading` to `true` to show a loading indicator.
2. **Fulfilled**: When the request is successful, we update the `tasksList` or modify state based on the result (e.g., add a new task, update or delete a task).
3. **Rejected**: If the request fails, we capture the error in the `error` field and stop any loading indicators.

### Example of Each Thunk’s Reducer Lifecycle:
- **getTasksFromServer**: 
  - `.pending`: Sets `isLoading` to `true`.
  - `.fulfilled`: Updates `tasksList` with the fetched tasks and turns off the loading state.
  - `.rejected`: Updates `error` with an error message and resets `tasksList` if no tasks were fetched.

- **addTasksToServer**: 
  - `.pending`: Sets `isLoading` to `true`.
  - `.fulfilled`: Adds the new task to `tasksList` and clears any errors.
  - `.rejected`: Captures the error message and stops the loading state.

- **updateTaskInServer**: 
  - `.pending`: Sets `isLoading` to `true`.
  - `.fulfilled`: Finds the updated task in `tasksList` and replaces it with the new data.
  - `.rejected`: Captures the error message and resets loading state.

- **deleteTaskInServer**: 
  - `.pending`: Sets `isLoading` to `true`.
  - `.fulfilled`: Removes the task from `tasksList`.
  - `.rejected`: Captures the error message and resets loading state.

These `extraReducers` handle the full lifecycle of each async action, ensuring the state is properly updated whether the request succeeds or fails.

In summary:
- Use `reducers` for synchronous state updates.
- Use `extraReducers` to handle async state changes driven by API requests and responses.
*/
