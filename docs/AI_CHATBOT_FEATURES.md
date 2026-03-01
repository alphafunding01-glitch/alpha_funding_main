# AI RAG Chatbot — Feature Specification
## Alpha Funding Premium Chatbot Features

> **Version**: 1.0  
> **Reference**: [Implementation Plan](./AI_CHATBOT_IMPLEMENTATION_PLAN.md)

---

## Core Features

### 1. RAG-Powered Responses

**Description**: The chatbot uses Retrieval-Augmented Generation to answer questions about Alpha Funding's services. It searches a vector database of indexed website content to provide accurate, contextual responses.

**Capabilities**:
- Answers questions about funding products (loans, invoice finance, asset finance, etc.)
- Explains eligibility requirements
- Describes the application process
- Provides general guidance on business finance

**Limitations**:
- Cannot provide personalised financial advice
- Cannot quote specific interest rates
- Cannot guarantee loan approval
- Cannot access external data sources

---

### 2. Streaming Text Responses

**Description**: Responses stream word-by-word with smooth animations, creating an engaging "AI typing" effect that matches the existing Generative UI patterns.

**Technical Implementation**:
- Vercel AI SDK `streamText()` with `toUIMessageStreamResponse()`
- Framer Motion word-by-word reveal animation
- 50ms delay per word for readable streaming

---

### 3. Premium Floating Widget

**Description**: A floating chat bubble in the bottom-right corner expands into a full chat panel, matching the Alpha Funding premium design language.

**States**:
| State | Behavior |
|-------|----------|
| **Collapsed** | Circular button with `MessageCircle` icon, cyan gradient, pulse on first visit |
| **Expanded** | Glass panel (400x600 on desktop, 85vh on mobile) |
| **Empty** | Welcome message + suggested questions |
| **Conversing** | Message thread with auto-scroll |
| **Thinking** | Animated loading indicator |
| **Error** | Red-tinted message with retry option |

---

### 4. Thinking Indicator Animation

**Description**: While the chatbot processes a query, a beautiful loading animation displays, matching the AI Estimate "calculating" pattern.

**Design**:
```
✨ Analyzing your question...  ●  ●  ●
```

- Sparkles icon (cyan)
- "Analyzing your question..." text
- Three pulsing dots (0.6s staggered animation)

---

### 5. Suggested Questions

**Description**: On empty state and after each response, the chatbot shows clickable question chips to guide users.

**Default Suggestions**:
1. "What business loans do you offer?"
2. "How does invoice finance work?"
3. "Am I eligible for funding?"
4. "What documents do I need?"

**Follow-up Suggestions**: Dynamically generated based on conversation context.

---

### 6. Product Recommendation Cards

**Description**: When discussing funding products, the chatbot renders interactive neuromorphic cards instead of plain text.

**Card Design**:
```
┌────────────────────────────────────┐
│  💷  Invoice Finance               │
│      Release up to 90% of invoice  │
│      value in 24 hours             │
│                        [Learn More]│
└────────────────────────────────────┘
```

**Features**:
- Icon representing product type
- Product name + brief description
- "Learn More" link to product page
- Hover animation (scale + lift)

---

### 7. Source Attribution

**Description**: When the chatbot uses information from the knowledge base, it displays the source for transparency.

**Design**:
```
🛡️ Based on Alpha Funding's Business Loans guide
```

- Shield icon for trust
- Source page name
- Clickable link to original page

---

### 8. Compliance Disclaimers

**Description**: Every relevant response includes appropriate disclaimers to maintain regulatory compliance.

**Required Statements**:
- "Alpha Funding is a business finance broker, not a direct lender."
- "All funding is subject to status and lender approval."
- "This is general guidance, not financial advice."

**Persistent Footer**:
```
AI assistant · General guidance only · Not financial advice · Subject to status
```

> [!CAUTION]
> **Alpha Funding is NOT FCA Authorized.** The chatbot must never imply regulatory authorization.

---

### 9. Mobile-First Responsiveness

**Description**: The chat widget is fully functional on mobile devices with proper touch interactions and keyboard handling.

**Mobile Adaptations**:
- Full-height panel (85vh) on mobile
- Safe-area padding for notched devices
- Soft keyboard handling with viewport adjustments
- Touch-optimized button sizes (44px minimum)
- Swipe-to-close gesture (optional enhancement)

---

### 10. Accessibility Features

