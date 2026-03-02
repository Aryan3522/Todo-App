import React, { useContext, useState } from "react";
import style from "../Todolist.css";
import { ToDoContext } from "../Context/TodoTaskContext";

const TomorrowTasks = () => {
  const { todoArr, deleteTodos, markasCompleted } = useContext(ToDoContext);
  let date = new Date();

  return (
    <div className="task-list" id="tomorrow">
      <div className="task-header">
        <h2>TOMORROW</h2>
        <span className="task-date">{date.getDate() +1}-{date.getMonth() + 1}-{date.getFullYear()}</span>
      </div>

      {todoArr?.Tomorrow?.map((ele) => {
        return (
          <div key={ele._id} className="task">
            <div className="task-content">
              <input
                className="form-check-input"
                type="checkbox"
                checked={ele.completed}
                disabled={ele.completed}
                onChange={() => {
                  markasCompleted(ele._id);
                }}
              />
              <span
                style={{
                  textDecoration: `${ele.completed ? "line-through" : "none"}`,
                }}
              >
                {ele.todo_task}
              </span>
            </div>

            <div className="task-actions">
              <button
                className="delete-btn"
                onClick={() => deleteTodos(ele._id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TomorrowTasks;
