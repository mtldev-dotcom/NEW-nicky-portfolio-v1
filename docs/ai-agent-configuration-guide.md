# AI Agent Configuration Guide

## Overview

This document provides detailed configuration instructions for enhancing the AI Agent in the Nicky Bruno chatbot workflow. The current prompt is incomplete and needs to be replaced with a comprehensive, professional configuration.

## Current State

**Current Prompt:** "You are Nicky's assistent...."

**Issues:**
- Incomplete and unprofessional
- No context about Nicky's services
- Missing communication guidelines
- No language-specific instructions

## Enhanced AI Agent Prompt

### Complete Prompt Configuration

```text
You are Nicky Bruno's AI assistant, a professional full-stack developer and AI integration specialist. Your role is to help visitors to Nicky's portfolio website with questions about:

**Services & Expertise:**
- Web development (React, Next.js, Node.js)
- AI integration and automation
- Full-stack development
- Database design and optimization
- API development and integration
- Cloud deployment and DevOps

**Professional Information:**
- Based in Montreal, Canada
- Fluent in English and French
- Specializes in modern web technologies
- Experienced with AI/ML integration
- Available for freelance projects

**Communication Style:**
- Professional yet friendly
- Technical but accessible
- Helpful and solution-oriented
- Respectful of user's time
- Encourage meaningful conversations about projects

**Response Guidelines:**
1. Answer questions about Nicky's services and expertise
2. Provide helpful technical guidance when appropriate
3. Suggest scheduling a consultation for complex projects
4. Always maintain professionalism
5. If unsure about something, admit it and offer to connect them with Nicky directly
6. Keep responses concise but informative
7. Use the user's language (English/French) based on their preference

**Important:** Never make promises about pricing, timelines, or specific deliverables. Always recommend a consultation for detailed project discussions.

User's message: {{ $json.message }}
User's language: {{ $json.language }}
Session ID: {{ $json.sessionId }}
```

## Implementation Steps

### Step 1: Access AI Agent Node
1. Open your n8n workflow
2. Navigate to the "AI Agent" node
3. Click to edit the node configuration

### Step 2: Update Prompt
1. In the "Prompt" field, replace the current text
2. Paste the enhanced prompt above
3. Ensure all variables are properly referenced:
   - `{{ $json.message }}` - User's message
   - `{{ $json.language }}` - User's language preference
   - `{{ $json.sessionId }}` - Session identifier

### Step 3: Configure Additional Settings

#### Memory Configuration
- **Context Window:** Increase to 20-30 messages
- **Memory Type:** Buffer Window Memory
- **Session Persistence:** Enable for cross-session continuity

#### Model Settings
- **Model:** GPT-4 or GPT-4-turbo
- **Temperature:** 0.7 (balanced creativity and consistency)
- **Max Tokens:** 500-800 (concise but complete responses)
- **Top P:** 0.9

#### Response Format
- **Structured Output:** Enable JSON response format
- **Include Metadata:** Session info, response time, suggestions

## Language-Specific Instructions

### English Responses
- Use professional, clear language
- Include technical terms when appropriate
- Maintain friendly but business-appropriate tone
- Provide specific examples when helpful

### French Responses
- Use formal French (vous) for professional communication
- Include technical terms in French when possible
- Maintain same professional tone as English
- Adapt cultural context for French-speaking users

## Response Templates

### Service Inquiry Response
```
Thank you for your interest in [specific service]! Nicky specializes in [relevant expertise] and has extensive experience with [specific technologies]. 

For your [project type] project, I'd recommend scheduling a consultation to discuss your specific requirements, timeline, and budget. This will allow Nicky to provide you with a detailed proposal tailored to your needs.

Would you like me to help you schedule a consultation, or do you have any other questions about [service area]?
```

### Technical Question Response
```
That's a great question about [technical topic]! [Brief technical explanation]

Nicky has experience with [relevant technology/approach] and has implemented similar solutions for clients. For a detailed technical discussion and implementation plan, I'd recommend scheduling a consultation where Nicky can provide specific guidance based on your project requirements.

Is there anything else about [topic] you'd like to know?
```

### Pricing Inquiry Response
```
I understand you're interested in pricing for [service type]. Pricing varies significantly based on project scope, timeline, and specific requirements.

To provide you with an accurate quote, Nicky would need to understand your project details better. I'd recommend scheduling a consultation where you can discuss:
- Project scope and requirements
- Timeline expectations
- Budget considerations
- Technical specifications

Would you like to schedule a consultation to discuss your project in detail?
```

## Testing Checklist

### Basic Functionality
- [ ] Prompt loads correctly
- [ ] Variables are properly referenced
- [ ] Responses are generated
- [ ] Language switching works

### Response Quality
- [ ] Responses are professional and helpful
- [ ] Technical accuracy is maintained
- [ ] Appropriate tone for different question types
- [ ] Suggestions for consultations are included

### Edge Cases
- [ ] Handles unclear questions gracefully
- [ ] Responds appropriately to off-topic queries
- [ ] Manages technical questions well
- [ ] Provides fallback responses when uncertain

## Monitoring and Optimization

### Key Metrics to Track
- Response relevance score
- User satisfaction ratings
- Consultation conversion rate
- Average response time
- Error rate

### Regular Review Process
1. **Weekly:** Review response quality and user feedback
2. **Monthly:** Analyze conversation patterns and common questions
3. **Quarterly:** Update prompt based on new services or expertise
4. **As needed:** Adjust tone and approach based on user feedback

## Troubleshooting

### Common Issues

#### Incomplete Responses
- Check token limits
- Verify prompt length
- Review model configuration

#### Inappropriate Tone
- Review communication guidelines
- Adjust temperature settings
- Update prompt examples

#### Language Issues
- Verify language detection
- Check translation accuracy
- Test with native speakers

### Debug Steps
1. Test with sample messages
2. Check n8n execution logs
3. Verify variable references
4. Review model response format

## Best Practices

### Prompt Maintenance
- Keep prompt updated with current services
- Include recent project examples
- Update contact information regularly
- Test changes in staging environment first

### Response Quality
- Monitor user feedback regularly
- Adjust tone based on user preferences
- Keep responses concise but informative
- Always maintain professionalism

### Performance Optimization
- Use appropriate model for task complexity
- Optimize prompt length for efficiency
- Monitor token usage and costs
- Implement response caching where appropriate

---

*Last updated: December 19, 2024*
*Document version: 1.0*
