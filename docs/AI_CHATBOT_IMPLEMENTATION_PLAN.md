# AI RAG Chatbot Implementation Plan
## Alpha Funding — Premium Generative UI Chatbot

> **Status**: Pre-Development Planning  
> **Last Updated**: February 8, 2026  
> **Reference Document**: [AI_Chatbot.md](./AI_Chatbot.md)

---

## Executive Summary

This document outlines the implementation plan for Alpha Funding's AI RAG (Retrieval-Augmented Generation) chatbot. The chatbot will integrate seamlessly with the existing premium design system (Midnight + Cyan theme, neuromorphic/glassmorphic patterns) and match the established "Generative UI" patterns from the AI Estimate and AI Summary components.

> [!IMPORTANT]
> **Alpha Funding is NOT FCA Authorized.** The chatbot must:
> - Clearly state Alpha Funding is a **broker, not a lender**
> - NEVER provide personalised financial advice
> - NEVER guarantee approval or specific rates
> - Always recommend speaking to an advisor for specific circumstances
> - Include appropriate disclaimers in all responses

---

## ✅ Confirmed Decisions

| Decision | Choice |
|----------|--------|
| **Vercel Plan** | FREE tier (10s function timeout) |
| **Content Indexing** | All pages including policies; ask before excluding |
| **Lead Capture** | Hybrid: Callback form + Eligibility link based on intent |
| **Widget Placement** | Bottom-right, all pages, minimized on form pages |
| **Pulse Delay** | 8s (new visitor), 3s (returning), none (engaged) |
| **Persistence** | NO database storage; localStorage only |
| **Human Handoff** | Email to advisors with conversation context |

---

## Tech Stack Selection

| Layer | Technology | Justification |
|-------|------------|---------------|
| **Framework** | Next.js 15 (App Router) | Already deployed; supports streaming |
| **AI SDK** | Vercel AI SDK 6 | Native streaming, `useChat` hook, tool-based RAG |
| **LLM** | GPT-4o-mini | £4.50/month at 10K conversations, excellent quality |
| **Embeddings** | OpenAI text-embedding-3-small | £0.20/month, 1536 dimensions |
| **Vector DB** | Neon PostgreSQL + pgvector | Native Vercel integration, free tier |
| **ORM** | Drizzle ORM | Type-safe, official RAG template support |
| **Analytics** | Vercel Analytics + PostHog | Free tiers, GDPR compliant |
| **Rate Limiting** | Upstash Redis | Serverless, edge-compatible |

**Estimated Monthly Cost**: ~£25 (Vercel Pro + AI API costs)

---

## Phase Breakdown

### Phase 1: Foundation & Database (Days 1-3)

**Goal**: Set up the database infrastructure and content indexing pipeline.

#### Features
- [ ] Neon PostgreSQL database provisioning via Vercel Marketplace
- [ ] pgvector extension enabled for vector similarity search
- [ ] Drizzle ORM schemas for `resources` and `embeddings` tables
- [ ] Database migrations with HNSW indexing for performance
- [ ] Content indexing script for Alpha Funding website pages

#### Files to Create
```
lib/db/
├── index.ts                    # Drizzle ORM connection (Neon serverless)
└── schema/
    ├── resources.ts            # Source content table
    └── embeddings.ts           # Vector embeddings table (1536d)
lib/ai/
├── embedding.ts                # Embedding utility functions
└── models.ts                   # Model configuration constants
lib/utils.ts                    # Add nanoid helper
scripts/
├── index-website.ts            # Website crawler + embedder
└── reindex.ts                  # Incremental re-indexing
drizzle.config.ts               # Drizzle configuration
```

#### Pages to Index
1. Homepage (`/`)
2. Business Loans (`/solutions/business-loans`)
3. Invoice Finance (`/solutions/invoice-finance`)
4. Asset Finance (`/solutions/asset-finance`)
5. Merchant Cash Advance (`/solutions/merchant-cash-advance`)
6. Commercial Mortgages (`/solutions/commercial-mortgages`)
7. About (`/about`)
8. FAQ (`/faq`)
9. Contact (`/contact`)
10. Eligibility Checker (`/eligibility`)
11. Calculator (`/calculator`)
12. Partner With Us (`/partner`)

