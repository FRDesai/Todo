import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    todoList: [],
    editId: null,
    inputValue: "",
    error: null,
    Iscompleted: false,
  },
  reducers: {
    addTasks: (state, action) => {
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
        } else if (state.editId !== null) {
          const EditTask = state.todoList.find(
            (todo) => todo.id === state.editId
          );
          EditTask.task = state.inputValue;
          state.inputValue = "";
          state.editId = null;
        }
      } else {
        state.error = "Type something to add";
      }
    },
    deleteTasks: (state, action) => {
      console.log(action.payload);
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
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
      const completedtodo = state.todoList.find(
        (todo) => todo.id === action.payload
      );
      completedtodo.completed = !completedtodo.completed;
      state.Iscompleted = !state.Iscompleted;
      console.log(completedtodo.task, completedtodo.completed);
    },
  },
});

export const { addTasks, deleteTasks, editTasks, updateValue, completedTasks } =
  todoSlice.actions;
export default todoSlice.reducer;
