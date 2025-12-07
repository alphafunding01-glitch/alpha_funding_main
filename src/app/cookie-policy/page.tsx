import NavBar from "@/components/navbar";
import Footer from "@/sections/common/footer";

export const metadata = {
    title: "Cookie Policy — Alpha Funding Finance",
    description: "Alpha Funding Finance Limited — Cookie Policy",
};


export default function CookiePolicyPage() {
    return (
        <>
            <NavBar/>
            <main className="min-h-screen bg-gray-50 py-12">
                <div className="mx-auto w-full max-w-5xl bg-white rounded-2xl shadow-md p-8">
                    <header className="mb-8">
                        <h1 className="text-3xl font-semibold">Cookie Policy</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Last updated: April 07, 2022</p>
                    </header>

                    <div className="flex items-start justify-between mb-6">
                        <nav aria-label="Table of contents" className="hidden md:block w-64 mr-6">
                            <div className="sticky top-6">
                                <h2 className="text-sm font-medium mb-2">Contents</h2>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#intro" className="hover:underline">Introduction</a></li>
                                    <li><a href="#what-cookies" className="hover:underline">What are cookies?</a></li>
                                    <li><a href="#how-we-use" className="hover:underline">How do we use cookies?</a>
                                    </li>
                                    <li><a href="#types" className="hover:underline">What cookies do we use?</a></li>
                                    <li><a href="#manage" className="hover:underline">How do I manage cookies?</a></li>
                                </ul>
                            </div>
                        </nav>

                        <article id="policy-content" className="prose max-w-none flex-1">
                            <section id="intro">
                                <h2>Introduction</h2>
                                <p>
                                    This policy (“Cookie Policy”) forms part of the Alpha Funding Finance Privacy Policy
                                    (“Privacy Policy”).
                                    Capitalized terms not otherwise defined in this Cookie Policy have the meaning given
                                    to them in the Privacy Policy.
                                </p>
                            </section>

                            <section id="what-cookies">
                                <h2>What are cookies?</h2>
                                <p>
                                    Cookies are small pieces of data stored on your browser, computer or other device
                                    when you visit websites,
                                    including our website (“our Website”). Cookies usually contain anonymous
                                    information, which is accessible by
                                    the website which set it, on each later visit to that website or sometimes when you
                                    visit other websites.
                                </p>
                                <p>
                                    We can also collect information about your usage of our Website from data contained
                                    in log files. Log files are not cookies;
                                    they do not contain any personal data; and they are not used to identify your
                                    personal use of our Website.
                                    When you request any web page from our Website, web servers automatically obtain
                                    your domain name and
                                    internet protocol (IP) address. That data is only used to examine Website traffic in
                                    aggregate, to investigate abuse,
                                    and/or to cooperate with law enforcement.
                                </p>
                            </section>

                            <section id="how-we-use">
                                <h2>How do we use cookies?</h2>
                                <p>We use cookies to store the following data:</p>
                                <ul>
                                    <li>How you use our Website</li>
                                    <li>Identifiers such as your device and location</li>
                                    <li>Your preferences for our Website and services</li>
                                </ul>
                                <p>Cookies cannot harm your computer or other device.</p>
                            </section>

                            <section id="types">
                                <h2>What cookies do we use?</h2>
                                <p>There are four different types of cookies:</p>
                                <ul>
                                    <li><strong>Necessary cookies:</strong> Required for the operation of our Website;
                                        do not gather marketing data.
                                    </li>
                                    <li><strong>Analytical/performance cookies:</strong> Collect information about how
                                        you use our Website and help us improve it. These do not collect personal data.
                                        Some may be issued by third parties (e.g. Google Analytics).
                                    </li>
                                    <li><strong>Functionality cookies:</strong> Used to provide services or recognise
                                        you when you return, enabling personalisation and remembering preferences.
                                    </li>
                                    <li><strong>Targeting cookies:</strong> Record your visit, pages visited and links
                                        followed. Linked to third-party services (e.g. Like and Share buttons) which may
                                        target advertising to you on other sites.
                                    </li>
                                </ul>
                            </section>

                            <section id="manage">
                                <h2>How do I manage my cookie settings?</h2>
                                <p>
                                    Configuring your computer or mobile browser to reject necessary, performance or
                                    functional cookies may
                                    severely impact your experience on our Website and some parts may not function at
                                    all.
                                </p>
                                <p>
                                    All browsers provide tools to control how you handle cookies: accept, reject or
                                    delete them. These settings are
                                    normally accessed via the ‘settings’, ‘preferences’ or ‘options’ menu of the
                                    browser, but you can also check the
                                    ‘help’ function or contact the browser provider.
                                </p>
                                <p>
                                    You should check the privacy policy of any third-party services you use that set
                                    targeting cookies. Some third parties
                                    provide tools to prevent their cookies being set.
                                </p>
                            </section>
                        </article>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
}
