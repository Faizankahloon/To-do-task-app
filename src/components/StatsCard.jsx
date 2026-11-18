
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  ListTodo,
} from "lucide-react";

import { useEffect, useState, createContext, useContext } from "react";
import TaskList from "./TaskList";
import { sideBarFilteringTasks } from "../context/TaskContext.jsx";

export const userContext = createContext(null);

export default function StatsCard() {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [overDueTasks, setOverDueTasks] = useState(0);

  const date = new Date().toISOString().split("T")[0];

  const { filterMyTasks, allTasks } =
    useContext(sideBarFilteringTasks);

  // Calculate task statistics
  useEffect(() => {
    const completed = allTasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const pending = allTasks.filter(
      (task) =>
        task.status !== "Completed" &&
        task.dueDate >= date
    ).length;

    const overdue = allTasks.filter(
      (task) =>
        task.status !== "Completed" &&
        task.dueDate < date
    ).length;

    setCompletedTasks(completed);
    setPendingTasks(pending);
    setOverDueTasks(overdue);

  }, [allTasks, date]);

  // Statistics data
  const stats = [
    [
      "Total Tasks",
      allTasks.length,
      "All your tasks",
      ListTodo,
      "bg-indigo-50 text-indigo-600",
    ],
    [
      "Completed",
      completedTasks,
      "Great progress!",
      CheckCircle2,
      "bg-emerald-50 text-emerald-600",
    ],
    [
      "Pending",
      pendingTasks,
      "Tasks remaining",
      Clock3,
      "bg-orange-50 text-orange-600",
    ],
    [
      "Overdue",
      overDueTasks,
      "Need your attention",
      AlertCircle,
      "bg-red-50 text-red-500",
    ],
  ];

  return (
    <div className="flex w-full">
      <div className="flex w-full flex-col ml-2">

        {/* Statistics Cards */}
        {filterMyTasks && (
          <section
            className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
            aria-label="Task statistics"
          >
            {stats.map(([title, value, note, Icon, color]) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-500">
                    {title}
                  </p>

                  <span className={`rounded-xl p-2.5 ${color}`}>
                    <Icon size={19} />
                  </span>
                </div>

                <p className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900">
                  {value}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {note}
                </p>
              </article>
            ))}
          </section>
        )}

        {/* Task List */}
        <userContext.Provider value={date}>
          <TaskList />
        </userContext.Provider>

      </div>
    </div>
  );
}
