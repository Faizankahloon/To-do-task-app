
import {
  LayoutDashboard,
  ListTodo,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import { useContext } from "react";
import { sideBarFilteringTasks } from "../context/TaskContext.jsx";

const links = [
  ["Dashboard", LayoutDashboard, "all"],
  ["My Tasks", ListTodo, "my-tasks"],
  ["Upcoming", CalendarDays, "upcoming"],
  ["Completed", CheckCircle2, "completed"],
];

const categories = [
  ["Personal", "bg-pink-500"],
  ["Work", "bg-indigo-500"],
  ["Study", "bg-orange-500"],
  ["Other", "bg-emerald-500"],
];

export default function Sidebar() {
  const {
    allTasks,
    filterMyTasks,
    setFilterMyTasks,
    setSelectedFilter,
  } = useContext(sideBarFilteringTasks);

  // Handle sidebar navigation
  const onClickHandleFilterMyTasks = (event) => {
    const value = event.currentTarget.value;

    if (value === "all") {
      setFilterMyTasks(true);
      setSelectedFilter("all");
    } 
    else if (value === "my-tasks") {
      setFilterMyTasks(false);
      setSelectedFilter("all");
    } 
    else if (value === "upcoming") {
      setFilterMyTasks(false);
      setSelectedFilter("upcoming");
    } 
    else if (value === "completed") {
      setFilterMyTasks(false);
      setSelectedFilter("completed");
    }
  };

  // Handle category filtering
  const onClickHandleListCatagory = (event) => {
    const category = event.currentTarget.value;

    setFilterMyTasks(false);
    setSelectedFilter(category);
  };

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-6 lg:flex">

      {/* Logo */}
      <div className="mb-12 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white">
          T
        </div>

        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
          TaskFlow
        </h1>
      </div>

      {/* Workspace */}
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
        Workspace
      </p>

      <nav className="space-y-1" aria-label="Workspace navigation">
        {links.map(([label, Icon, value]) => (
          <button
            key={label}
            type="button"
            value={value}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold ${
              (value === "all" && filterMyTasks) ||
              (value === "my-tasks" && !filterMyTasks)
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-500 hover:bg-slate-50"
            }`}
            onClick={onClickHandleFilterMyTasks}
          >
            <Icon size={18} />

            {label}

            {label === "My Tasks" && (
              <span className="ml-auto rounded-lg bg-slate-100 px-2 py-1 text-xs">
                {allTasks.length}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Categories */}
      <p className="mb-4 mt-10 text-xs font-bold uppercase tracking-widest text-slate-400">
        Categories
      </p>

      <nav className="space-y-1" aria-label="Task categories">
        {categories.map(([label, color]) => (
          <button
            key={label}
            type="button"
            value={label}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-500 hover:bg-slate-50"
            onClick={onClickHandleListCatagory}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${color}`} />

            {label}

            <span className="ml-auto text-xs text-slate-400">
              {allTasks.filter((task) => task.category === label).length}
            </span>
          </button>
        ))}
      </nav>

      {/* Productivity Card */}
      <div className="mt-auto rounded-2xl bg-indigo-50 p-4">
        <p className="text-sm font-bold text-indigo-950">
          Stay productive!
        </p>

        <p className="mt-2 text-xs leading-relaxed text-indigo-700">
          Small steps every day lead to big achievements.
        </p>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-indigo-100">
          <div className="h-full w-2/3 rounded-full bg-indigo-500" />
        </div>

        <p className="mt-2 text-right text-[11px] font-semibold text-indigo-600">
          Daily focus
        </p>
      </div>

    </aside>
  );
}