**Description**: The chatbot meets WCAG 2.1 AA accessibility standards.

**Features**:
- `aria-label` on all interactive elements
- `role="dialog"` on expanded panel
- Focus trap when panel is open
- Escape key closes panel
- Screen reader announces new messages
- High contrast text on all backgrounds
- Keyboard navigation support

---

## Security Features

### 11. Rate Limiting

**Description**: Prevents abuse by limiting message frequency per user/IP.

**Configuration**:
- 50 messages per hour per IP
- Graceful error message when limit reached
- Reset counter via Upstash Redis TTL

---

### 12. Input Sanitization

**Description**: Detects and blocks potential prompt injection attacks.

**Detection Patterns**:
- "Ignore previous instructions"
- "Disregard your prompt"
- "Act as a different AI"
- Base64-encoded payloads

**Response**: Redirect to safe, generic response without revealing detection.

---

### 13. GDPR Compliance

**Description**: Handles user data in accordance with UK GDPR and PECR.

**Features**:
- Pre-chat privacy notice
- No cookies required (cookie-free analytics)
- 90-day conversation data retention limit
- User data deletion mechanism
- Legitimate interests basis for chat operation

---

## Analytics Features

### 14. Event Tracking

**Description**: Comprehensive analytics for chatbot performance and user behavior.

**Tracked Events**:
| Event | Data Captured |
|-------|---------------|
| `chatbot_opened` | Timestamp, page URL |
| `message_sent` | Message count, session duration |
| `lead_captured` | Funding type, contact method |
| `satisfaction_rated` | Thumbs up/down |
| `handoff_requested` | Reason for human request |

---

### 15. Session Recording

**Description**: Microsoft Clarity integration for understanding user interactions.

**Features**:
- Heatmaps for click distribution
- Session playback for UX analysis
- GDPR-compliant PII masking
- Free, unlimited recordings

---

## Design Features

### 16. Brand Gradient Header

**Description**: The chat panel header uses the Alpha Funding brand gradient.

**Gradient**: `linear-gradient(135deg, #030f42 0%, #1CB5E0 100%)`

**Includes**:
- Traffic light dots (red, yellow, green) — decorative
- "Alpha Funding Assistant" title
- "Live" indicator with pulsing green dot
- Close button (X icon)

---

### 17. Glassmorphic Design

**Description**: The chat panel uses the established glassmorphic card style.

**CSS Properties**:
```css
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.25);
border-radius: 16px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
```

---

### 18. Neuromorphic Product Cards

**Description**: Funding product recommendations use soft UI shadows for tactile depth.

**CSS Properties**:
```css
background: var(--card);
box-shadow: 
  8px 8px 16px rgba(15, 23, 42, 0.08),
  -8px -8px 16px rgba(255, 255, 255, 0.8);
border: 1px solid rgba(255, 255, 255, 0.5);
```

---

## Future Features (Post-MVP)

### 19. Lead Capture with CRM Integration
Push qualified leads directly to HubSpot CRM with full conversation context.

### 20. Live Chat Handoff
Escalate to human advisors when chatbot detects complex queries or explicit requests.

### 21. Email Automation
Trigger Resend-powered email sequences after lead capture.

### 22. WhatsApp Integration
Continue conversations on WhatsApp via Cloud API.

### 23. A/B Testing
Test different system prompts and greeting messages with Vercel Edge Config.

---

## Feature Priority Matrix

| Feature | Priority | Complexity | Phase |
|---------|----------|------------|-------|
| RAG-powered responses | 🔴 Critical | High | 1-2 |
| Streaming text | 🔴 Critical | Medium | 2 |
| Premium widget | 🔴 Critical | High | 3 |
| Thinking animation | 🟡 High | Low | 3 |
| Suggested questions | 🟡 High | Low | 3 |
| Product cards | 🟡 High | Medium | 3 |
| Source attribution | 🟢 Medium | Low | 3 |
| Compliance disclaimers | 🔴 Critical | Low | 2-3 |
| Mobile responsiveness | 🔴 Critical | Medium | 3 |
| Accessibility | 🟡 High | Medium | 3 |
| Rate limiting | 🟡 High | Low | 4 |
| Input sanitization | 🔴 Critical | Low | 4 |
| Analytics | 🟢 Medium | Low | 5 |
| Session recording | 🟢 Medium | Low | 5 |
