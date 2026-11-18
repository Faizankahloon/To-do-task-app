import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import { useEffect, useState } from "react";
import { formContext } from "./context/FormContext";
import { sideBarFilteringTasks } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import { tasks } from "./data/tasks";

export default function App() {
  // Controls TaskForm visibility
  const [showTaskForm, setShowTaskForm] = useState(false);

  const [searchTask, setSearchTasks] = useState("");

  // Stores all tasks and loads saved tasks from localStorage
  const [allTasks, setAllTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");

      if (savedTasks !== null) {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
          // Merge original tasks with saved tasks.
          // Saved tasks take priority if IDs are identical.
          const mergedTasks = new Map();

          tasks.forEach((task) => {
            mergedTasks.set(task.id, task);
          });

          parsedTasks.forEach((task) => {
            mergedTasks.set(task.id, task);
          });

          return Array.from(mergedTasks.values());
        }
      }

      return tasks;
    } catch (error) {
      console.error("Error loading tasks:", error);
      return tasks;
    }
  });

  // Controls sidebar task filtering
  const [filterMyTasks, setFilterMyTasks] = useState(true);

  // Controls TaskList filters
  const [selectedFilter, setSelectedFilter] = useState("all");

  

  // Saves tasks whenever allTasks changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }, [allTasks]);

  return (
    <formContext.Provider
      value={{
        showTaskForm,
        setShowTaskForm,
      }}
    >
      <sideBarFilteringTasks.Provider
        value={{
          allTasks,
          setAllTasks,
          filterMyTasks,
          setFilterMyTasks,
          selectedFilter,
          setSelectedFilter,
          searchTask,
          setSearchTasks,
        }}
      >
        <div className="flex min-h-screen">
          <Sidebar />

          <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
            <div className="flex flex-col">
              <Header />
              <StatsCard />
            </div>

            <footer className="mt-8 text-center text-xs text-slate-400">
              © 2026 TaskFlow. Stay focused. Get things done.
            </footer>
          </main>
        </div>

        {showTaskForm && <TaskForm />}
      </sideBarFilteringTasks.Provider>
    </formContext.Provider>
  );
}
