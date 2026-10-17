import { useEffect, useState } from "react";
import type { Task } from "../tasks";

interface Course {
    code: string;
    title: string;
    semester: string;
}

interface HomePageProps {
    tasks: Task[];
    onToggleTask: (id: number) => void;
    onOpenCourse: () => void;
}

const exampleCourses: Course[] = [
    { code: "CISC 275", title: "Software Engineering", semester: "Fall 2026" },
    { code: "CISC 320", title: "Algorithms", semester: "Fall 2026" },
];

function normalizeSearchText(value: string): string {
    return value.toLowerCase().replace(/\s+/g, "");
}

export function HomePage({ onOpenCourse, tasks, onToggleTask }: HomePageProps) {
    const [search, setSearch] = useState("");
    const [semester, setSemester] = useState("Fall 2026");
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const nextDay = new Date(now);
        nextDay.setHours(24, 0, 0, 0);
        const timer = window.setTimeout(
            () => setNow(new Date()),
            Math.max(0, nextDay.getTime() - Date.now()),
        );
        return () => window.clearTimeout(timer);
    }, [now]);
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const todayTasks = tasks.filter((task) => task.date === today);

    const normalizedSearch = normalizeSearchText(search);
    const visibleCourses = exampleCourses.filter(
        (course) =>
            course.semester === semester &&
            normalizeSearchText(`${course.code} ${course.title}`).includes(
                normalizedSearch,
            ),
    );

    return (
        <>
            <header className="home-header">
                <h1>Semester Planning Tool</h1>
                <p>Your favorite place to plan as an Instructor!</p>
            </header>

            <section className="course-toolbar" aria-label="Course controls">
                <label className="semester-field">
                    <span>Semester</span>
                    <select
                        value={semester}
                        onChange={(event) => setSemester(event.target.value)}
                    >
                        <option>Fall 2026</option>
                        <option>Spring 2027</option>
                    </select>
                </label>
                <label className="search-field">
                    <span>Search by course code or title</span>
                    <input
                        type="search"
                        placeholder="Search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </label>
                <button
                    className="create-course"
                    type="button"
                    disabled
                    title="Course creation is coming soon"
                >
                    +&nbsp; Create Course
                </button>
            </section>

            <section
                className="courses-section"
                aria-labelledby="courses-title"
            >
                <h2 id="courses-title">Current courses</h2>
                {visibleCourses.length > 0 ?
                    <div className="course-grid">
                        {visibleCourses.map((course) => (
                            <article className="course-card" key={course.code}>
                                <h3>{course.code}</h3>
                                <p>{course.title}</p>
                                <p>{course.semester}</p>
                                <button type="button" onClick={onOpenCourse}>
                                    Open Course Plan
                                </button>
                            </article>
                        ))}
                    </div>
                :   <p className="empty-message">
                        No courses match this selection.
                    </p>
                }
            </section>

            <section className="todo-section" aria-labelledby="todo-title">
                <h2 id="todo-title">
                    Today&apos;s tasks:{" "}
                    <time dateTime={today}>
                        {now.toLocaleDateString("en-US")}
                    </time>
                </h2>
                <div className="todo-table-wrap">
                    <table className="todo-table">
                        <thead>
                            <tr>
                                <th scope="col">Course</th>
                                <th scope="col">Task</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayTasks.map((task) => (
                                <tr key={task.id}>
                                    <th scope="row">{task.course}</th>
                                    <td>
                                        <label className="todo-item">
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() =>
                                                    onToggleTask(task.id)
                                                }
                                            />
                                            <span>{task.title}</span>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                            {todayTasks.length === 0 && (
                                <tr>
                                    <td colSpan={2}>
                                        No tasks scheduled for today.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}
