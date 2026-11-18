
import { X } from "lucide-react";
import { useState, useContext } from "react";
import { formContext } from "../context/FormContext";
import { sideBarFilteringTasks } from "../context/TaskContext";

export default function TaskForm() {
  const { setShowTaskForm } = useContext(formContext);

  const { setAllTasks } = useContext(sideBarFilteringTasks);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !taskTitle.trim() ||
      !taskCategory ||
      !taskPriority ||
      !taskDueDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create new task object
    const newTask = {
      id: Date.now(),
      title: taskTitle.trim(),
      description: taskDescription,
      category: taskCategory,
      priority: taskPriority,
      dueDate: taskDueDate,
      status: taskStatus,
      createdAt: new Date().toISOString().split("T")[0],
    };

    // Add new task to the complete task collection
    setAllTasks((prev) => [...prev, newTask]);

    // Close task form
    setShowTaskForm(false);
  };

  return (
    <section
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm sm:p-8"
      aria-labelledby="create-task-heading"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowTaskForm(false);
        }
      }}
    >
      <div className="mt-0 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl md:p-7">

        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3
              id="create-task-heading"
              className="text-xl font-extrabold text-slate-900"
            >
              Create New Task
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Add a new task to your workspace.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close task form"
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-50"
            onClick={() => setShowTaskForm(false)}
          >
            <X size={19} />
          </button>
        </div>

        <form
          id="task-form"
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
          onSubmit={handleSubmit}
        >
          <div className="md:col-span-2">
            <label
              htmlFor="task-title"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Task Title
            </label>

            <input
              id="task-title"
              name="title"
              type="text"
              placeholder="Enter task title..."
              className="field"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="task-description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Description
            </label>

            <textarea
              id="task-description"
              name="description"
              rows="3"
              placeholder="Write a short description..."
              className="field resize-none"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="task-category"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Category
            </label>

            <select
              id="task-category"
              name="category"
              value={taskCategory}
              className="field"
              onChange={(e) => setTaskCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option>Personal</option>
              <option>Work</option>
              <option>Study</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="task-priority"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Priority
            </label>

            <select
              id="task-priority"
              name="priority"
              value={taskPriority}
              className="field"
              onChange={(e) => setTaskPriority(e.target.value)}
              required
            >
              <option value="" disabled>
                Select priority
              </option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="task-due-date"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Due Date
            </label>

            <input
              id="task-due-date"
              name="dueDate"
              type="date"
              className="field"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="task-status"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Status
            </label>

            <select
              id="task-status"
              name="status"
              value={taskStatus}
              className="field"
              onChange={(e) => setTaskStatus(e.target.value)}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="mt-2 flex justify-end gap-3 md:col-span-2">
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              onClick={() => setShowTaskForm(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
