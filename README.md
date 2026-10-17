# CISC275 Final Project Starter

This is the starting point for your team's final project: a React +
TypeScript application built with Vite, tested with Jest and Testing
Library, linted with ESLint and Prettier, and deployed automatically to
GitHub Pages.

## Prerequisites

- **Node.js 22** (see `.nvmrc`). Check with `node --version`. If you use
  [nvm](https://github.com/nvm-sh/nvm) or
  [Volta](https://volta.sh/), they will pick up the version automatically.
- **Git** and a GitHub account that is a member of your team's repository.
- **VS Code** is recommended. When you open the folder it will offer to
  install the ESLint and Prettier extensions; accept. The workspace settings
  format your code on save and fix lint problems on save.

## Getting started

```sh
npm install        # install dependencies (first time, or after package.json changes)
npm run dev        # start the dev server at http://localhost:5173 with hot reload
```

Edit `src/App.tsx` and the page updates in the browser as you save.

## Scripts

| Command                | What it does                                                           |
| ---------------------- | ---------------------------------------------------------------------- |
| `npm run dev`          | Start the development server with hot reload.                          |
| `npm run build`        | Type-check with `tsc` and build a production bundle into `dist/`.      |
| `npm run preview`      | Serve the production bundle locally to check it before pushing.        |
| `npm test`             | Run Jest in watch mode (re-runs tests as you edit).                    |
| `npm run test:ci`      | Run the tests once and exit (what CI uses).                            |
| `npm run test:cov`     | Run the tests once with a coverage report.                             |
| `npm run lint`         | Run ESLint, which also checks Prettier formatting.                     |
| `npm run lint:fix`     | Fix every lint and formatting problem that can be fixed automatically. |
| `npm run format`       | Run Prettier on the whole repository.                                  |
| `npm run format:check` | Report files Prettier would change, without changing them.             |

Before you push, run `npm run lint` and `npm run test:ci`. The same checks run
on GitHub, and a red X on your commit means one of them failed.

## Project layout

```
src/            Application code. Add components, types, and helpers here.
src/main.tsx    Entry point; mounts <App /> into index.html. Rarely needs changes.
src/App.tsx     Root component. Replace the example counter with your project.
tests/          Jest tests. Files must end in .spec.ts or .spec.tsx.
tests/setupTests.ts   Loads the jest-dom matchers (toBeInTheDocument, etc.).
public/         Static files copied to the site as-is (favicon, images).
docs/           Markdown files published under /docs/ on your site.
```

## Testing

Tests live in `tests/` and use [Jest](https://jestjs.io/) with
[Testing Library](https://testing-library.com/docs/react-testing-library/intro).
`tests/App.spec.tsx` shows the two patterns you will use most:

- Query elements the way a user would find them, with `getByRole`,
  `getByText`, or `getByLabelText`.
- Interact with `userEvent.setup()`; its methods are async, so `await` them.

Every feature should come with a test. The dashboard (below) shows the test
results and coverage for every deployment.

## Linting and formatting

ESLint is configured in `eslint.config.js` with type-aware rules. A few things
it enforces that you may not be used to:

- `any` and `unknown` are not allowed; figure out the real type.
- Unused variables, imports, and parameters are errors.
- `@ts-ignore` style comments are errors.
- Prettier formatting is checked as a lint rule, so an unformatted file fails
  lint. Run `npm run lint:fix` or save in VS Code to format.

Do not weaken the lint or test configuration. The deployment records checksums
of these files on the dashboard, and we compare them to the template.

## Deployment and the dashboard

Every push to `main` runs `.github/workflows/deploy.yaml`, which installs,
lints, builds, tests, and publishes your site to GitHub Pages at:

```
https://juanblud.github.io/localrepojuan/
```

Alongside the site it publishes a **dashboard** with the results of every
step, a GitInspector report of who contributed what, and your recent commit
messages:

```
https://juanblud.github.io/localrepojuan/dashboard.html
```

If lint, build, or tests fail, the dashboard still deploys and shows the error
at the top, and the workflow run is marked failed. Fix the problem locally,
confirm with `npm run lint` and `npm run test:ci`, and push again.

The first time, a repository admin must enable Pages: **Settings > Pages >
Source: GitHub Actions**.

For this repository, open
[Pages settings](https://github.com/juanblud/localrepojuan/settings/pages)
and select **GitHub Actions** as the source. Commit and push your changes to
`main`, then check the
[deployment workflow](https://github.com/juanblud/localrepojuan/actions/workflows/deploy.yaml).
You can also use **Run workflow** there to deploy the current `main` branch.

Vite's `base` is set to `/localrepojuan/` so production assets load from the
repository's Pages URL. Update it if you rename the repository or use a custom
domain. To check a production build locally, run `npm run build` followed by
`npm run preview` and open the URL it prints.

Pull requests run `.github/workflows/ci.yaml`, which does the same lint, build,
and test steps without deploying, so problems are visible before merging.

### Routing on GitHub Pages

The site is served from a subpath (`/<REPO>/`), and GitHub Pages does not
rewrite unknown URLs to `index.html`. If you add client-side routing, use a
hash-based router (for example `HashRouter` from React Router) or keep all
navigation inside a single page. A `BrowserRouter` will 404 on refresh.

## Documentation

Markdown files in `docs/` are built into HTML and published under
`/docs/` on your site. `docs/assumptions.md` is where you record the
assumptions your team makes about the project; keep it current.

## Troubleshooting

- **`npm ci` fails on GitHub but `npm install` works locally.** Your
  `package.json` and `package-lock.json` disagree. Run `npm install`, then
  commit the updated lock file.
- **Prettier complains about every line ending (`Delete ␍`).** The
  repository forces LF line endings through `.gitattributes`. Re-clone, or
  run `git add --renormalize .` and commit.
- **Tests cannot find an element.** Use `screen.debug()` inside the test to
  print the rendered HTML, and prefer role-based queries.
- **The dashboard shows a failure but `npm run lint` passes locally.** CI
  treats warnings as errors (`--max-warnings 0`). Fix the warnings too.

## License

MIT. See `LICENSE`.
