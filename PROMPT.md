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

---

## 🚀 Appendix: Pitch & Single-File Challenge Specification

### Elevator Pitch: ABtalks Dash (Unified Developer OS)
ABtalks Dash is a gamified, AI-powered productivity operating system built to solve the ultimate engineering student dilemma: extreme context-switching. It unifies university study tracking, live coding metrics, and cognitive conditioning into a single, high-performance dashboard to help students conquer burnout and secure top placements.

* **Gamified Momentum**: A dynamic "Overall Completion" algorithm scores users based on their daily study streaks, challenge progression, and weekly consistency, turning academic discipline into a game.
* **Context-Aware AI Assistant**: Integrated directly with Anthropic's Claude API, the onboard AI doesn't just answer generic questions. It reads the user’s live study logs, pending challenges, and assignment scores to deliver highly personalized, actionable advice on what to tackle next.
* **Cognitive Conditioning Hub**: When it's time for a break, users don't doomscroll. The dashboard features custom-built, state-driven mini-games (Memory Match, Logic Sequencing, Tower of Hanoi, and WPM Typing) designed to sharpen problem-solving reflexes and algorithmic thinking.
* **Live Developer Identity**: Real-time API integrations pull live GitHub contribution graphs and LeetCode acceptance rates directly into the UI, keeping the user's professional goals front and center.

### Web Page Specification: "ABTalks — Challenge Day"
Build a single-file HTML/CSS/JS web page called "ABTalks — Challenge Day" — a dark-themed dashboard for a 60-day coding streak challenge. Requirements:

#### Visual Style:
- Near-black background (`#030303`) with a subtle purple radial glow and faint grid pattern.
- Purple (`#9b5cff`) as the accent color.
- Inter/system-ui font, rounded cards with soft borders, and a scroll-triggered "pop" reveal animation (fade + scale-up) on key sections using `IntersectionObserver`.

#### Layout / Features:
1. **Navbar**:
   - Brand logo, "Progress" button that opens a slide-in drawer, "Dashboard" link, live streak counter (fire emoji + N day streak), and Avatar.
2. **Progress Drawer** (right-side slide-out panel):
   - Daily Progress bar chart (last 14 days, with a toggle to show upcoming days) showing per-day checklist completion %, clickable bars to jump to that day.
   - Day-by-Day History expandable list showing each day's completion %, time spent (start/finish timestamps), checklist item breakdown, and submitted proof links.
3. **Hero Section**:
   - Day navigation (prev / Day X of 60 badge / next), Page title, Status pill (IN PROGRESS / COMPLETED / INCOMPLETE), Overall challenge progress bar, and "Viewing past day — read only" banner when not on today.
4. **Streak Calendar**:
   - Collapsible month-by-month calendar (only months within the 60-day range).
   - Color-coded for completed / today / upcoming / outside-range days.
   - Clickable days (up to today) to jump to that day's view.
5. **Stats Row**:
   - Current Day / Day Streak / Completed % stat cards.
6. **Task Card**:
   - Dynamic title/description per day. Day 60 has a unique "Final Challenge" description, others use a generic template.
7. **Checklist Card**:
   - Default 4 items: complete assignment, build & test, push to GitHub, share on LinkedIn.
   - Fully editable (rename, delete, add new items via an "Edit" toggle mode), persisted in `localStorage`.
   - Tap-to-check items, auto-updates progress counter.
8. **Proof-of-Work Card**:
   - GitHub URL + LinkedIn URL inputs. Submit button that validates both fields are filled, shows a success message, and persists proof per day.
   - Collapsible "view submitted proof" section showing saved links per day.
9. **"Coming Up Next" Card**:
   - Expandable teaser for the next day's challenge, or completion message shown on day 60.
10. **Footer**:
    - Tagline.

#### Logic:
- Challenge starts `2026-07-28`, runs 60 days; "current day" is computed from today's real date.
- A day is automatically marked "completed" if either 100% of checklist items are checked OR both proof links are submitted — no manual toggling.
- Streak = consecutive completed days counting backward from today.
- All state (checklist items/state, timing, proof submissions) persists via `localStorage`, keyed per day.
- Users can navigate to and interact with any past day (view/edit checklist, submit/update proof) but not future days.

#### Tech Constraints:
- Use vanilla JS (no frameworks), inline `<style>` and `<script>`, fully self-contained in one `.html` file.

