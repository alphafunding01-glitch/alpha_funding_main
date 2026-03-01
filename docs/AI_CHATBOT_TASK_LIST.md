# AI RAG Chatbot — Task List
## Alpha Funding Development Tracker

> **Status**: Ready for Development  
> **Reference**: [Implementation Plan](./AI_CHATBOT_IMPLEMENTATION_PLAN.md)

---

## Phase 1: Foundation & Database

### 1.1 Database Setup
- [ ] Enable Neon PostgreSQL via Vercel Marketplace integration
- [ ] Run SQL: `CREATE EXTENSION IF NOT EXISTS vector;`
- [ ] Create `drizzle.config.ts` configuration file
- [ ] Create `lib/db/index.ts` — Drizzle connection with Neon serverless

### 1.2 Database Schemas
- [ ] Create `lib/db/schema/resources.ts` — Source content table
- [ ] Create `lib/db/schema/embeddings.ts` — Vector embeddings table (1536d)
- [ ] Add HNSW index for vector cosine similarity search
- [ ] Run `npx drizzle-kit generate` to create migrations
- [ ] Run `npx drizzle-kit migrate` to apply to database

### 1.3 AI Utilities
- [ ] Create `lib/ai/embedding.ts` — Chunk generation + embedding functions
- [ ] Create `lib/ai/models.ts` — Model configuration constants
- [ ] Add `nanoid` helper to `lib/utils.ts`

### 1.4 Content Indexing
- [ ] Create `scripts/index-website.ts` — Crawler + embedder script
- [ ] Define list of Alpha Funding URLs to index (12+ pages)
- [ ] Implement paragraph-based chunking (500-1000 tokens per chunk)
- [ ] Run indexer: `npx tsx scripts/index-website.ts`
- [ ] Verify embeddings table has content: `SELECT COUNT(*) FROM embeddings;`

---

## Phase 2: RAG API Route

### 2.1 API Endpoint
- [ ] Create `app/api/chat/route.ts` with Vercel AI SDK 6
- [ ] Implement `streamText` with `toUIMessageStreamResponse()`
- [ ] Set `maxDuration = 30` for Vercel function timeout

### 2.2 Tool-Based Retrieval
- [ ] Implement `getInformation` tool with Zod schema
- [ ] Add vector similarity search using `cosineDistance`
- [ ] Set similarity threshold to 0.3 (tunable)
- [ ] Return top 5 relevant chunks with source attribution

### 2.3 System Prompt
- [ ] Write FCA-compliant system prompt
- [ ] Add "NOT FCA Authorized" statement
- [ ] Include broker (not lender) clarification
- [ ] Add disclaimer requirements (use naturally in responses)
- [ ] Implement lead capture prompts for buying intent

### 2.4 Testing
- [ ] Test API with curl command
- [ ] Verify streaming works correctly
- [ ] Test edge cases (no results found, long queries)

---

## Phase 3: Chat UI — Premium Widget

### 3.1 Widget Structure
- [ ] Create `components/chat/chat-widget.tsx` — Main container
- [ ] Implement toggle button with cyan gradient + pulse animation
- [ ] Create expanded/collapsed states with Framer Motion
- [ ] Add localStorage persistence for widget state

### 3.2 Chat Panel
- [ ] Create `components/chat/chat-panel.tsx` — Expanded view
- [ ] Add brand gradient header with traffic light dots
- [ ] Implement "Live" indicator with pulsing green dot
- [ ] Add close button with X icon

### 3.3 Messages
- [ ] Create `components/chat/chat-messages.tsx` — Message list
- [ ] Create `components/chat/message-bubble.tsx` — Individual messages
- [ ] Style user messages (cyan bg, white text)
- [ ] Style assistant messages (glass bg, white text)
- [ ] Implement auto-scroll to latest message

### 3.4 Generative UI Animations
- [ ] Create `components/chat/thinking-indicator.tsx`
- [ ] Add Sparkles icon + "Analyzing your question..." text
- [ ] Implement pulsing dots animation (0.6s loop)
- [ ] Add word-by-word text reveal for streaming responses
- [ ] Match AI Estimate/AI Summary animation patterns

