# Rate Limiting & Security Implementation

## Overview

This document outlines the implementation of rate limiting and security measures for the Nicky Bruno chatbot workflow to prevent abuse, spam, and ensure fair usage.

## Current Security Status

**Issues Identified:**
- No rate limiting implemented
- No abuse prevention mechanisms
- No IP-based restrictions
- No session validation
- Potential for spam and resource abuse

## Rate Limiting Strategy

### Implementation Levels

#### Level 1: Session-Based Rate Limiting
- **Limit:** 10 messages per 5-minute window per session
- **Scope:** Individual user sessions
- **Action:** Temporary cooldown with friendly message

#### Level 2: IP-Based Rate Limiting
- **Limit:** 50 messages per hour per IP address
- **Scope:** IP address across all sessions
- **Action:** Extended cooldown with escalation notice

#### Level 3: Global Rate Limiting
- **Limit:** 1000 messages per hour globally
- **Scope:** Entire chatbot system
- **Action:** System-wide throttling

## Implementation Plan

### Step 1: Add Rate Limiting Node

#### Node Configuration
```json
{
  "type": "n8n-nodes-base.if",
  "name": "Rate Limiter",
  "parameters": {
    "conditions": {
      "options": {
        "caseSensitive": true,
        "leftValue": "",
        "typeValidation": "strict",
        "version": 2
      },
      "conditions": [
        {
          "leftValue": "={{ $json.sessionId }}",
          "rightValue": "rate_limit_exceeded",
          "operator": {
            "type": "string",
            "operation": "notEquals"
          }
        }
      ],
      "combinator": "and"
    }
  }
}
```

#### Rate Limiting Logic
```javascript
// Pseudo-code for rate limiting logic
const sessionId = $json.sessionId;
const currentTime = new Date();
const timeWindow = 5 * 60 * 1000; // 5 minutes in milliseconds
const messageLimit = 10;

// Check if session exists in rate limit store
const sessionData = getSessionData(sessionId);

if (sessionData) {
  const recentMessages = sessionData.messages.filter(
    msg => (currentTime - msg.timestamp) < timeWindow
  );
  
  if (recentMessages.length >= messageLimit) {
    return "rate_limit_exceeded";
  }
}

return "rate_limit_ok";
```

### Step 2: Create Rate Limit Storage

#### Google Sheets Integration
**Sheet Name:** `rate_limits`
**Columns:**
- `session_id` (String)
- `ip_address` (String)
- `message_count` (Number)
- `last_message_time` (DateTime)
- `blocked_until` (DateTime)
- `violation_count` (Number)

#### Data Structure
```json
{
  "session_id": "session-1703010900000",
  "ip_address": "192.168.1.100",
  "message_count": 8,
  "last_message_time": "2024-12-19T20:35:00.000Z",
  "blocked_until": null,
  "violation_count": 0
}
```

### Step 3: Implement Rate Limit Check

#### Node Sequence
1. **Extract Session Data** - Get current session information
2. **Check Rate Limits** - Validate against all rate limiting rules
3. **Update Counters** - Increment message count and update timestamps
4. **Route Based on Result** - Continue or block based on rate limit status

#### Rate Limit Check Logic
```javascript
// Rate limit validation function
function checkRateLimits(sessionId, ipAddress) {
  const currentTime = new Date();
  
  // Get session data
  const sessionData = getSessionData(sessionId);
  const ipData = getIPData(ipAddress);
  
  // Check session rate limit (10 messages per 5 minutes)
  if (sessionData && isSessionRateLimited(sessionData, currentTime)) {
    return {
      allowed: false,
      reason: "session_rate_limit",
      retryAfter: calculateRetryAfter(sessionData.lastMessageTime)
    };
  }
  
  // Check IP rate limit (50 messages per hour)
  if (ipData && isIPRateLimited(ipData, currentTime)) {
    return {
      allowed: false,
      reason: "ip_rate_limit",
      retryAfter: calculateRetryAfter(ipData.lastMessageTime)
    };
  }
  
  return { allowed: true };
}
```

## Response Messages

### Rate Limit Exceeded Messages

#### English
```json
{
  "success": false,
  "error": "rate_limit_exceeded",
  "message": "You've sent quite a few messages! Please wait a moment before sending another message. This helps ensure everyone gets a great experience.",
  "retryAfter": 300,
  "suggestion": "Feel free to browse my portfolio while you wait, or schedule a consultation for a more detailed discussion."
}
```

