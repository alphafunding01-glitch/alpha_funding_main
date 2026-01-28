import NavBar from "@/components/navbar";
import Footer from "@/sections/common/footer";
import ApplyNowContent from "@/sections/apply-now/apply-now-content";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Apply Now | Alpha Funding',
    description: 'Start your business finance application with Alpha Funding. Fast, secure, and tailored funding solutions for UK SMEs.',
};

export default function ApplyNow() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar hideOnScroll={true} />
            <div className="flex-grow pt-36">
                <ApplyNowContent />
            </div>
            <Footer />
        </div>
    )
}