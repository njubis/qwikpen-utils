# Qwikpen Utils⚡️

**Utility functions for use with Qwik apps**

## Project Structure

```
├── public/
│   └── ...
└── src/
    ├── utils/
    │   └── ...
    └── index.ts
```

- `src/utils`: Directory containing all the utilities.

- `index.ts`: The entry point of the library, all the public utils are exported from this file.

## Development

Package Manager - `Bun`

To start the dev server with Vite.

```
bun dev
```

> Note: during dev mode, Vite will request many JS files, which does not represent a Qwik production build.

## Production

The production build should generates the production build of the utilities library in (./lib) and the typescript type definitions in (./lib-types).

```
bun run build
```

---

- [Qwik Docs](https://qwik.dev/)
- [Qwik on GitHub](https://github.com/QwikDev/qwik)

---
