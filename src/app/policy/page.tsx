import type { Metadata } from "next";
import Footer from "@/sections/common/footer";
import NavBar from "@/components/navbar";

export const metadata: Metadata = {
    title: "Privacy Policy | Alpha Funding Finance",
    description:
        "Alpha Funding Finance Privacy Policy. Learn how we collect, use, and protect your personal data in compliance with UK GDPR, Data Protection Act 2018, and Data (Use and Access) Act 2025.",
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <NavBar />
            <main className="min-h-screen mt-36 bg-background">
                <section className="px-4 md:px-8 lg:px-[8%] py-16">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <header className="mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Privacy Policy</h1>
                            <p className="text-sm text-muted-foreground mt-2">Last updated: December 2025</p>
                        </header>

                        {/* Quick Summary Card */}
                        <div className="p-6 border rounded-2xl bg-card mb-10">
                            <h2 className="font-semibold text-lg mb-3">At a Glance</h2>
                            <div className="grid gap-3 md:grid-cols-2 text-sm">
                                <div className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>We are a credit broker, not a lender</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>Your data is never sold for marketing</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>You can request deletion at any time</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>We share data only with your consent</span>
                                </div>
                            </div>
                        </div>

                        {/* TOC */}
                        <nav className="mb-10 border rounded-2xl p-4 bg-card">
                            <h2 className="font-semibold mb-3">Contents</h2>
                            <ul className="list-disc pl-5 grid gap-2 md:grid-cols-2 text-sm">
                                <li><a className="hover:underline" href="#who-we-are">Who We Are</a></li>
                                <li><a className="hover:underline" href="#data-we-collect">Data We Collect</a></li>
                                <li><a className="hover:underline" href="#how-we-collect">How We Collect Your Data</a></li>
                                <li><a className="hover:underline" href="#lawful-basis">Lawful Basis for Processing</a></li>
                                <li><a className="hover:underline" href="#how-we-use">How We Use Your Data</a></li>
                                <li><a className="hover:underline" href="#data-sharing">Who We Share Data With</a></li>
                                <li><a className="hover:underline" href="#data-retention">Data Retention</a></li>
                                <li><a className="hover:underline" href="#your-rights">Your Rights</a></li>
                                <li><a className="hover:underline" href="#international">International Transfers</a></li>
                                <li><a className="hover:underline" href="#cookies">Cookies & Tracking</a></li>
                                <li><a className="hover:underline" href="#security">Data Security</a></li>
                                <li><a className="hover:underline" href="#children">Children's Data</a></li>
                                <li><a className="hover:underline" href="#changes">Policy Changes</a></li>
                                <li><a className="hover:underline" href="#contact">Contact & Complaints</a></li>
                            </ul>
                        </nav>

                        {/* Introduction */}
                        <div className="space-y-4 mb-10">
                            <p className="leading-relaxed">
                                This Privacy Policy explains how Alpha Funding Finance Limited ("we", "us", "our",
                                "Alpha Funding") collects, uses, stores, and protects your personal data when you
                                use our credit broking services and website.
                            </p>
                            <p className="leading-relaxed">
                                We are committed to protecting your privacy in accordance with the UK General Data
                                Protection Regulation (UK GDPR), the Data Protection Act 2018, and the Data (Use
                                and Access) Act 2025.
                            </p>
                        </div>

                        {/* Section 1: Who We Are */}
                        <section id="who-we-are" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">1. Who We Are</h2>
                            <div className="p-4 border rounded-lg bg-muted/30">
                                <p className="leading-relaxed mb-3">
                                    Alpha Funding Finance Limited is the <strong>data controller</strong> for personal
                                    data collected through our Service.
                                </p>
                                <ul className="space-y-2 text-sm">
                                    <li><strong>Company Name:</strong> Alpha Funding Limited</li>
                                    <li><strong>Company Number:</strong> 13425543</li>

                                    <li><strong>Registered Address:</strong> Commerce House Campbeltown Road, Tranmere, Wirral, United Kingdom, CH41 9HP</li>
                                    <li><strong>Data Protection Contact:</strong> contact@alpha-funding.co.uk</li>

                                </ul>
                            </div>
                        </section>

                        {/* Section 2: Data We Collect */}
                        <section id="data-we-collect" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">2. Data We Collect</h2>
                            <p className="leading-relaxed mb-4">
                                We collect and process the following categories of personal data:
                            </p>

                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Identity Data</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Full name, date of birth, gender, title, company role, director/shareholder status
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Contact Data</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Email address, phone numbers, business address, residential address (for directors/guarantors)
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Business Data</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Company name, registration number, trading address, industry sector, years trading,
                                        number of employees, business structure
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Financial Data</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Annual turnover, monthly revenue, profit/loss, bank statements, existing debts,
                                        funding requirements, credit history
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Technical Data</h3>
                                    <p className="text-sm text-muted-foreground">
                                        IP address, browser type and version, device information, operating system,
                                        time zone, referring URLs, pages visited
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Usage Data</h3>
                                    <p className="text-sm text-muted-foreground">
                                        How you use our website and services, pages viewed, links clicked,
                                        time spent on pages, search queries
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Marketing & Communications Data</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Your preferences for receiving marketing, communication preferences,
                                        consent records
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 rounded-r-lg">
                                <p className="text-sm">
                                    <strong>Special Category Data:</strong> We do not routinely collect special category
                                    data (e.g., health, ethnicity, religion). If this becomes necessary, we will obtain
                                    your explicit consent first.
                                </p>
                            </div>
                        </section>

                        {/* Section 3: How We Collect */}
                        <section id="how-we-collect" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">3. How We Collect Your Data</h2>
                            <p className="leading-relaxed mb-4">We obtain personal data through:</p>

                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="font-semibold text-primary">Direct interactions:</span>
                                    <span>When you complete our application forms, contact us, or correspond with us</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-semibold text-primary">Automated technologies:</span>
                                    <span>Cookies and similar technologies when you browse our website</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-semibold text-primary">Third parties:</span>
                                    <span>Business data providers, lead generation partners, and other commercial data sources
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-semibold text-primary">Publicly available sources:</span>
                                    <span>Companies House, business directories, public registers, and submitted business documentation</span>
                                </li>
                            </ul>
                        </section>

                        {/* Section 4: Lawful Basis */}
                        <section id="lawful-basis" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">4. Lawful Basis for Processing</h2>
                            <p className="leading-relaxed mb-4">
                                Under UK GDPR, we must have a valid legal basis to process your personal data.
                                We rely on the following:
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-muted">
                                            <th className="text-left p-3 border font-semibold">Lawful Basis</th>
                                            <th className="text-left p-3 border font-semibold">When We Use It</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border font-medium">Contract</td>
                                            <td className="p-3 border">
                                                To provide our credit broking service, process your application,
                                                and introduce you to lenders
                                            </td>
                                        </tr>
                                        <tr className="bg-muted/30">
                                            <td className="p-3 border font-medium">Legal Obligation</td>
                                            <td className="p-3 border">
                                                To comply with legal and regulatory obligations applicable to our business activities, including anti-money laundering and tax requirements.

                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border font-medium">Legitimate Interests</td>
                                            <td className="p-3 border">
                                                To improve our services, prevent fraud, conduct analytics,
                                                and ensure security
                                            </td>
                                        </tr>
                                        <tr className="bg-muted/30">
                                            <td className="p-3 border font-medium">Consent</td>
                                            <td className="p-3 border">
                                                For marketing communications, non-essential cookies, and
                                                sharing identifiable data with specific lenders
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="mt-4 text-sm text-muted-foreground">
                                Where we rely on legitimate interests, we have conducted a balancing test to ensure
                                your rights and freedoms are not overridden. You can request details of this
                                assessment by contacting us.
                            </p>
                        </section>

                        {/* Section 5: How We Use Your Data */}
                        <section id="how-we-use" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">5. How We Use Your Data</h2>
                            <p className="leading-relaxed mb-4">We use your personal data to:</p>

                            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                                <li>Assess your eligibility for business finance products</li>
                                <li>Match your profile with suitable lenders from our panel</li>
                                <li>Facilitate introductions to finance providers</li>
                                <li>Process and manage your finance application</li>

                                <li>Communicate with you about your application and our services</li>
                                <li>Send marketing communications (where you have consented)</li>
                                <li>Improve our website, services, and customer experience</li>
                                <li>Analyse usage patterns and generate anonymised statistics</li>
                                <li>Respond to your enquiries and provide customer support</li>
                                <li>Enforce our terms and conditions</li>
                                <li>Comply with legal and regulatory requirements</li>
                            </ul>

                            <div className="mt-4 p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 rounded-r-lg">
                                <p className="text-sm">
                                    <strong>Automated Decision-Making:</strong> We may use automated systems to
                                    provide initial eligibility assessments. These do not produce legally binding
                                    decisions — all final lending decisions are made by human underwriters at
                                    finance providers.
                                </p>
                            </div>
                        </section>

                        {/* Section 6: Data Sharing */}
                        <section id="data-sharing" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">6. Who We Share Data With</h2>
                            <p className="leading-relaxed mb-4">
                                We may share your personal data with the following categories of recipients:
                            </p>

                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Finance Providers</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Lenders and finance providers from our panel, only with your consent for
                                        identifiable data. Initial matching is done with anonymised data.
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Credit Reference Agencies</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Experian, Equifax, and TransUnion for credit checks and identity verification.
                                        These agencies may share your data with other organisations.
                                    </p>
                                </div>



                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Service Providers</h3>
                                    <p className="text-sm text-muted-foreground">
                                        IT providers, cloud hosting, analytics services, and other third parties
                                        who support our operations (acting as data processors under contract).
                                    </p>
                                </div>



                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Professional Advisors</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Lawyers, accountants, auditors, and consultants who provide professional
                                        services to us.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 rounded-r-lg">
                                <p className="text-sm">
                                    <strong>We will never:</strong> Sell your personal data to third parties for
                                    marketing purposes, or share identifiable data with lenders without your
                                    explicit consent.
                                </p>
                            </div>
                        </section>

                        {/* Section 7: Data Retention */}
                        <section id="data-retention" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
                            <p className="leading-relaxed mb-4">
                                We retain your personal data only for as long as necessary to fulfil the purposes
                                for which it was collected and to comply with legal obligations.
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-muted">
                                            <th className="text-left p-3 border font-semibold">Data Type</th>
                                            <th className="text-left p-3 border font-semibold">Retention Period</th>
                                            <th className="text-left p-3 border font-semibold">Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border">Application data</td>
                                            <td className="p-3 border">6 years after relationship ends</td>
                                            <td className="p-3 border">Applicable regulatory requirements</td>
                                        </tr>
                                        <tr className="bg-muted/30">
                                            <td className="p-3 border">Finance Platforms data</td>
                                            <td className="p-3 border">5 years from creation</td>
                                            <td className="p-3 border">Finance Platforms Regulations 2015</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border">Marketing consents</td>
                                            <td className="p-3 border">Until withdrawn + 2 years</td>
                                            <td className="p-3 border">Evidence of consent</td>
                                        </tr>
                                        <tr className="bg-muted/30">
                                            <td className="p-3 border">Website analytics</td>
                                            <td className="p-3 border">26 months</td>
                                            <td className="p-3 border">Service improvement</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border">Complaints data</td>
                                            <td className="p-3 border">6 years from resolution</td>
                                            <td className="p-3 border">Relevant dispute resolution requirements</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="mt-4 text-sm text-muted-foreground">
                                After the retention period, data is securely deleted or anonymised. Anonymised
                                data may be retained indefinitely for statistical purposes.
                            </p>
                        </section>

                        {/* Section 8: Your Rights */}
                        <section id="your-rights" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">8. Your Rights</h2>
                            <p className="leading-relaxed mb-4">
                                Under UK GDPR, you have the following rights regarding your personal data:
                            </p>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Right of Access</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Request a copy of your personal data (Subject Access Request)
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Right to Rectification</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Request correction of inaccurate or incomplete data
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Right to Erasure</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Request deletion of your data ("right to be forgotten")
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Right to Restrict Processing</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Limit how we use your data in certain circumstances
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Right to Data Portability</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Receive your data in a structured, machine-readable format
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Right to Object</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Object to processing based on legitimate interests or direct marketing
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Right to Withdraw Consent</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Withdraw consent at any time where processing is based on consent
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Rights Related to Automated Decisions</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Challenge decisions made solely by automated means
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 border rounded-lg bg-muted/30">
                                <h3 className="font-medium mb-2">How to Exercise Your Rights</h3>
                                <p className="text-sm mb-3">
                                    To exercise any of these rights, contact us at:
                                </p>
                                <ul className="text-sm space-y-1">
                                    <li><strong>Email:</strong> privacy@alpha-funding.co.uk</li>
                                    <li><strong>Post:</strong> Data Protection Officer, Alpha Funding Finance Limited, [Address]</li>
                                </ul>
                                <p className="text-sm mt-3">
                                    We will respond within <strong>30 days</strong>. We may need to verify your
                                    identity before processing your request. There is no fee for most requests.
                                </p>
                            </div>

                            <div className="mt-4 p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 rounded-r-lg">
                                <p className="text-sm">
                                    <strong>Right to Complain:</strong> If you are dissatisfied with how we handle
                                    your data, you have the right to lodge a complaint with the Information
                                    Commissioner's Office (ICO) at{" "}
                                    <a href="https://ico.org.uk/concerns" className="underline" target="_blank" rel="noopener noreferrer">
                                        ico.org.uk/concerns
                                    </a>{" "}
                                    or by calling 0303 123 1113.
                                </p>
                            </div>
                        </section>

                        {/* Section 9: International Transfers */}
                        <section id="international" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">9. International Transfers</h2>
                            <p className="leading-relaxed mb-4">
                                Your data is primarily processed within the UK and EEA. Where transfers occur outside these regions, safeguards aligned with applicable data protection standards are in place. International service partners involved in processing operate within their respective regulatory frameworks.
                            </p>


                            <p className="mt-4 text-sm text-muted-foreground">
                                You can request details of the safeguards in place for any specific transfer by
                                contacting us.
                            </p>
                        </section>

                        {/* Section 10: Cookies */}
                        <section id="cookies" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">10. Cookies & Tracking Technologies</h2>
                            <p className="leading-relaxed mb-4">
                                We use cookies and similar technologies to improve your experience on our website.
                            </p>

                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Essential Cookies</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Required for the website to function. No consent needed. Examples:
                                        session management, security, load balancing.
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Analytics Cookies</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Help us understand how visitors use our site. Require your consent.
                                        Examples: Google Analytics, page views, user journeys.
                                    </p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Marketing Cookies</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Used to deliver relevant advertisements. Require your consent.
                                        Examples: remarketing, conversion tracking.
                                    </p>
                                </div>
                            </div>

                            <p className="mt-4 leading-relaxed">
                                You can manage your cookie preferences via our cookie banner or your browser
                                settings. For more details, see our{" "}
                                <a href="/cookie-policy" className="underline hover:text-primary">Cookie Policy</a>.
                            </p>
                        </section>

                        {/* Section 11: Security */}
                        <section id="security" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">11. Data Security</h2>
                            <p className="leading-relaxed mb-4">
                                We implement appropriate technical and organisational measures to protect your
                                personal data against unauthorised access, loss, or misuse:
                            </p>

                            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                                <li>Encryption of data in transit (TLS/SSL) and at rest</li>
                                <li>Access controls and authentication mechanisms</li>
                                <li>Regular security assessments and penetration testing</li>
                                <li>Staff training on data protection and security</li>
                                <li>Secure data centres with physical access controls</li>
                                <li>Incident response and breach notification procedures</li>
                            </ul>

                            <p className="mt-4 text-sm text-muted-foreground">
                                While we take all reasonable precautions, no transmission over the internet is
                                completely secure. We cannot guarantee absolute security but will notify you
                                and the ICO of any breach as required by law.
                            </p>
                        </section>

                        {/* Section 12: Children */}
                        <section id="children" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">12. Children's Data</h2>
                            <p className="leading-relaxed">
                                Our services are intended for businesses and individuals aged 18 and over. We do
                                not knowingly collect personal data from children under 18. If you believe we
                                have collected data from a minor, please contact us immediately and we will
                                delete it.
                            </p>
                        </section>

                        {/* Section 13: Changes */}
                        <section id="changes" className="scroll-mt-24 mb-10">
                            <h2 className="text-2xl font-semibold mb-4">13. Changes to This Policy</h2>
                            <p className="leading-relaxed">
                                We may update this Privacy Policy from time to time to reflect changes in our
                                practices, legal requirements, or regulatory guidance. Material changes will be
                                notified via email or prominently on our website. The "Last updated" date at the
                                top indicates when the policy was last revised. We encourage you to review this
                                policy periodically.
                            </p>
                        </section>

                        {/* Section 14: Contact */}
                        <section id="contact" className="scroll-mt-24">
                            <h2 className="text-2xl font-semibold mb-4">14. Contact & Complaints</h2>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="p-6 border rounded-2xl bg-card">
                                    <h3 className="font-semibold mb-3">General Enquiries</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li><strong>Email:</strong> contact@alpha-funding.co.uk</li>
                                        <li><strong>Phone:</strong> 020 7078 7446</li>
                                        <li><strong>Address:</strong> Alpha Funding Limited, Commerce House Campbeltown Road, Tranmere, Wirral, United Kingdom, CH41 9HP</li>
                                    </ul>
                                </div>

                                <div className="p-6 border rounded-2xl bg-card">
                                    <h3 className="font-semibold mb-3">Data Protection Enquiries</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li><strong>Email:</strong> contact@alpha-funding.co.uk</li>
                                        <li><strong>Subject Access Requests:</strong> contact@alpha-funding.co.uk</li>
                                        <li><strong>Response time:</strong> Within 30 days</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 p-6 border rounded-2xl bg-muted/30">
                                <h3 className="font-semibold mb-3">Complaints Process</h3>
                                <p className="text-sm leading-relaxed mb-3">
                                    If you are unhappy with how we have handled your data:
                                </p>
                                <ol className="list-decimal pl-6 space-y-2 text-sm">
                                    <li>Contact us first at privacy@alpha-funding.co.uk — we aim to resolve
                                        complaints within 30 days</li>
                                    <li>If unresolved, you can escalate to the Information Commissioner's Office (ICO)</li>
                                </ol>
                                <div className="mt-4 p-4 border rounded-lg bg-background">
                                    <p className="text-sm">
                                        <strong>ICO Contact:</strong><br />
                                        Website: <a href="https://ico.org.uk/concerns" className="underline" target="_blank" rel="noopener noreferrer">ico.org.uk/concerns</a><br />
                                        Phone: 0303 123 1113<br />
                                        Address: Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 p-6 border rounded-2xl bg-muted/30">
                                <h3 className="font-semibold mb-3">Financial Services Complaints</h3>
                                <p className="text-sm leading-relaxed mb-3">
                                    For complaints about our credit broking services (not data protection):
                                </p>
                                <ul className="space-y-2 text-sm">
                                    <li><strong>Email:</strong> complaints@alpha-funding.co.uk</li>
                                    <li><strong>Escalation:</strong> Financial Ombudsman Service</li>
                                    <li><strong>FOS Phone:</strong> 0800 023 4567</li>
                                    <li><strong>FOS Website:</strong>{" "}
                                        <a href="https://www.financial-ombudsman.org.uk" className="underline" target="_blank" rel="noopener noreferrer">
                                            financial-ombudsman.org.uk
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}