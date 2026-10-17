import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../src/App";

test("home shows today's scheduled tasks and shares changes with Task View", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 9, 16, 12));
    try {
        const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        render(<App />);
        expect(
            screen.getByRole("heading", { name: "Today's tasks: 10/16/2026" }),
        ).toBeInTheDocument();
        const original = "Make copies of the homework I will assign today";
        expect(screen.getByText(original)).toBeInTheDocument();
        expect(
            screen.queryByText("Midterm grades due for all classes"),
        ).not.toBeInTheDocument();
        await user.click(screen.getByRole("checkbox", { name: original }));
        await user.click(screen.getByRole("button", { name: "Task View" }));
        expect(screen.getByRole("checkbox", { name: original })).toBeChecked();
        await user.type(
            screen.getByLabelText("Task"),
            "Prepare today's lecture",
        );
        await user.type(screen.getByLabelText("Date"), "2026-10-16");
        await user.click(screen.getByRole("button", { name: "Add task" }));
        await user.click(screen.getByRole("button", { name: "Home" }));
        expect(screen.getByText("Prepare today's lecture")).toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: "Task View" }));
        await user.click(
            screen.getByRole("button", {
                name: "Delete Prepare today's lecture",
            }),
        );
        await user.click(screen.getByRole("button", { name: "Home" }));
        expect(
            screen.queryByText("Prepare today's lecture"),
        ).not.toBeInTheDocument();
        expect(screen.getByRole("checkbox", { name: original })).toBeChecked();
    } finally {
        jest.useRealTimers();
    }
});
