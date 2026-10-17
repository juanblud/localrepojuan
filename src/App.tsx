import { useState } from "react";
import "./App.css";
import { CalendarPage } from "./components/CalendarPage";
import { CoursesPage } from "./components/CoursesPage";
import { HomePage } from "./components/HomePage";
import { PlanningNotesPage } from "./components/PlanningNotesPage";
import { TaskViewPage } from "./components/TaskViewPage";

import { initialTasks } from "./tasks";

type Page = "home" | "courses" | "calendar" | "planning-notes" | "tasks";

interface NavigationItem {
    id: Page;
    label: string;
    icon: string;
}

const navigation: NavigationItem[] = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "courses", label: "Courses", icon: "📖" },
    { id: "calendar", label: "Calendar", icon: "📅" },
    { id: "planning-notes", label: "Planning Notes", icon: "✏️" },
    { id: "tasks", label: "Task View", icon: "📋" },
];

export function App() {
    const [tasks, setTasks] = useState(initialTasks);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [page, setPage] = useState<Page>("home");

    function navigateTo(nextPage: Page) {
        setPage(nextPage);
        setCollapsed(nextPage !== "home");
    }

    return (
        <div className={`app-shell${collapsed ? " is-collapsed" : ""}`}>
            <aside className="sidebar" aria-label="Sidebar">
                <div className="sidebar-top">
                    <button
                        className="sidebar-toggle"
                        type="button"
                        aria-label={
                            collapsed ? "Expand sidebar" : "Collapse sidebar"
                        }
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? "›" : "‹"}
                    </button>
                </div>
                <nav className="sidebar-nav" aria-label="Main navigation">
                    {navigation.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className={`nav-link${page === item.id ? " active" : ""}`}
                            aria-label={item.label}
                            aria-current={page === item.id ? "page" : undefined}
                            title={collapsed ? item.label : undefined}
                            onClick={() => navigateTo(item.id)}
                        >
                            <span className="nav-icon" aria-hidden="true">
                                {item.icon}
                            </span>
                            <span className="nav-label">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            <main className="main-content">
                {page === "home" ?
                    <HomePage
                        tasks={tasks}
                        onToggleTask={(id) =>
                            setTasks((current) =>
                                current.map((task) =>
                                    task.id === id ?
                                        { ...task, completed: !task.completed }
                                    :   task,
                                ),
                            )
                        }
                        onOpenCourse={() => navigateTo("courses")}
                    />
                : page === "courses" ?
                    <CoursesPage />
                : page === "calendar" ?
                    <CalendarPage />
                : page === "planning-notes" ?
                    <PlanningNotesPage />
                :   <TaskViewPage tasks={tasks} setTasks={setTasks} />}
            </main>
        </div>
    );
}

export default App;
