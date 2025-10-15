# Troubleshooting Guide

Common issues and solutions for the portfolio website integrations.

---

## Contact Form Issues

### "Unexpected end of JSON input" Error

**Symptoms:**
- `SyntaxError: Unexpected end of JSON input` in console
- Form shows error state after submission
- Error occurs at `response.json()` line

**Cause:** 
Webhook URL mismatch - the code is trying to reach a webhook that doesn't exist, so n8n returns HTML/empty response instead of JSON.

**Solution:**
```typescript
// Verify webhook URL matches n8n configuration
// CORRECT: 
const response = await fetch('https://n8n.nickyhome.casa/webhook-test/contact-form', {...})

// INCORRECT:
const response = await fetch('https://n8n.nickyhome.casa/webhook/contact-form', {...})
//                                                      ^^^^
//                                                      Missing "-test"
```

**Prevention:**
The updated code now includes response validation:
```typescript
// Check response status
if (!response.ok) {
  console.error('Server error:', response.status, response.statusText);
  setSubmitStatus('error');
  return;
}

// Check response is JSON before parsing
const contentType = response.headers.get('content-type');
if (!contentType || !contentType.includes('application/json')) {
  console.error('Invalid response type:', contentType);
  setSubmitStatus('error');
  return;
}
```

---

### Form Not Submitting

**Symptoms:**
- Form appears stuck after clicking submit
- No success or error message
- Loading state doesn't end

**Possible Causes & Solutions:**

1. **Network Error**
   ```javascript
   // Check browser console for errors
   // Look for: "Failed to fetch" or "Network request failed"
   ```
   **Solution:** 
   - Verify n8n instance is running at `https://n8n.nickyhome.casa`
   - Check internet connection
   - Verify webhook URL is correct in `ContactForm.tsx`
   - Must be: `https://n8n.nickyhome.casa/webhook-test/contact-form`

2. **CORS Error**
   ```
   Access to fetch has been blocked by CORS policy:
   No 'Access-Control-Allow-Origin' header is present
   ```
   **Solution:**
   
   ✅ **FIXED:** The workflow now allows CORS from:
   - `http://localhost:3000` (development)
   - `https://nickybruno.com` (production)
   - `https://www.nickybruno.com` (production with www)
   
   **If you still see CORS errors:**
   1. Open n8n workflow editor: https://n8n.nickyhome.casa
   2. Click on "Contact Form Webhook" node
   3. Expand "Options" section
   4. Set "Allowed Origins" to:
      ```
      http://localhost:3000,https://nickybruno.com,https://www.nickybruno.com
      ```
   5. Save and reactivate workflow
   
   **For different ports:**
   Add your port to allowed origins (e.g., `http://localhost:3001`)

3. **Workflow Inactive**
   **Solution:**
   - Open n8n: https://n8n.nickyhome.casa
   - Find "nickybruno.com" workflow
   - Click the toggle to activate it
   - Verify status shows "Active"

---

### Email Not Received

**Symptoms:**
- Form submits successfully
- Success message appears
- But no email arrives

**Possible Causes & Solutions:**

1. **Check Spam Folder**
   - Look in spam/junk folder
   - Mark as "Not Spam" if found
   - Add sender to contacts

2. **Gmail Credentials Expired**
   **Solution:**
   ```
   1. Go to n8n → Credentials
   2. Find "Gmail OAuth2"
   3. Click "Test" button
   4. If failed, click "Reconnect"
   5. Re-authorize with Google
   6. Test workflow again
   ```

3. **Email Address Invalid**
   - Verify email format is correct
   - Check for typos in address
   - Test with a different email

4. **Gmail API Quota Exceeded**
   **Solution:**
   - Check Google Cloud Console quota
   - Wait for quota reset (usually 24 hours)
   - Or increase quota limits

5. **Workflow Error**
   **Check Execution Logs:**
   ```
   1. Go to n8n → Executions
   2. Find latest failed execution
   3. Click to view details
   4. Check "Send Confirmation Email" node
   5. Review error message
   ```

---

### Validation Errors

**Symptoms:**
- Form shows error message
- Response: "Validation failed"
- Fields highlighted in red

**Solutions by Field:**

