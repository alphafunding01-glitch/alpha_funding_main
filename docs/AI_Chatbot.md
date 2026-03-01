# AI RAG chatbot and analytics for Alpha Funding on Vercel

**The optimal stack for Alpha Funding's chatbot is Vercel AI SDK 6 + Neon PostgreSQL with pgvector + OpenAI text-embedding-3-small + GPT-4o-mini, running on Next.js App Router with streaming edge responses — delivering a production-grade RAG chatbot for under £10/month at moderate traffic.** This guide covers every decision point from vector database selection to FCA-compliant system prompts, with implementation-ready code and cost projections across three usage tiers. The Vercel ecosystem now provides first-party RAG templates, an official chat UI component library (AI Elements), and native database integrations that eliminate most infrastructure complexity.

---

## Phase 1: Recommended tech stack and why each piece was chosen

The stack below prioritises Vercel-native integrations, free tiers, and the smallest number of vendors while maintaining production quality for a customer-facing finance broker chatbot.

| Layer | Choice | Justification |
|-------|--------|---------------|
| **Framework** | Next.js 15 (App Router) | Already deployed on Vercel; App Router supports React Server Components and streaming |
| **AI SDK** | Vercel AI SDK 6 (`ai` + `@ai-sdk/react`) | **20M+ monthly npm downloads**, native streaming, `useChat` hook, tool-based RAG, provider-agnostic |
| **LLM** | GPT-4o-mini via Vercel AI Gateway | **$4.50/month at 10K conversations**, excellent quality, first-class SDK support, prompt caching |
| **Embeddings** | OpenAI text-embedding-3-small (1536d) | **$0.20/month at 10M tokens**, best SDK integration, Matryoshka dimension support |
| **Vector DB** | Neon PostgreSQL + pgvector | **Deepest Vercel integration** (it IS Vercel's Postgres), free 0.5GB tier, HNSW indexing, SQL familiarity |
| **ORM** | Drizzle ORM | Official RAG template uses Drizzle; type-safe, lightweight, pgvector column support |
| **Chat UI** | Vercel AI Elements + shadcn/ui | Official Vercel component library with 20+ AI-specific components, Tailwind-based |
| **Analytics** | Vercel Web Analytics + PostHog free tier | Zero-config page analytics + 1M free events for chatbot tracking and session replay |
| **Rate limiting** | Upstash Redis | Native Vercel Marketplace, serverless, edge-compatible, generous free tier |

**Why not Pinecone or Supabase?** Pinecone's free tier is generous but its paid plan jumps to **$50/month minimum** — a steep cliff for a small broker. Supabase pauses projects after just 7 days of inactivity. Neon (Vercel's native Postgres) scales to zero without deletion, and you avoid adding another vendor. For a site with fewer than 1,000 vectors and moderate query volume, pgvector in Neon is more than sufficient.

**Why GPT-4o-mini over Groq or Gemini?** Groq's Llama models are cheaper ($0.90/month) but produce noticeably lower-quality responses for nuanced financial guidance. Gemini 2.0 Flash ($3.00/month) is a strong runner-up. GPT-4o-mini at **$0.15/1M input, $0.60/1M output** hits the sweet spot of quality, reliability, and cost for a customer-facing UK finance chatbot where response accuracy directly affects lead conversion.

---

## Vector database comparison at a glance

| Database | Free tier | Paid starting | Vercel integration | Edge-compatible | Inactivity risk |
|----------|-----------|---------------|-------------------|-----------------|-----------------|
| **Neon pgvector** ★ | 0.5 GB, 100 CU-hrs | Usage-based (low) | ✅ Native (IS Vercel Postgres) | ✅ Serverless driver | Scale-to-zero, no deletion |
| **Upstash Vector** | 10K daily ops, 1GB metadata | $0.40/100K requests | ✅ Marketplace | ✅ REST-first | None (always-on) |
| **Pinecone** | 2 GB, 1M read units/mo | $50/mo minimum | ⚠️ Manual | ✅ REST | Paused after 3 weeks |
| **Supabase pgvector** | 500 MB DB | $25/mo | ✅ Marketplace | ✅ REST | Paused after 7 days |
| **Qdrant Cloud** | 1 GB RAM cluster | Usage-based | ❌ Manual | ✅ REST | **Deleted after 4 weeks** |
| **Weaviate Cloud** | Sandbox only (14-day) | Complex pricing | ❌ Manual | ⚠️ Partial | N/A |
| **Turbopuffer** | None | $64/mo minimum | ⚠️ Manual | ✅ REST | N/A |

