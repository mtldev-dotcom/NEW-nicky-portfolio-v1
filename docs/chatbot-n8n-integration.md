# Chatbot n8n Integration

## Overview

This document describes the integration between the portfolio chatbot component and n8n automation workflow for AI-powered chat responses.

**Status:** ✅ Active and Production-Ready  
**Last Updated:** December 2024  
**Webhook URL:** `https://n8n.nickyhome.casa/webhook-test/chatbot`

---

## Architecture

### Flow Diagram

```
User sends message (Next.js Chatbot)
    ↓
POST request to n8n webhook
    ↓
n8n processes with AI agent
    ↓
AI generates response
    ↓
Response sent back to chatbot
    ↓
Message displayed in chat interface
```

### Components

1. **Frontend:** `src/components/ui/Chatbot.tsx`
2. **Message Component:** `src/components/ui/ChatMessage.tsx`
3. **Input Component:** `src/components/ui/ChatInput.tsx`
4. **Backend:** n8n workflow with AI agent
5. **Endpoint:** `https://n8n.nickyhome.casa/webhook-test/chatbot`

---

## Chatbot Features

### UI/UX Features
- ✅ Floating chat button with neon glow effect
- ✅ Smooth open/close animations
- ✅ Minimize/maximize functionality
- ✅ Message history with timestamps
- ✅ Typing indicators
- ✅ Quick suggestion buttons
- ✅ Connection status indicator
- ✅ Error handling with retry options
- ✅ Clear conversation option
- ✅ Responsive design for mobile/desktop
- ✅ Accessibility support (ARIA labels, keyboard navigation)