---

### Phase 2: RAG API Route (Days 4-5)

**Goal**: Create the streaming API endpoint with tool-based retrieval.

#### Features
- [ ] `/api/chat` route with Vercel AI SDK 6
- [ ] `getInformation` tool for vector similarity search
- [ ] Streaming responses with proper error handling
- [ ] FCA-compliant system prompt with guardrails
- [ ] Similarity threshold tuning (start at 0.3)

#### Files to Create
```
app/api/chat/
└── route.ts                    # RAG API with tool-based retrieval
```

#### System Prompt Requirements
The system prompt MUST include:
```
CRITICAL RULES:
- Alpha Funding is a BROKER, not a lender
- Alpha Funding is NOT FCA Authorized
- NEVER guarantee approval or specific rates
- NEVER provide personalised financial advice
- Always recommend speaking to an advisor for specific circumstances
- All funding is subject to status and lender approval

REQUIRED DISCLAIMERS (use naturally):
- "This is general guidance, not financial advice."
- "Actual terms depend on your circumstances and lender assessment."
- "Alpha Funding is a business finance broker, not a direct lender."
```

---

### Phase 3: Chat UI — Premium Widget (Days 6-10)

**Goal**: Build a floating chat widget matching the Alpha Funding design system.

#### Features
- [ ] Floating bottom-right toggle button with cyan gradient
- [ ] Expandable glass panel with brand gradient header
- [ ] Message bubbles (user: cyan, assistant: glass)
- [ ] "Thinking" indicator matching AI Estimate animation pattern
- [ ] Word-by-word streaming text reveal (Generative UI)
- [ ] Suggested questions on empty state
- [ ] Follow-up suggestions after responses
- [ ] Product recommendation cards (neuromorphic style)
- [ ] Source attribution for knowledge base citations
- [ ] Mobile responsive (85vh on mobile, 400x600 on desktop)
- [ ] Accessibility (focus trap, aria labels, escape key)

#### Files to Create
```
components/chat/
├── chat-widget.tsx             # Main floating widget container
├── chat-panel.tsx              # Expanded chat panel with useChat
├── chat-messages.tsx           # Message list with auto-scroll
├── message-bubble.tsx          # Individual message styling
├── chat-input.tsx              # Input with send button
├── thinking-indicator.tsx      # Animated loading state
├── suggested-questions.tsx     # Quick-start chips
├── product-card.tsx            # Inline funding recommendations
├── callback-form.tsx           # Lead capture form (name, phone, time)
├── source-attribution.tsx      # Knowledge base citations
└── chat-disclaimer.tsx         # FCA-required footer
hooks/
└── use-chat-widget.ts          # Widget state + localStorage (pulse delays)
```

#### Design Requirements

| Element | Style |
|---------|-------|
| Toggle button | `bg-gradient-to-r from-[#030f42] to-[#1CB5E0]` + pulse animation |
| Panel container | `.glass-panel-light` + `rounded-2xl` |
| Header | `bg-gradient-to-r from-[#030f42] to-[#1CB5E0]` + traffic light dots |
| User messages | `bg-brand-cyan text-white rounded-xl` |
| Assistant messages | `bg-white/10 border border-white/10 rounded-xl` |
| Input | `bg-white/5 border-white/20 focus:border-brand-cyan` |
| Send button | `.cta-button-primary` style |
| Suggestions | `.glass-panel-cyan` pills |
| Thinking dots | Cyan pulsing animation (0.6s loop) |

#### Animation Timings

| Animation | Duration | Easing |
|-----------|----------|--------|
| Widget open | 300ms | `ease-out` |
| Widget close | 200ms | `ease-in` |
| Message appear | 200ms | `spring` |
| Thinking dots | 600ms loop | `ease-in-out` |
| Word reveal | 50ms per word | `ease-out` |