**Upstash Vector** is the strongest alternative to Neon if you want a purpose-built vector database with zero inactivity risk and native Vercel integration. Its **10,000 daily operations** on the free tier comfortably supports a chatbot handling up to ~200 conversations per day.

---

## LLM and embedding cost projections

All estimates assume **10,000 conversations per month** (~333/day) with approximately 1,000 input tokens and 500 output tokens per conversation.

### Embedding models ranked by cost

| Model | Price per 1M tokens | Monthly cost | Dimensions | Vercel AI SDK |
|-------|---------------------|-------------|------------|---------------|
| Google text-embedding-004 | Free (rate-limited) | **$0.00** | 768 | ✅ `@ai-sdk/google` |
| OpenAI text-embedding-3-small ★ | $0.02 | **$0.20** | 1,536 | ✅ `@ai-sdk/openai` |
| Voyage 4-lite | $0.02 | **$0.20** | 1,024 | ❌ REST only |
| Cohere Embed v4 | $0.12 | **$1.20** | 1,536 | Partial |
| OpenAI text-embedding-3-large | $0.13 | **$1.30** | 3,072 | ✅ `@ai-sdk/openai` |

### Chat LLMs ranked by monthly cost

| Model | Provider | Input/1M | Output/1M | Monthly cost | Quality |
|-------|----------|----------|-----------|-------------|---------|
| Llama 3.1 8B | Groq | $0.05 | $0.08 | **$0.90** | Fair |
| Llama 4 Scout | Groq | $0.11 | $0.34 | **$2.80** | Good |
| Gemini 2.0 Flash | Google | $0.10 | $0.40 | **$3.00** | Good |
| **GPT-4o-mini** ★ | OpenAI | $0.15 | $0.60 | **$4.50** | Very good |
| Gemini 2.5 Flash | Google | $0.15 | $0.60 | **$4.50** | Very good |
| Claude 3.5 Haiku | Anthropic | $0.80 | $4.00 | **$28.00** | Excellent |

### Three-tier cost breakdown

| Component | Free/Prototype | Standard (~£10/mo) | Growth (~£30/mo) |
|-----------|---------------|---------------------|-------------------|
| **LLM** | Groq free tier ($0) | GPT-4o-mini ($4.50) | GPT-4o-mini ($4.50) |
| **Embeddings** | Google free ($0) | OpenAI 3-small ($0.20) | OpenAI 3-small ($0.20) |
| **Vector DB** | Neon free ($0) | Neon free ($0) | Neon free ($0) |
| **Rate limiting** | In-memory ($0) | Upstash Redis free ($0) | Upstash Redis free ($0) |
| **Vercel hosting** | Hobby free ($0) | Pro ($20) | Pro ($20) |
| **Analytics** | Vercel Analytics free ($0) | + PostHog free ($0) | + Plausible ($9) |
| **Session recording** | — | Microsoft Clarity free ($0) | PostHog free ($0) |
| **Total/month** | **$0** | **~$25** | **~$34** |

The Standard tier at roughly **£20/month** (Vercel Pro + AI API costs) is the recommended starting point for production. The Vercel Pro plan provides **1,000 GB-hours** of function execution, **300-second max function duration**, and **100K analytics events** — more than sufficient for a broker website handling hundreds of conversations daily.

---

## Complete file structure

