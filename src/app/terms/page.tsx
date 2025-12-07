import NavBar from "@/components/navbar";
import Footer from "@/sections/common/footer";

export const metadata = {
    title: "Terms of Service | Alpha Funding Finance",
    description:
        "Read the Terms of Service for Alpha Funding Finance Limited. These terms govern the use of our credit broking service for registered businesses.",
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
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Terms Of Service</h1>
                            <p className="text-sm text-muted-foreground mt-2">Last updated: April 07, 2022</p>
                        </header>

                        {/* Intro */}
                        <p className="text-foreground leading-relaxed">
                            Thank you for visiting Alpha Funding Finance
                        </p>

                        <p className="mt-4 leading-relaxed">
                            These terms and conditions (“Terms of Service”), which include our Privacy Policy, govern
                            the use of the
                            credit broking service (“Service”) provided by Alpha Funding Finance Limited (“we”, “us”, “our”)
                            to any business
                            designated lenders is unsuccessful, the lender must provide us with certain “specified
                            information” related
                            to that application. The Service includes a process for matching your profile, including any
                            specified
                            information we receive from any designated lender(s) to the lending criteria of the finance
                            providers we work
                            with (each a “Finance Provider”) in such a form that no individual business, and no person
                            associated with
                            the business, can be identified. The initial matching process satisfies our obligation under
                            The Small and
                            Medium Sized Business (Finance Platforms) Regulations 2015 (“the Regulations”) to make
                            available to the
                            Finance Provider the specified information we receive from designated banks in that form.
                            Where we have
                            multiple Finance Providers with lending criteria matching your requirement, we may refer you
                            to the Finance
                            Provider that we believe most closely satisfies your requirements. We only maintain a
                            Finance Provider’s
                            access to the specified information related to such a business until either:
                        </p>

                        <ol className="list-decimal pl-6 mt-4 space-y-2">
                            <li>
                                30 days after the date by when that information states that you require finance (or, if
                                such date is not
                                known, the date by which you have requested finance);
                            </li>
                            <li>
                                the end of the Business Day after you inform us that either you do not wish any Finance
                                Provider to access
                                such information, or you no longer require finance
                            </li>
                        </ol>

                        <p className="mt-4 leading-relaxed">
                            “Business Day” means any day which is not a Saturday, a Sunday or a bank or public holiday
                            in England.
                        </p>

                        <p className="mt-4 leading-relaxed">
                            The Finance Provider may opt in or out of the shortlist of Finance Providers who might
                            potentially provide
                            financing to you. We will then present that list to you, and you may request us to provide
                            the information we
                            hold about you, including information that identifies you and any relevant person associated
                            with the
                            business. By the end of the Business Day following the day it receives any such request by
                            you, we shall
                            provide the relevant Finance Provider with that information as required under the
                            Regulations.
                        </p>

                        {/* TOC */}
                        <nav className="mt-10 mb-6 border rounded-2xl p-4 bg-card">
                            <h2 className="font-semibold mb-3">Contents</h2>
                            <ul className="list-disc pl-5 grid gap-2 md:grid-cols-2">
                                <li><a className="hover:underline" href="#limitations">Limitations of what we offer</a>
                                </li>
                                <li><a className="hover:underline" href="#usage">Your usage and responsibilities</a>
                                </li>
                                <li><a className="hover:underline" href="#ip">Our intellectual property</a></li>
                                <li><a className="hover:underline" href="#data">Our management of data</a></li>
                                <li><a className="hover:underline" href="#client-money">Client money</a></li>
                                <li><a className="hover:underline" href="#complaints">Complaints</a></li>
                                <li><a className="hover:underline" href="#other-terms">Other terms</a></li>
                            </ul>
                        </nav>

                        {/* Sections */}
                        <section id="limitations" className="scroll-mt-24">
                            <h2 className="text-2xl font-semibold">Limitations of what we offer</h2>
                            <ul className="list-disc pl-6 mt-4 space-y-2 leading-relaxed">
                                <li>Our Service is intended for your own business-related purposes only.</li>
                                <li>
                                    We cannot guarantee that our Service will be successful for you, neither are we
                                    obliged to provide our
                                    Service to you.
                                </li>
                                <li>
                                    Our Service is based on information from third parties over which we have no control
                                    and may contain
                                    inaccuracies or errors.
                                </li>
                                <li>
                                    Where you have not made us aware of your specific needs, it is your responsibility
                                    to ensure that any
                                    options presented through the Service meet your requirements.
                                </li>
                                <li>
                                    Content and information provided as part of the Service may not be timely or
                                    correct, and will change
                                    without notice, meaning that it is for your general information and use only.
                                </li>
                                <li>
                                    To support free usage of our Service, we must expressly exclude liability for any
                                    inaccuracies, service
                                    failures or errors to the fullest extent permitted by law. Accordingly, we cannot
                                    provide any warranty or
                                    guarantee as to the accuracy, timeliness, performance, completeness or suitability
                                    of the information
                                    offered through the Service.
                                </li>
                                <li>
                                    To the extent permitted by applicable law, each party shall only be liable to the
                                    other party for any
                                    loss or damage which results as a directly foreseeable consequence of its breach of
                                    this Agreement or
                                    negligence (except in the case of fraud or willful misconduct).
                                </li>
                                <li>
                                    Nothing in these terms shall seek to exclude or limit liability for death or
                                    personal injury or any other
                                    liability that cannot be lawfully excluded or limited.
                                </li>
                                <li>
                                    While the Service is free of charge to you, we may receive commission from Finance
                                    Providers for
                                    introductions we make to them.
                                </li>
                                <li>
                                    The Service is not intended as advice or to be relied upon by you in any way,
                                    including as the basis for
                                    making or not making any decision, and you should obtain your own independent
                                    financial, accounting, tax
                                    and/or legal advice concerning your activities in connection with the Service and
                                    any finance
                                    application and/or agreement.
                                </li>
                                <li>
                                    You use and download information from the Service at your own risk and should use
                                    software to detect and
                                    disinfect viruses in any information you use and download.
                                </li>
                                <li>
                                    The availability of third party sites, links, services or information via the
                                    Service does not constitute
                                    any recommendation, advice, endorsement or publication by us and we are not
                                    responsible for any such
                                    sites, links, services or information provided by any third party.
                                </li>
                                <li>
                                    We reserve the right to change any aspect of the Service at any time without notice
                                    or to suspend access
                                    to the Service or end it.
                                </li>
                            </ul>
                        </section>

                        <section id="usage" className="scroll-mt-24 mt-10">
                            <h2 className="text-2xl font-semibold">Your usage and responsibilities</h2>
                            <p className="mt-4 leading-relaxed">
                                By using the Service, you agree to notify us promptly of any changes in the details you
                                have provided to
                                us. You shall ensure that all information you provide to us is complete, true,
                                up-to-date and accurate in
                                all respects. You are solely responsible at your own cost and expense for creating
                                backup copies and
                                replacing any information you provide via the Service.
                            </p>
                            <p className="mt-4 leading-relaxed">
                                You agree that we and our lenders may carry out identity verification and credit checks
                                on you and your
                                owners or directors. You and your owners or directors acknowledge that credit reference
                                agencies link
                                together the records of you and anyone that you have advised is a financial associate
                                (e.g. someone with
                                whom you have a joint credit account) including previous and subsequent names of parties
                                to the account.
                                Links between financial associates will remain on yours and their credit reference files
                                until such time as
                                you or your associate successfully files for a disassociation with the credit reference
                                agencies. We and
                                any Finance Provider may take into account information about yours and your owners’ or
                                directors’ financial
                                associates in yours or their credit reference.
                            </p>
                            <p className="mt-4 leading-relaxed">
                                If you have agreed to pay us for any aspect of the Service, you recognise that we may
                                withdraw your rights
                                to use the Service as a result of non-payment.
                            </p>
                            <p className="mt-4 leading-relaxed">
                                You agree not to use the Service in a way that harms our reputation, and you agree to
                                comply with all
                                applicable laws and regulations, including the General Data Protection Regulations
                                (GDPR).
                            </p>
                            <p className="mt-4 leading-relaxed">
                                You agree to indemnify and hold us, our staff, officers, group companies and partners
                                harmless from loss,
                                damage or claim, made by third parties and/or incurred as a result your breach of these
                                terms.
                            </p>
                            <p className="mt-4 leading-relaxed">
                                We will make reasonable efforts to provide support for the Service during office hours
                                by email on
                                contact@alpha-funding.co.uk, or by telephone on 020 7078 7446
                            </p>
                        </section>

                        <section id="ip" className="scroll-mt-24 mt-10">
                            <h2 className="text-2xl font-semibold">Our intellectual property</h2>
                            <p className="mt-4 leading-relaxed">
                                You recognize that unless otherwise stated in writing we do not grant you any
                                intellectual property rights
                                in relation to the Service, which include copyright, database rights, our trademarks,
                                domain names, design
                                rights and patents.
                            </p>
                            <p className="mt-4 leading-relaxed">
                                In addition, the Service contains material, which is owned by us or our licensors,
                                including but not
                                limited to source code, algorithms, databases, copy and graphics, and you recognise that
                                unless otherwise
                                stated in writing, we do not grant you any rights to these. You may only link to the
                                home page of the
                                Service. You must not display, frame or otherwise surround the contents or any page from
                                the Service, or
                                allow such content or page to be displayed framed or otherwise surrounded, with material
                                not originating
                                from us without our prior written consent.
                            </p>
                            <p className="mt-4 leading-relaxed">
                                You will not acquire any proprietary rights (including database rights) to any
                                information provided via the
                                Service.
                            </p>
                            <p className="mt-4 leading-relaxed">You will not:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-2 leading-relaxed">
                                <li>
                                    use the Service to:
                                    <ul className="list-disc pl-6 mt-2 space-y-2">
                                        <li>
                                            collect any information of other users from the Service for the purpose of
                                            sending unsolicited
                                            communications outside the Service.
                                        </li>
                                        <li>
                                            create a database of information obtained from this Service otherwise than
                                            for your own records.
                                        </li>
                                        <li>
                                            transfer any information form the Service to any third party except where
                                            expressly permitted by us.
                                        </li>
                                        <li>use automated scripts to collect information from or otherwise interact with
                                            the Service.
                                        </li>
                                        <li>use the Service in any unlawful manner or in any manner that could harm the
                                            Service or the servers on which it is hosted.
                                        </li>
                                        <li>register any person or entity on, or otherwise use, the Service without that
                                            person or entity’s prior written authorization.
                                        </li>
                                        <li>impersonate any person or entity, create a false identity in relation to the
                                            Service or falsely state or otherwise mislead or deceive us.
                                        </li>
                                        <li>impersonate any person or entity, create a false identity in relation to the
                                            Service or falsely state or otherwise mislead or deceive us.
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        <section id="data" className="scroll-mt-24 mt-10">
                            <h2 className="text-2xl font-semibold">Our management of data</h2>
                            <p className="mt-4 leading-relaxed">
                                We take data protection very seriously and we are committed to taking care of your
                                business data in
                                accordance with the provisions of our Privacy Policy
                            </p>
                            <p className="mt-4 leading-relaxed">
                                As part of providing our Service to you we may share data provided by you with our panel
                                of approved
                                Lenders, and those Lenders will share with us information regarding your case such as
                                its current status
                                and outcome.
                            </p>
                            <p className="mt-4 leading-relaxed">
                                Our usage of such data may involve interfacing to third party systems, to enhance the
                                databases we use to
                                provide the Service and our Services to others, and for monitoring of performance,
                                statistical analysis
                                and the identification of improvements to the Service.
                            </p>
                            <p className="mt-4 leading-relaxed">
                                By using our Services to provide data to us, you agree to grant us an irrevocable,
                                royalty-free,
                                sub-licensable, transferable, perpetual license to use, copy, reformat, translate,
                                excerpt (in whole or in
                                part) and distribute these data for any purpose on or in connection with the Service, to
                                prepare
                                derivative works of, or incorporate into other works. We may share this information with
                                other third
                                parties who assist us in providing the Service. In such circumstances, any data used
                                will be anonymous and
                                will not identify you as the source unless we receive your permission to do so. If you
                                choose to remove
                                your data, this license will expire, provided that you acknowledge (a) we may retain
                                archived copies and
                                (b) we are required to maintain records that are relevant to demonstrating our
                                compliance with the
                                Regulations for no less than five years from the date on which the records were created.
                            </p>
                        </section>

                        <section id="client-money" className="scroll-mt-24 mt-10">
                            <h2 className="text-2xl font-semibold">Client money</h2>
                            <p className="mt-4 leading-relaxed">
                                For the avoidance of doubt, Alpha Funding Finance Limited does not hold or in any way handle
                                any client monies
                                whatsoever
                            </p>
                        </section>

                        <section id="complaints" className="scroll-mt-24 mt-10">
                            <h2 className="text-2xl font-semibold">Complaints</h2>
                            <p className="mt-4 leading-relaxed">
                                If you want to make a complaint you can email contact@alpha-funding.co.uk with brief
                                details of your
                                complaint and your reference. We will acknowledge your complaint within one Business
                                Day, then investigate
                                and send you an initial response within another three Business Days. We will aim to
                                resolve the matter
                                within four weeks of receiving your complaint.
                            </p>
                            <p className="mt-4 leading-relaxed">
                                If within eight weeks after receiving a complaint we are still not able to resolve the
                                matter, we will
                                send you a final response. If you don’t agree with our final response you may be
                                entitled to refer your
                                complaint to the Financial Ombudsman Service, who can be contacted by telephone on 0800
                                023 4567 or at
                                www.financial-ombudsman.org.uk. You may also have the right to make a complaint directly
                                to the Financial
                                Ombudsman Service.
                            </p>
                        </section>

                        <section id="other-terms" className="scroll-mt-24 mt-10">
                            <h2 className="text-2xl font-semibold">Other terms</h2>
                            <ul className="list-disc pl-6 mt-4 space-y-2 leading-relaxed">
                                <li>We reserve the right to vary these terms and conditions at any time, including
                                    assigning these terms.
                                </li>
                                <li>
                                    We may send any notices to you by email to the address provided when you signed up
                                    to the Service, or
                                    otherwise as updated by you through the Service. You agree that we may send you
                                    notices via email or via
                                    alerts within the service.
                                </li>
                                <li>
                                    If any provision of these terms is found to be invalid or unenforceable, the
                                    remaining provisions shall
                                    remain enforceable. Failure to exercise or enforce rights or provisions shall not
                                    constitute a waiver.
                                </li>
                                <li>
                                    Your use of the Service is subject to English law, and we both agree to submit to
                                    the jurisdiction of
                                    the English courts to settle any dispute that might arise.
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
