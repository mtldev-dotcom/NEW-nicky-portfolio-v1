## 🧠 **Prompt: Full-Screen Mobile Chat UI Upgrade**

### 🎯 **Objective**

Transform my existing website chat widget into a **full-screen chat experience on mobile** (like the *React Native Starter* pink example).
The chat must look and behave like a native mobile messenger while keeping the current desktop behavior untouched.

---

### 🧩 **Context**

* My site already has a working chat assistant (custom AI agent integrated with my n8n webhook).
* The widget currently opens as a small popup anchored to the bottom-right (see reference screenshot).
* On desktop → keep current layout.
* On mobile → chat should expand to **100% viewport width & height**, overlaying the whole page (like a mobile app).

Example reference:

* **My version:** `nicky-portfolio.nickyhome.casa` → dark compact chat box.
* **Desired version:** `reactnativestarter.com` → full-screen chat overlay on mobile with clear close button.

---

### 🧰 **Technical Requirements**

1. **Responsive full-screen layout on mobile**

   * Use CSS breakpoints (`max-width: 768px`).
   * Chat container should become `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 99999;`.
   * Remove rounded corners, shadows, or transitions that break the full-screen illusion.

2. **Header bar & Close button**

   * Add a top header bar matching my brand color `#00FFD1` (neon mint green).
   * Include a **close (×)** button at top-right that hides the chat when tapped.
   * The button must remain visible even when scrolling.

3. **Animations**

   * Smooth open/close transition (`transition: all 0.3s ease-in-out;`).
   * Optional fade overlay behind the chat when open.

4. **State handling**

   * Add a `chat-open` state class to `<body>` when chat is open.
   * Remove it when closed to restore background scroll.
   * When open, disable background scroll to prevent body scrolling under overlay.

5. **Desktop**

   * Keep existing small floating chat widget exactly as is.
   * Only apply full-screen styles for mobile breakpoints.

---

### 🧩 **Implementation Notes**

* If my chat is a **custom React/Next.js component**, conditionally apply styles using:

  ```tsx
  const isMobile = window.innerWidth <= 768;
  ```

  or via CSS media queries with styled-components or Tailwind.
* If injected via `<iframe>`, apply responsive styles directly on the iframe element (target its ID or wrapper).
* Ensure **z-index** exceeds any fixed headers or sticky elements.

---

### 💅 **Visual Styling**

* Background: black (`#000404`)
* Header bar: neon mint green (`#00FFD1`)
* Text: white or light gray (`#E0E0E0`)
* Smooth fade-in when chat appears.
* No gradient, minimal design.

---

### ✅ **Deliverables**

Cursor AI should:

1. Identify where the chat component or iframe is rendered.
2. Add a responsive style block that overrides behavior on mobile.
3. Implement a close button with working hide/show logic.
4. Maintain current desktop styling.
5. Provide a brief summary of all edits and where they were made.

---

### ⚙️ **Optional Enhancements**

* Animate from bottom-up (slide-in effect).
* Add chat header with “Nicky’s AI Assistant” title.
* Support `Escape` key to close chat on desktop.

---

### 🧩 **Command for Cursor**

> "Implement full-screen mobile chat UI according to this spec.
> Keep desktop version unchanged.
> Apply styles either via global CSS or component-scoped styles depending on where the widget is initialized."

---