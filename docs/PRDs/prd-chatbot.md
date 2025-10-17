# 🧠 PRD — N8N AI ChatBot Integration (Next.js Support Assistant)

## 📘 Overview
The goal is to integrate an intelligent, brand-styled **ChatBot** on the existing **Next.js website** that connects directly to an **n8n AI workflow** powered by OpenAI, Postgres memory, and a vector database for contextual responses.

This ChatBot will handle **customer support**, **knowledge retrieval**, and **lead interaction** by exchanging messages between the frontend chat UI and n8n’s webhook workflow in real time.

---

## 🎯 Objectives
- Provide instant and human-like support to website visitors.
- Use n8n’s AI Agent for context-aware answers based on company knowledge base.
- Maintain persistent memory per user (via session or authenticated ID).
- Deliver sleek, branded chat UI consistent with the existing website.
- Ensure secure, stable, and scalable communication between the frontend and n8n.

---

## ⚙️ Technical Architecture

### Data Flow
1. **User sends message** via frontend chat box.
2. **Next.js API route (`/api/chat`)** receives message, adds session ID, and forwards it securely to **n8n Webhook**.
3. **n8n workflow**:
   - Trigger: Webhook
   - AI Agent node: uses OpenAI, Postgres memory, and vector DB
   - Respond to Webhook: returns AI response
4. **Next.js API** relays n8n’s response to the frontend.
5. **Frontend chat UI** displays the bot reply.

---

## 🧩 Components

### 1. Frontend (Next.js)
- **Chat Widget**  
  - Floating chat icon (bottom-right corner).  
  - Expands into chat box with smooth, modern animations.  
  - Theming matches brand palette (dark background + neon highlight).  
  - Responsive (mobile/tablet/desktop).  
  - Shows message bubbles for user/assistant, timestamps, typing indicator.

- **Message Handling**
  - State: messages[] (role + content)
  - POST to `/api/chat`
  - Renders streaming or full response
  - Uses localStorage or cookies for session continuity (anonymous or logged-in)

---

### 2. Backend (Next.js API)
- **Route:** `/api/chat`  
- **Responsibilities:**
  - Generate or retrieve `sessionId` from cookie.
  - Hash and optionally store IP (privacy-safe).
  - Forward `{ conversationId, messages, meta }` to n8n webhook.
  - Sign request with HMAC secret.
  - Return AI reply as JSON to frontend.

- **Example Environment Variables**
  ```bash
  N8N_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/chat/inbound
  N8N_SHARED_SECRET=super-secret-key
````

* **Expected Request → Response**

  ```json
  // POST /api/chat
  {
    "messages": [{ "role": "user", "content": "What are your hours?" }]
  }

  // Response
  {
    "answer": "We’re open Monday to Friday from 9AM to 5PM.",
    "conversationId": "uuid",
    "sources": [{ "title": "Company Info", "url": "..." }]
  }
  ```

---

### 3. n8n Workflow

**Nodes:**

1. **Webhook (Trigger)** — Receives POST from Next.js

   * Path: `/chat/inbound`
   * Method: POST
2. **Code (Verification)** — Validates HMAC signature
3. **AI Agent Node** —

   * Model: OpenAI GPT-4 or 4o-mini
   * Memory: Postgres (conversationId = sessionId)
   * Context: vector search (knowledge base)
4. **Respond to Webhook** — Returns JSON response with `answer`, `conversationId`, `sources`.

---

## 🔒 Security & Privacy

* Use **HMAC or Bearer token** to verify trusted requests from your website.
* Do **not store raw IP addresses** — hash with secret key.
* Use HTTPS for all requests.
* Sanitize user input to prevent injection attacks.
* Limit message size and rate per session.

---

## 🚀 Optional Upgrades

| Feature                       | Description                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| **Streaming Responses (SSE)** | Implement Server-Sent Events for token-by-token reply visualization.                |
| **Async n8n Processing**      | For long-running AI tasks, reply with 202 Accepted, then notify via SSE or polling. |
| **Authentication Bridge**     | Use logged-in user ID from Supabase or NextAuth instead of anonymous session.       |
| **Multi-Agent Mode**          | Extend workflow for role-based agents (sales, support, technical).                  |
| **Analytics**                 | Log conversation metrics to Postgres (response time, satisfaction rating).          |

---

## 🎨 UI / UX Notes

* Floating icon morphs into chat window (slide-up animation).
* Chat window:

  * Top bar with brand logo + “Support Assistant”.
  * Message bubbles (User: right-aligned, AI: left-aligned).
  * Typing dots animation when awaiting response.
  * Auto-scroll to latest message.
* Option to collapse, clear chat, or reopen.
* (Optional) Save chat transcripts to localStorage.

---

## 🧱 File Structure

```
/app
    ├──
    ├── api/chat/route.ts      # Handles chat → n8n communication
    ├── chat/ChatClient.tsx    # Client chat component
    └── chat/page.tsx          # Page wrapper for dev/demo

/dev/docs
 ├── prd-chatbot.md         # This document
 ├── architecture-diagram.png
 ├── api-contract.md
 └── workflow-overview.md
```

---

## 🧪 Testing

| Step                   | Expected Result                            |
| ---------------------- | ------------------------------------------ |
| Send a message “Hello” | n8n receives payload and returns greeting  |
| Disconnect n8n         | API returns `502 n8n error`                |
| Invalid signature      | n8n stops workflow with `401 Unauthorized` |
| Multiple messages      | Persistent memory via conversationId works |
| Refresh page           | Chat history reloads if stored locally     |

---

## 🧭 Milestones

| Phase       | Description                     | Deliverable              |
| ----------- | ------------------------------- | ------------------------ |
| **Phase 1** | Basic chat UI + synchronous API | Working prototype        |
| **Phase 2** | HMAC auth + session memory      | Secure live version      |
| **Phase 3** | Async streaming + brand polish  | Production-ready chatbot |
| **Phase 4** | Analytics + multi-agent support | Enhanced support system  |

---

## 📦 Deliverables

* `route.ts` (API endpoint)
* `ChatClient.tsx` (UI component)
* `prd-chatbot.md`
* `n8n-workflow.json` (export)
* Brand-matched styling (Tailwind)

---

## ✅ Success Metrics

* < 1s frontend latency (excluding AI processing)
* < 15s total response time
* ≥ 95% successful message delivery
* No data leaks or memory collisions
* 24/7 uptime through resilient n8n deployment

---

**Author:** Nicky Bruno
**Project:** AI ChatBot Integration
**Date:** 2025-10-17
**Version:** 1.0

**NOTES**

n8n workflow name: NB-chatbot
n8n POST webhook "TEST": https://n8n.nickyhome.casa/webhook-test/fb80cf37-e8d1-4a0b-b060-e6572adbe8bd
n8n POST webhook "PRODUCTION": https://n8n.nickyhome.casa/webhook/fb80cf37-e8d1-4a0b-b060-e6572adbe8bd

* n8n mcp tool is avalable
* chatbot component: 
   - src\components\ui\Chatbot.tsx
   - src\components\ui\ChatInput.tsx
   - src\components\ui\ChatMessage.tsx