```
alpha-funding-chatbot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts              # RAG API route — streamText + vector search tool
│   ├── layout.tsx                     # Root layout — analytics components here
│   ├── page.tsx                       # Homepage
│   └── globals.css
├── components/
│   ├── chat/
│   │   ├── chat-widget.tsx            # Floating bottom-right chat bubble
│   │   ├── chat-panel.tsx             # Expandable chat panel with useChat
│   │   ├── chat-messages.tsx          # Message list with auto-scroll
│   │   ├── message-bubble.tsx         # Individual message styling
│   │   ├── chat-input.tsx             # Input with send button
│   │   ├── suggested-questions.tsx    # Quick-start prompt chips
│   │   └── chat-disclaimer.tsx        # FCA-required footer disclaimer
│   └── ui/                            # shadcn/ui primitives (button, input, card, etc.)
├── lib/
│   ├── ai/
│   │   ├── embedding.ts               # generateChunks + generateEmbeddings functions
│   │   └── models.ts                  # Model configuration constants
│   ├── db/
│   │   ├── index.ts                   # Drizzle ORM connection (Neon serverless)
│   │   ├── schema/
│   │   │   ├── resources.ts           # Source content table (url, title, content, type)
│   │   │   └── embeddings.ts          # Vector embeddings table (1536d, HNSW index)
│   │   └── migrations/                # Drizzle migration files
│   └── utils.ts                       # nanoid, helpers
├── scripts/
│   ├── index-website.ts               # Crawl Alpha Funding pages → chunk → embed → store
│   ├── seed-content.ts                # Manual content seeding for pages behind auth
│   └── reindex.ts                     # Incremental re-indexing (delete old, re-embed)
├── hooks/
│   └── use-chat-widget.ts             # Widget open/close state, localStorage persistence
├── middleware.ts                       # Rate limiting via Upstash Redis
├── drizzle.config.ts                  # Drizzle ORM config pointing to DATABASE_URL
├── .env.example                       # Template for required env vars
├── next.config.ts
├── package.json
└── tsconfig.json
```

**Key dependencies** to install:

```bash
# Core AI + database
pnpm add ai @ai-sdk/react @ai-sdk/openai drizzle-orm @neondatabase/serverless zod

# Dev tools
pnpm add -D drizzle-kit tsx

# UI
pnpm add @radix-ui/react-* class-variance-authority clsx tailwind-merge lucide-react

# Content indexing
pnpm add cheerio

# Rate limiting (production)
pnpm add @upstash/ratelimit @upstash/redis

# Analytics
pnpm add @vercel/analytics @vercel/speed-insights posthog-js
```

---

## Implementation-ready code and prompts

### 1. Database schema setup (Drizzle + pgvector)

```typescript
// lib/db/schema/resources.ts
import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { nanoid } from '@/lib/utils';

export const resources = pgTable('resources', {
  id: varchar('id', { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  content: text('content').notNull(),
  url: varchar('url', { length: 512 }),
  title: varchar('title', { length: 256 }),
  contentType: varchar('content_type', { length: 64 }),
  lastIndexed: timestamp('last_indexed').defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

```typescript
// lib/db/schema/embeddings.ts
import { index, pgTable, text, varchar, vector } from 'drizzle-orm/pg-core';
import { nanoid } from '@/lib/utils';
import { resources } from './resources';

