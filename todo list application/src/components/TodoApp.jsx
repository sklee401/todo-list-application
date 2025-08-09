import React, { useState, useEffect } from "react";

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [input, setInput] = useState("");

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a task
  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  // Toggle completion
  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-gray-900 text-white font-poppins">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">To Do List</h1>

        {/* Task Input */}  
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 rounded-l-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
          />
          <button
            onClick={addTask}
            className="cursor-pointer bg-cyan-400 hover:bg-cyan-500 transition px-4 py-2 rounded-r-lg font-semibold"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white/5 rounded-lg p-3 mb-2 cursor-pointer"
              
            ><span onClick={() => toggleTask(index)} className="w-[100%]">
                 {task.completed ? "✅ " : "⬜ "}
              
              <span
                  className={`cursor-pointer select-none ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                 {task.text}
              </span>
            </span>
             
              <button
                onClick={() => deleteTask(index)}
                className="cursor-pointer text-red-400 hover:text-red-500 scale-200"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
