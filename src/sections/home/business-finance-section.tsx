import { useState } from 'react';
import { TrendingUp, Shield, Users, Zap, Clock, Network, PoundSterling, Star, ArrowRight, Phone } from 'lucide-react';
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function BusinessFinanceSection() {
    const [loanAmount, setLoanAmount] = useState('75000');
    const [tenure, setTenure] = useState('24');

    const handleApply = () => {
        console.log(`Applying for loan: £${loanAmount} for ${tenure} months`);
    };

    const formatCurrency = (value: any) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    const monthlyPayment = Math.round((parseInt(loanAmount.replace(/,/g, '')) * 1.08) / parseInt(tenure));

    return (
        <div
            className="relative md:px-[6%] overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div
                                className="inline-flex items-center gap-2 bg-[#06b6d4] text-white px-4 py-2 rounded-full text-xs font-medium">
                                <Star className="w-4 h-4" />
                                Proven and trusted by businesses at scale
                            </div>
                            <h1 className="text-4xl font-bold leading-tight text-gradient-primary">
                                Start Your
                                <span className="block">Finance Journey</span>
                            </h1>
                            <p className="text-sm text-muted-foreground max-w-md">
                                Unlock your business potential with tailored finance solutions. From £1K to £10M, we've
                                got you covered with competitive rates and fast approvals.
                            </p>
                        </div>

                        {/* Key Features Pills */}
                        <div className="flex flex-wrap gap-3">
                            {[
                                { icon: Zap, text: "Fast Funding" },
                                { icon: Shield, text: "Secured & Unsecured Loans" },
                                { icon: Users, text: "Trusted Lenders" }
                            ].map((feature, index) => (
                                <div key={index}
                                    className="flex items-center gap-2 bg-card border px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                                    <feature.icon className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium text-card-foreground">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Key Benefits */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                {
                                    icon: TrendingUp,
                                    title: "Tailored Finance Solutions",
                                    desc: "Customized to your needs"
                                },
                                { icon: Clock, title: "Loan Terms Up to 72 Months", desc: "Flexible repayment options" },
                                {
                                    icon: PoundSterling,
                                    title: "Funding from £1,000 to £10 Million",
                                    desc: "Scale as you grow"
                                },
                                { icon: Network, title: "Wide Lender Network", desc: "Best possible rates" }
                            ].map((benefit, index) => (
                                <div key={index}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/20 transition-colors">
                                    <div
                                        className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                                        <benefit.icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-card-foreground text-sm leading-tight">{benefit.title}</h3>
                                        <p className="text-xs text-muted-foreground mt-1">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Loan Calculator Card */}
                    <div className="bg-card border rounded-2xl p-8 shadow-xl">
                        <div className="space-y-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-card-foreground mb-2">Apply for loans in minutes
                                    - no hassle</h3>
                                <p className="text-muted-foreground">Get instant estimates for your business loan</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-card-foreground mb-2">Loan
                                        Amount</label>
                                    <div className="relative">
                                        <PoundSterling
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="text"
                                            value={loanAmount}
                                            onChange={(e) => setLoanAmount(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                                            placeholder="75,000"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-card-foreground mb-2">Tenure
                                        (months)</label>
                                    <input
                                        type="number"
                                        value={tenure}
                                        onChange={(e) => setTenure(e.target.value)}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                                        placeholder="24"
                                    />
                                </div>

                                {/* Quick Calculation Display */}
                                <Link href={"/apply-now"}
                                    className={
                                        buttonVariants({
                                            className: "w-full mt-16"
                                        })
                                    }
                                >
                                    Apply For This Loan
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}