import { useRef, useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { Task } from "../tasks";

interface TaskViewPageProps {
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>>;
}

export function TaskViewPage({ tasks, setTasks }: TaskViewPageProps) {
    const [title, setTitle] = useState("");
    const [course, setCourse] = useState("All");
    const [section, setSection] = useState("All");
    const [date, setDate] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const titleInput = useRef<HTMLInputElement>(null);

    function resetForm() {
        setEditingId(null);
        setTitle("");
        setCourse("All");
        setSection("All");
        setDate("");
    }

    function editTask(task: Task) {
        setEditingId(task.id);
        setTitle(task.title);
        setCourse(task.course);
        setSection(task.section);
        setDate(task.date);
        titleInput.current?.focus();
    }

    function saveTask(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!title.trim()) return;
        if (editingId !== null) {
            setTasks((current) =>
                current.map((task) =>
                    task.id === editingId ?
                        {
                            ...task,
                            title: title.trim(),
                            course,
                            section: section.trim() || "All",
                            date,
                        }
                    :   task,
                ),
            );
            resetForm();
            return;
        }
        setTasks((current) => [
            ...current,
            {
                id: Math.max(0, ...current.map((task) => task.id)) + 1,
                title: title.trim(),
                course,
                section: section.trim() || "All",
                date,
                completed: false,
            },
        ]);
        resetForm();
    }

    return (
        <section className="task-view-page">
            <header className="page-header">
                <h1>Task View</h1>
            </header>
            <div className="task-panel">
                {editingId !== null && (
                    <p className="task-edit-notice" role="status">
                        Editing task — update the fields below, then save.
                    </p>
                )}
                <form className="task-form" onSubmit={saveTask}>
                    <button
                        type="submit"
                        className="task-add"
                        aria-label={
                            editingId !== null ? "Save task" : "Add task"
                        }
                        title={editingId !== null ? "Save task" : "Add task"}
                    >
                        {editingId !== null ? "✓" : "+"}
                    </button>
                    <label>
                        Task
                        <input
                            ref={titleInput}
                            required
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </label>
                    <label>
                        Class
                        <select
                            value={course}
                            onChange={(event) => setCourse(event.target.value)}
                        >
                            <option>All</option>
                            <option>CISC275</option>
                            <option>CISC320</option>
                        </select>
                    </label>
                    <label>
                        Section
                        <select
                            value={section}
                            onChange={(event) => setSection(event.target.value)}
                        >
                            <option>All</option>
                            <option>010</option>
                            <option>011</option>
                        </select>
                    </label>
                    <label>
                        Date
                        <input
                            type="date"
                            required
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                        />
                    </label>
                    {editingId !== null && (
                        <div className="task-edit-actions">
                            <button type="submit">Save changes</button>
                            <button type="button" onClick={resetForm}>
                                Cancel
                            </button>
                        </div>
                    )}
                </form>
                {tasks.length === 0 && (
                    <p className="task-edit-notice" role="status">
                        No tasks scheduled. Add a task above to get started.
                    </p>
                )}
                <ul className="task-list" aria-label="Tasks">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className={`task-row${task.completed ? " is-complete" : ""}`}
                        >
                            <label className="task-title">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() =>
                                        setTasks((current) =>
                                            current.map((item) =>
                                                item.id === task.id ?
                                                    {
                                                        ...item,
                                                        completed:
                                                            !item.completed,
                                                    }
                                                :   item,
                                            ),
                                        )
                                    }
                                />
                                <span>{task.title}</span>
                            </label>
                            <span>
                                <span className="task-mobile-label">
                                    Class:{" "}
                                </span>
                                {task.course}
                            </span>
                            <span>
                                <span className="task-mobile-label">
                                    Section:{" "}
                                </span>
                                {task.section}
                            </span>
                            <time dateTime={task.date}>
                                <span className="task-mobile-label">
                                    Date:{" "}
                                </span>
                                {task.date
                                    .split("-")
                                    .slice(1)
                                    .concat(task.date.split("-")[0])
                                    .join("/")}
                            </time>
                            <div className="task-actions">
                                <button
                                    type="button"
                                    aria-label={`Edit ${task.title}`}
                                    onClick={() => editTask(task)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="task-delete"
                                    aria-label={`Delete ${task.title}`}
                                    onClick={() => {
                                        setTasks((current) =>
                                            current.filter(
                                                (item) => item.id !== task.id,
                                            ),
                                        );
                                        if (editingId === task.id) resetForm();
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
