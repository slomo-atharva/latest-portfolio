# Portfolio Design System

## Purpose

Use this document to recreate new pages and case studies in the same visual language as the existing portfolio. The goal is a calm, editorial, high-clarity portfolio that feels polished, thoughtful, and lightly playful rather than loud, trendy, or overly “techy.”

This style should feel:

- clean and premium
- airy, calm, and deliberate
- strategic rather than decorative
- human and opinionated
- lightly playful through details like sticky notes, soft gradients, and reflective copy

Do not make it feel:

- dark, cyberpunk, glassmorphism-heavy, or neon
- overly startup-marketing driven
- generic SaaS dashboard UI
- brutalist, blocky, or overly rounded
- loud, saturated, or high-contrast black-and-white

## Brand Personality

- Product designer portfolio with strong strategic thinking
- Visual tone: composed, intelligent, minimal, human
- Copy tone: sharp, concise, slightly dry, self-aware, never fluffy
- The work should feel credible and high-trust
- The design should suggest craft without becoming precious

## Core Visual Direction

- Bright editorial canvas with off-white surfaces
- Off-black text, never pure black
- Soft dotted grid textures in the background
- Large typographic statements with generous breathing room
- Frosted or translucent panels for content groupings
- Small accent moments in violet, blue, rose, mint, and warm cream
- Gentle gradients and subtle shadows instead of hard contrast
- Occasional “sticky note” moments for personality and reflection

## Color System

Use soft neutrals first. Accent colors support the layout but should not overpower it.

### Base Colors

- `--ink`: `#141416`
- `--ink-soft`: `#3f3f46`
- `--muted`: `#707078`
- `--line`: `#e2e8f0`
- `--paper`: `#ffffff`
- `--paper-bright`: `#ffffff`
- `--navy`: `#171b2f`

### Accent Colors

- `--blue`: `#213a8f`
- `--purple`: `#6d4aff`
- note cream: `#fff6a8`
- note pink: `#f5d7ea`
- note blue: `#dfeeff`
- note mint: `#dff7df`

### Color Usage Rules

- Never use pure black
- Keep most sections on white or near-white backgrounds
- Use accent colors in small concentrated moments: icons, pills, tags, rails, badges, highlights
- Prefer soft tinted gradients over solid accent blocks
- Use navy mainly for the footer or high-contrast closing section

## Typography

### Font Family

- Primary stack: Google Sans Text / Google Sans / Product Sans
- Stable fallback: DM Sans
- Sans-serif only

### Weight Rules

- Allowed weights: `300`, `400`, `500`, `600`
- Never use bold, extra-bold, or black weights

### Typographic Feel

- Headlines are large, crisp, and tightly led
- Body copy is light-weight with comfortable line height
- Labels and metadata use small sizes with medium weight
- Avoid overly wide tracking; keep the type natural and modern

### Type Roles

- Hero headline: very large, bold in scale but only `600` in weight
- Section titles: large and editorial
- Body copy: light and readable
- Metadata: small, subtle, structured
- Pills and tags: compact, medium weight, understated

## Layout Principles

- Use a centered content container around `max-w-5xl` to `max-w-6xl`
- Keep sections roomy with generous vertical spacing
- Prefer asymmetrical editorial grids over rigid equal columns
- Let the page breathe; empty space is intentional
- Keep cards and panels aligned to a quiet underlying grid
- Mobile layouts should stack cleanly without losing the editorial feel

## Surfaces and Shapes

- Primary radius: around `8px`
- Cards should feel precise, not overly rounded
- Use soft borders with low-contrast lines
- Use translucent white surfaces with subtle blur where helpful
- Shadows should be diffused and light, never harsh
- Panels can layer gradient wash, border, shadow, and blur together

## Background Language

- Use a subtle dotted grid texture as a repeating motif
- Add soft radial or linear gradients behind key hero or section moments
- Backgrounds should stay very light and atmospheric
- Avoid noisy textures, dense patterns, or strong vignettes

## Motion Direction

- Motion should be calm, polished, and low-friction
- Prefer opacity, translate, and slight scale shifts
- Hover states can lift by a few pixels
- Use soft easing and moderate durations
- Respect reduced motion
- Avoid large parallax, dramatic bouncing, or attention-seeking effects

## Signature UI Motifs

### 1. Sticky Notes

Use sticky notes sparingly as personality markers.

- Small handwritten-style notes
- Slight rotation
- Soft paper gradients
- Subtle curl or taped feel
- Colors: cream, pink, blue, mint
- They should feel like intelligent side comments, not decoration spam

Example content style:

