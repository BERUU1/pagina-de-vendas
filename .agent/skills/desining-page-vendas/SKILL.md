---
name: ui-design-system
description: "Use whenever creating or styling web interfaces. It defines the visual standard of the project with modern design, consistent spacing, harmonious colors, micro-animations, and responsiveness."
---

# UI Design System: Tailwind CSS & Lucide React

## Core Philosophy
This skill defines the standards for creating modern, professional, and highly polished web interfaces. The primary tools are **Tailwind CSS** for styling and **Lucide React** for iconography. All designs must prioritize user experience, visual hierarchy, and responsive behavior.

## 1. Design Principles
*   **Modern Aesthetics:** Use clean layouts, ample whitespace, and subtle design elements like soft shadows and border-radiuses.
*   **Visual Hierarchy:** Guide the user's eye using size, weight, and color contrast.
*   **Consistency:** Maintain uniform spacing, typography, and color schemes across all components.
*   **Accessibility (a11y):** Ensure proper contrast ratios, focus states, and scalable text.

## 2. Tailwind CSS Guidelines

### Spacing & Sizing
*   Use Tailwind's default spacing scale consistently (e.g., `p-4`, `m-6`, `gap-8`).
*   Avoid arbitrary values (e.g., `w-[123px]`) unless absolutely necessary. Rely on fluid utilities whenever possible.

### Typography
*   Use professional, highly readable fonts (e.g., Inter, Roboto, System fonts).
*   Structure headers logically (`text-4xl font-bold tracking-tight`, `text-xl font-semibold`).
*   Use `text-slate-600` or `text-gray-500` for secondary text to create depth.
*   Improve readability with `leading-relaxed` or `leading-loose` on body text.

### Colors & Themes
*   **Primary Palette:** Choose a strong primary color (e.g., `indigo-600`, `blue-500`) and use its shades for hover states (`hover:bg-indigo-700`) and active states.
*   **Neutral Palette:** Use `slate` or `gray` for backgrounds, borders, and text.
*   **Backgrounds:** Use subtle off-white backgrounds for main areas (`bg-slate-50`, `bg-gray-50`) to make white cards (`bg-white`) pop.

### Borders, Shadows & Effects
*   **Rounded Corners:** Use rounded corners to soften the UI (`rounded-lg`, `rounded-xl`, `rounded-2xl`).
*   **Shadows:** Use soft, diffused shadows to create elevation and depth (`shadow-sm`, `shadow-md`, `shadow-lg`, or customized soft shadows `shadow-[0_8px_30px_rgb(0,0,0,0.04)]`).
*   **Borders:** Use faint borders (`border border-slate-200`) to separate elements cleanly.
*   **Glassmorphism (Optional but modern):** Use `bg-white/70 backdrop-blur-md` for floating navigation or sticky headers.

### Micro-animations & Interactions
*   Add transitions to interactive elements: `transition-all duration-200 ease-in-out`.
*   Hover states on buttons and cards: `hover:-translate-y-1 hover:shadow-lg`.
*   Focus states for accessibility and polish: `focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2`.

### Responsiveness
*   Always use a **Mobile-First** approach. Design for mobile (`w-full`), then scale up using breakpoints (`md:w-1/2`, `lg:w-1/3`).
*   Use CSS Grid and Flexbox with responsive gaps (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).

## 3. Lucide React Iconography
*   **Consistency is Key:** Use Lucide icons exclusively to ensure a uniform stroke width and style.
*   **Sizing:** Match icon size to the surrounding text. Standard sizes are often `w-5 h-5` or `w-6 h-6`.
*   **Styling:** 
    *   Inline with text: `<Icon className="w-5 h-5 mr-2 text-indigo-500" />`
    *   Standalone buttons: `<button className="p-2 text-gray-400 hover:text-gray-600 transition-colors"><Icon className="w-6 h-6" /></button>`
*   **Contextual Colors:** Use colors to convey meaning (e.g., `text-green-500` for success, `text-red-500` for destructive actions).

## 4. Component Standards (Examples)

### Modern Button
\`\`\`jsx
<button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
  <PlayCircle className="w-5 h-5 mr-2" />
  Watch Video
</button>
\`\`\`

### Elevated Card
\`\`\`jsx
<div className="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200 overflow-hidden">
  <div className="p-6">
    <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
      <Zap className="w-6 h-6 text-indigo-600" />
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-2">Lightning Fast</h3>
    <p className="text-slate-600 leading-relaxed">
      Optimized for speed and performance, delivering an unparalleled user experience.
    </p>
  </div>
</div>
\`\`\`

## 5. Execution Checklist
Before finalizing any UI implementation, verify:
- [ ] Is the spacing consistent and using the Tailwind scale?
- [ ] Are the colors harmonious, with proper contrast?
- [ ] Do interactive elements have clear hover, focus, and active states?
- [ ] Are there subtle micro-animations (`transition-all`)?
- [ ] Are Lucide icons properly sized and aligned with text?
- [ ] Does the layout adapt gracefully to mobile, tablet, and desktop screens?