import { useState, useContext } from "react";
import { Sparkles } from "lucide-react";
import { sideBarFilteringTasks } from "../context/TaskContext";

export default function NamePrompt() {
  const { setUserName } = useContext(sideBarFilteringTasks);

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    setUserName(trimmedName);
  };

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm sm:p-8"
      aria-labelledby="name-prompt-heading"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
        <div className="mb-6 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Sparkles size={20} />
          </div>

          <div>
            <h3
              id="name-prompt-heading"
              className="text-xl font-extrabold text-slate-900"
            >
              Welcome to TaskFlow
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              What should we call you?
            </p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="user-name"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Your name
            </label>

            <input
              id="user-name"
              name="userName"
              type="text"
              placeholder="e.g. Faizan"
              className="field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              autoComplete="name"
              maxLength={40}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!name.trim()}
          >
            Get Started
          </button>
        </form>
      </div>
    </section>
  );
}