---

### Phase 4: Security & Rate Limiting (Day 11)

**Goal**: Add production security measures.

#### Features
- [ ] Upstash Redis rate limiting middleware
- [ ] Basic prompt injection detection
- [ ] Input sanitization for malicious patterns
- [ ] GDPR-compliant pre-chat notice
- [ ] Conversation data handling policy

#### Files to Create/Modify
```
middleware.ts                   # Rate limiting via Upstash
```

---

### Phase 5: Analytics & Tracking (Days 12-13)

**Goal**: Implement comprehensive analytics for chatbot interactions.

#### Features
- [ ] Vercel Web Analytics integration (zero-config)
- [ ] PostHog custom events for chatbot
- [ ] Microsoft Clarity for session replay (free)
- [ ] Custom events: `chatbot_opened`, `message_sent`, `lead_captured`

#### Tracked Metrics
- Conversation completion rate
- Lead capture rate
- Handoff rate (requests for human advisor)
- User satisfaction (thumbs up/down)
- Top question categories

---

### Phase 6: Polish & Launch (Day 14)

**Goal**: Final testing and production deployment.

#### Features
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Android Chrome)
- [ ] Accessibility audit (VoiceOver/TalkBack)
- [ ] Load testing and performance optimization
- [ ] Vercel spending limits configuration
- [ ] Production deployment

---

## Verification Plan

### Automated Testing

```bash
# Run indexing script and verify embeddings
npx tsx scripts/index-website.ts
# Verify: Check embeddings table has > 0 rows

# Test API route with curl
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"What is invoice finance?"}]}'
# Verify: Response streams correctly
```

### Manual Testing

1. **Chat Widget Functionality**
   - Open widget → verify animation
   - Send message → verify streaming response
   - Check mobile responsiveness

2. **Compliance Verification**
   - Ask "Can you guarantee my loan approval?" → should refuse
   - Ask for specific rates → should decline with disclaimer
   - Verify all responses include appropriate disclaimers

3. **Design Validation**
   - Compare widget to design system colors
   - Verify glassmorphic/neuromorphic effects
   - Check animation timings match spec

---

## Environment Variables Required

```env
# Database (from Neon via Vercel Marketplace)
DATABASE_URL=

# OpenAI (from platform.openai.com)
OPENAI_API_KEY=

# Rate Limiting (optional Phase 1)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

---

## Dependencies to Install

```bash
# Core AI + database
pnpm add ai @ai-sdk/react @ai-sdk/openai drizzle-orm @neondatabase/serverless zod

# Dev tools
pnpm add -D drizzle-kit tsx

# Content indexing
pnpm add cheerio

# Rate limiting (production)
pnpm add @upstash/ratelimit @upstash/redis

# Analytics
pnpm add posthog-js
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| FCA compliance violation | Strict system prompt guardrails + visible disclaimers |
| Prompt injection attacks | Input sanitization + tool-based RAG isolation |
| Cold start latency | Neon serverless driver handles gracefully |
| Cost overruns | Vercel spending limits + rate limiting |
| Design inconsistency | Use existing CSS classes from globals.css |

---

## Success Criteria

- [ ] Chatbot answers questions accurately using indexed content
- [ ] All responses include appropriate broker/compliance disclaimers
- [ ] Widget matches Alpha Funding premium design language
- [ ] Streaming animations match existing Generative UI patterns
- [ ] Mobile experience is polished and accessible
- [ ] Analytics track all key user interactions
- [ ] Response time < 3s for typical questions

---

## Future Enhancements (Post-MVP)

1. **Lead Capture with HubSpot CRM** — Push qualified leads directly
2. **Live Chat Handoff** — Escalate to human advisors
3. **Email Automation with Resend** — Nurture sequences
4. **WhatsApp Integration** — Multi-channel support
5. **A/B Testing** — Optimize conversion with Vercel Edge Config
