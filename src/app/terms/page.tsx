import NavBar from "@/components/navbar";
import Footer from "@/sections/common/footer";

export const metadata = {
    title: "Terms of Service | Alpha Funding Finance",
    description:
        "Terms of Service for Alpha Funding Finance Limited. UK-regulated credit broker connecting SMEs with business finance solutions. GDPR compliant.",
};

export default function TermsOfServicePage() {
    return (
        <>
            <NavBar />
            <main className="min-h-screen mt-36 bg-background">
                <section className="px-4 md:px-8 lg:px-[8%] py-16">
                    <div className="max-w-5xl mx-auto">
                        {/* Header */}
                        <header className="mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Terms of Service</h1>
                            <p className="text-sm text-muted-foreground mt-2">Last updated: December 2025</p>
                        </header>

                        {/* Intro */}
                        <p className="text-foreground leading-relaxed">
                            These Terms of Service ("Terms") govern your use of the credit broking services ("Service")
                            provided by Alpha Funding Finance Limited ("we", "us", "our", "Alpha Funding"). By using our
                            Service, you agree to these Terms in full.
                        </p>

                        <div className="mt-4 p-4 border rounded-lg bg-card">
                            <p className="leading-relaxed">
                                <strong>Company Registration:</strong> 13425543<br />

                                <strong>Registered Address:</strong> Commerce House Campbeltown Road, Tranmere, Wirral, United Kingdom, CH41 9HP
                                <br />
                                <strong>Contact:</strong> contact@alpha-funding.co.uk | 020 7078 7446
                            </p>
                        </div>

                        {/* TOC */}
                        <nav className="mt-10 mb-6 border rounded-2xl p-4 bg-card">
                            <h2 className="font-semibold mb-3">Contents</h2>
                            <ul className="list-disc pl-5 grid gap-2 md:grid-cols-2">
                                <li><a className="hover:underline" href="#about-service">About Our Service</a></li>
                                <li><a className="hover:underline" href="#eligibility">Eligibility & Your Responsibilities</a></li>
                                <li><a className="hover:underline" href="#credit-checks">Credit Checks & Verification</a></li>
                                <li><a className="hover:underline" href="#data-protection">Data Protection (UK GDPR)</a></li>
                                <li><a className="hover:underline" href="#commission">Commission & Fees</a></li>
                                <li><a className="hover:underline" href="#limitations">Limitations of Liability</a></li>
                                <li><a className="hover:underline" href="#ip">Intellectual Property</a></li>
                                <li><a className="hover:underline" href="#client-money">Client Money</a></li>
                                <li><a className="hover:underline" href="#complaints">Complaints</a></li>
                                <li><a className="hover:underline" href="#general">General Terms</a></li>
                            </ul>
                        </nav>

                        {/* Section 1: About Our Service */}
                        <section id="about-service" className="scroll-mt-24">
                            <h2 className="text-2xl font-semibold">1. About Our Service</h2>
                            <p className="mt-4 leading-relaxed">
                                Alpha Funding is an independent credit broker, not a lender. We do not provide financial,
                                legal, tax, or accounting advice. Our Service connects UK businesses with finance providers
                                from our panel of lenders to help you find suitable funding options.
                            </p>

                            <h3 className="text-xl font-medium mt-6">1.1 What We Do</h3>
                            <ul className="list-disc pl-6 mt-2 space-y-2 leading-relaxed">
                                <li>Match your business profile to lender criteria</li>
                                <li>Present suitable finance options from our lender panel</li>
                                <li>Facilitate introductions between you and finance providers</li>
                                <li>Support your application process through to completion</li>
                            </ul>

                            <h3 className="text-xl font-medium mt-6">1.2 What We Do Not Do</h3>
                            <ul className="list-disc pl-6 mt-2 space-y-2 leading-relaxed">
                                <li>Provide financial, legal, tax, or accounting advice</li>
                                <li>Guarantee approval or specific terms from any lender</li>
                                <li>Lend money directly or hold client funds</li>
                                <li>Make lending decisions on behalf of finance providers</li>
                            </ul>

                            <h3 className="text-xl font-medium mt-6">1.3 Finance Platforms Regulations</h3>
                            <p className="mt-2 leading-relaxed">
                                Our Service operates in accordance with The Small and Medium Sized Business (Finance
                                Platforms) Regulations 2015 ("the Regulations"). Where a designated bank declines your
                                application, we receive specified information to match you with alternative finance
                                providers. This information is shared in anonymised form until you request an introduction,
                                at which point identifiable data is provided to your chosen lender(s).
                            </p>
                            <p className="mt-2 leading-relaxed">
                                We maintain finance provider access to your specified information until either:
                            </p>
                            <ol className="list-decimal pl-6 mt-2 space-y-2">
                                <li>30 days after your stated finance requirement date; or</li>
                                <li>The end of the next Business Day after you inform us you no longer require finance or
                                    wish to withdraw your information.</li>
                            </ol>
                            <p className="mt-2 text-sm text-muted-foreground">
                                "Business Day" means any day excluding Saturdays, Sundays, and bank holidays in England.
                            </p>
                        </section>

                        {/* Section 2: Eligibility */}
                        <section id="eligibility" className="scroll-mt-24 mt-10">
                            <h2 className="text-2xl font-semibold">2. Eligibility & Your Responsibilities</h2>

                            <h3 className="text-xl font-medium mt-6">2.1 Eligibility</h3>
                            <p className="mt-2 leading-relaxed">
                                Our Service is available to UK-registered businesses and their authorised representatives.
                                You must be at least 18 years old and authorised to act on behalf of the business applying
                                for finance.
                            </p>

                            <h3 className="text-xl font-medium mt-6">2.2 Your Responsibilities</h3>
                            <p className="mt-2 leading-relaxed">By using our Service, you agree to:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-2 leading-relaxed">
                                <li>Provide complete, accurate, and up-to-date information</li>
                                <li>Notify us promptly of any changes to your details</li>
                                <li>Comply with all applicable UK laws and regulations</li>
                                <li>Obtain consent from any individuals whose data you provide to us (e.g., directors, guarantors)</li>
                                <li>Use the Service only for lawful business purposes</li>
                                <li>Not use the Service in any way that damages our reputation, systems, or security</li>
                                <li>Not use automated scripts, bots, or scraping tools to interact with the Service</li>
                                <li>Not impersonate any person or entity or misrepresent your affiliation</li>
                            </ul>

                            <p className="mt-4 leading-relaxed">
                                You agree to indemnify and hold Alpha Funding, our staff, officers, and partners harmless
                                from any loss, damage, or claim arising from your breach of these Terms.
                            </p>
                        </section>

                        {/* Section 3: Credit Checks */}
                        <section id="credit-checks" className="scroll-mt-24 mt-10">
                            <h2 className="text-2xl font-semibold">3. Credit Checks & Identity Verification</h2>
                            <p className="mt-4 leading-relaxed">
                                You agree that our lender panel may conduct identity verification and credit checks
                                on your business and its directors, owners, or guarantors. These checks may include:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-2 leading-relaxed">
                                <li><strong>Soft credit searches:</strong> Initial eligibility checks that do not affect your credit score</li>
                                <li><strong>Hard credit searches:</strong> Full credit checks conducted by lenders upon formal application, which may impact your credit score</li>
                            </ul>
                            <p className="mt-4 leading-relaxed">
                                Credit reference agencies may link records of financially associated individuals (e.g.,
                                joint account holders). These links remain until you or your associate requests a
                                disassociation directly with the credit reference agency.
                            </p>
                        </section>

                        {/* Section 4: Data Protection */}
                        <section id="data-protection" className="scroll-mt-24 mt-10">
                            <h2 className="text-2xl font-semibold">4. Data Protection (UK GDPR Compliance)</h2>
                            <p className="mt-4 leading-relaxed">
                                We are committed to protecting your personal data in accordance with the UK General Data
                                Protection Regulation (UK GDPR), the Data Protection Act 2018, and the Data (Use and
                                Access) Act 2025. This section summarises our data practices. For full details, please
                                read our <a href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</a>.
                            </p>

                            <h3 className="text-xl font-medium mt-6">4.1 Data Controller</h3>
                            <p className="mt-2 leading-relaxed">
                                Alpha Funding Finance Limited is the data controller for personal data collected through
                                our Service.
                            </p>

                            <h3 className="text-xl font-medium mt-6">4.2 Lawful Basis for Processing</h3>
                            <p className="mt-2 leading-relaxed">We process your data under the following lawful bases:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-2 leading-relaxed">
                                <li><strong>Contract:</strong> To provide our Service and fulfil our obligations to you</li>
                                <li><strong>Legal obligation:</strong> To comply with Regulations 2015</li>
                                <li><strong>Legitimate interests:</strong> To improve our Service, prevent fraud, and conduct business analytics</li>
                                <li><strong>Consent:</strong> For marketing communications (where applicable)</li>
                            </ul>

                            <h3 className="text-xl font-medium mt-6">4.3 Data We Collect</h3>
                            <ul className="list-disc pl-6 mt-2 space-y-2 leading-relaxed">
                                <li><strong>Business information:</strong> Company name, registration number, trading address, financial data</li>
                                <li><strong>Personal information:</strong> Names, contact details, dates of birth of directors and guarantors</li>
                                <li><strong>Financial information:</strong> Bank statements, credit history, turnover data</li>
                                <li><strong>Technical data:</strong> IP addresses, browser type, device information, cookies</li>
                            </ul>

                            <h3 className="text-xl font-medium mt-6">4.4 Who We Share Data With</h3>
                            <ul className="list-disc pl-6 mt-2 space-y-2 leading-relaxed">
                                <li>Finance providers on our lender panel (only with your consent for identifiable data)</li>

                                <li>Fraud prevention services</li>
                                <li>Third-party service providers who assist in delivering our Service</li>
                                <li>Regulatory bodies where required by law (e.g., HMRC)</li>
                            </ul>
                            <p className="mt-2 leading-relaxed">
                                We will never sell your personal data to third parties for marketing purposes.
                            </p>

                            <h3 className="text-xl font-medium mt-6">4.5 Data Retention</h3>
                            <p className="mt-2 leading-relaxed">
                                We retain your data for the period necessary to fulfil the purposes outlined in these
                                Terms and to comply with legal obligations. In accordance with The Small and Medium Sized
                                Business (Finance Platforms) Regulations 2015, we retain relevant records for a minimum
                                of five years from creation. </p>

                            <h3 className="text-xl font-medium mt-6">4.6 Your Data Rights</h3>
                            <p className="mt-2 leading-relaxed">Under UK GDPR, you have the following rights:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-2 leading-relaxed">
                                <li><strong>Right of access:</strong> Request a copy of your personal data (Subject Access Request)</li>
                                <li><strong>Right to rectification:</strong> Correct inaccurate or incomplete data</li>
                                <li><strong>Right to erasure:</strong> Request deletion of your data (subject to legal retention requirements)</li>
                                <li><strong>Right to restrict processing:</strong> Limit how we use your data in certain circumstances</li>
                                <li><strong>Right to data portability:</strong> Receive your data in a structured, machine-readable format</li>
                                <li><strong>Right to object:</strong> Object to processing based on legitimate interests or direct marketing</li>
                                <li><strong>Right to withdraw consent:</strong> Withdraw consent at any time where processing is based on consent</li>
                            </ul>
                            <p className="mt-4 leading-relaxed">
                                To exercise these rights, contact us at <strong>contact@alpha-funding.co.uk</strong>.
                                We will respond within 30 days. If you are dissatisfied with our response, you have the
                                right to lodge a complaint with the Information Commissioner's Office (ICO) at
                                <a href="https://ico.org.uk" className="underline hover:text-primary ml-1" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
                            </p>

                            <h3 className="text-xl font-medium mt-6">4.7 International Transfers</h3>
                            <p className="mt-2 leading-relaxed">
                                Your data is primarily processed within the UK and EEA. Where transfers occur outside these regions, safeguards aligned with applicable data protection standards are in place. International service partners involved in processing operate within their respective regulatory frameworks.
                            </p>

                            <h3 className="text-xl font-medium mt-6">4.8 Cookies</h3>
                            <p className="mt-2 leading-relaxed">
                                We use cookies and similar technologies to improve your experience. Essential cookies are
                                required for the Service to function. Non-essential cookies (analytics, marketing) require
                                your explicit consent. You can manage your preferences via our cookie banner or browser
                                settings.
                            </p>
                        </section>

                        {/* Section 5: Commission & Fees */}
                        <section id="commission" className="scroll-mt-24 mt-10">
                            <h2 className="text-2xl font-semibold">5. Commission & Fees</h2>
                            <p className="mt-4 leading-relaxed">
                                Our Service is free for you to use. We may receive commission from finance providers for
                                successful introductions.
                            </p>
                            <p className="mt-2 leading-relaxed">
                                In accordance with applicable regulatory requirements, we will disclose commission arrangements upon request
                                .
                            </p>
                        </section>

                        {/* Section 6: Limitations */}
                        <section id="limitations" className="scroll-mt-24 mt-10">
                            <h2 className="text-2xl font-semibold">6. Limitations of Liability</h2>
                            <p className="mt-4 leading-relaxed">To the fullest extent permitted by law:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-2 leading-relaxed">
                                <li>We do not guarantee that our Service will result in successful funding</li>
                                <li>We are not liable for decisions made by finance providers</li>
                                <li>We are not liable for any indirect, consequential, or special damages</li>
                                <li>Our liability is limited to direct losses arising from our negligence or breach of contract</li>
                                <li>Information provided through our Service is for general guidance and should not be relied upon as professional advice</li>
                                <li>We are not responsible for the content, accuracy, or availability of third-party websites linked from our Service</li>
                            </ul>
                            <p className="mt-4 leading-relaxed">
                                Nothing in these Terms excludes or limits liability for death or personal injury caused by
                                negligence, fraud, or any other liability that cannot be lawfully excluded.
                            </p>
                            <p className="mt-2 leading-relaxed">
                                We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
                            </p>
                        </section>

                        {/* Section 7: Intellectual Property */}
                        <section id="ip" className="scroll-mt-24 mt-10">
                            <h2 className="text-2xl font-semibold">7. Intellectual Property</h2>
                            <p className="mt-4 leading-relaxed">
                                All intellectual property rights in the Service, including copyright, trademarks, database
                                rights, domain names, design rights, and patents, are owned by Alpha Funding or our licensors.
                            </p>
                            <p className="mt-2 leading-relaxed">You may not:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-2 leading-relaxed">
                                <li>Copy, reproduce, or distribute any content from the Service without permission</li>
                                <li>Frame, mirror, or embed our content on other websites</li>
                                <li>Use automated tools to scrape or extract data from the Service</li>
                                <li>Create derivative works based on our content</li>
                                <li>Use our trademarks or branding without written consent</li>
                            </ul>
                            <p className="mt-4 leading-relaxed">
                                You may link to our homepage for non-commercial purposes, provided you do not imply
                                endorsement or affiliation without our consent.
                            </p>
                        </section>

                        {/* Section 8: Client Money */}
                        <section id="client-money" className="scroll-mt-24 mt-10">
                            <h2 className="text-2xl font-semibold">8. Client Money</h2>
                            <p className="mt-4 leading-relaxed">
                                Alpha Funding Finance Limited does not hold, handle, or manage client money in any form.
                                All financial transactions are conducted directly between you and the finance provider.
                            </p>
                        </section>

                        {/* Section 9: Complaints */}
                        <section id="complaints" className="scroll-mt-24 mt-10">
                            <h2 className="text-2xl font-semibold">9. Complaints</h2>
                            <p className="mt-4 leading-relaxed">
                                We take complaints seriously and aim to resolve issues promptly and fairly.
                            </p>

                            <h3 className="text-xl font-medium mt-6">How to Complain</h3>
                            <p className="mt-2 leading-relaxed">
                                Email <strong>contact@alpha-funding.co.uk</strong> with brief details of your complaint
                                and any reference numbers.
                            </p>

                            <h3 className="text-xl font-medium mt-6">Our Process</h3>
                            <ul className="list-disc pl-6 mt-2 space-y-2 leading-relaxed">
                                <li><strong>Acknowledgement:</strong> Within 1 Business Week of receipt</li>
                                <li><strong>Initial response:</strong> Within 1 Business Week</li>
                                <li><strong>Resolution target:</strong> Within 4 weeks</li>
                                <li><strong>Final response:</strong> Within 8 weeks if unresolved</li>
                            </ul>

                            <h3 className="text-xl font-medium mt-6">Financial Ombudsman Service</h3>
                            <p className="mt-2 leading-relaxed">
                                If we cannot resolve your complaint within 8 weeks, or you are dissatisfied with our
                                final response, you may be entitled to refer your complaint to the Financial Ombudsman
                                Service:
                            </p>
                            <ul className="list-none pl-0 mt-2 space-y-1 leading-relaxed">
                                <li><strong>Phone:</strong> 0800 023 4567</li>
                                <li><strong>Website:</strong> <a href="https://www.financial-ombudsman.org.uk" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">www.financial-ombudsman.org.uk</a></li>
                            </ul>
                        </section>

                        {/* Section 10: General Terms */}
                        <section id="general" className="scroll-mt-24 mt-10">
                            <h2 className="text-2xl font-semibold">10. General Terms</h2>

                            <h3 className="text-xl font-medium mt-6">10.1 Changes to These Terms</h3>
                            <p className="mt-2 leading-relaxed">
                                We may update these Terms from time to time. Material changes will be notified via email
                                or prominently on our website. Continued use of the Service after changes constitutes
                                acceptance of the updated Terms.
                            </p>

                            <h3 className="text-xl font-medium mt-6">10.2 Communications</h3>
                            <p className="mt-2 leading-relaxed">
                                We may send notices to the email address you provided when registering. You agree to
                                receive communications electronically. It is your responsibility to keep your contact
                                details up to date.
                            </p>

                            <h3 className="text-xl font-medium mt-6">10.3 Severability</h3>
                            <p className="mt-2 leading-relaxed">
                                If any provision of these Terms is found invalid or unenforceable, the remaining
                                provisions shall continue in full force and effect.
                            </p>

                            <h3 className="text-xl font-medium mt-6">10.4 No Waiver</h3>
                            <p className="mt-2 leading-relaxed">
                                Failure to exercise or enforce any right or provision of these Terms shall not constitute
                                a waiver of such right or provision.
                            </p>

                            <h3 className="text-xl font-medium mt-6">10.5 Assignment</h3>
                            <p className="mt-2 leading-relaxed">
                                We may assign or transfer these Terms and our rights and obligations to a third party.
                                You may not assign your rights under these Terms without our prior written consent.
                            </p>

                            <h3 className="text-xl font-medium mt-6">10.6 Governing Law</h3>
                            <p className="mt-2 leading-relaxed">
                                These Terms are governed by and construed in accordance with the laws of England and
                                Wales. Both parties agree to submit to the exclusive jurisdiction of the courts of
                                England and Wales for any disputes arising from these Terms.
                            </p>

                            <h3 className="text-xl font-medium mt-6">10.7 Entire Agreement</h3>
                            <p className="mt-2 leading-relaxed">
                                These Terms, together with our Privacy Policy and any other policies referenced herein,
                                constitute the entire agreement between you and Alpha Funding regarding use of the Service.
                            </p>
                        </section>

                        {/* Contact */}
                        <section className="mt-10 p-6 border rounded-2xl bg-card">
                            <h2 className="text-xl font-semibold">Contact Us</h2>
                            <p className="mt-2 leading-relaxed">
                                If you have any questions about these Terms, please contact us:
                            </p>
                            <ul className="list-none pl-0 mt-4 space-y-2">
                                <li><strong>Email:</strong> contact@alpha-funding.co.uk</li>
                                <li><strong>Privacy Enquiries:</strong> contact@alpha-funding.co.uk</li>
                                <li><strong>Phone:</strong> 020 7078 7446</li>
                                <li><strong>Address:</strong> Commerce House Campbeltown Road, Tranmere, Wirral, United Kingdom, CH41 9HP
                                </li>
                            </ul>
                        </section>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}