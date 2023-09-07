import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    todoList: JSON.parse(localStorage.getItem("Localtask")) || [],
    editId: null,
    inputValue: "",
    error: null,
    // Iscompleted: false,
  },
  reducers: {
    addTasks: (state) => {
      if (state.inputValue !== "") {
        state.error = null;
        if (state.editId === null) {
          const newTask = {
            id: uuidv4(),
            task: state.inputValue,
            completed: false,
          };
          state.todoList.push(newTask);
          state.inputValue = "";
          localStorage.setItem("Localtask", JSON.stringify(state.todoList));
        } else if (state.editId !== null) {
          const EditTask = state.todoList.find(
            (todo) => todo.id === state.editId
          );
          EditTask.task = state.inputValue;
          state.inputValue = "";
          state.editId = null;
          localStorage.setItem("Localtask", JSON.stringify(state.todoList));
        }
      } else {
        state.error = "Type something to add";
      }
    },
    deleteTasks: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
      console.log(state.todoList);
      localStorage.setItem("Localtask", JSON.stringify(state.todoList));
    },
    editTasks: (state, action) => {
      const id = action.payload;
      state.btnName = "Edit Task";
      state.editId = id;
      state.inputValue = state.todoList.find((todo) => todo.id === id).task;
    },
    updateValue: (state, action) => {
      state.inputValue = action.payload;
    },
    completedTasks: (state, action) => {
      const completedTask = state.todoList.find(
        (todo) => todo.id === action.payload
      );

      if (completedTask) {
        completedTask.completed = !completedTask.completed;
        // state.Iscompleted = !state.Iscompleted;
        localStorage.setItem("Localtask", JSON.stringify(state.todoList));
      }
      // completedtodo.completed = !completedtodo.completed;
      // state.Iscompleted = !state.Iscompleted;
      // localStorage.setItem("Localtask", JSON.stringify(state.todoList));
    },
  },
});

export const { addTasks, deleteTasks, editTasks, updateValue, completedTasks } =
  todoSlice.actions;
export default todoSlice.reducer;
