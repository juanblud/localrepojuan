import { useState } from "react";
import { initialTasks } from "../src/tasks";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskViewPage } from "../src/components/TaskViewPage";

function TaskViewHarness() {
    const [tasks, setTasks] = useState(initialTasks);
    return <TaskViewPage tasks={tasks} setTasks={setTasks} />;
}

test("edits scheduled task details and preserves completion", async () => {
    const user = userEvent.setup();
    render(<TaskViewHarness />);
    const original = "Make copies of the homework I will assign today";
    await user.click(screen.getByRole("checkbox", { name: original }));
    await user.click(screen.getByRole("button", { name: `Edit ${original}` }));
    await user.clear(screen.getByRole("textbox", { name: "Task" }));
    await user.type(
        screen.getByRole("textbox", { name: "Task" }),
        "Prepare slides",
    );
    await user.selectOptions(screen.getByLabelText("Class"), "CISC320");
    await user.selectOptions(screen.getByLabelText("Section"), "011");
    await user.clear(screen.getByLabelText("Date"));
    await user.type(screen.getByLabelText("Date"), "2026-11-01");
    await user.click(screen.getByRole("button", { name: "Save changes" }));
    const checkbox = screen.getByRole("checkbox", { name: "Prepare slides" });
    expect(checkbox).toBeChecked();
    const row = checkbox.closest("li")!;
    expect(within(row).getByText("CISC320")).toBeInTheDocument();
    expect(within(row).getByText("011")).toBeInTheDocument();
    expect(within(row).getByText("11/01/2026")).toBeInTheDocument();
    expect(screen.queryByText(original)).not.toBeInTheDocument();
});

test("cancels edits and deletes the task being edited", async () => {
    const user = userEvent.setup();
    render(<TaskViewHarness />);
    const original = "Midterm grades due for all classes";
    await user.click(screen.getByRole("button", { name: `Edit ${original}` }));
    await user.clear(screen.getByLabelText("Task"));
    await user.type(screen.getByLabelText("Task"), "Discard this change");
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.getByText(original)).toBeInTheDocument();
    expect(screen.queryByText("Discard this change")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: `Edit ${original}` }));
    await user.click(
        screen.getByRole("button", { name: `Delete ${original}` }),
    );
    expect(screen.queryByText(original)).not.toBeInTheDocument();
    expect(
        screen.getByRole("button", { name: "Add task" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Task")).toHaveValue("");
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
});
