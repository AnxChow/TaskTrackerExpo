import React, { createContext, useState, useContext } from "react";

// Define what a Task looks like
interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// Define what operations we can do with tasks
interface TaskContextType {
  tasks: Task[]; // The list of tasks
  addTask: (title: string) => void; // Function to add a task
  toggleTask: (id: string) => void; // Function to mark task complete/incomplete
  deleteTask: (id: string) => void; // Function to remove a task
}

// Create the context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Custom hook to use tasks
export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  // Store our list of tasks with useState hook
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Learn React Native", completed: false },
    { id: "2", title: "Build TaskTracker App", completed: false },
  ]);

  // Implementation of our task management functions
  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(), // Simple way to generate unique IDs
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]); // Add new task to existing array
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Return the Provider component with our values
  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTask, deleteTask, useTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
}