#### French
```json
{
  "success": false,
  "error": "rate_limit_exceeded",
  "message": "Vous avez envoyé plusieurs messages ! Veuillez attendre un moment avant d'envoyer un autre message. Cela aide à garantir une excellente expérience pour tous.",
  "retryAfter": 300,
  "suggestion": "N'hésitez pas à parcourir mon portfolio pendant que vous attendez, ou planifiez une consultation pour une discussion plus détaillée."
}
```

### IP Blocked Messages

#### English
```json
{
  "success": false,
  "error": "ip_blocked",
  "message": "We've detected unusual activity from your IP address. Please contact us directly if you need assistance.",
  "contact": "nickdevmtl@gmail.com",
  "retryAfter": 3600
}
```

## Security Measures

### Input Validation

#### Message Validation
```javascript
function validateMessage(message) {
  // Check message length
  if (message.length > 1000) {
    return { valid: false, error: "message_too_long" };
  }
  
  // Check for spam patterns
  if (containsSpamPatterns(message)) {
    return { valid: false, error: "spam_detected" };
  }
  
  // Check for malicious content
  if (containsMaliciousContent(message)) {
    return { valid: false, error: "malicious_content" };
  }
  
  return { valid: true };
}
```

#### Spam Detection Patterns
- Repeated identical messages
- Excessive special characters
- URLs in messages (unless specifically allowed)
- Suspicious keyword patterns
- Rapid message sending patterns

### Session Security

#### Session Validation
```javascript
function validateSession(sessionId) {
  // Check session format
  if (!isValidSessionFormat(sessionId)) {
    return { valid: false, error: "invalid_session" };
  }
  
  // Check session age
  if (isSessionExpired(sessionId)) {
    return { valid: false, error: "session_expired" };
  }
  
  // Check session integrity
  if (!isSessionIntact(sessionId)) {
    return { valid: false, error: "session_tampered" };
  }
  
  return { valid: true };
}
```

## Monitoring and Alerting

### Key Metrics to Monitor

#### Rate Limiting Metrics
- Rate limit violations per hour
- Average messages per session
- Peak usage times
- Geographic distribution of violations

#### Security Metrics
- Spam detection rate
- Malicious content attempts
- Session hijacking attempts
- IP blocking frequency

### Alert Thresholds

#### Warning Alerts
- Rate limit violations > 10 per hour
- Spam attempts > 5 per hour
- Unusual traffic patterns

#### Critical Alerts
- Rate limit violations > 50 per hour
- Spam attempts > 20 per hour
- Potential DDoS attack patterns
- Multiple IP blocks in short time

## Implementation Checklist

### Phase 1: Basic Rate Limiting
- [ ] Add rate limiting node to workflow
- [ ] Implement session-based rate limiting
- [ ] Create rate limit storage in Google Sheets
- [ ] Add rate limit exceeded responses
- [ ] Test with normal usage patterns

### Phase 2: Enhanced Security
- [ ] Implement IP-based rate limiting
- [ ] Add input validation
- [ ] Create spam detection
- [ ] Add session validation
- [ ] Test with abuse scenarios

### Phase 3: Monitoring & Optimization
- [ ] Set up monitoring dashboards
- [ ] Configure alerting
- [ ] Analyze usage patterns
- [ ] Optimize rate limits based on data
- [ ] Document incident response procedures

## Testing Scenarios

### Normal Usage Testing
- Send 5 messages in 5 minutes (should work)
- Send 10 messages in 5 minutes (should work)
- Send 11 messages in 5 minutes (should be blocked)

### Abuse Testing
- Send 50 messages rapidly (should trigger IP limit)
- Send spam-like content (should be blocked)
- Use multiple sessions from same IP (should be tracked)

### Edge Case Testing
- Very long messages
- Special characters and emojis
- Empty or whitespace-only messages
- Session ID manipulation attempts

## Rollback Plan

### Emergency Rollback
1. Disable rate limiting node
2. Restore previous workflow version
3. Monitor for abuse patterns
4. Investigate and fix issues
5. Re-enable with adjustments

### Gradual Rollback
1. Increase rate limits temporarily
2. Monitor impact on legitimate users
3. Adjust thresholds based on data
4. Fine-tune implementation
5. Restore normal operation

## Best Practices

### Rate Limit Configuration
- Start with generous limits
- Monitor usage patterns
- Adjust based on legitimate usage
- Consider time-of-day variations
- Account for different user types

### Security Considerations
- Log all security events
- Implement proper error handling
- Use secure session management
- Regular security audits
- Keep documentation updated

### User Experience
- Provide clear error messages
- Suggest alternative actions
- Avoid blocking legitimate users
- Offer escalation paths
- Maintain professional tone

---

*Last updated: December 19, 2024*
*Document version: 1.0*
