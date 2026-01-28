import type { Metadata } from "next";
import NavBar from "@/components/navbar";
import Footer from "@/sections/common/footer";

export const metadata: Metadata = {
    title: "Cookie Policy | Alpha Funding Finance",
    description:
        "Alpha Funding Finance Cookie Policy. Learn how we use cookies and similar technologies in compliance with UK PECR and UK GDPR regulations.",
};

export default function CookiePolicyPage() {
    return (
        <>
            <NavBar />
            <main className="min-h-screen mt-36 bg-background">
                <section className="px-4 md:px-8 lg:px-[8%] py-16">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <header className="mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Cookie Policy</h1>
                            <p className="text-sm text-muted-foreground mt-2">Last updated: December 2025</p>
                        </header>

                        {/* Quick Summary Card */}
                        <div className="p-6 border rounded-2xl bg-card mb-10">
                            <h2 className="font-semibold text-lg mb-3">At a Glance</h2>
                            <div className="grid gap-3 md:grid-cols-2 text-sm">
                                <div className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>Essential cookies are always active</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>Analytics & marketing require your consent</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>You can change preferences anytime</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>No tracking before you consent</span>
                                </div>
                            </div>
                        </div>

                        {/* TOC */}
                        <nav className="mb-10 border rounded-2xl p-4 bg-card">
                            <h2 className="font-semibold mb-3">Contents</h2>
                            <ul className="list-disc pl-5 grid gap-2 md:grid-cols-2 text-sm">
                                <li><a className="hover:underline" href="#introduction">Introduction</a></li>
                                <li><a className="hover:underline" href="#what-are-cookies">What Are Cookies?</a></li>
                                <li><a className="hover:underline" href="#types">Types of Cookies We Use</a></li>
                                <li><a className="hover:underline" href="#cookie-list">Cookies We Use</a></li>
                                <li><a className="hover:underline" href="#third-party">Third-Party Cookies</a></li>
                                <li><a className="hover:underline" href="#consent">How We Obtain Consent</a></li>
                                <li><a className="hover:underline" href="#manage">Managing Your Preferences</a></li>
                                <li><a className="hover:underline" href="#legal-basis">Legal Basis</a></li>
                                <li><a className="hover:underline" href="#changes">Changes to This Policy</a></li>
                                <li><a className="hover:underline" href="#contact">Contact Us</a></li>
                            </ul>
                        </nav>

                        {/* Introduction */}
                        <section id="introduction" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                            <p className="leading-relaxed mb-4">
                                This Cookie Policy explains how Alpha Funding Finance Limited ("we", "us", "our")
                                uses cookies and similar technologies when you visit our website. This policy forms
                                part of our{" "}
                                <a href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</a>.
                            </p>
                            <p className="leading-relaxed">
                                We comply with the Privacy and Electronic Communications Regulations 2003 (PECR),
                                the UK General Data Protection Regulation (UK GDPR), and the Data (Use and Access)
                                Act 2025, as enforced by the Information Commissioner's Office (ICO).
                            </p>
                        </section>

                        {/* What Are Cookies */}
                        <section id="what-are-cookies" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
                            <p className="leading-relaxed mb-4">
                                Cookies are small text files placed on your device (computer, tablet, or mobile)
                                when you visit a website. They allow the website to recognise your device and
                                remember information about your visit.
                            </p>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Session Cookies</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Temporary cookies deleted when you close your browser. Used for essential
                                        functions like keeping you logged in during a session.
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Persistent Cookies</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Remain on your device for a set period or until manually deleted. Used to
                                        remember preferences between visits.
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">First-Party Cookies</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Set directly by our website. Only readable by our domain.
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Third-Party Cookies</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Set by external services we use (e.g., analytics providers). Readable by
                                        those third parties.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 border rounded-lg bg-muted/30">
                                <h3 className="font-medium mb-2">Similar Technologies</h3>
                                <p className="text-sm text-muted-foreground">
                                    PECR also covers similar technologies including: web beacons (pixel tags),
                                    local storage (localStorage/sessionStorage), device fingerprinting, and
                                    tracking pixels. This policy applies to all such technologies.
                                </p>
                            </div>
                        </section>

                        {/* Types of Cookies */}
                        <section id="types" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
                            <p className="leading-relaxed mb-4">
                                We categorise cookies by their purpose:
                            </p>

                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg border-l-4 border-l-green-500">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium px-2 py-1 rounded">
                                            Always Active
                                        </span>
                                        <h3 className="font-medium">Essential Cookies</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Required for the website to function properly. Without these, the website
                                        cannot operate. No consent is required under PECR's "strictly necessary"
                                        exemption.
                                    </p>
                                    <p className="text-sm"><strong>Examples:</strong> Session management, security
                                        tokens, load balancing, cookie consent preferences</p>
                                </div>

                                <div className="p-4 border rounded-lg border-l-4 border-l-blue-500">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded">
                                            Consent Required
                                        </span>
                                        <h3 className="font-medium">Analytics Cookies</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Help us understand how visitors interact with our website by collecting
                                        anonymous statistical information. These are not activated until you
                                        provide consent.
                                    </p>
                                    <p className="text-sm"><strong>Examples:</strong> Google Analytics, page views,
                                        user journeys, bounce rates, traffic sources</p>
                                </div>

                                <div className="p-4 border rounded-lg border-l-4 border-l-purple-500">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium px-2 py-1 rounded">
                                            Consent Required
                                        </span>
                                        <h3 className="font-medium">Functional Cookies</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Enable enhanced functionality and personalisation, such as remembering
                                        your preferences. These are optional and require your consent.
                                    </p>
                                    <p className="text-sm"><strong>Examples:</strong> Language preferences, region
                                        settings, form auto-fill, chat widgets</p>
                                </div>

                                <div className="p-4 border rounded-lg border-l-4 border-l-orange-500">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium px-2 py-1 rounded">
                                            Consent Required
                                        </span>
                                        <h3 className="font-medium">Marketing Cookies</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Used to deliver relevant advertisements and track campaign effectiveness.
                                        These may be set by us or third-party advertising partners and require
                                        explicit consent.
                                    </p>
                                    <p className="text-sm"><strong>Examples:</strong> Remarketing tags, conversion
                                        tracking, social media pixels, targeted advertising</p>
                                </div>
                            </div>
                        </section>

                        {/* Cookie List */}
                        <section id="cookie-list" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">4. Cookies We Use</h2>
                            <p className="leading-relaxed mb-4">
                                Below is a detailed list of the cookies used on our website:
                            </p>

                            {/* Essential Cookies Table */}
                            <h3 className="text-lg font-medium mb-3 mt-6">Essential Cookies</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-muted">
                                            <th className="text-left p-3 border font-semibold">Cookie Name</th>
                                            <th className="text-left p-3 border font-semibold">Provider</th>
                                            <th className="text-left p-3 border font-semibold">Purpose</th>
                                            <th className="text-left p-3 border font-semibold">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border font-mono text-xs">cookie_consent</td>
                                            <td className="p-3 border">Alpha Funding</td>
                                            <td className="p-3 border">Stores your cookie consent preferences</td>
                                            <td className="p-3 border">1 year</td>
                                        </tr>
                                        <tr className="bg-muted/30">
                                            <td className="p-3 border font-mono text-xs">session_id</td>
                                            <td className="p-3 border">Alpha Funding</td>
                                            <td className="p-3 border">Maintains your session state</td>
                                            <td className="p-3 border">Session</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border font-mono text-xs">csrf_token</td>
                                            <td className="p-3 border">Alpha Funding</td>
                                            <td className="p-3 border">Security token to prevent cross-site attacks</td>
                                            <td className="p-3 border">Session</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Analytics Cookies Table */}
                            <h3 className="text-lg font-medium mb-3 mt-6">Analytics Cookies</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-muted">
                                            <th className="text-left p-3 border font-semibold">Cookie Name</th>
                                            <th className="text-left p-3 border font-semibold">Provider</th>
                                            <th className="text-left p-3 border font-semibold">Purpose</th>
                                            <th className="text-left p-3 border font-semibold">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border font-mono text-xs">_ga</td>
                                            <td className="p-3 border">Google Analytics</td>
                                            <td className="p-3 border">Distinguishes unique users</td>
                                            <td className="p-3 border">2 years</td>
                                        </tr>
                                        <tr className="bg-muted/30">
                                            <td className="p-3 border font-mono text-xs">_ga_*</td>
                                            <td className="p-3 border">Google Analytics</td>
                                            <td className="p-3 border">Maintains session state</td>
                                            <td className="p-3 border">2 years</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border font-mono text-xs">_gid</td>
                                            <td className="p-3 border">Google Analytics</td>
                                            <td className="p-3 border">Distinguishes users for 24 hours</td>
                                            <td className="p-3 border">24 hours</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Marketing Cookies Table */}
                            <h3 className="text-lg font-medium mb-3 mt-6">Marketing Cookies</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-muted">
                                            <th className="text-left p-3 border font-semibold">Cookie Name</th>
                                            <th className="text-left p-3 border font-semibold">Provider</th>
                                            <th className="text-left p-3 border font-semibold">Purpose</th>
                                            <th className="text-left p-3 border font-semibold">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border font-mono text-xs">_fbp</td>
                                            <td className="p-3 border">Meta (Facebook)</td>
                                            <td className="p-3 border">Tracks visits across websites for advertising</td>
                                            <td className="p-3 border">3 months</td>
                                        </tr>
                                        <tr className="bg-muted/30">
                                            <td className="p-3 border font-mono text-xs">_gcl_au</td>
                                            <td className="p-3 border">Google Ads</td>
                                            <td className="p-3 border">Conversion tracking and remarketing</td>
                                            <td className="p-3 border">3 months</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="mt-4 text-sm text-muted-foreground">
                                This list is regularly updated. The actual cookies may vary based on your consent
                                preferences and the features you use on our website.
                            </p>
                        </section>

                        {/* Third-Party Cookies */}
                        <section id="third-party" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Cookies</h2>
                            <p className="leading-relaxed mb-4">
                                Some cookies are placed by third-party services that appear on our pages. We do not
                                control these cookies. Third parties include:
                            </p>

                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Google Analytics</h3>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Website analytics to help us understand how visitors use our site.
                                    </p>
                                    <a href="https://policies.google.com/privacy"
                                        className="text-sm underline hover:text-primary"
                                        target="_blank" rel="noopener noreferrer">
                                        View Google's Privacy Policy →
                                    </a>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Meta (Facebook/Instagram)</h3>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Advertising and conversion tracking for social media campaigns.
                                    </p>
                                    <a href="https://www.facebook.com/privacy/explanation"
                                        className="text-sm underline hover:text-primary"
                                        target="_blank" rel="noopener noreferrer">
                                        View Meta's Privacy Policy →
                                    </a>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Google Ads</h3>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Remarketing and conversion tracking for advertising campaigns.
                                    </p>
                                    <a href="https://policies.google.com/technologies/ads"
                                        className="text-sm underline hover:text-primary"
                                        target="_blank" rel="noopener noreferrer">
                                        View Google Ads Policy →
                                    </a>
                                </div>
                            </div>

                            <div className="mt-4 p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 rounded-r-lg">
                                <p className="text-sm">
                                    <strong>Note:</strong> Third-party cookies are only set after you provide consent.
                                    We recommend reviewing the privacy policies of these third parties to understand
                                    how they process your data.
                                </p>
                            </div>
                        </section>

                        {/* How We Obtain Consent */}
                        <section id="consent" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">6. How We Obtain Consent</h2>
                            <p className="leading-relaxed mb-4">
                                Under PECR and UK GDPR, we must obtain your explicit, informed consent before
                                placing non-essential cookies on your device.
                            </p>

                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Cookie Banner</h3>
                                    <p className="text-sm text-muted-foreground">
                                        When you first visit our website, you'll see a cookie banner with clear
                                        options to accept or reject non-essential cookies. You can also access
                                        granular controls to choose specific categories.
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">No Pre-Ticked Boxes</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Optional cookies are not pre-selected. You must take an affirmative action
                                        (clicking "Accept" or toggling a switch) to enable them.
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">No Tracking Before Consent</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Analytics and marketing cookies are not loaded until you provide consent.
                                        Only essential cookies are active by default.
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Equal Prominence</h3>
                                    <p className="text-sm text-muted-foreground">
                                        In accordance with ICO guidance, our "Accept" and "Reject" options are
                                        presented with equal prominence — you are not nudged towards acceptance.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Managing Preferences */}
                        <section id="manage" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">7. Managing Your Cookie Preferences</h2>
                            <p className="leading-relaxed mb-4">
                                You can change your cookie preferences at any time. Withdrawing consent is as
                                easy as giving it.
                            </p>

                            <div className="space-y-6">
                                <div className="p-6 border rounded-2xl bg-card">
                                    <h3 className="font-semibold mb-3">Option 1: Cookie Settings</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Click the button below to open our cookie preferences panel and adjust
                                        your settings:
                                    </p>
                                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                                        Manage Cookie Preferences
                                    </button>
                                </div>

                                <div className="p-6 border rounded-2xl bg-card">
                                    <h3 className="font-semibold mb-3">Option 2: Browser Settings</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        You can also control cookies through your browser settings. Here's how
                                        to manage cookies in popular browsers:
                                    </p>
                                    <ul className="space-y-2 text-sm">
                                        <li>
                                            <a href="https://support.google.com/chrome/answer/95647"
                                                className="underline hover:text-primary"
                                                target="_blank" rel="noopener noreferrer">
                                                Google Chrome →
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                                                className="underline hover:text-primary"
                                                target="_blank" rel="noopener noreferrer">
                                                Mozilla Firefox →
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
                                                className="underline hover:text-primary"
                                                target="_blank" rel="noopener noreferrer">
                                                Apple Safari →
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                                                className="underline hover:text-primary"
                                                target="_blank" rel="noopener noreferrer">
                                                Microsoft Edge →
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="p-6 border rounded-2xl bg-card">
                                    <h3 className="font-semibold mb-3">Option 3: Third-Party Opt-Out</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        You can opt out of advertising cookies from multiple companies at once:
                                    </p>
                                    <ul className="space-y-2 text-sm">
                                        <li>
                                            <a href="https://optout.networkadvertising.org/"
                                                className="underline hover:text-primary"
                                                target="_blank" rel="noopener noreferrer">
                                                Network Advertising Initiative →
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.youronlinechoices.com/"
                                                className="underline hover:text-primary"
                                                target="_blank" rel="noopener noreferrer">
                                                Your Online Choices (EU/UK) →
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://tools.google.com/dlpage/gaoptout"
                                                className="underline hover:text-primary"
                                                target="_blank" rel="noopener noreferrer">
                                                Google Analytics Opt-Out →
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-4 p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 rounded-r-lg">
                                <p className="text-sm">
                                    <strong>Note:</strong> Blocking all cookies may impact your experience on our
                                    website. Some features may not function correctly without essential cookies.
                                    Blocking analytics cookies will not affect your use of the site but will limit
                                    our ability to improve our services.
                                </p>
                            </div>
                        </section>

                        {/* Legal Basis */}
                        <section id="legal-basis" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">8. Legal Basis</h2>
                            <p className="leading-relaxed mb-4">
                                Our use of cookies is governed by:
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-muted">
                                            <th className="text-left p-3 border font-semibold">Cookie Type</th>
                                            <th className="text-left p-3 border font-semibold">Legal Basis</th>
                                            <th className="text-left p-3 border font-semibold">Regulation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border">Essential</td>
                                            <td className="p-3 border">Strictly necessary exemption</td>
                                            <td className="p-3 border">PECR Regulation 6</td>
                                        </tr>
                                        <tr className="bg-muted/30">
                                            <td className="p-3 border">Analytics</td>
                                            <td className="p-3 border">Consent</td>
                                            <td className="p-3 border">PECR Regulation 6 + UK GDPR Art. 6(1)(a)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border">Functional</td>
                                            <td className="p-3 border">Consent</td>
                                            <td className="p-3 border">PECR Regulation 6 + UK GDPR Art. 6(1)(a)</td>
                                        </tr>
                                        <tr className="bg-muted/30">
                                            <td className="p-3 border">Marketing</td>
                                            <td className="p-3 border">Consent</td>
                                            <td className="p-3 border">PECR Regulation 6 + UK GDPR Art. 6(1)(a)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                                <h3 className="font-medium mb-2">Data (Use and Access) Act 2025</h3>
                                <p className="text-sm text-muted-foreground">
                                    The DUA Act 2025 introduced new exceptions to PECR consent requirements for
                                    certain low-risk purposes. However, we continue to obtain consent for analytics
                                    and marketing cookies as a matter of best practice and transparency.
                                </p>
                            </div>
                        </section>

                        {/* Changes */}
                        <section id="changes" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
                            <p className="leading-relaxed">
                                We may update this Cookie Policy from time to time to reflect changes in our
                                practices, the cookies we use, or legal requirements. Material changes will be
                                communicated via a prominent notice on our website or by resetting your cookie
                                consent preferences. The "Last updated" date at the top of this page indicates
                                when the policy was last revised.
                            </p>
                        </section>

                        {/* Contact */}
                        <section id="contact" className="scroll-mt-24">
                            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
                            <p className="leading-relaxed mb-6">
                                If you have any questions about our use of cookies or this policy, please contact us:
                            </p>

                            <div className="p-6 border rounded-2xl bg-card">
                                <ul className="space-y-2 text-sm">
                                    <li><strong>Email:</strong> privacy@alpha-funding.co.uk</li>
                                    <li><strong>Phone:</strong> 020 7078 7446</li>
                                    <li><strong>Address:</strong> Alpha Funding Finance Limited, [Your Address], United Kingdom</li>
                                </ul>
                            </div>

                            <div className="mt-6 p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 rounded-r-lg">
                                <p className="text-sm">
                                    <strong>Right to Complain:</strong> If you believe our use of cookies violates
                                    your privacy rights, you can lodge a complaint with the Information Commissioner's
                                    Office (ICO) at{" "}
                                    <a href="https://ico.org.uk/concerns"
                                        className="underline"
                                        target="_blank" rel="noopener noreferrer">
                                        ico.org.uk/concerns
                                    </a>{" "}
                                    or by calling 0303 123 1113.
                                </p>
                            </div>
                        </section>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}