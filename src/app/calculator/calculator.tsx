"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";
import Link from "next/link";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { SmartCalculatorInsights } from "@/components/smart-calculator-insights";

type RateType =
    | "Annual Interest Rate"
    | "Monthly Interest Rate"
    | "Daily Interest Rate"
    | "Yield"
    | "Factor Rate"
    | "Flat Rate";

type FeeType = "fixed" | "percentage";

interface CalculationResult {
    annualRate: number;
    monthlyRate: number;
    dailyRate: number;
    yieldRate: number;
    factorRate: number;
    flatRate: number;
    arrangementFee: number;
    totalLoanAmount: number;
    totalInterest: number;
    totalPayable: number;
    monthlyPayment: number;
}

export default function CalculatorPage() {
    const [amount, setAmount] = useState<number | null>(75000);
    const [months, setMonths] = useState<number | null>(18);

    const [rateType, setRateType] = useState<RateType>("Annual Interest Rate");
    const [rateValue, setRateValue] = useState<number | null>(30.0);

    // New Fee Logic
    const [feeType, setFeeType] = useState<FeeType>("percentage");
    const [feeValue, setFeeValue] = useState<number | null>(2.0); // Default 2%

    const [email, setEmail] = useState("");
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const formatNumber = (value: number) => value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const calculateRates = (): CalculationResult | null => {
        if (!amount || !months || !rateValue) return null;

        // Calculate Arrangement Fee based on user input (No hidden fees)
        let arrangementFee = 0;
        if (feeValue) {
            if (feeType === "percentage") {
                arrangementFee = amount * (feeValue / 100);
            } else {
                arrangementFee = feeValue;
            }
        }

        const totalLoanAmount = amount + arrangementFee;
        const termInYears = months / 12;

        let annualRate = 0;
        let totalPayable = 0;
        let monthlyPayment = 0;
        let totalInterest = 0;

        // Calculate based on the input rate type
        switch (rateType) {
            case "Annual Interest Rate":
                annualRate = rateValue;
                const monthlyInterestRate = annualRate / 100 / 12;
                if (monthlyInterestRate > 0) {
                    monthlyPayment = (totalLoanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
                        (Math.pow(1 + monthlyInterestRate, months) - 1);
                } else {
                    monthlyPayment = totalLoanAmount / months;
                }
                totalPayable = monthlyPayment * months;
                totalInterest = totalPayable - totalLoanAmount;
                break;

            case "Monthly Interest Rate":
                annualRate = rateValue * 12;
                const monthlyRate = rateValue / 100;
                if (monthlyRate > 0) {
                    monthlyPayment = (totalLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                        (Math.pow(1 + monthlyRate, months) - 1);
                } else {
                    monthlyPayment = totalLoanAmount / months;
                }
                totalPayable = monthlyPayment * months;
                totalInterest = totalPayable - totalLoanAmount;
                break;

            case "Daily Interest Rate":
                annualRate = rateValue * 365;
                const dailyRate = rateValue / 100;
                const effectiveMonthlyRate = Math.pow(1 + dailyRate, 30.44) - 1;
                if (effectiveMonthlyRate > 0) {
                    monthlyPayment = (totalLoanAmount * effectiveMonthlyRate * Math.pow(1 + effectiveMonthlyRate, months)) /
                        (Math.pow(1 + effectiveMonthlyRate, months) - 1);
                } else {
                    monthlyPayment = totalLoanAmount / months;
                }
                totalPayable = monthlyPayment * months;
                totalInterest = totalPayable - totalLoanAmount;
                break;

            case "Yield":
                const yieldDecimal = rateValue / 100;
                annualRate = (yieldDecimal / termInYears) * 100;
                totalInterest = totalLoanAmount * yieldDecimal;
                totalPayable = totalLoanAmount + totalInterest;
                monthlyPayment = totalPayable / months;
                break;

            case "Factor Rate":
                totalPayable = totalLoanAmount * rateValue;
                totalInterest = totalPayable - totalLoanAmount;
                monthlyPayment = totalPayable / months;
                annualRate = ((rateValue - 1) / termInYears) * 100;
                break;

            case "Flat Rate":
                const flatTermInYears = months / 12;
                totalInterest = totalLoanAmount * (rateValue / 100) * flatTermInYears;
                totalPayable = totalLoanAmount + totalInterest;
                monthlyPayment = totalPayable / months;
                annualRate = (totalInterest / totalLoanAmount) / flatTermInYears * 100;
                break;
        }

        const monthlyRate = annualRate / 12;
        const dailyRate = annualRate / 365;
        const yieldRate = (totalInterest / totalLoanAmount) * 100;
        const factorRate = totalPayable / totalLoanAmount;
        const flatRate = rateType === "Flat Rate" ? rateValue : annualRate / 2; // Approximation

        return {
            annualRate,
            monthlyRate,
            dailyRate,
            yieldRate,
            factorRate,
            flatRate,
            arrangementFee,
            totalLoanAmount,
            totalInterest,
            totalPayable,
            monthlyPayment,
        };
    };

    const calculations = calculateRates();

    const generatePDF = () => {
        if (!calculations || !amount) return null;

        const doc = new jsPDF();

        // Header
        doc.setFillColor(0, 4, 40); // Brand Midnight
        doc.rect(0, 0, 210, 40, "F");
        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text("Alpha Funding", 20, 25);
        doc.setFontSize(12);
        doc.setTextColor(28, 181, 224); // Brand Cyan
        doc.text("Business Loan Quote", 150, 25);

        // Quote Details
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.text("Your Quote Summary", 20, 55);

        const tableData = [
            ["Loan Amount", `£${formatNumber(amount)}`],
            ["Mandatory Fees", `£${formatNumber(calculations.arrangementFee)} (${((calculations.arrangementFee / amount) * 100).toFixed(2)}%)`],
            ["Total Loan Amount", `£${formatNumber(calculations.totalLoanAmount)}`],
            ["Loan Term", `${months} Months`],
            ["Monthly Payment", `£${formatNumber(calculations.monthlyPayment)}`],
            ["Total Interest", `£${formatNumber(calculations.totalInterest)}`],
            ["Total Payable", `£${formatNumber(calculations.totalPayable)}`],
        ];

        autoTable(doc, {
            startY: 65,
            head: [['Description', 'Value']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [0, 4, 40] },
            styles: { fontSize: 11, cellPadding: 6 },
        });

        // Disclaimer
        const finalY = (doc as any).lastAutoTable.finalY + 20;
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("Disclaimer:", 20, finalY);
        doc.setFontSize(9);
        doc.text(
            "This quote is an indicative estimate based on the information provided. It does not constitute a guaranteed offer of funding. " +
            "Actual rates and terms may vary based on credit checks and lender criteria. This is a conditional offer.",
            20,
            finalY + 7,
            { maxWidth: 170 }
        );

        return doc.output("datauristring");
    };

    const handleSendEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        const pdfBase64 = generatePDF();
        if (!pdfBase64) return;

        // Visual Feedback - Loading
        const btn = document.getElementById("send-quote-btn") as HTMLButtonElement;
        if (btn) btn.innerText = "Sending...";

        try {
            const response = await fetch("/api/send-quote-mail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    pdfBase64,
                    quoteSummary: {
                        amount: formatNumber(amount ?? 0),
                        totalPayable: formatNumber(calculations?.totalPayable ?? 0),
                        monthlyPayment: formatNumber(calculations?.monthlyPayment ?? 0),
                    }
                }),
            });

            const data = await response.json();

            if (data.success) {
                setEmailSent(true);
                setTimeout(() => {
                    setIsEmailOpen(false);
                    setEmailSent(false);
                    setEmail("");
                }, 3000);
            } else {
                alert("Failed to send email. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            if (btn) btn.innerText = "Send Quote";
        }
    };

    const chartData =
        calculations && amount
            ? [
                { name: "Principal", value: amount, color: "#1CB5E0" }, // Brand Cyan
                { name: "Total Interest", value: calculations.totalInterest, color: "#000428" }, // Brand Midnight
                { name: "Arrangement Fees", value: calculations.arrangementFee, color: "#D946EF" }, // Brand Fuchsia
            ].filter((item) => item.value > 0)
            : [];

    const comparisonData =
        calculations && [
            { name: "Annual Interest Rate", value: calculations.annualRate.toFixed(2) + "%" },
            { name: "Monthly Interest Rate", value: calculations.monthlyRate.toFixed(3) + "%" },
            { name: "Daily Interest Rate", value: calculations.dailyRate.toFixed(4) + "%" },
            { name: "Yield / Interest as %", value: calculations.yieldRate.toFixed(3) + "%" },
            { name: "Factor Rate", value: calculations.factorRate.toFixed(4) },
            { name: "Flat Rate", value: calculations.flatRate.toFixed(1) + "%" },
        ];

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-gradient-primary">
                        Business Loan Calculator
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Transparent, instant quotes. Adjust your terms to see exactly what you'll pay, including all fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Panel - Inputs (Neuromorphic) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 relative group h-fit"
                    >
                        {/* Ambient Glow */}
                        <div className="absolute -inset-1 bg-linear-to-r from-brand-cyan to-[#000428] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

                        <Card className="relative bg-white/80 backdrop-blur-xl border-white/20 shadow-xl rounded-2xl overflow-hidden">
                            <CardHeader>
                                <CardTitle className="text-xl font-heading font-bold text-brand-midnight">
                                    Quote Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                {/* Loan Amount */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Loan Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">£</span>
                                        <Input
                                            type="number"
                                            value={amount ?? ""}
                                            onChange={(e) => setAmount(e.target.value === "" ? null : Number(e.target.value))}
                                            className="pl-10 h-12 bg-white/50 border-slate-200 focus:border-brand-cyan focus:ring-brand-cyan text-lg font-bold text-slate-800 rounded-xl"
                                        />
                                    </div>
                                    <Slider
                                        value={[amount ?? 0]}
                                        min={1000}
                                        max={500000}
                                        step={1000}
                                        onValueChange={(v) => setAmount(v[0])}
                                        className="py-2"
                                    />
                                </div>

                                {/* Term */}
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Loan Term</label>
                                        <span className="text-sm font-bold text-brand-cyan">{months} Months</span>
                                    </div>
                                    <Slider
                                        value={[months ?? 1]}
                                        min={1}
                                        max={72}
                                        step={1}
                                        onValueChange={(v) => setMonths(v[0])}
                                        className="py-2"
                                    />
                                </div>

                                {/* Interest Rate */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Interest Rate</label>
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        {[
                                            "Annual Interest Rate",
                                            "Monthly Interest Rate",
                                            "Flat Rate",
                                            "Factor Rate"
                                        ].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => {
                                                    setRateType(type as RateType);
                                                    if (type === "Annual Interest Rate") setRateValue(15);
                                                    if (type === "Monthly Interest Rate") setRateValue(1.5);
                                                    if (type === "Flat Rate") setRateValue(8);
                                                    if (type === "Factor Rate") setRateValue(1.2);
                                                }}
                                                className={`text-xs px-2 py-2 rounded-lg font-bold transition-all ${rateType === type
                                                    ? "bg-[#000428] text-white shadow-lg scale-105"
                                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                                    }`}
                                            >
                                                {type.replace("Interest Rate", "Rate")}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            value={rateValue ?? ""}
                                            onChange={(e) => setRateValue(e.target.value === "" ? null : Number(e.target.value))}
                                            className="h-12 bg-white/50 border-slate-200 focus:border-brand-cyan focus:ring-brand-cyan text-lg font-bold text-slate-800 rounded-xl"
                                            step={0.01}
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                                            {rateType === "Factor Rate" ? "x" : "%"}
                                        </span>
                                    </div>
                                </div>

                                {/* Arrangement Fees */}
                                <div className="space-y-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Arrangement Fees</label>

                                    {/* Toggle */}
                                    <div className="grid grid-cols-2 bg-white rounded-xl p-1 border border-slate-200 shadow-sm">
                                        <button
                                            onClick={() => { setFeeType("percentage"); setFeeValue(2.0); }}
                                            className={`text-xs py-2 rounded-lg font-bold transition-all ${feeType === "percentage" ? "bg-brand-cyan text-white shadow-md relative overflow-hidden" : "text-slate-400 hover:text-slate-600"}`}
                                        >
                                            <span className="relative z-10">Percentage %</span>
                                            {feeType === "percentage" && <div className="absolute inset-0 bg-linear-to-r from-brand-cyan to-[#22D3EE]" />}
                                        </button>
                                        <button
                                            onClick={() => { setFeeType("fixed"); setFeeValue(500); }}
                                            className={`text-xs py-2 rounded-lg font-bold transition-all ${feeType === "fixed" ? "bg-brand-cyan text-white shadow-md relative overflow-hidden" : "text-slate-400 hover:text-slate-600"}`}
                                        >
                                            <span className="relative z-10">Fixed Amount £</span>
                                            {feeType === "fixed" && <div className="absolute inset-0 bg-linear-to-r from-brand-cyan to-[#22D3EE]" />}
                                        </button>
                                    </div>

                                    {feeType === "percentage" ? (
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-xs font-bold text-slate-600">
                                                <span>0%</span>
                                                <span className="text-brand-cyan text-base">{feeValue}%</span>
                                                <span>50%</span>
                                            </div>
                                            <Slider
                                                value={[feeValue ?? 0]}
                                                min={0}
                                                max={50}
                                                step={0.1}
                                                onValueChange={(v) => setFeeValue(v[0])}
                                            />
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">£</span>
                                            <Input
                                                type="number"
                                                value={feeValue ?? ""}
                                                onChange={(e) => setFeeValue(e.target.value === "" ? null : Number(e.target.value))}
                                                className="pl-10 h-10 bg-white border-slate-200 font-bold rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>

                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Middle - Results & Chart */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Results Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-1 bg-linear-to-r from-[#000428] to-brand-cyan rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
                            <Card className="relative border-none overflow-hidden bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl">
                                <div className="h-2 bg-linear-to-r from-[#000428] via-brand-cyan to-[#22D3EE]" />
                                <CardContent className="p-8 space-y-6">
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Estimated Monthly Payment</p>
                                        <p className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#000428] to-brand-cyan">
                                            £{calculations ? formatNumber(calculations.monthlyPayment) : "0.00"}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                                        <div className="text-center p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Interest</p>
                                            <p className="text-xl font-black text-brand-cyan">
                                                {calculations ? `£${formatNumber(calculations.totalInterest)}` : "£0.00"}
                                            </p>
                                        </div>
                                        <div className="text-center p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Payable</p>
                                            <p className="text-xl font-black text-[#000428]">
                                                {calculations ? `£${formatNumber(calculations.totalPayable)}` : "£0.00"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Chart */}

                                    {/* Smart AI Insights (Moved Up) */}
                                    <SmartCalculatorInsights
                                        amount={amount}
                                        months={months}
                                        monthlyPayment={calculations?.monthlyPayment ?? 0}
                                        totalInterest={calculations?.totalInterest ?? 0}
                                        totalPayable={calculations?.totalPayable ?? 0}
                                        annualRate={calculations?.annualRate ?? 0}
                                        className="mt-0 shadow-none border-t border-x-0 border-b-0 border-slate-100 rounded-none bg-transparent px-0 pb-0 pt-6"
                                    />
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Pie Chart (Moved Below) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="bg-white/90 backdrop-blur-xl border-none shadow-xl rounded-2xl overflow-hidden relative">
                                <div className="absolute top-0 w-full h-1 bg-linear-to-r from-brand-cyan to-[#D946EF]" />
                                <CardContent className="p-6">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Cost Breakdown</p>
                                    <div className="h-64 w-full">
                                        <ResponsiveContainer width="100%" height={256}>
                                            <PieChart>
                                                <Pie
                                                    data={chartData}
                                                    innerRadius={80}
                                                    outerRadius={100}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    {chartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                                                    itemStyle={{ color: '#000428' }}
                                                />
                                                <Legend
                                                    verticalAlign="bottom"
                                                    height={36}
                                                    iconType="circle"
                                                    formatter={(value) => <span className="text-xs font-bold text-slate-500">{value}</span>}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right - Summary & breakdown */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* New Quote Summary Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <Card className="neuromorphic-card border-none overflow-hidden relative group">
                                <div className="absolute top-0 w-full h-1 bg-linear-to-r from-[#D946EF] to-brand-cyan" />
                                <CardHeader>
                                    <CardTitle className="text-xl font-heading font-bold text-brand-midnight">
                                        Your Loan Quote Summary
                                    </CardTitle>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Including Fees</p>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                            <span className="font-bold text-slate-600">Loan Amount</span>
                                            <span className="font-black text-[#000428]">£{amount ? formatNumber(amount) : "0.00"}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-600">Mandatory Fees</span>
                                                {calculations && amount ? (
                                                    <span className="text-[10px] text-slate-400">
                                                        {((calculations.arrangementFee / amount) * 100).toFixed(2)}% of Loan Value
                                                    </span>
                                                ) : null}
                                            </div>
                                            <span className="font-black text-[#D946EF]">
                                                £{calculations ? formatNumber(calculations.arrangementFee) : "0.00"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                            <span className="font-bold text-slate-600">Total Loan Amount</span>
                                            <span className="font-black text-[#000428]">
                                                £{calculations ? formatNumber(calculations.totalLoanAmount) : "0.00"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                            <span className="font-bold text-slate-600">Loan Term</span>
                                            <span className="font-black text-brand-cyan">{months} Months</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                            <span className="font-bold text-slate-600">Monthly Payment</span>
                                            <span className="font-black text-[#000428]">
                                                £{calculations ? formatNumber(calculations.monthlyPayment) : "0.00"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                            <span className="font-bold text-slate-600">Total Interest</span>
                                            <span className="font-black text-brand-cyan">
                                                £{calculations ? formatNumber(calculations.totalInterest) : "0.00"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 bg-slate-50 rounded-lg px-2">
                                            <span className="font-bold text-brand-midnight uppercase">Total Payable</span>
                                            <span className="font-black text-xl text-[#000428]">
                                                £{calculations ? formatNumber(calculations.totalPayable) : "0.00"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Email Quote Dialog */}
                                    <Dialog open={isEmailOpen} onOpenChange={setIsEmailOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="w-full mt-4 border-2 border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-white font-bold transition-all">
                                                Get Quote by Email
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md bg-white rounded-2xl border-none shadow-2xl">
                                            <DialogHeader>
                                                <DialogTitle className="text-xl font-heading font-bold text-brand-midnight">
                                                    Email Your Quote
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Enter your email address to receive a detailed breakdown of this quote.
                                                </DialogDescription>
                                            </DialogHeader>

                                            {emailSent ? (
                                                <div className="py-6 text-center space-y-3">
                                                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9.135-12.75" />
                                                        </svg>
                                                    </div>
                                                    <p className="font-bold text-slate-700">Quote sent successfully!</p>
                                                    <p className="text-xs text-slate-500">Check your inbox for the PDF.</p>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSendEmail} className="space-y-4 py-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email" className="font-bold text-slate-700">Email Address</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            placeholder="you@company.com"
                                                            required
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="bg-slate-50 border-slate-200"
                                                        />
                                                    </div>
                                                    <Button id="send-quote-btn" type="submit" className="w-full bg-brand-cyan hover:bg-cyan-400 text-[#000428] font-bold">
                                                        Send Quote
                                                    </Button>
                                                </form>
                                            )}
                                        </DialogContent>
                                    </Dialog>

                                    <p className="text-[10px] text-slate-600 font-medium text-center leading-tight pt-2">
                                        Please note that our rate comparison tool only provides an indicative offer/estimate of the cost of a loan.
                                        These are conditional offers and not guaranteed.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Existing Detailed Breakdown */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="bg-white/80 backdrop-blur border border-white/40 shadow-xl rounded-2xl relative overflow-hidden">
                                <CardHeader>
                                    <CardTitle className="text-lg font-heading font-bold text-[#000428]">
                                        Rate Breakdown
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 relative z-10">
                                    {comparisonData ? comparisonData.map((item, i) => (
                                        <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100/50 last:border-0 hover:bg-slate-50/50 px-2 rounded-lg transition-colors">
                                            <span className="text-sm font-bold text-slate-500">{item.name}</span>
                                            <span className="text-sm font-black text-[#000428]">{item.value}</span>
                                        </div>
                                    )) : <p>No data</p>}
                                </CardContent>
                            </Card>
                        </motion.div>

                        <div className="relative p-6 rounded-2xl text-center space-y-4 overflow-hidden group">
                            {/* Background Gradient */}
                            <div className="absolute inset-0 bg-linear-to-br from-[#000428] via-[#0F172A] to-[#000428]" />
                            <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-10" />

                            <div className="relative z-10 space-y-4">
                                <h3 className="text-white font-bold text-xl">Ready to proceed?</h3>
                                <p className="text-slate-300 text-sm">Get your funding approved in as little as 24 hours.</p>
                                <Link href="/apply-now">
                                    <Button className="w-full bg-brand-cyan hover:bg-cyan-400 text-[#000428] font-bold py-6 rounded-xl text-lg transition-transform hover:-translate-y-1 shadow-[0_0_20px_rgba(28,181,224,0.3)] hover:shadow-[0_0_30px_rgba(28,181,224,0.5)]">
                                        Start Application
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}