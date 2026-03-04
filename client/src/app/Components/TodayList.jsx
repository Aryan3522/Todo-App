"use client";
import React, { useContext, useEffect, useState } from "react";
import { ToDoContext } from "../Context/TodoTaskContext";

const TodayTasks = () => {
  const { todoArr, deleteTodos, markasCompleted, moveToTomorrow } =
    useContext(ToDoContext);
  let date = new Date();
  return (
    <div className="task-list" id="today">
      <div className="task-header">
        <h2>Today</h2>
        <span className="task-date">{date.getDate()}-{date.getMonth()+1}-{date.getFullYear()}</span>
      </div>
      {todoArr?.Today?.map((ele) => {
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
              <button
                className="move-btn"
                onClick={() => moveToTomorrow(ele._id)}
              >
                Tomorrow
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodayTasks;
