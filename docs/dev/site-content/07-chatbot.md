# 🤖 Chatbot

## Placement & Shell
**Layout & Visuals**
- Docked chat bubble bottom-right; expands into glass panel with mint border; message bubbles alternate (user right, bot left).
- Header: avatar + “Ask Nicky’s AI”.

**(Optional) Animation**
- Typing dots pulsing; message reveal slide/fade; minimize scales back to bubble.

---

## Content Strings (EN/FR)
- Title: “Ask Nicky’s AI” / “Demandez à l’IA de Nicky”
- Placeholder: “Describe your project…” / “Décrivez votre projet…”
- Suggested: “Estimate my project timeline”, “What stack fits my idea?”, “How to boost conversions?” (EN/FR variants)

---

## Integration Notes
- Post to n8n webhook; stream responses; show typing state.
- Respect prefers-reduced-motion; provide keyboard shortcuts.