export const embeddings = pgTable('embeddings', {
  id: varchar('id', { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  resourceId: varchar('resource_id', { length: 191 })
    .references(() => resources.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  embedding: vector('embedding', { dimensions: 1536 }).notNull(),
}, table => ({
  embeddingIndex: index('embeddingIndex')
    .using('hnsw', table.embedding.op('vector_cosine_ops')),
}));
```

```typescript
// lib/db/index.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
export const db = drizzle(neon(process.env.DATABASE_URL!));
```

Enable pgvector on the Neon database with: `CREATE EXTENSION IF NOT EXISTS vector;`

### 2. Content indexing script

```typescript
// scripts/index-website.ts
import * as cheerio from 'cheerio';
import { db } from '../lib/db';
import { resources } from '../lib/db/schema/resources';
import { embeddings as embeddingsTable } from '../lib/db/schema/embeddings';
import { embedMany } from 'ai';
import { nanoid } from '../lib/utils';

const PAGES = [
  { url: 'https://alphafunding.co.uk/', type: 'homepage' },
  { url: 'https://alphafunding.co.uk/business-loans', type: 'service' },
  { url: 'https://alphafunding.co.uk/invoice-finance', type: 'service' },
  { url: 'https://alphafunding.co.uk/asset-finance', type: 'service' },
  { url: 'https://alphafunding.co.uk/merchant-cash-advance', type: 'service' },
  { url: 'https://alphafunding.co.uk/commercial-mortgages', type: 'service' },
  { url: 'https://alphafunding.co.uk/about', type: 'about' },
  { url: 'https://alphafunding.co.uk/faq', type: 'faq' },
  { url: 'https://alphafunding.co.uk/contact', type: 'contact' },
];

function chunkContent(text: string, title: string, maxChars = 1500): string[] {
  const paragraphs = text.split(/\n\n+/).map(p => p.trim()).filter(p => p.length > 20);
  const chunks: string[] = [];
  let current = '';
  
  for (const para of paragraphs) {
    if ((current + para).length > maxChars && current) {
      chunks.push(`Page: ${title}\n${current.trim()}`);
      current = para;
    } else {
      current += '\n\n' + para;
    }
  }
  if (current.trim()) chunks.push(`Page: ${title}\n${current.trim()}`);
  return chunks;
}

async function indexPage(url: string, type: string) {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);
  
  // Remove nav, footer, scripts
  $('nav, footer, script, style, header').remove();
  const content = $('main, article, .content, body').text().replace(/\s+/g, ' ').trim();
  const title = $('title').text() || url;
  
  if (!content) return;
  
  const [resource] = await db.insert(resources).values({
    content, url, title, contentType: type,
  }).returning();
  
  const chunks = chunkContent(content, title);
  const { embeddings: vectors } = await embedMany({
    model: 'openai/text-embedding-3-small',
    values: chunks,
  });
  
  await db.insert(embeddingsTable).values(
    vectors.map((embedding, i) => ({
      id: nanoid(),
      resourceId: resource.id,
      content: chunks[i],
      embedding,
    }))
  );
  console.log(`✓ ${title} — ${chunks.length} chunks indexed`);
}

async function main() {
  for (const { url, type } of PAGES) {
    await indexPage(url, type);
  }
  console.log('Indexing complete.');
}
main();
```

Run with: `npx tsx scripts/index-website.ts`

### 3. RAG API route

```typescript
// app/api/chat/route.ts
import { convertToModelMessages, streamText, UIMessage, tool } from 'ai';
import { z } from 'zod';
import { db } from '@/lib/db';
import { embeddings } from '@/lib/db/schema/embeddings';
import { resources } from '@/lib/db/schema/resources';
import { embed } from 'ai';
import { cosineDistance, desc, gt, sql, eq } from 'drizzle-orm';

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are the Alpha Funding AI Assistant — a knowledgeable, 
friendly guide for Alpha Funding, a UK business finance broker.

Your role:
- Help business owners understand funding options (business loans, invoice finance, 
  asset finance, merchant cash advances, commercial mortgages)
- ALWAYS use the getInformation tool before answering product questions
- Guide users toward the most suitable solution based on their stated needs
- Encourage speaking with an Alpha Funding advisor for personalised guidance

Rules:
- Only use information from your knowledge base. If it's not there, say so honestly
- NEVER quote specific interest rates, guarantee approval, or give binding financial advice
- Be warm, professional, jargon-free
- When a user shows buying intent, collect: name, business name, funding amount, 
  contact number/email — then confirm an advisor will be in touch

Required disclaimers (use naturally, not robotically):
- "Alpha Funding is a business finance broker, not a lender."
- "All funding is subject to status and lender approval."
- "This is general guidance, not financial advice."`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: 'openai/gpt-4o-mini',
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools: {
      getInformation: tool({
        description: `Search Alpha Funding's knowledge base for information about 
          business finance products, services, eligibility, and processes.`,
        parameters: z.object({
          question: z.string().describe('The topic to search for'),
        }),
        execute: async ({ question }) => {
          const { embedding: queryEmbedding } = await embed({
            model: 'openai/text-embedding-3-small',
            value: question,
          });

          const similarity = sql<number>`1 - (${cosineDistance(
            embeddings.embedding, queryEmbedding
          )})`;

          const results = await db
            .select({
              content: embeddings.content,
              similarity,
              url: resources.url,
              title: resources.title,
            })
            .from(embeddings)
            .leftJoin(resources, eq(embeddings.resourceId, resources.id))
            .where(gt(similarity, 0.3))
            .orderBy(desc(similarity))
            .limit(5);

          if (!results.length) return 'No relevant information found.';
          return results.map(r => 
            `[Source: ${r.title}]\n${r.content}`
          ).join('\n\n---\n\n');
        },
      }),
    },
    maxSteps: 3,
  });

  return result.toUIMessageStreamResponse();
}
```

### 4. Chat UI widget component

```tsx
// components/chat/chat-widget.tsx
'use client';
import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

const SUGGESTED = [
  'What business loans do you offer?',
  'How does invoice finance work?',
  'Am I eligible for funding?',
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, status, stop } = useChat();
  const isLoading = status === 'submitted' || status === 'streaming';

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open && (
        <button onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl w-[380px] h-[560px] 
          flex flex-col border max-h-[80vh]">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex justify-between">
            <div>
              <h3 className="font-semibold">Alpha Funding Assistant</h3>
              <p className="text-xs text-blue-100">Ask about business finance</p>
            </div>
            <button onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500">How can I help you today?</p>
                {SUGGESTED.map(q => (
                  <button key={q} onClick={() => handleSubmit(undefined, 
                    { body: { message: q } })}
                    className="block text-left text-sm bg-blue-50 rounded-lg 
                    p-2 hover:bg-blue-100 w-full">
                    {q}
                  </button>
                ))}
              </div>
            )}
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' 
                ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm 
                  ${m.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
              </div>
            )}
          </div>
          {/* Disclaimer */}
          <p className="text-[10px] text-gray-400 px-4">
            AI assistant · Not financial advice · Subject to lender approval
          </p>
          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
            <input value={input} onChange={handleInputChange}
              placeholder="Type your question..."
              className="flex-1 text-sm border rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white rounded-lg p-2 
              disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
```

### 5. Analytics integration

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ChatWidget } from '@/components/chat/chat-widget';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

For PostHog chatbot event tracking, fire custom events from the chat widget:

```typescript
import posthog from 'posthog-js';

// On chat open
posthog.capture('chatbot_opened');

// On message sent
posthog.capture('chatbot_message_sent', { 
  message_count: messages.length,
  intent: 'loan_inquiry' // classify later
});

// On lead captured
posthog.capture('lead_captured', { 
  source: 'chatbot',
  funding_type: 'business_loan' 
});
```

---

## Step-by-step implementation plan

**Week 1 — Foundation and database:**
Set up the Next.js project with `npx create-next-app@latest --typescript --tailwind --app`. Install the AI SDK, Drizzle, and Neon serverless packages. Create a Neon database via the Vercel Marketplace integration (one click from the Vercel dashboard). Enable the pgvector extension. Define the resources and embeddings schemas. Run `drizzle-kit generate` and `drizzle-kit migrate` to create the tables. Configure all environment variables in Vercel.

**Week 2 — Content indexing and RAG route:**
Build the `scripts/index-website.ts` crawling script using Cheerio. Define all Alpha Funding URLs to index. Implement paragraph-based chunking with metadata prefixes (page title, section). Run the indexing script to populate the vector database. Create `app/api/chat/route.ts` with the tool-based RAG pattern. Write the Alpha Funding system prompt with FCA-compliant disclaimers. Test with varied queries and tune the similarity threshold (start at 0.3).

**Week 3 — Chat UI and security:**
Build the floating chat widget component. Install AI Elements via `npx shadcn@latest add` or build custom with shadcn/ui primitives. Add suggested questions, typing indicators, and auto-scroll. Implement rate limiting in `middleware.ts` using Upstash Redis. Add basic prompt injection detection. Add a GDPR-compliant pre-chat notice. Style to match Alpha Funding's brand colours.

**Week 4 — Analytics, testing, and launch:**
Integrate Vercel Web Analytics and Speed Insights (single-line imports). Set up PostHog for chatbot event tracking. Add Microsoft Clarity for free heatmaps and session recording. Write integration tests for the RAG pipeline. Deploy to a Vercel Preview environment. Conduct red-team testing for prompt injection. Set Vercel spending limits. Go live.

---

## Analytics stack for a UK finance broker

**Vercel Web Analytics** (free, 50K events/month) is the no-configuration starting point — it requires zero cookies and no consent banner, making it immediately **UK GDPR and PECR compliant**. It tracks page views, visitors, referrers, geography, and devices. Speed Insights adds Core Web Vitals monitoring for free.

**PostHog** (free, 1M events/month) is the recommended chatbot analytics layer. Its free tier includes **5,000 session recordings**, feature flags, funnel analysis, and — critically — **LLM analytics** that can track prompt latency, completion quality, and model usage. Custom events like `chatbot_opened`, `message_sent`, `lead_captured`, and `satisfaction_rated` provide a complete picture of chatbot performance.

**Microsoft Clarity** is a strong addition at **$0/month forever** — unlimited session recordings and heatmaps with automatic GDPR masking. It integrates with HubSpot for correlating session recordings with CRM contacts.

**Avoid GA4 as your primary tool** for a UK business. GA4 requires cookies, which triggers PECR consent banner requirements. Multiple EU data protection authorities have ruled GA4 non-compliant with GDPR due to US data transfers. If Google Ads integration is needed later, add GA4 as a secondary tool with Consent Mode v2, but use Vercel Analytics + PostHog as the primary stack.

For chatbot-specific metrics, track these five KPIs: **conversation completion rate** (% reaching resolution), **lead capture rate** (% generating contact details), **handoff rate** (% requesting human advisor), **user satisfaction** (thumbs up/down on responses), and **top intents** (most common question categories). PostHog funnels can visualise the full journey from page visit → chatbot open → lead submission → callback booked.

---

## Upsell opportunities worth pitching

Each feature below can be added incrementally after the core chatbot launches, creating ongoing development revenue.

**Lead capture with HubSpot CRM** (free tier) is the highest-value upsell. When the chatbot collects a prospect's name, business, funding amount, and contact details, a server action pushes the lead directly into HubSpot via `@hubspot/api-client`. The Alpha Funding team sees new leads instantly in their CRM pipeline with full chatbot conversation context attached.

**Live chat handoff** via Crisp (free for 2 seats) or Tawk.to (completely free) lets the chatbot escalate to a human when it detects complex queries or explicit requests for an advisor. The transition can be seamless: the chatbot summarises the conversation so far and hands off to a live agent in the same widget.

**Email automation with Resend** (free, 100 emails/day) triggers automatic follow-up sequences. After lead capture, send an immediate confirmation email to the prospect and a notification to the Alpha Funding team. Build a 3-email nurture sequence: confirmation → "here's what to prepare" → "ready to talk?" using Resend's React email templates.

**WhatsApp Business integration** via the official Cloud API (free for business-initiated conversations) extends the chatbot to WhatsApp. Prospects can continue conversations on their preferred channel. Requires Facebook Business verification.

**A/B testing chatbot variants** using Vercel Edge Config or PostHog feature flags (free tier includes 1M requests). Test different system prompts, greeting messages, or suggested questions to optimise lead conversion rate.

**Session recording and heatmaps** via Microsoft Clarity (free, unlimited) or PostHog (5K recordings free). Show clients where users click, scroll, and drop off. Invaluable for optimising landing pages and chatbot placement.

---

## Gotchas, edge cases, and best practices

**Vercel function timeouts** are the most common production issue. The Hobby plan limits functions to **60 seconds maximum** (10 seconds default). Set `export const maxDuration = 30;` in the chat route. On the Pro plan, the maximum extends to 300 seconds. Enable **Fluid Compute** in project settings — it reduces cold starts through instance reuse and charges only for active compute time.

**Neon scale-to-zero** means the first query after inactivity takes **~500ms extra** for the database to wake. For a chatbot, this adds a barely noticeable delay to the first message. Neon's serverless driver (`@neondatabase/serverless`) handles this gracefully with automatic reconnection.

**Prompt injection is the #1 security risk** for RAG chatbots (OWASP LLM Top 10). The tool-based RAG pattern in AI SDK 6 provides natural separation between user input, retrieved context, and system instructions. Additionally, implement basic input sanitisation that catches phrases like "ignore previous instructions" and redirect to a safe response. Red-team test before launch using tools like Promptfoo.

**FCA compliance** requires that the chatbot never provides personalised financial advice (which requires FCA authorisation). The system prompt must enforce this boundary. All responses should be framed as "general guidance" with appropriate disclaimers. Alpha Funding's status as a **broker, not a lender** must be clearly stated. The chatbot should proactively suggest speaking to a qualified advisor for anything beyond general information.

**UK GDPR requires a Data Protection Impact Assessment** (Article 35) before deploying an AI chatbot that processes personal data. Display a clear notice before the chat starts: "You're chatting with an AI assistant. See our Privacy Policy for how we handle your data." Use **legitimate interests** as the lawful basis for general chatbot operation, and **explicit consent** for lead capture. Define a retention period for conversation data (recommend 90 days) and provide a mechanism for users to request deletion. Confirm with your OpenAI agreement that API data is **not used for model training** (API usage is excluded by default).

**Chunking quality directly determines chatbot accuracy.** For a finance broker website, paragraph-based chunking with section headers prepended outperforms naive sentence splitting. Target **500–1,000 tokens per chunk** with 25% overlap. Each chunk should carry the page title and source URL as metadata — this enables the chatbot to cite sources and link users to relevant pages.

**Re-indexing must be automated.** Create a weekly Vercel Cron job or GitHub Actions workflow that runs the re-indexing script. The script should delete old embeddings for each URL before re-embedding, ensuring the vector database stays synchronised with website content. Also trigger re-indexing manually after any content update.

---

## Key documentation and templates

The Vercel ecosystem provides several starting points that dramatically reduce implementation time. The **AI SDK RAG Starter** (`github.com/vercel/ai-sdk-rag-starter`) is the closest template to what Alpha Funding needs — it includes Drizzle + pgvector schemas, embedding utilities, and the tool-based retrieval pattern. The **AI SDK docs** at `ai-sdk.dev/docs` cover the `useChat` hook, `streamText`, `embed`/`embedMany`, and all provider configurations. The **AI Elements library** at `elements.ai-sdk.dev` provides 20+ production-ready chat UI components installable via `npx shadcn@latest add`. For the chatbot template with full chat persistence and multi-model support, the **Vercel AI Chatbot** at `github.com/vercel/ai-chatbot` (documented at `chat-sdk.dev`) is the most complete reference implementation.

## Conclusion

The most significant insight from this research is how dramatically the Vercel AI ecosystem has matured. **A production-grade RAG chatbot can now be built with five files** (schema, embedding utility, API route, chat widget, layout) and costs under £10/month in AI API fees at moderate traffic. The tool-based RAG pattern in AI SDK 6 — where the LLM decides when to search the knowledge base — produces better results than naive "stuff the context" approaches because it allows multi-step retrieval and only searches when needed. For Alpha Funding specifically, the combination of strict system prompt guardrails, FCA-compliant disclaimers, and proactive lead capture creates a chatbot that simultaneously serves as a 24/7 information resource and a qualified lead generation engine. Start with the Neon + GPT-4o-mini stack on the Standard tier, launch with 10–15 indexed pages, and iterate based on PostHog conversation analytics.