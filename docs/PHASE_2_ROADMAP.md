# AI-Like Experience & Operational Roadmap

> **Philosophy**: Smart Logic + Generative UI + Data-Aware Fallbacks = "Magic" without AI costs  
> **Priority**: Security First → Conversion → Automation → Analytics

---

# 🔒 PHASE 0: SECURITY & CODE PROTECTION (TOP PRIORITY)

*Protect intellectual property, prevent API scraping, secure business logic*

---

## 0.1 Server Actions Migration

**Why**: Network requests hidden from browser dev tools  
**What to convert**:

| Current | Convert To |
|---------|-----------|
| `/api/ai-estimate` | Server Action `getAiEstimate()` |
| `/api/companies-house/*` | Server Action `searchCompany()` |
| `/api/lead-score` | Server Action `calculateLeadScore()` |

**How it works**:
```tsx
// Before: Visible in Network tab
const res = await fetch('/api/ai-estimate', {...})

// After: Hidden internal POST with hashed identifier
'use server'
export async function getAiEstimate(data: FormData) {
  // Logic runs on server, no API URL exposed
}
```

**Implementation**:
- Create `/src/actions/` directory
- Move API logic to Server Actions
- Convert client `fetch()` calls to direct action invocations

---

## 0.2 Server Components for Data Fetching

**Why**: Zero network footprint for sensitive data  
**Pattern**:

```tsx
// Server Component - fetches data server-side
async function EligibilityPage() {
  const companyData = await fetchCompanyData(); // Never visible in browser
  return <ClientForm initialData={companyData} />;
}

// Client Component - only handles UI
'use client'
function ClientForm({ initialData }: Props) {
  // Animations, interactions only
}
```

---

## 0.3 JavaScript Obfuscation

**Tools**: `javascript-obfuscator` + `webpack-obfuscator` (free, open-source)  
**GitHub**: [javascript-obfuscator/javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator)

**Install**:
```bash
npm install --save-dev javascript-obfuscator webpack-obfuscator
```

**Configure** (`next.config.js`):
```js
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
  webpack: (config, { isServer, dev }) => {
    if (!dev && !isServer) {
      config.plugins.push(
        new WebpackObfuscator({
          rotateStringArray: true,
          stringArray: true,
          stringArrayThreshold: 0.75,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.4,
        }, ['excluded_bundle_name.js'])
      );
    }
    return config;
  },
};
```

**Alternative**: `nextjs-obfuscator` npm package (simpler setup)

---

## 0.4 Payload Encryption (AES-GCM)

**Why**: API responses look like gibberish in Network tab  
**Tools**: Web Crypto API (built-in, free)

**Server-side encrypt**:
```ts
// /src/lib/crypto.ts
export async function encryptPayload(data: object, key: CryptoKey) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(data));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv }, key, encoded
  );
  return { iv: Array.from(iv), data: Array.from(new Uint8Array(encrypted)) };
}
```

**Client-side decrypt** (key obfuscated in bundle):
```ts
export async function decryptPayload(encrypted: EncryptedData, key: CryptoKey) {
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(encrypted.iv) },
    key, new Uint8Array(encrypted.data)
  );
  return JSON.parse(new TextDecoder().decode(decrypted));
}
```

---

## 0.5 Middleware Origin Restrictions

**Why**: Block scraping from non-website sources  
**Location**: `/src/middleware.ts`

```ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Block API calls not from our domain
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const referer = request.headers.get('referer');
    const origin = request.headers.get('origin');
    
    const allowedOrigins = [
      'https://alphafunding.co.uk',
      'https://www.alphafunding.co.uk',
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
    ].filter(Boolean);
    
    const isAllowed = allowedOrigins.some(o => 
      referer?.startsWith(o) || origin === o
    );
    
    if (!isAllowed) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }
  return NextResponse.next();
}
```

---

## 0.6 Rate Limiting

**Tools**: `@upstash/ratelimit` (free tier) or custom with Redis  
**Self-Hosted Alternative**: In-memory Map with token bucket

```ts
// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; reset: number }>();

export function checkRateLimit(ip: string, limit = 100, window = 60000) {
  const now = Date.now();
  const record = rateLimit.get(ip) || { count: 0, reset: now + window };
  
  if (now > record.reset) {
    record.count = 1;
    record.reset = now + window;
  } else {
    record.count++;
  }
  
  rateLimit.set(ip, record);
  return record.count <= limit;
}
```

---

## Security Implementation Order

1. **Week 1**: Middleware + Rate Limiting (immediate protection)
2. **Week 2**: Server Actions migration (hide API endpoints)
3. **Week 3**: Obfuscation setup (protect client code)
4. **Week 4**: Payload encryption for sensitive routes

