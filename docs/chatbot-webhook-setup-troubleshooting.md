# Chatbot Webhook Setup & Troubleshooting Guide

## Issue Identified

The "Failed to fetch" error occurs because the n8n webhook endpoint is not registered. This is a common issue with n8n webhooks in test mode.

## Root Cause

1. **Webhook Not Registered**: The n8n workflow needs to be executed first to register the webhook endpoint
2. **Test Mode Limitation**: In test mode, webhooks only work for one call after clicking "Execute workflow"
3. **Missing Webhook Configuration**: The chatbot path exists in the workflow but the webhook isn't properly registered

## Solution Steps

### Step 1: Register the Webhook in n8n

1. **Open your n8n workflow** (`nickybruno.com`)
2. **Click "Execute Workflow"** button on the canvas
3. **Wait for execution to complete** (this registers the webhook)
4. **Test the webhook** using the test endpoint

### Step 2: Verify Webhook Registration

Test the webhook endpoint:
```bash
curl -X POST "https://n8n.nickyhome.casa/webhook-test/contact-form" \
  -H "Content-Type: application/json" \
  -d '{
    "formType": "chatbot",
    "message": "Hello, this is a test message",
    "language": "en",
    "timestamp": "2024-12-19T20:35:00.000Z",
    "sessionId": "test-session-123"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "AI response here...",
  "data": {
    "sessionId": "test-session-123",
    "timestamp": "2024-12-19T20:35:00.000Z"
  }
}
```

### Step 3: Production Deployment

For production use, you need to:

1. **Deploy the workflow** to production mode
2. **Set up proper webhook URLs** (remove `/webhook-test/` from URL)
3. **Configure environment variables** for production

## Current Workflow Analysis

Your n8n workflow has the correct structure:

```
Contact Form Webhook → Form Type Router → [chatbot path] → Edit Fields → AI Agent → Success Response
```

The chatbot path is properly configured to:
1. Route `formType: "chatbot"` requests
2. Process the message through the AI Agent
3. Return a response

## Immediate Fixes Applied

### 1. Updated Webhook URL
- Changed from `/webhook-test/chatbot` to `/webhook-test/contact-form`
- This uses the existing registered webhook

### 2. Added formType Field
- Added `formType: "chatbot"` to the request payload
- This ensures proper routing through the Form Type Router

### 3. Enhanced Error Handling
- Added specific error message for 404 errors
- Provides helpful guidance when webhook is not registered

## Testing the Fix

### Frontend Test
1. Open your portfolio website
2. Click the chatbot icon
3. Send a test message
4. Should now work without "Failed to fetch" error

### Backend Test
```bash
# Test the webhook directly
curl -X POST "https://n8n.nickyhome.casa/webhook-test/contact-form" \
  -H "Content-Type: application/json" \
  -d '{
    "formType": "chatbot",
    "message": "What services do you offer?",
    "language": "en",
    "timestamp": "2024-12-19T20:35:00.000Z",
    "sessionId": "test-session-123"
  }'
```

## Next Steps for Production

### 1. Create Dedicated Chatbot Webhook
Consider creating a separate webhook endpoint specifically for the chatbot:

1. **Add new Webhook node** in n8n
2. **Configure path**: `/webhook/chatbot`
3. **Connect directly** to the chatbot processing logic
4. **Update frontend** to use the new endpoint

### 2. Implement Enhanced Features
Follow the documentation in `/docs` to implement:
- Rate limiting
- Enhanced AI Agent prompt
- Conversation analytics
- Better error handling

### 3. Production Configuration
- Remove `/webhook-test/` from URLs
- Set up proper environment variables
- Configure monitoring and alerting
- Implement proper error logging

## Troubleshooting Common Issues

### Issue: "Failed to fetch"
**Cause**: Webhook not registered
**Solution**: Execute the n8n workflow first

### Issue: Empty response
**Cause**: AI Agent prompt incomplete
**Solution**: Update the AI Agent prompt (see AI Agent Configuration Guide)

### Issue: Wrong response format
**Cause**: Response formatting not optimized
**Solution**: Implement enhanced response format (see Enhanced Response Format Guide)

### Issue: Rate limiting errors
**Cause**: No rate limiting implemented
**Solution**: Add rate limiting nodes (see Rate Limiting Guide)

## Monitoring and Maintenance

### Key Metrics to Monitor
- Webhook response time
- Error rate
- Message processing success rate
- User satisfaction

### Regular Maintenance
- Monitor webhook registration status
- Check AI Agent response quality
- Review error logs
- Update prompts based on user feedback

## Contact Information

If you need immediate assistance:
- **Email**: nickdevmtl@gmail.com
- **Documentation**: Check `/docs` directory for detailed guides
- **Issues**: Review troubleshooting sections in each guide

---

*Last updated: December 19, 2024*
*Document version: 1.0*
