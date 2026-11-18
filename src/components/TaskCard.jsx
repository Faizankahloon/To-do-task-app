import { Check, MoreHorizontal, Trash2 } from "lucide-react";
import { useContext } from "react";
import { sideBarFilteringTasks } from "../context/TaskContext";
const priority = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-orange-50 text-orange-600",
  Low: "bg-emerald-50 text-emerald-600",
};
const category = {
  Work: "bg-indigo-50 text-indigo-600",
  Study: "bg-orange-50 text-orange-600",
  Personal: "bg-pink-50 text-pink-600",
  Other: "bg-slate-100 text-slate-600",
};
export default function TaskCard({ task }) {
  const completed = task.status === "Completed";
  const { setAllTasks } = useContext(sideBarFilteringTasks);
  const onClickHandleCompleteTask = () => {
    setAllTasks((prev) => {
      return prev.map((item) => {
        return item.id === task.id
          ? {
              ...item,
              status: completed ? "Pending" : "Completed",
            }
          : item;
      });
    });
  };
  const onClickDeleteTask = () => {
    setAllTasks((prev) => {
      return prev.filter((item) => item.id != task.id);
    });
  };
  return (
    <article
      data-task-id={task.id}
      data-category={task.category.toLowerCase()}
      data-priority={task.priority.toLowerCase()}
      data-status={task.status.toLowerCase().replaceAll(" ", "-")}
      className={`flex flex-col justify-between gap-4 rounded-xl border border-slate-100 p-4 transition sm:flex-row sm:items-center ${completed ? "bg-slate-50/70 opacity-75" : "bg-white hover:border-indigo-200"}`}
    >
      <div className="flex min-w-0 items-start gap-4">
        <button
          type="button"
          aria-label={`Mark ${task.title} ${completed ? "incomplete" : "complete"}`}
          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${completed ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300"}`}
          onClick={onClickHandleCompleteTask}
        >
          {completed && <Check size={13} strokeWidth={3} />}
        </button>
        <div className="min-w-0">
          <h4
            className={`break-words font-semibold ${completed ? "text-slate-400 line-through" : "text-slate-800"}`}
          >
            {task.title}
          </h4>
          <p className="mt-2 break-words text-xs leading-relaxed text-slate-400">
            {task.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span
              className={`rounded-md px-2.5 py-1 text-xs font-medium ${category[task.category]}`}
            >
              {task.category}
            </span>
            <span
              className={`rounded-md px-2.5 py-1 text-xs font-medium ${completed ? "bg-emerald-50 text-emerald-600" : priority[task.priority]}`}
            >
              {completed ? "Completed" : `${task.priority} priority`}
            </span>
            {task.status === "In Progress" && (
              <span className="rounded-md bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-600">
                In progress
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 pl-9 sm:justify-end sm:pl-0">
        <div className="sm:text-right">
          <p className="text-xs text-slate-400">Due date</p>
          <p className="mt-1 whitespace-nowrap text-sm font-medium text-slate-600">
            {task.dueDate}
          </p>
        </div>
        <button
          type="button"
          aria-label="Delete task"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          onClick={onClickDeleteTask}
        >
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
}
