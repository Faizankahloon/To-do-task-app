import { Bell, Search, Menu } from "lucide-react";
import { useContext, useState } from "react";
import { sideBarFilteringTasks } from "../context/TaskContext";
export default function Header() {
    const days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
    const date = new Date();
    const dayNumber = date.getDay()
    const day = days[dayNumber];
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
    const hour = date.getHours();
    let greeting;
    if(hour < 12) {
        greeting = "Morning"
    }
    else if(hour < 18 ) {
        greeting = "Afternoon"
    }
    else {
        greeting = "Evening"
    }
    
    const {allTasks, setAllTasks, searchTask, setSearchTasks, userName} = useContext(sideBarFilteringTasks);
        allTasks.filter((task) => task.title === searchTask);
        allTasks.filter((task) => task.category === searchTask);
        allTasks.filter((task) => task.priority === searchTask)
        allTasks.filter((task) => task.status === searchTask)

  return (
    <header className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      <div className="flex items-start gap-3">
        <button
          type="button"
          aria-label="Open navigation menu"
          className="mt-1 rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 lg:hidden"
        >
          <Menu size={19} />
        </button>
        <div>
          <p className="text-sm font-medium text-slate-400">
            {day}, {formattedDate}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Good {greeting}, {userName || "there"} 👋
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Here's what's happening with your tasks today.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:w-60 sm:flex-none">
          <Search size={17} className="shrink-0 text-slate-400" />
          <input
            type="search"
            name="taskSearch"
            placeholder="Search tasks..."
            aria-label="Search tasks"
            className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
            onChange={(e) => setSearchTasks(e.target.value)}
          />
        </label>
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
        >
          <Bell size={18} />
          <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white" />
        </button>
        <button
          type="button"
          aria-label="Open profile"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 font-bold text-[#f1f1f1] px-5"
        >
          {userName ? userName.trim().charAt(0).toUpperCase() : "?"}
        </button>
      </div>
    </header>
  );
}
