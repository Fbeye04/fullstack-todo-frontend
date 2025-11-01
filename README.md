# TaskFlow (Evolution from To-Do List Project v1)

**A task management app designed to help undergraduate students and young professionals organize the flow of work, deadlines, and priority tasks efficiently**

[Link Web]
[Link to API Backend (if deployed separately)]
[Link to Repository GitHub Frontend]
[Link to Repository GitHub Backend]

---

## Context & Development Goals

The development ideas are based on my experience as a final-year undergraduate student who had difficulty managing my campus schedule, learning new skills (hard & soft), and supervision for my thesis. Standard To-Do list apps are insufficient. This project started as a to-do list web app to understand the basics of the PERN/MERN stack, but is now being developed as TaskFlow to create structured tools for personal task management, inspired by my real-life needs.

---

## Project Status: Phase 1 Completed (Fully Functional To-Do List)

This first phase focuses on building a solid and polished foundation for the application.

### Key Features of Phase 1:

- **Custom REST API Backend:** Built from scratch using Node.js, Express, and Prisma ORM for interaction with a MySQL database. Includes a full CRUD endpoint for task management.
- **Full CRUD Functionality:** Implementation of Create, Read, Update (title & completion status), and Delete for each task.
- **Dynamic Task Filter:** Ability to filter task views by status: "All", "Active", and "Completed".
- **Bulk Delete Completed Tasks:** "Clear Done" (formerly "Clear All") feature to clear the list of completed tasks, complete with a confirmation modal.
- **Light & Dark Mode:** Implementation of persistent Dark Mode (stored in `localStorage`) using CSS variables and Tailwind CSS.
- **Polished User Experience (UX):**
  - **Loading Indicator:** Use of Skeleton Loader (`react-loading-skeleton`) for initial data loading and Spinner (Tailwind `animate-spin`) for all asynchronous actions (Add, Delete, Edit, Toggle, Clear Done) to provide visual feedback.
  - **Transition Animation:** Implementation of smooth fade-in/out and shift animations for task items when added or removed, using the Framer Motion library.
  - **Responsive Design:** Optimized for both mobile and desktop devices.

---

## Roadmap

### Phase 2: Individual Productivity Features (Forthcoming)

- [ ] Implement **Due Dates**.
- [ ] Implement **Priority Levels** (Low, Medium, High).

### Phase 3: Structure & Organization (Forthcoming)

- [ ] Implement the **"Project"** or **"Category"** system.
- [ ] Build a _sidebar_ UI for navigation.

### Phase 4: Collaboration (Long Term)

- [ ] Implement **User Authentication**.