1. **"Name is required"**
   - Ensure name field is filled
   - Cannot be empty or whitespace only

2. **"Valid email is required"**
   - Check email format: `user@domain.com`
   - No spaces or special characters
   - Must include @ and domain extension

3. **"Message is required"**
   - Ensure message textarea is filled
   - Cannot be empty or whitespace only

**Test Pattern:**
```javascript
// Email validation regex
/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

// Examples:
✅ john@example.com
✅ jane.doe@company.co.uk
❌ invalid.email
❌ @example.com
❌ user@
```

---

### Form State Issues

**Problem: Form doesn't clear after submission**

**Solution:**
```typescript
// Check ContactForm.tsx line ~87-98
// Ensure this code runs after successful submission:
setFormData({
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
  newsletter: false,
  terms: false
});
```

**Problem: Loading state stuck**

**Solution:**
```typescript
// Ensure finally block always runs:
} finally {
  setIsSubmitting(false);
}
```

---

## n8n Workflow Issues

### Workflow Won't Activate

**Error:** "Cannot activate workflow"

**Solutions:**

1. **Missing Credentials**
   - Ensure Gmail OAuth2 credential exists
   - Name must be exactly: "Gmail OAuth2"
   - Test credential is working

2. **Webhook Conflict**
   - Another workflow using same webhook path
   - Change path or deactivate conflicting workflow

3. **Node Configuration Error**
   - Open workflow editor
   - Look for red exclamation marks on nodes
   - Fix missing required fields

### Execution Fails

**Check Error Type:**

1. **"Node not found" Error**
   ```
   Solution: Update workflow node connections
   Verify all nodes are properly connected
   ```

2. **"Credential not found" Error**
   ```
   Solution: Re-link Gmail credentials
   1. Click on "Send Confirmation Email" node
   2. Under Credentials, select "Gmail OAuth2"
   3. Save workflow
   ```

3. **"Expression Error" Error**
   ```
   Solution: Check expression syntax
   Common issues:
   - Missing {{ }} around expressions
   - Typo in field names (e.g., $json.body.name)
   - Accessing undefined properties
   ```

---

## API Testing

### Test with cURL

**Valid Request:**
```powershell
curl -X POST https://n8n.nickyhome.casa/webhook-test/contact-form `
  -H "Content-Type: application/json" `
  -v `
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

**Expected Response:**
```
< HTTP/1.1 200 OK
< Content-Type: application/json

{
  "success": true,
  "message": "Thank you! Your message has been received...",
  "data": {
    "name": "Test User",
    "email": "test@example.com",
    "timestamp": "2025-10-15T20:30:00.000Z"
  }
}
```

**Invalid Request (Test Validation):**
```powershell
curl -X POST https://n8n.nickyhome.casa/webhook-test/contact-form `
  -H "Content-Type: application/json" `
  -d '{
    "name": "",
    "email": "invalid",
    "message": ""
  }'
```

**Expected Response:**
```
< HTTP/1.1 400 Bad Request
< Content-Type: application/json

{
  "success": false,
  "message": "Validation failed. Please check your form data.",
  "errors": [
    "Name is required",
    "Valid email is required",
    "Message is required"
  ]
}
```

### Response Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Email sent, form processed |
| 400 | Bad Request | Fix validation errors |
| 404 | Not Found | Check webhook URL |
| 500 | Server Error | Check n8n logs |
| 503 | Service Unavailable | n8n may be down |

---

## Development Issues

### TypeScript Errors

**Error:** Type errors in ContactForm.tsx

**Common Issues:**

1. **useState type mismatch**
   ```typescript
   // Ensure submitStatus type allows null
   const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
   ```

2. **Event handler types**
   ```typescript
   // Use proper event type
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     // ...
   }
   ```

### Build Errors

**Error:** "Module not found"

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
npm ci

# Rebuild
npm run build
```

### Environment Issues

**Missing translations:**
```bash
# Verify translation files exist:
src/i18n/messages/en/contact.json
src/i18n/messages/fr/contact.json

# Check keys match in ContactForm.tsx:
t('contact.sections.form.submit')
```

---

## Gmail OAuth Issues

### Token Expired

**Error:** "Token has been expired or revoked"

**Solution:**
```
1. Go to n8n → Credentials → Gmail OAuth2
2. Click "Reconnect"
3. Sign in with Google account
4. Grant permissions:
   - View email messages
   - Send email
