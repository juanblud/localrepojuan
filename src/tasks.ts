export interface Task {
    id: number;
    title: string;
    course: string;
    section: string;
    date: string;
    completed: boolean;
}

export const initialTasks: Task[] = [
    {
        id: 1,
        title: "Make copies of the homework I will assign today",
        course: "CISC275",
        section: "010",
        date: "2026-10-16",
        completed: false,
    },
    {
        id: 2,
        title: "Create an announcement in canvas for upcoming midterm exam details",
        course: "CISC320",
        section: "011",
        date: "2026-10-18",
        completed: false,
    },
    {
        id: 3,
        title: "Midterm grades due for all classes",
        course: "All",
        section: "All",
        date: "2026-10-26",
        completed: false,
    },
];