- “clarity before beauty. always.”
- “assumptions are just unrun research”
- “good feedback hurts a little”

### 2. Frosted Information Cards

- White or near-white translucent surfaces
- Fine border
- Large soft shadow
- Slight blur
- Used for project cards, snapshot panels, testimonials, and utility bands

### 3. Accent Rails and Markers

- Small gradient rails
- Colored square icon markers
- Tiny status dots between metadata items
- These create rhythm without overwhelming the layout

### 4. Dotted Grid Canvas

- Reuse a subtle dotted background texture in hero and section canvases
- Keep opacity low
- It should support structure, not announce itself

## Content Tone

The copy should sound like a thoughtful designer with judgment. Keep it concise, specific, and lightly opinionated.

### Writing Style

- short, clean, self-assured sentences
- avoid buzzwords and hype
- avoid generic “problem/solution/impact” filler
- prefer precise phrases over long explanations
- slightly reflective is good
- overly inspirational is not

### Good Tone Examples

- “A composed decision surface for initiative tracking.”
- “Keep the method visible, but do not make it the whole story.”
- “Show the strongest moments, not every screen.”

## Homepage Pattern

The homepage style follows this structure:

1. Hero with oversized statement, subtle texture, reflective microcopy, and playful sticky notes
2. Client/logo credibility band inside a premium translucent container
3. Selected work section with one featured case study and supporting cards
4. Testimonials or praise in structured editorial cards
5. Darker closing footer section with strong call to action

## Case Study Pattern

New case studies should follow this same storytelling structure and visual rhythm.

### Hero

- Large title
- Compact metadata row
- Short, high-clarity headline
- Snapshot cards for client, role, scope, challenge, or outcome
- One branded visual panel with a soft tinted gradient

### Story Flow

Build the page around decisions, not around generic process documentation.

Recommended order:

1. Problem
2. Approach
3. Outcome
4. Frictions / tensions
5. Process steps
6. Key decisions
7. Before vs after
8. Final moments / selected screens
9. Reflection / impact

### Storytelling Rules

- Show judgment, not just activity
- Use issue / decision / result framing wherever possible
- Avoid giant blocks of text
- Keep each section easy to scan
- Use a few strong visuals instead of many weak ones
- Make the design work legible at a glance

## Component Guidance

### Buttons and Links

- Compact height
- Clear borders
- Slight hover lift
- Focus states should be visible but refined
- Primary CTAs can use dark ink or light paper depending on section contrast

### Pills and Tags

- Rounded full pills
- Small size
- Light border
- Neutral or lightly tinted fill
- Used for scope, labels, and supporting metadata

### Project Cards

- Large featured project plus smaller supporting cards
- Split between text summary and abstract branded visual
- Use logo, category, year, role, scope, and short summary
- Abstract visual panels should suggest a product/system without trying to be literal mockups

### Testimonial Cards

- White card with left accent rail
- Small icon badge
- Compact metadata
- Quote as the main content
- Structured but warm

### Footer

- Deep navy closing block
- Strong CTA
- Grid texture still present, but subtle
- Bright text with softened opacity

## Visual Rules For New Screens

When generating new sections or new case study screens:

- keep the page mostly white
- use off-black text
- preserve the editorial spacing
- use `8px`-ish radii rather than oversized rounded corners
- combine thin borders with soft shadows
- keep accent colors selective
- use playful notes only if they add meaning
- avoid full-width noisy gradients
- avoid stock SaaS illustrations
- do not turn the page into a dashboard unless the content truly is one

## If Stitch Is Creating A New Case Study

Use this exact direction:

- Create a premium, editorial portfolio case study page
- Match the existing portfolio’s bright, minimal, high-craft visual language
- Use large Google Sans style typography with DM Sans fallback
- Keep backgrounds white or near-white with subtle dotted grid textures
- Use off-black text, soft gray borders, and translucent white cards
- Use accent tones in violet, blue, rose, mint, and warm cream
- Use calm motion and refined hover feedback
- Build the story around problem, approach, decisions, final direction, and impact
- Favor concise strategic copy over long process-heavy paragraphs
- Include abstract product visuals or system-style frames instead of generic mockups
- Keep everything polished, spacious, and highly legible

## Avoid

- pure black
- dark mode by default
- heavy gradients
- oversized border radius
- overly playful illustrations
- loud startup landing page tropes
- generic AI aesthetic
- overly dense dashboards
- huge walls of text
- corporate template layouts

## Final Quality Bar

The finished page should look like a serious product designer’s portfolio: minimal, sharp, warm, and strategically composed. It should feel custom, not templated. Every section should communicate clarity, judgment, and craft.
