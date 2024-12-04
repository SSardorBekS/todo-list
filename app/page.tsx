"use client";

import Head from "next/head";
import React, { useEffect, useState } from "react";

interface Task {
  id: number;
  text: string;
  status: "unfinished" | "finished";
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks: Task[] = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );
    if (savedTasks.length === 0) {
      savedTasks.push({ id: 1, text: "Task Unfinished", status: "unfinished" });
    }
    setTasks(savedTasks);
  }, []);

  const addTask = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <Head>
        <title>ToDo List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      <header className="list1">
        <div className="todo">
          <h2>ToDo List Title</h2>
          <p>ToDo List Description</p>
        </div>
        <div className="todo1">
          <h4>Section/Context title</h4>
          <button
            onClick={() =>
              addTask({
                id: tasks.length + 1,
                text: "new task",
                status: "finished",
              })
            } 
            className="text-red"
          >
            Add Task
          </button>
          <ul>
            {tasks.map((task) => (
              <li className="task" key={task.id}>
                <label>
                  <span className="cross">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.4999 9.31827L12.9547 14.7731L14.773 12.9548L9.31817 7.5L14.773 2.04518L12.9547 0.226901L7.49989 5.68173L2.04507 0.226902L0.226796 2.04518L5.68162 7.5L0.226797 12.9548L2.04507 14.7731L7.4999 9.31827ZM7.4999 9.31827L9.31817 7.5L7.49989 5.68173L5.68162 7.5L7.4999 9.31827Z"
                        fill="#35383E"
                        fillOpacity="0.25"
                      />
                      <path
                        d="M7.4999 9.31827L9.31817 7.5L7.49989 5.68173L5.68162 7.5L7.4999 9.31827Z"
                        fill="#35383E"
                        fillOpacity="0.25"
                      />
                    </svg>
                  </span>
                  <p>{task.text?.slice(0, 40)}</p>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}
