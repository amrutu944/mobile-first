# AI Usage Disclosure

In compliance with the **MobileFirst Trainee Assessment** guidelines, this document transparently discloses the use of AI tools during the development of **FocusBoard**.

---

## 1. Tools Used
- **Google Antigravity (Powered by Gemini)**: Project scaffolding, code review, documentation generation, and responsive testing guidance.

---

## 2. Representative Prompts Used
1. *"Help me organize a clean React folder structure with reusable components for StatCard, FocusNotes, and TaskForm according to the Figma specifications."*
2. *"How should I implement a safe useLocalStorage hook in React that loads 7 initial sample tasks without overwriting existing user data upon browser refresh?"*
3. *"Provide accessible styling for a 3-slide carousel supporting circular previous/next navigation and clickable indicator dots."*
4. *"Review responsive layout breakpoints for 1440px desktop, 768px tablet, and 390px mobile viewports to prevent horizontal overflow."*

---

## 3. AI-Assisted Areas
- **Component Architecture:** Structuring reusable single-responsibility components in `src/components/`.
- **CSS Layout Design:** Designing CSS variables and media queries for pixel-perfect fidelity across 390px, 768px, and 1440px.
- **Edge-Case Validation:** Implementing strict title trimming and field checks to reject empty strings or whitespace-only inputs.
- **Documentation:** Formatting the technical explanations in `README.md`.

---

## 4. Verified, Corrected or Rejected Suggestion
- **Suggestion Reviewed:** An initial AI code snippet proposed calculating completion percentage with a simple formula `(completed / total) * 100` directly in the JSX.
- **Problem Identified:** If all tasks are deleted by the user, `total` becomes `0`, leading to `0 / 0 = NaN%`, which breaks the UI and accessibility progress bar.
- **Correction Applied:** I checked and corrected the implementation by introducing an explicit guard in `useMemo`:
  ```javascript
  const completionPercentage = useMemo(() => {
    if (totalTasks === 0) return 0;
    return Math.round((completedCount / totalTasks) * 100);
  }, [completedCount, totalTasks]);
  ```
  This guarantees that empty task lists display `0%` cleanly without runtime calculation errors.

---

## 5. Candidate Understanding Declaration
I confirm that I understand all components, hooks, state updates, and styling rules implemented in this project and am prepared to explain any part of the codebase or make live code changes during technical review.