---

# 🚀 PHASE 2A: UI/UX ENGAGEMENT FEATURES

*Keep users interested, reduce bounce, increase time on site*

---

### 1. AI Funding Advisor (Homepage Widget)
**Effort**: Medium | **Impact**: High

Conversational branching logic that feels like ChatGPT:
```
💬 "What brings you here today?"
   → [I need funding] [Just exploring] [Compare rates]
💬 "How much are you looking for?"
   → Slider with live estimate preview
💬 "Based on typical businesses, you could access £40k-£65k"
   → [Check eligibility →]
```

---

### 2. Industry Intelligence News Feed
**APIs**: NewsAPI.org (100 req/day free), GNews.io, BBC RSS

---

### 3. Personalized Hero Greeting
| Condition | Greeting |
|-----------|----------|
| New visitor, morning | "Good morning! Let's find your funding" |
| Return visitor | "Welcome back! Ready to continue?" |

---

### 4. Document Checklist Generator
Auto-generated based on Companies House data.

---

### 5. Comparison Tool with Smart Suggestions

---

### 6. Sector-Specific Landing Enhancements

---

### 7. Smart Exit Intent Popup
**Convert 10-15% of abandoning visitors**

---

# 💰 PHASE 2B: CONVERSION & LEAD CAPTURE

---

### 8. Instant Callback Booking
| Option | Type | Cost |
|--------|------|------|
| Cal.com | Freemium | 25 bookings/mo free |
| **Cal.com Self-Hosted** | ✅ Self-Host | Free forever |
| Easy!Appointments | ✅ Self-Host | Free |
| Nettu Scheduler | ✅ Self-Host | Free |

---

### 9. Email Capture with Lead Magnet
| Option | Type | Cost |
|--------|------|------|
| Resend | Freemium | 3k emails/mo free |
| **Postal** | ✅ Self-Host | Free |
| **Listmonk** | ✅ Self-Host | Free |
| **Mautic** | ✅ Self-Host | Free |

---

### 10. WhatsApp Business Integration
| Option | Type | Cost |
|--------|------|------|
| WhatsApp Business API | Freemium | Free service msgs |
| Baileys (unofficial) | ✅ Self-Host | Free |

---

### 11. Real-Time Visitor Identification
| Option | Type | Cost |
|--------|------|------|
| Leadfeeder Lite | Freemium | 100 companies free |
| **Reverse DNS Lookup** | ✅ Built-in | Free |

---

### 12. Progressive Multi-Step Form
Built-in, 40% more completions.

---

# 📤 PHASE 2C: OUTBOUND & AUTOMATION

---

### 13. Automated Email Nurture Sequences
| Option | Type | Cost |
|--------|------|------|
| Loops.so | Freemium | 1k contacts free |
| **Listmonk** | ✅ Self-Host | Free |
| **Mautic** | ✅ Self-Host | Free |
| **SendPortal** | ✅ Self-Host | Free |

---

### 14. SMS Follow-Up System
| Option | Type | Cost |
|--------|------|------|
| Twilio | Paid | ~£0.03/SMS |
| Textbelt | Freemium | 1 free/day |

---

### 15. CRM Integration Hub
| Option | Type | Cost |
|--------|------|------|
| HubSpot | Freemium | Free CRM |
| **Twenty CRM** | ✅ Self-Host | Free |
| **SuiteCRM** | ✅ Self-Host | Free |
| **EspoCRM** | ✅ Self-Host | Free |
| **Erxes** | ✅ Self-Host | Free |

---

### 16. Webhook-Based Lead Scoring
Built-in API, no external dependency.

---

### 17. Referral Program System
Built-in, £100/referral incentive.

---

# 🔍 PHASE 2D: LEAD RESEARCH & ENRICHMENT

*Find leads proactively, automate outbound*

---

### 18. B2B Lead Scraping System

| Tool | Type | GitHub | Purpose |
|------|------|--------|---------|
| **OpenOutreach** | ✅ Self-Host | eracle/OpenOutreach | LinkedIn automation |
| **LeadsDB** | ✅ Self-Host | IsaacBell/leads-db | AI-powered lead gen |
| **TS-email-scraper** | ✅ Self-Host | GitHub | Email extraction |
| **Scrapy** | ✅ Self-Host | scrapy/scrapy | General web scraping |
| **Crawlee** | ✅ Self-Host | apify/crawlee | Node.js scraping |

