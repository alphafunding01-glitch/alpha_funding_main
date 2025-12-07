import type { Metadata } from "next";
import Footer from "@/sections/common/footer";
import NavBar from "@/components/navbar";

export const metadata: Metadata = {
    title: "Privacy Policy | Alpha Funding Finance",
    description:
        "Read Alpha Funding Finance's Privacy Policy to understand how we collect, use, and protect your personal data in compliance with GDPR and data protection laws.",
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <NavBar />
            <main className="px-4 mt-36 lg:px-[8%] py-16 max-w-4xl mx-auto text-gray-800">
                <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
                <p className="mb-2 text-sm text-gray-500">Last updated: April 07, 2022</p>

                <section className="space-y-6">
                    <p>
                        This privacy policy sets out how Alpha Funding Finance Limited uses and protects any
                        information that you give Alpha Funding Finance when you use this website.
                    </p>
                    <p>
                        Alpha Funding Finance Limited ("we", "us", "our", "Alpha Funding Finance") take data
                        protection seriously and are committed to taking care of your business data and
                        any personal data in the course of operating our services. This Privacy Policy,
                        along with our Cookie Policy, explains how we collect, process, store and disclose
                        personal data.
                    </p>
                </section>

                <h2 className="text-2xl font-semibold mt-10 mb-4">What Information We Collect</h2>
                <p>
                    We collect and process the following data about you, including identity data,
                    contact data, financial and business data, transaction data, usage data, and
                    marketing preferences. We may also use aggregated, anonymised data for
                    statistical purposes.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">How We Use Your Information</h2>
                <p>
                    Information is used for internal record keeping, fulfilling orders, improving
                    services, marketing communications, market research, and compliance with legal
                    obligations. We will only retain your personal data as long as necessary to fulfil
                    these purposes.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Disclosure of Your Information</h2>
                <p>
                    We may share your personal data with fraud prevention agencies, group companies,
                    service providers, and third-party partners who support our services. All third
                    parties are required to treat your information securely and lawfully.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Overseas Transfers</h2>
                <p>
                    Your data may be transferred outside the EEA where we or our partners operate.
                    Where transfers occur, we take appropriate safeguards such as EU-approved model
                    contracts to ensure your rights are protected.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Your Legal Rights</h2>
                <p>
                    You have rights under GDPR including access, correction, erasure, withdrawal of
                    consent, and complaint to the ICO. If you wish to exercise these rights, please
                    contact us at contact@alpha-funding.co.uk.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Notice to Staff</h2>
                <p>
                    Staff personal information is stored securely and only accessible by authorised
                    departments. All hardware and software remain the property of Alpha Funding Finance and
                    may be accessed by the company when required.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Complaints</h2>
                <p>
                    If you're unhappy with our service, please contact us by phone on 020 7078 7446,
                    email at contact@alpha-funding.co.uk, or write to The Complaints Department,
                    Alpha Funding Finance Limited, 307 Euston Road, London NW1 3AD.
                </p>
                <p>
                    If we cannot resolve your complaint, you may contact the Financial Ombudsman
                    Service at complaint.info@financial-ombudsman.org.uk or call 0800 023 4567.
                </p>
            </main>
            <Footer />
        </>
    );
}