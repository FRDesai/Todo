import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTasks,
  deleteTasks,
  updateValue,
  editTasks,
  completedTasks,
} from "./taskslice.js";
import "./Task.scss";
import { ReactComponent as TasklistLogo } from "./assets/tasklist.svg";
import { ReactComponent as Delete } from "./assets/delete.svg";
import { ReactComponent as Edit } from "./assets/edit.svg";
import { ReactComponent as Add } from "./assets/add.svg";
import { ReactComponent as SaveEdit } from "./assets/saveEdit.svg";

const TaskList = () => {
  const editId = useSelector((state) => state.todo.editId);
  const value = useSelector((state) => state.todo.inputValue);
  const todolist = useSelector((state) => state.todo.todoList);
  const error = useSelector((state) => state.todo.error);
  const Iscompleted = useSelector((state) => state.todo.Iscompleted);

  const dispatch = useDispatch();

  const handleTask = () => {
    dispatch(addTasks());
  };
  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      dispatch(addTasks());
    }
  };

  return (
    <div id="tasklist">
      <div className="task-header">
        <h1>Task list</h1> <TasklistLogo className="task-icon" />
      </div>
      <div className="input-container">
        <input
          className="input"
          type="text"
          placeholder="Add new task..."
          onChange={(e) => dispatch(updateValue(e.target.value))}
          value={value}
          onKeyDown={handleKeyEnter}
        />
        <div className="add-icon-container">
          {editId ? (
            <SaveEdit className="add-icon" onClick={handleTask} />
          ) : (
            <Add className="add-icon" onClick={handleTask} />
          )}
        </div>
      </div>

      {error && <label className="error">{error}</label>}
      {todolist.length > 0 && (
        <ul>
          {todolist.map((todo, index) => (
            <li key={index}>
              <input
                type="checkbox"
                onClick={() => dispatch(completedTasks(todo.id))}
              />

              <h3 className={Iscompleted ? "completed" : ""}>{todo.task}</h3>
              <Delete
                className={`icon${editId !== null ? " disabled" : ""}`}
                onClick={() => {
                  if (editId === null) {
                    dispatch(deleteTasks(todo.id));
                  } else {
                    alert("Cannot delete tasks while editing");
                  }
                }}
              />
              <Edit
                className="icon"
                onClick={() => dispatch(editTasks(todo.id))}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