### Brand Integration
- ✅ Neon mint color scheme (#00FFD1)
- ✅ Space Grotesk font for headings
- ✅ Inter font for body text
- ✅ Smooth animations matching site theme
- ✅ Glow effects consistent with brand
- ✅ Dark theme integration

### Technical Features
- ✅ Real-time message sending/receiving
- ✅ Message length validation (1000 chars max)
- ✅ Auto-scroll to latest messages
- ✅ Session management
- ✅ Error recovery
- ✅ Loading states
- ✅ Internationalization (EN/FR)

---

## API Integration

### Request Format

**Method:** `POST`  
**URL:** `https://n8n.nickyhome.casa/webhook-test/chatbot`  
**Headers:**
```http
Content-Type: application/json
```

**Body:**
```json
{
  "message": "What services do you offer?",
  "language": "en",
  "timestamp": "2024-12-19T20:35:00.000Z",
  "sessionId": "session-1703010900000"
}
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "I offer web development, AI integration, design consultation, and automation services. How can I help you with your project?",
  "sessionId": "session-1703010900000",
  "timestamp": "2024-12-19T20:35:05.000Z"
}
```

### Error Response

**Status:** `400 Bad Request`

```json
{
  "success": false,
  "error": "Invalid message format",
  "message": "I apologize, but I couldn't process your request. Please try again."
}
```

---

## Frontend Implementation

### Chatbot Component

The main chatbot component (`src/components/ui/Chatbot.tsx`) provides:

- **Floating Button**: Fixed position chat icon with glow effect
- **Chat Window**: Expandable chat interface with header, messages, and input
- **Message Management**: Add, display, and manage chat messages
- **State Management**: Connection status, loading states, error handling
- **Animations**: Smooth transitions and micro-interactions

### Message Component

Individual message component (`src/components/ui/ChatMessage.tsx`) handles:

- **Message Display**: User vs AI message styling
- **Timestamps**: Formatted time display
- **Typing Indicators**: Animated dots for AI responses
- **Error States**: Failed message indicators
- **Accessibility**: Proper ARIA labels and semantic markup

### Input Component

Message input component (`src/components/ui/ChatInput.tsx`) provides:

- **Auto-resize Textarea**: Grows with content up to 120px
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line
- **Character Limit**: 1000 character maximum with counter
- **Validation**: Empty message prevention
- **Loading States**: Disabled during message sending

---

## n8n Workflow Setup

### Required Nodes

1. **Chatbot Webhook** (Trigger)
   - Type: `n8n-nodes-base.webhook`
   - Method: POST
   - Path: `chatbot`
   - Response Mode: `responseNode`

2. **AI Agent Processing**
   - Type: `n8n-nodes-base.openAi` or similar AI service
   - Operation: Chat completion
   - Model: GPT-4 or similar
   - System prompt: Include Nicky's services and expertise

3. **Response Formatting**
   - Type: `n8n-nodes-base.code`
   - Format response for frontend consumption

4. **Success Response**
   - Type: `n8n-nodes-base.respondToWebhook`
   - HTTP 200 with formatted JSON

5. **Error Response**
   - Type: `n8n-nodes-base.respondToWebhook`
   - HTTP 400 with error details

### Workflow Settings

```yaml
Active: true
Error Handling: continueRegularOutput
Execution Order: v1
Trigger Count: 1
```

---

## Internationalization

### Translation Files

**English** (`src/i18n/messages/en/chatbot.json`):
- Chat interface labels
- Error messages
- Quick suggestions
- Accessibility labels

**French** (`src/i18n/messages/fr/chatbot.json`):
- Complete French translations
- Cultural adaptations
- Proper French grammar

### Usage

The chatbot automatically detects the user's language preference from the Next.js i18n system and sends it to the n8n workflow for localized responses.

---

## Testing

### Manual Testing

1. Navigate to any page on the portfolio
2. Look for floating chat button (bottom-right)
3. Click to open chat window
4. Send test message
5. Verify AI response appears
6. Test quick suggestion buttons
7. Test minimize/maximize functionality
8. Test error handling (disconnect network)

### Test Cases

- [ ] Chat button appears and is clickable
- [ ] Chat window opens with smooth animation
- [ ] Welcome message displays correctly
- [ ] User can type and send messages
- [ ] AI responses appear with typing indicator
- [ ] Quick suggestions work
- [ ] Minimize/maximize functions properly
- [ ] Clear conversation works
- [ ] Error states display correctly
- [ ] Mobile responsiveness
- [ ] Keyboard navigation
- [ ] Screen reader compatibility

---

## Security Considerations

### Current Protection

✅ **Implemented:**
- HTTPS webhook endpoint
- Message length validation (1000 chars)
- Input sanitization
- Error handling prevents crashes
- No sensitive data in responses
- Rate limiting via n8n workflow

### Recommended Enhancements

🔒 **Future Improvements:**

1. **Rate Limiting**
   - Add per-session message limits
   - Prevent spam/abuse
   - Implement cooldown periods

2. **Content Filtering**
   - Filter inappropriate content
   - Block malicious inputs
   - Sanitize HTML/scripts

3. **Session Management**
   - Implement proper session tokens
   - Track user sessions
   - Prevent session hijacking

4. **Analytics**
   - Track conversation metrics
   - Monitor usage patterns
   - Identify popular questions

---

## Performance

### Metrics

- **Message Send Time:** ~2-3 seconds
- **AI Response Time:** ~3-5 seconds
- **UI Animation:** 60fps smooth
- **Memory Usage:** Minimal (message history limited)

### Optimization

- Message history limited to 50 messages
- Lazy loading of chat components
- Efficient re-renders with React optimization
- Minimal bundle size impact
- Smooth animations with CSS transforms

---

## Maintenance

### Regular Tasks

**Weekly:**
- [ ] Check n8n execution logs for errors
- [ ] Monitor response times
- [ ] Verify AI responses quality

**Monthly:**
- [ ] Test chatbot functionality end-to-end
- [ ] Review conversation logs
- [ ] Update AI prompts if needed
- [ ] Check for n8n updates

**Quarterly:**
- [ ] Analyze popular questions
- [ ] Update quick suggestions
- [ ] Review and update documentation
- [ ] Optimize AI responses

---

## Troubleshooting

| Issue | Possible Cause | Solution |
|-------|----------------|----------|
| Chat button not visible | CSS loading issue | Check stylesheet loading |
| Messages not sending | Network/webhook issue | Check n8n workflow status |
| No AI responses | AI service down | Check AI service status |
| Slow responses | n8n server overload | Check n8n resource usage |
| Translation missing | i18n config issue | Check translation files |

---

## Future Enhancements

### Planned Features

1. **Enhanced AI Capabilities**
   - Context-aware responses
   - Multi-turn conversations
   - File upload support
   - Voice input/output

2. **Analytics Dashboard**
   - Conversation metrics
   - Popular questions
   - User satisfaction scores
   - Response time analytics

3. **Advanced Features**
   - Conversation history persistence
   - User authentication
   - Personalized responses
   - Integration with CRM

4. **UI Improvements**
   - Dark/light theme toggle
   - Customizable chat appearance
   - Message reactions
   - File sharing

---

## Support

### Getting Help

**Issues:**
- Check browser console for errors
- Review n8n execution logs
- Test webhook endpoint directly
- Verify AI service status

**Contact:**
- Email: nickdevmtl@gmail.com
- n8n Instance: https://n8n.nickyhome.casa

---

## References

- [n8n Documentation](https://docs.n8n.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [React Accessibility](https://reactjs.org/docs/accessibility.html)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Last Updated:** December 2024  
**Document Version:** 1.0.0  
**Maintained by:** Nicky Bruno
