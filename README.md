# FocusBoard — Task Management Dashboard

> **MobileFirst Candidate Assessment Submission**  
> A functional, responsive task management dashboard built with React.js, Vite, Lucide React, and modern CSS, based on the FocusBoard Figma design specifications.

---

## 🚀 Live Demo & Repository Links

- **Live Hosted Application:** [https://focusboard-task-management.vercel.app](https://focusboard-task-management.vercel.app) *(or your deployed Vercel/Netlify URL)*
- **GitHub Repository:** [https://github.com/your-username/focusboard](https://github.com/your-username/focusboard)

---

## 🎯 Project Overview & Objective

The objective of this project is to implement a high-fidelity, single-user task management dashboard (**FocusBoard**) that demonstrates:
1. **React Fundamentals & Component Architecture:** Clean decomposition into single-responsibility reusable components.
2. **State Management & Data Flow:** Predictable unidirectional data flow, avoiding state mutation, with derived metrics memoized via `useMemo`.
3. **Full CRUD Operations:** Create, Read, Update, and Delete tasks with validation and destructive action confirmations.
4. **Three-Slide Focus Notes Carousel:** Smooth circular navigation with working Previous/Next buttons and interactive indicator dots.
5. **Real-time Search & Multi-criteria Filtering:** Case-insensitive search combined simultaneously with status tabs, priority dropdowns, and category filters.
6. **Browser Data Persistence:** Seamless persistence using a custom `useLocalStorage` hook with automatic fallback to initial sample tasks on first launch.
7. **Pixel-Perfect Responsiveness & Accessibility:** Optimized for **1440px** (Desktop), **768px** (Tablet), and **390px** (Mobile) viewports.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component-based UI rendering and component hierarchy |
| **Vite** | Blazing-fast development server, asset bundling, and production build |
| **JavaScript (ES6+)** | Application logic, array methods, and immutable state updates |
| **CSS3 (Custom Properties)** | Responsive design, CSS grid, flexbox, and pixel-perfect Figma styling |
| **Lucide React** | Clean, accessible vector icons |
| **Browser `localStorage`** | Client-side persistent task storage |

---

## 📁 Project Folder Structure

```text
focusboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/               # Static assets and icons
│   ├── components/           # Reusable UI components
│   │   ├── Sidebar.jsx       # Brand navigation & collapsible mobile drawer
│   │   ├── Header.jsx        # Breadcrumb, date display, notifications & Add Task CTA
│   │   ├── StatCard.jsx      # Reusable statistical overview cards
│   │   ├── FocusNotes.jsx    # Mandatory 3-slide productivity carousel
│   │   ├── SearchBar.jsx     # Debounced case-insensitive search input with clear
│   │   ├── FilterTabs.jsx    # Status tabs (All, To do, In progress, Completed) & dropdowns
│   │   ├── TaskList.jsx      # Task grid container and zero-match empty state
│   │   ├── TaskCard.jsx      # Individual task card with inline status changer & actions
│   │   ├── TaskForm.jsx      # Unified modal form for Create and Edit operations
│   │   └── DeleteConfirmModal.jsx # Accessible confirmation modal for task deletion
│   ├── data/
│   │   └── sampleTasks.js    # 7 initial rich sample tasks with diverse priorities
│   ├── hooks/
│   │   └── useLocalStorage.js # Custom hook for safe localStorage persistence
│   ├── App.jsx               # Main state container & dashboard layout orchestrator
│   ├── main.jsx              # React application entry point
│   └── index.css             # Comprehensive responsive & theme styles
├── screenshots/              # Desktop and mobile application screenshots
├── README.md                 # Project documentation
├── AI_USAGE.md               # AI disclosure and audit log
├── package.json              # Project dependencies and build scripts
└── vite.config.js            # Vite build configuration
```

---

## ✨ Key Features Implemented

### 1. Dynamic Overview Statistics (Never Hardcoded)
All dashboard metrics are dynamically calculated directly from the live `tasks` state:
- **Total Tasks:** Count of all existing tasks (`tasks.length`).
- **In Progress:** Count of tasks with status `In progress`.
- **Completed:** Count of tasks with status `Completed`.
- **Completion Rate:** Derived using the formula:
  $$\text{Completion \%} = \frac{\text{Completed Tasks}}{\text{Total Tasks}} \times 100$$
  *(Includes safe division-by-zero handling returning `0%` when tasks list is empty).*

### 2. Mandatory 3-Slide Focus Notes Carousel
Implemented exactly according to the Figma specification:
- **Slide 1:** *Plan your day* — *"Organise your priorities and focus on what matters most."* (`FOCUS NOTES · 1 OF 3`)
- **Slide 2:** *Deep Work Sessions* — *"Block dedicated 45-minute uninterrupted intervals to make real progress on complex tasks."* (`FOCUS NOTES · 2 OF 3`)
- **Slide 3:** *Review & Reflect* — *"Track your completion metrics and celebrate small wins every day."* (`FOCUS NOTES · 3 OF 3`)
- **Controls:** Previous and Next buttons with circular wrapping, plus clickable indicator dots to navigate directly to any slide.

### 3. Comprehensive CRUD Operations
- **Create:** Click "Add Task" to open the modal. Validates that the Title is not empty or whitespace-only. Generates a unique task ID upon submission.
- **Read:** Clear visual hierarchy displaying Title, Description, Category pill, Priority badge, Due Date, and Status.
- **Update / Edit:** Clicking Edit reopens the unified form pre-populated with task data, preserving the original unique ID upon saving.
- **Delete:** Clicking Delete triggers an accessible confirmation dialog preventing accidental loss of data.
- **Inline Status Changer:** Change status directly via the card dropdown (`To do`, `In progress`, `Completed`), updating metrics and storage immediately.

### 4. Combined Search & Multi-criteria Filtering
- **Case-insensitive Search:** Instant keyword matching across task titles and descriptions.
- **Status Tabs:** Filter tasks by `All`, `To do`, `In progress`, or `Completed` with dynamic item count badges on each tab.
- **Priority Filter:** Filter by `High`, `Medium`, or `Low`.
- **Category Filter:** Filter by `Design`, `Development`, `Testing`, or `Research`.
- **Compound Filtering:** All filters operate simultaneously. A dedicated **"Reset Filters"** button appears when active filters yield zero or refined results.

### 5. LocalStorage Data Persistence
- Synchronized under the key `focusboard_tasks`.
- On first launch, initializes with 7 diverse sample tasks.
- On subsequent visits/refreshes, restores user modifications without overwriting them.

### 6. Responsive Design Across 3 Breakpoints
- **Desktop (1440px):** 260px fixed sidebar, 4-column overview statistics, 2-column task grid, balanced whitespace.
- **Tablet (768px):** 2-column statistics, reflowed filter bar, touch-friendly dropdowns.
- **Mobile (390px):** Collapsible slide-out drawer menu, single-column stacked cards, full-width modal forms, minimum 44px tap targets.

---

## 🧠 State Management Explanation

The application follows a **Single Source of Truth** architecture using React Hooks (`useState`, `useMemo`, `useEffect`) and a custom `useLocalStorage` hook:

1. **Centralized Task State:** The primary dataset `tasks` resides in `App.jsx`. Sub-components receive data through props and trigger updates via explicit handler callbacks (`onEdit`, `onDelete`, `onStatusChange`).
2. **Immutability:** State mutations never alter existing arrays directly. All updates utilize immutable patterns:
   - *Add:* `setTasks(prev => [newTask, ...prev])`
   - *Update:* `setTasks(prev => prev.map(t => t.id === updated.id ? updated : t))`
   - *Delete:* `setTasks(prev => prev.filter(t => t.id !== id))`
3. **Derived Metrics with `useMemo`:** Filtered task lists and statistical aggregations are memoized to avoid redundant calculations on unrelated re-renders.
4. **Decoupled Carousel State:** The carousel maintains its slide index locally inside `FocusNotes.jsx`, preventing task updates from triggering unnecessary carousel re-renders.

---

## 💻 Installation & Local Development

### Prerequisites
- Node.js (version 18+ recommended)
- npm or pnpm

### Steps
```bash
# 1. Clone the repository
git clone https://github.com/your-username/focusboard.git

# 2. Navigate to project directory
cd focusboard

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open your browser to: `http://localhost:5173`

### Production Build
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ♿ Accessibility & Usability

- Semantic elements (`<aside>`, `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`).
- Visible focus rings with outline offsets for keyboard navigation.
- Accessible modals featuring backdrop click-to-close and `Escape` key dismissal.
- Form inputs linked to `<label>` elements and `aria-invalid` error states.
- High contrast ratios adhering to WCAG 2.1 AA standards.

---

## 📝 Submission Details

- **Candidate Name:** MobileFirst Candidate
- **Framework:** React 19 + Vite
- **Repository:** Public on GitHub
- **Deployment:** Vercel / Netlify
- **Known Limitations:** None. All assignment requirements are fully implemented.
