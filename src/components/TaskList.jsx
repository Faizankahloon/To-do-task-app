import { Filter, Plus } from "lucide-react";
import { useContext } from "react";
import TaskCard from "./TaskCard";
import { userContext } from "./StatsCard";
import { formContext } from "../context/FormContext.jsx";
import { sideBarFilteringTasks } from "../context/TaskContext.jsx";

const filters = [
  ["All Tasks", "all"],
  ["Today", "today"],
  ["Upcoming", "upcoming"],
  ["Completed", "completed"],
];

export default function TaskList() {
  const date = useContext(userContext);

  const { allTasks, selectedFilter, setSelectedFilter, searchTask } =
    useContext(sideBarFilteringTasks);

  const { setShowTaskForm } = useContext(formContext);

  // Filter tasks without modifying the original allTasks array
  
const displayedTasks = allTasks.filter((task) => {
  // 1. Check sidebar filters
  let matchesFilter = true;

  if (selectedFilter === "today") {
    matchesFilter = task.dueDate === date;
  } 
  else if (selectedFilter === "upcoming") {
    matchesFilter = task.dueDate > date;
  } 
  else if (selectedFilter === "completed") {
    matchesFilter = task.status === "Completed";
  } 
  else if (
    ["Personal", "Work", "Study", "Other"].includes(selectedFilter)
  ) {
    matchesFilter = task.category === selectedFilter;
  }

  // 2. Check search input
  const search = searchTask.toLowerCase().trim();

  const matchesSearch =
    task.title.toLowerCase().includes(search) ||
    task.category.toLowerCase().includes(search) ||
    task.priority.toLowerCase().includes(search) ||
    task.status.toLowerCase().includes(search);

  // 3. Both conditions must be true
  return matchesFilter && matchesSearch;
});


  // Handle filter button clicks
  const onClickGetButtonValue = (event) => {
    setSelectedFilter(event.currentTarget.value);
  };

  // Open task creation form
  const onClickHandleDisplayTaskForm = () => {
    setShowTaskForm(true);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">My Tasks</h3>

          <p className="mt-1 text-sm text-slate-400">
            Manage and organize your daily activities.
          </p>
        </div>

        <button
          type="button"
          id="add-task-button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          onClick={onClickHandleDisplayTaskForm}
        >
          <Plus size={17} /> Add new task
        </button>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter tasks"
        >
          {filters.map(([label, value]) => (
            <button
              key={value}
              type="button"
              value={value}
              aria-pressed={selectedFilter === value}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                selectedFilter === value
                  ? "bg-indigo-600 text-white"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
              onClick={onClickGetButtonValue}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          id="advanced-filter-button"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-500"
        >
          <Filter size={15} /> Filter
        </button>
      </div>

      {/* Display filtered tasks */}
      <div className="space-y-3" id="task-list">
        {displayedTasks.length > 0 ? (
          displayedTasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="py-10 text-center">
            <p className="text-sm font-semibold text-slate-500">
              No tasks found.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Try another filter or create a new task.
            </p>
          </div>
        )}
      </div>

      {/* Task count */}
      <div className="mt-7 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-5 sm:flex-row">
        <p className="text-xs text-slate-400">
          Showing {displayedTasks.length} of {allTasks.length} tasks
        </p>
      </div>
    </section>
  );
}
