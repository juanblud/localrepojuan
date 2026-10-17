export default {
    files: ["src", "tests"],
    formats: [
        {
            name: "stylish",
            output: "console",
        },
        {
            name: "html",
            output: "file",
            path: "dist/lint.html",
            id: "html",
        },
    ],
    eslintConfig: {},
};
