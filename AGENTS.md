# AGENTS.md

Project rules for every agent working in this repository.

## Core Principles

- Build with the agreed stack: Next.js App Router, React, TypeScript, Tailwind CSS v4, and Motion for React.
- Keep code strict, readable, typed, sanitized, and componentized.
- Prefer simple, durable architecture over clever abstractions.
- Match the existing project structure before introducing new patterns.
- Do not add unrelated refactors while implementing a requested change.

## Code Structure

- Use TypeScript strict mode throughout the project.
- Keep pages and route files thin. Move UI sections, feature logic, data helpers, and shared primitives into separate modules.
- Componentize all repeated UI. Do not duplicate markup or styling when a reusable component is appropriate.
- Prefer small components with clear props over large multipurpose components.
- Keep server components as the default in Next.js. Use client components only for interactivity, browser APIs, animation, or local state.
- Suggested folders:
  - `app/` for routes, layouts, metadata, and route-level files.
  - `components/ui/` for reusable primitives.
  - `components/sections/` for page sections.
  - `components/motion/` for animation wrappers and shared motion patterns.
  - `lib/` for utilities, config, sanitizers, and non-UI helpers.
  - `data/` for typed static content.
  - `types/` for shared TypeScript types.

## Styling Rules

- Use the Google Sans family stack when available, with the local DM Sans files as the stable fallback.
- Never use full bold or black font weights.
- Allowed font weights: `300`, `400`, `500`, and `600`.
- In Tailwind, use `font-light`, `font-normal`, `font-medium`, or `font-semibold`.
- Do not use `font-bold`, `font-extrabold`, `font-black`, or any `font-weight` above `600`.
- Never use pure black for text, backgrounds, borders, shadows, SVG fills, or canvas colors.
- Do not use `black`, `#000`, `#000000`, `rgb(0 0 0)`, or `rgba(0 0 0 / ...)`.
- Use off-black neutrals instead, such as `#0f0f10`, `#111111`, `#151515`, or carefully chosen Tailwind neutral/slate values.
- Keep visual systems tokenized with CSS variables for colors, spacing, radii, shadows, and typography.
- Avoid one-off magic values unless a specific visual detail requires them.

## UI And UX

- Build the real usable experience first, not a marketing placeholder.
- Use high-quality visual assets and optimize them before shipping.
- Use `next/image` for raster images whenever possible.
- Always provide image dimensions, useful `alt` text, and responsive `sizes`.
- Use AVIF/WebP for images where possible.
- Compress and lazy-load video assets. Use poster frames for videos.
- Keep interface motion thoughtful, calm, and purposeful.
- Add micro-interactions for hover, focus, press, loading, reveal, and navigation states where they improve the experience.
- Respect `prefers-reduced-motion`.
- Avoid animations that cause layout shift or block interaction.
- Use stable dimensions for cards, grids, buttons, media, icons, and controls so states do not resize the layout.

## Motion Rules

- Use Motion for React for component-level transitions and micro-interactions.
- Use GSAP only for advanced scroll choreography or timelines that Motion cannot express cleanly.
- Keep motion durations moderate and easing consistent.
- Animate transform and opacity first. Avoid animating layout-heavy properties when possible.
- Lazy-load heavy animation or 3D code when it is not required for first paint.

## Sanitization And Security

- Validate and sanitize all external input at the boundary.
- Treat CMS data, URL params, form values, markdown, MDX, query strings, and API responses as untrusted.
- Do not use `dangerouslySetInnerHTML` unless the content is sanitized and the reason is documented near the usage.
- Do not use `eval`, dynamic function constructors, or unsanitized DOM injection.
- Use typed schemas for external data when practical.
- Keep secrets in environment variables. Never expose server-only secrets to the client.
- Construct URLs with the `URL` API where possible.
- Escape user-visible dynamic content unless React is already safely rendering it as text.

## Performance

- Optimize for Core Web Vitals from the start.
- Keep the client bundle small. Avoid turning large trees into client components.
- Dynamically import heavy interactive modules, WebGL, GSAP timelines, and media-heavy sections.
- Avoid unnecessary dependencies.
- Use font loading through Next.js font utilities when possible.
- Preload only critical assets.
- Lazy-load non-critical assets below the fold.
- Test desktop and mobile layouts before considering a change complete.

## Accessibility

- Use semantic HTML.
- Keep keyboard navigation working for every interactive element.
- Provide visible focus states.
- Use buttons for actions and links for navigation.
- Add ARIA only when semantic HTML is not enough.
- Maintain sufficient color contrast using off-black and off-white values instead of pure black or pure white defaults.

## Quality Checks

- Before finishing meaningful work, run the most relevant checks available in the project.
- Prefer `npm run lint`, `npm run typecheck`, and `npm run build` when those scripts exist.
- For frontend changes, verify visually in a browser at desktop and mobile sizes.
- Fix TypeScript, lint, hydration, console, and layout errors before handoff.
- Do not leave dead code, unused imports, or placeholder content behind unless explicitly requested.

## Content And Naming

- Keep copy clear, specific, and polished.
- Use descriptive component, variable, and file names.
- Avoid vague names like `Thing`, `Block`, `Stuff`, `NewSection`, or `Temp`.
- Keep data-driven content typed and separated from layout when it improves maintainability.

## Agent Conduct

- Read the surrounding code before editing.
- Preserve user changes and unrelated work.
- Explain important implementation choices briefly.
- Ask only when a missing requirement would materially change the implementation.
- Ship complete, verified work whenever feasible.
