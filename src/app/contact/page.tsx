import { BreadcrumbJsonLd, LocalBusinessJsonLd } from 'next-seo';
import type { Metadata } from 'next';
import ContactPageContent from '@/sections/contact/contact-page-content';
import NavBar from '@/components/navbar';
import Footer from '@/sections/common/footer';

export const metadata: Metadata = {
    title: 'Contact Us | Alpha Funding',
    description: 'Get in touch with Alpha Funding\'s team of finance specialists. Contact us for bespoke business finance solutions tailored to your company\'s needs.',
    openGraph: {
        url: 'https://www.alpha-funding.co.uk/contact',
        title: 'Contact Alpha Funding - Business Finance Experts',
        description: 'Speak to our friendly team about your business finance needs. Two UK offices ready to help.',
        images: [
            {
                url: 'https://www.alpha-funding.co.uk/og-contact.jpg',
                width: 1200,
                height: 630,
                alt: 'Contact Alpha Funding',
            },
        ],
    },
};

export default function Contact() {
    return (
        <div className="flex flex-col min-h-screen pt-36">
            <LocalBusinessJsonLd
                type="FinancialService"
                name="Alpha Funding"
                description="Business finance solutions provider offering flexible funding options for UK businesses"
                url="https://www.alpha-funding.co.uk"
                telephone="+442070787446"
                address={[
                    {
                        streetAddress: '307 Euston Road',
                        addressLocality: 'London',
                        addressRegion: 'London',
                        postalCode: 'NW1 3AD',
                        addressCountry: 'GB',
                    },
                    {
                        streetAddress: 'Commerce House, Campbeltown Rd, Tranmere',
                        addressLocality: 'Wirral',
                        addressRegion: 'Merseyside',
                        postalCode: 'CH41 9HP',
                        addressCountry: 'GB',
                    },
                ]}
                geo={{
                    latitude: 51.5273,
                    longitude: -0.1335,
                }}

                image="https://www.alpha-funding.co.uk/logo.png"
                priceRange="$$"
                openingHoursSpecification={[
                    {
                        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                        opens: '09:00',
                        closes: '17:00',
                    },
                ]}
            />
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: 'https://www.alpha-funding.co.uk',
                    },
                    {
                        name: 'Contact Us',
                    },
                ]}
            />
            <NavBar hideOnScroll={true} />
            <ContactPageContent />
            <Footer />
        </div>
    )
}