### 3.5 Interactive Elements
- [ ] Create `components/chat/suggested-questions.tsx` — Empty state chips
- [ ] Create `components/chat/product-card.tsx` — Funding recommendations
- [ ] Create `components/chat/source-attribution.tsx` — Citations
- [ ] Implement follow-up suggestions after responses

### 3.6 Input & Actions
- [ ] Create `components/chat/chat-input.tsx` — Text input + send
- [ ] Style input with glassmorphic effect
- [ ] Add send button with `.cta-button-primary` style
- [ ] Implement keyboard shortcuts (Enter to send)

### 3.7 Compliance Footer
- [ ] Create `components/chat/chat-disclaimer.tsx`
- [ ] Add required disclaimer text (10px, slate-500)
- [ ] Include: "AI assistant · General guidance only · Not financial advice"

### 3.8 Mobile Responsiveness
- [ ] Expand to 85vh height on mobile
- [ ] Add safe-area padding for mobile keyboards
- [ ] Test on iOS Safari + Android Chrome
- [ ] Handle viewport resize for soft keyboards

### 3.9 Accessibility
- [ ] Add `aria-label` on toggle button
- [ ] Add `role="dialog"` on expanded panel
- [ ] Implement focus trap when panel is open
- [ ] Support Escape key to close
- [ ] Screen reader announces new messages

---

## Phase 4: Security & Rate Limiting

### 4.1 Rate Limiting
- [ ] Set up Upstash Redis via Vercel Marketplace
- [ ] Create `middleware.ts` with rate limiting logic
- [ ] Configure limits (e.g., 50 messages/hour per IP)

### 4.2 Input Sanitization
- [ ] Detect prompt injection phrases ("ignore previous instructions")
- [ ] Implement safe response redirect for suspicious inputs
- [ ] Log flagged attempts for monitoring

### 4.3 GDPR Compliance
- [ ] Add pre-chat privacy notice
- [ ] Include link to Privacy Policy
- [ ] Define data retention period (90 days recommended)
- [ ] Implement deletion mechanism if storing conversations

---

## Phase 5: Analytics & Tracking

### 5.1 Vercel Analytics
- [ ] Verify `@vercel/analytics` is already integrated
- [ ] Confirm page view tracking for chat pages

### 5.2 PostHog Events
- [ ] Initialize PostHog in chat widget
- [ ] Track `chatbot_opened` event
- [ ] Track `message_sent` event with message count
- [ ] Track `lead_captured` event with funding type
- [ ] Track `satisfaction_rated` event (thumbs up/down)

### 5.3 Session Recording
- [ ] Add Microsoft Clarity script (free, unlimited)
- [ ] Configure GDPR masking for PII
- [ ] Set up funnel visualization for chat journey

---

## Phase 6: Polish & Launch

### 6.1 Testing
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS Safari, Android Chrome)
- [ ] Accessibility testing with VoiceOver/TalkBack
- [ ] Performance testing (< 3s response time target)

### 6.2 Final Compliance Check
- [ ] Review all system prompt guardrails
- [ ] Verify disclaimers appear correctly
- [ ] Test compliance edge cases (rate guarantees, advice requests)

### 6.3 Production Deployment
- [ ] Set Vercel spending limits
- [ ] Configure environment variables in Vercel dashboard
- [ ] Deploy to production
- [ ] Monitor error logs and analytics

---

## Quick Commands Reference

```bash
# Install dependencies
pnpm add ai @ai-sdk/react @ai-sdk/openai drizzle-orm @neondatabase/serverless zod cheerio
pnpm add -D drizzle-kit tsx

# Generate migrations
npx drizzle-kit generate

# Apply migrations
npx drizzle-kit migrate

# Index website content
npx tsx scripts/index-website.ts

# Visual database browser
npx drizzle-kit studio

# Run development server
pnpm dev
```

---

## Notes

> [!CAUTION]
> **Alpha Funding is NOT FCA Authorized.** All chatbot responses must clearly communicate this. Never imply regulatory authorization or the ability to provide regulated financial advice.

> [!WARNING]
> **Design Consistency is Critical.** The chatbot must match the premium neuromorphic/glassmorphic design language. Use existing CSS classes from `globals.css` wherever possible.

> [!TIP]
> **Start with the Generative UI patterns.** Review `animated-funding-dashboard.tsx` and `ai-estimate.ts` before implementing chat animations to ensure consistency.
