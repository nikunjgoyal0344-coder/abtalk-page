# ABTalks Redesign: Codebase Prompt & Specifications Blueprint

This file outlines the full specifications, technical architecture, and implementation guidelines for the **ABTalks Student Dashboard & Coding Streak Redesign**. Use this document as a context prompt to recreate or extend the portal.

---

## 🎨 1. Theme Specs & Style Tokens

### Backgrounds & Borders
- **Theme Switcher**: Supported (append `.light-mode` class to `document.body` for light-theme override).
- **OLED Black Dark Mode**: Core dashboard background `#000000`. Cards use `#0C0C0E` with fine borders (`1px solid rgba(255,255,255,0.06)`).
- **Light Mode Override**: Page background `#FAFAFA`, cards `#FFFFFF`, borders `rgba(0,0,0,0.08)`.

### Soft Indigo Color Accent Tokens
- Swapped harsh crimson reds with a soft, eye-friendly Cobalt/Indigo palette:
  - `--red` Primary: `#4F46E5` (Cobalt)
  - `--red-l` Accent / Active Hover: `#6366F1` (Indigo)
  - `--red-xl` Light Highlights: `#C7D2FE` (Soft Lilac)
  - `--red-glow` Soft background cards: `rgba(99,102,241,0.04)`
  - `--red-bdr` Soft card outlines: `rgba(99,102,241,0.18)`
- Swapped all crimson red box-shadow properties with `rgba(99, 102, 241, ...)` gradients.
- Swapped `@keyframes glowPulse` and dot status shadows with the Indigo theme.

---

## 📱 2. Mobile-First Grid Specifications (390px)

- Layout is optimized primarily for mobile device screens (390px wide) with desktop as secondary.
- **Collapsing Grids**: CSS grids (`.db-stats`, `.g2`, etc.) collapse to a single column:
  ```css
  @media (max-width: 390px) {
    .db-stats { grid-template-columns: 1fr !important; }
    .g2 { grid-template-columns: 1fr !important; }
  }
  ```
- **Inputs & Controls**: Large touch targets (minimum `44px` height) with responsive flex-wrap containers.

---

## ⚙️ 3. Core Workspace Features

### A. Explaining the Challenge (Onboarding Tour)
- **New Student Check**: If `localStorage.getItem("abtalks_onboarding_done") !== "true"`, display the onboarding card.
- **Content**: Teaches the student what ABTalks is (verified proof-of-work) and outlines the 3-step loop:
  1. Go to Challenge Day.
  2. Complete checklist items.
  3. Submit GitHub and LinkedIn proof links before midnight.

### B. Streak Freeze & Recovery (Vibe Pass)
- **Missed Day Detection**: Dashboard checks if yesterday's challenge was completed in local storage.
- **Recovery Alert**: If yesterday was missed, renders a warning: `Yesterday's Streak Reset Warning`.
- **Deduction Loop**: Clicking *Restore Streak* consumes 1 Vibe Pass (defaults to 3 passes, stored under `abtalks_vibe_passes`), automatically completes yesterday's checkmarks, saves mock timestamps, and triggers parent sidebar re-renders to rebuild their streak.

### C. Digital Clock Alignment (Pomodoro Timer)
- **Wrapping Protection**: The timer text container (`.pm-time`) enforces `white-space: nowrap;` and `text-align: center;` to prevent character folding.
- **No-Wobble Digits**: Utilizes `font-variant-numeric: tabular-nums;` to force monospace-like spacing on digits, ensuring the text remains perfectly centered during active counts.

### D. Code Typist Game (5th Mind Game Tab)
- **Snippets List**: Offers coding snippets (Binary Search, React Hooks, and CSS layouts).
- **Interactive Character Checks**: Wrap text in individual inline `<span>` elements:
  - Match: `.char-correct` (Green text).
  - Mismatch: `.char-incorrect` (Red text with a light red backdrop).
  - Untyped: `.char-untyped` (Slate gray).
  - Cursor: Blinking `.char-cursor` marker showing the target letter.
- **Live Stats Gauges**: Dynamically updates WPM (Words Per Minute based on `correct / 5 / minutes`) and Accuracy % as typing progresses.

### E. Developer Profile (Empty Profile Setup)
- **Synchronization Check**: If GitHub/LinkedIn handles are missing, display the sync card.
- **Input Flow**: Simple text inputs saving variables directly to `abtalks_github_username` and `abtalks_linkedin_username` in `localStorage` to sync credentials.
