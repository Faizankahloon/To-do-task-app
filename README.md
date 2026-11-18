# TaskFlow — Semantic UI Only

React + Vite + Tailwind CSS task manager design. The controls are real semantic HTML elements, ready for you to connect to React state and event handlers.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deliberately no functionality
- No React hooks or state
- No `onClick`, `onChange`, `onSubmit`, or other event handlers
- No working search, filters, form submission, CRUD, localStorage, API, or backend

## Semantic elements included
- Search: real `<input type="search">`
- Task form: real `<form>`, `<input>`, `<textarea>`, `<select>`, and associated `<label>` elements
- Filters: real `<button type="button">` controls with `data-filter` attributes
- Category controls: real buttons with `data-category` attributes
- Task cards: `data-task-id`, `data-category`, `data-priority`, and `data-status` attributes
- All visible action controls are actual `<button>` elements, not styled `<div>` containers
- Sample data is isolated in `src/data/tasks.js`

The controls are intentionally inert. Add React hooks, props, handlers, and filtering logic yourself.
