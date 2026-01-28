import NavBar from "@/components/navbar";
import Footer from "@/sections/common/footer";
import PartnerContent from "@/sections/partner/partner-content";
import WhyChooseSolution from "@/sections/solutions/why-choose-solution";
import CheckEligibleSection from "@/sections/common/find-eligible-section";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Partner With Us | Alpha Funding',
    description: 'Join the Alpha Funding partner network. Offer your clients premium business finance solutions and grow your business.',
};

export default function PartnerPage() {
    const content = [
        {
            point: "Remove budget barriers",
            content:
                "Finance solutions make it easier for customers to say yes, even when upfront costs feel overwhelming.",
            subContent:
                "Instead of losing a sale due to price resistance, Alpha Funding empowers your customers to spread costs over time, making your offer more attractive and accessible.",
        },
        {
            point: "Secure larger sales",
            content:
                "Clients tend to invest in higher-value products and services when flexible finance is available.",
            subContent:
                "Finance gives customers the freedom to upgrade or add on extras, which means you close bigger deals without needing to cut prices.",
        },
        {
            point: "Accelerate your cash flow",
            content:
                "Receive funds promptly without waiting on extended payment terms, so your business never slows down.",
            subContent:
                "Alpha Funding ensures you get paid upfront, while your customers continue paying in manageable instalments—protecting your working capital.",
        },
        {
            point: "Strengthen customer loyalty",
            content:
                "When you provide accessible payment options, customers feel supported and are more likely to return.",
            subContent:
                "By helping them manage affordability, you build long-term relationships, repeat sales, and higher retention.",
        },
        {
            point: "Generate additional revenue",
            content:
                "Earn from referral incentives and create long-term revenue streams by partnering with Alpha Funding.",
            subContent:
                "Our partner program rewards you for every successful referral while boosting your sales performance.",
        },
        {
            point: "Stay ahead of competitors",
            content:
                "Offering finance positions your business as progressive and customer-focused in a crowded market.",
            subContent:
                "Alpha Funding’s tailored solutions ensure you’re not just selling products—you’re providing complete financial accessibility.",
        },
        {
            point: "Fuel consistent growth",
            content:
                "Boost your sales pipeline by aligning your products with tailored Alpha Funding finance solutions.",
            subContent:
                "We help you capture more opportunities, close sales faster, and expand into new customer segments.",
        },
        {
            point: "Co-branded marketing support",
            content:
                "Access professional marketing materials, dual-branded campaigns, and tailored digital assets to support your sales team.",
            subContent:
                "From brochures to webpages, Alpha Funding equips you with powerful tools to present finance as a natural part of your customer offering.",
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar hideOnScroll={true} />

            <div className="flex-grow">
                {/* Hero & Form Section */}
                <PartnerContent />

                {/* Benefits Section */}
                <WhyChooseSolution
                    upperHeader={"PARTNER & VENDOR FINANCE BENEFITS"}
                    header={"What you gain by partnering with Alpha Funding"}
                    content={
                        "We don’t just offer finance—we provide a growth partnership. Our solutions are designed to help your business attract more customers, secure larger deals, and build lasting relationships. With Alpha Funding, you transform affordability into opportunity."
                    }
                    subContent={
                        "Every partnership is backed by industry expertise, marketing support, and a commitment to help you outperform competitors. Here’s how we make the difference:"
                    }
                    bottomContent={<></>}
                    question={"Why choose Alpha Funding’s Partner Finance?"}
                    answers={content}
                />

                <CheckEligibleSection />
            </div>

            <Footer />
        </div>
    );
}