5. Click "Allow"
6. Test credential
```

### Permission Denied

**Error:** "Insufficient permissions"

**Solution:**
```
1. Check Google Cloud Console
2. Verify Gmail API is enabled
3. Check OAuth consent screen status
4. Ensure scopes include:
   - https://www.googleapis.com/auth/gmail.send
   - https://www.googleapis.com/auth/gmail.compose
```

### Quota Exceeded

**Error:** "Quota exceeded for quota metric"

**Check Quotas:**
```
1. Google Cloud Console
2. APIs & Services → Dashboard
3. Gmail API → Quotas
4. Review daily limits
```

**Default Limits:**
- Send: 500 emails/day (free tier)
- 100 emails/day (new accounts)

**Solutions:**
- Wait for quota reset (midnight Pacific Time)
- Request quota increase
- Upgrade to paid tier

---

## Debugging Checklist

### When form doesn't work:

- [ ] n8n instance is accessible: https://n8n.nickyhome.casa
- [ ] Workflow "nickybruno.com" is active
- [ ] Gmail OAuth2 credential is connected and valid
- [ ] Webhook URL in code matches actual endpoint
- [ ] Browser console shows no errors
- [ ] Network tab shows 200 or 400 response
- [ ] Required fields (name, email, message) are filled
- [ ] Email format is valid
- [ ] Internet connection is stable

### When email doesn't arrive:

- [ ] Check spam/junk folder
- [ ] Verify email address is correct
- [ ] Check n8n execution logs for errors
- [ ] Test Gmail credential in n8n
- [ ] Check Google Cloud Console quotas
- [ ] Try different email address
- [ ] Wait 5 minutes (occasional delays)
- [ ] Check Gmail API status page

---

## Getting More Help

### n8n Logs

**Access Execution Logs:**
```
1. Go to: https://n8n.nickyhome.casa/executions
2. Filter by workflow: "nickybruno.com"
3. Click on failed execution
4. Review each node's output
5. Look for error messages in red
```

### Browser DevTools

**Check Console:**
```
1. Press F12 (Windows) or Cmd+Option+I (Mac)
2. Go to Console tab
3. Look for red error messages
4. Copy error text for debugging
```

**Check Network:**
```
1. Open DevTools (F12)
2. Go to Network tab
3. Submit form
4. Find POST to webhook URL
5. Check:
   - Status code
   - Request payload
   - Response body
   - Headers
```

### Support Contacts

- **Email:** nickdevmtl@gmail.com
- **n8n Dashboard:** https://n8n.nickyhome.casa
- **GitHub Issues:** (if repository is public)

---

## Common Error Messages

### "Failed to fetch"
**Cause:** Network error or CORS  
**Solution:** Check n8n instance is running, verify CORS settings

### "Validation failed"
**Cause:** Required fields missing or invalid  
**Solution:** Check form inputs, ensure name, email, message are filled

### "Workflow not found"
**Cause:** Workflow deleted or renamed  
**Solution:** Verify workflow ID matches in n8n

### "Credential not found"
**Cause:** Gmail credential missing or renamed  
**Solution:** Ensure credential named "Gmail OAuth2" exists

### "Rate limit exceeded"
**Cause:** Too many requests  
**Solution:** Wait and try again, implement rate limiting

---

## Prevention Tips

### Best Practices

1. **Test Regularly**
   - Weekly form submission test
   - Monthly full integration test
   - Check email delivery

2. **Monitor Logs**
   - Review n8n executions weekly
   - Watch for error patterns
   - Set up alerts for failures

3. **Keep Credentials Fresh**
   - Test Gmail OAuth monthly
   - Renew before expiration
   - Keep backup credentials

4. **Backup Configuration**
   - Export n8n workflow monthly
   - Document changes
   - Version control integration code

5. **Update Dependencies**
   - Keep Next.js updated
   - Update n8n when stable versions release
   - Review breaking changes

---

**Last Updated:** October 15, 2025  
**For additional help, see:** [contact-form-n8n-integration.md](./contact-form-n8n-integration.md)