**Workflow**:
```
1. Scrape Companies House new registrations
2. Filter by SIC codes (target sectors)
3. Enrich with LinkedIn data (OpenOutreach)
4. Score leads (built-in webhook)
5. Auto-add to CRM (Twenty/EspoCRM)
6. Trigger nurture sequence (Listmonk)
```

---

### 19. Company Data Enrichment API

| Data Point | Free Source |
|------------|-------------|
| Company details | Companies House API (free) |
| Directors | Companies House API (free) |
| Filing history | Companies House API (free) |
| SIC codes | Companies House API (free) |
| Website | DNS lookup (free) |
| LinkedIn | OpenOutreach (self-host) |
| Email patterns | Hunter.io (25 free/mo) |

---

### 20. Automated Outbound Sequences

```
Day 0: LinkedIn connection request (OpenOutreach)
Day 2: If accepted → personalized message
Day 5: Email follow-up (Listmonk)
Day 10: SMS if high-score lead (Twilio)
```

---

# 📊 PHASE 2E: ANALYTICS & OPTIMIZATION

---

### 21. Conversion Funnel Analytics
| Option | Type | Cost |
|--------|------|------|
| PostHog | Freemium | 1M events free |
| **Umami** | ✅ Self-Host | Free |
| **Plausible** | ✅ Self-Host | Free |
| **Matomo** | ✅ Self-Host | Free |

---

### 22. Heatmaps & Session Recording
| Option | Type | Cost |
|--------|------|------|
| Microsoft Clarity | Free | Unlimited |
| Hotjar | Freemium | Limited free |
| **PostHog Self-Hosted** | ✅ Self-Host | Free |

---

### 23. A/B Testing Framework
| Option | Type | Cost |
|--------|------|------|
| Statsig | Freemium | Free tier |
| **PostHog Self-Hosted** | ✅ Self-Host | Free |
| **GrowthBook** | ✅ Self-Host | Free |

---

# 🔌 COMPLETE API REFERENCE

## ✅ 100% Free Self-Hosted Options

| Category | Tool | GitHub |
|----------|------|--------|
| CRM | Twenty | twentyhq/twenty |
| CRM | SuiteCRM | salesagility/SuiteCRM |
| CRM | EspoCRM | espocrm/espocrm |
| CRM | Erxes | erxes/erxes |
| Email | Postal | postalserver/postal |
| Email | Listmonk | knadh/listmonk |
| Email | Mautic | mautic/mautic |
| Scheduling | Cal.com | calcom/cal.com |
| Scheduling | Easy!Appointments | alextselegidis/easyappointments |
| Analytics | Umami | umami-software/umami |
| Analytics | Plausible | plausible/analytics |
| Analytics | Matomo | matomo-org/matomo |
| A/B Testing | GrowthBook | growthbook/growthbook |
| Lead Gen | OpenOutreach | eracle/OpenOutreach |
| Scraping | Crawlee | apify/crawlee |
| Scraping | Scrapy | scrapy/scrapy |

## Freemium APIs (Use Self-Hosted Fallback)

| API | Free Tier | Self-Hosted Fallback |
|-----|-----------|----------------------|
| HubSpot CRM | Unlimited | Twenty, EspoCRM |
| Cal.com Cloud | 25 bookings/mo | Cal.com Self-Hosted |
| Resend | 3k emails/mo | Postal, Listmonk |
| PostHog Cloud | 1M events/mo | PostHog Self-Hosted |
| Clarity | Unlimited | N/A (already free) |
| NewsAPI | 100 req/day | RSS feeds |
| Companies House | 600 req/5min | N/A (gov API) |

---

# ✅ COMPLETED IN PHASE 1

- [x] Smart Calculator with Generative Results
- [x] Lead Score Visualization
- [x] AI Estimate with Product Recommendations
- [x] Dynamic Reasoning with Data-Aware Fallbacks

---

# 📋 IMPLEMENTATION PRIORITY

## 🔴 Phase 0: Security (IMMEDIATE)
1. Middleware + Rate Limiting
2. Server Actions migration
3. JavaScript obfuscation
4. Payload encryption

## 🟡 Phase 2A-B: Quick Wins (1-2 days each)
5. Exit Intent Popup
6. WhatsApp Button
7. Email Capture + Lead Magnet

## 🟢 Phase 2C-D: Medium Effort (3-5 days each)
8. Cal.com Self-Hosted deployment
9. Listmonk email automation
10. Twenty CRM integration
11. Lead scraping pipeline

## 🔵 Phase 2E: Analytics (1-2 weeks)
12. Umami self-hosted deployment
13. Full funnel tracking

---

*Last updated: January 2026*
