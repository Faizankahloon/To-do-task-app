import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import { useEffect, useState } from "react";
import { formContext } from "./context/FormContext";
import { sideBarFilteringTasks } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import NamePrompt from "./components/NamePrompt";
import { tasks } from "./data/tasks";

export default function App() {
  // Controls TaskForm visibility
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Loads the user's name from localStorage (null until they enter one)
  const [userName, setUserName] = useState(() => {
    try {
      return localStorage.getItem("userName") || null;
    } catch (error) {
      console.error("Error loading user name:", error);
      return null;
    }
  });

  const [searchTask, setSearchTasks] = useState("");

  // Stores all tasks and loads saved tasks from localStorage
  const [allTasks, setAllTasks] = useState(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      return Array.isArray(savedTasks) ? savedTasks : [];
    } catch (error){
      return [];
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

  // Saves the user's name whenever it changes
  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    }
  }, [userName]);

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
          userName,
          setUserName,
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

        {!userName && <NamePrompt />}
      </sideBarFilteringTasks.Provider>
    </formContext.Provider>
  );
}
