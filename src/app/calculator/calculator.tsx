"use client";

import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button, buttonVariants} from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent, CardFooter,
} from "@/components/ui/card";
import {Slider} from "@/components/ui/slider";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";
import {motion} from "framer-motion";

type RateType =
    | "Annual Interest Rate"
    | "Monthly Interest Rate"
    | "Daily Interest Rate"
    | "Yield"
    | "Factor Rate"
    | "Flat Rate";

interface CalculationResult {
    annualRate: number;
    monthlyRate: number;
    dailyRate: number;
    yieldRate: number;
    factorRate: number;
    flatRate: number;
    mandatoryFees: number;
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
    const [hasFees, setHasFees] = useState("No");
    const [feePercentage, setFeePercentage] = useState<number | null>(0);
    const [fixedFee, setFixedFee] = useState<number | null>(0);

    const calculateRates = (): CalculationResult | null => {
        if (!amount || !months || !rateValue) return null;

        let annualRate = 0;
        let totalPayable = 0;
        let monthlyPayment = 0;
        let totalInterest = 0;

        // Calculate fees first
        let mandatoryFees = 0;
        if (hasFees === "Yes (as a percentage of the loan)" && feePercentage) {
            mandatoryFees = amount * (feePercentage / 100);
        } else if (hasFees === "Yes (as fixed costs)" && fixedFee) {
            mandatoryFees = fixedFee;
        }

        const totalLoanAmount = amount + mandatoryFees;
        const termInYears = months / 12;

        // Calculate based on the input rate type
        switch (rateType) {
            case "Annual Interest Rate":
                annualRate = rateValue;
                // Use compound interest formula for monthly payments
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
                const effectiveMonthlyRate = Math.pow(1 + dailyRate, 30.44) - 1; // Average days per month
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
                // Yield is the total interest as a percentage of loan amount over the term
                const yieldDecimal = rateValue / 100;
                annualRate = (yieldDecimal / termInYears) * 100;
                totalInterest = totalLoanAmount * yieldDecimal;
                totalPayable = totalLoanAmount + totalInterest;
                monthlyPayment = totalPayable / months;
                break;

            case "Factor Rate":
                // Factor rate: multiply loan amount by factor to get total repayable
                totalPayable = totalLoanAmount * rateValue;
                totalInterest = totalPayable - totalLoanAmount;
                monthlyPayment = totalPayable / months;
                annualRate = ((rateValue - 1) / termInYears) * 100;
                break;

            case "Flat Rate":
                // Flat rate: simple interest calculation
                const flatTermInYears = months / 12;
                totalInterest = totalLoanAmount * (rateValue / 100) * flatTermInYears;
                totalPayable = totalLoanAmount + totalInterest;
                monthlyPayment = totalPayable / months;
                // Convert flat rate to equivalent annual rate
                // Flat rate equivalent annual = (Total Interest / Principal) / Term in years
                annualRate = (totalInterest / totalLoanAmount) / flatTermInYears * 100;
                break;
        }

        // Calculate all rate conversions based on the calculated annual rate
        const monthlyRate = annualRate / 12;
        const dailyRate = annualRate / 365;
        const finalTermInYears = months / 12;
        const yieldRate = (totalInterest / totalLoanAmount) * 100;
        const factorRate = totalPayable / totalLoanAmount;

// For flat rate conversion: if input was flat rate, use the input value
// Otherwise convert from annual rate
        const flatRate = rateType === "Flat Rate" ? rateValue : annualRate / 2;

        return {
            annualRate,
            monthlyRate,
            dailyRate,
            yieldRate,
            factorRate,
            flatRate,
            mandatoryFees,
            totalLoanAmount,
            totalInterest,
            totalPayable,
            monthlyPayment,
        };
    };

    const calculations = calculateRates();

    const chartData =
        calculations && amount
            ? [
                {name: "Loan Amount", value: amount, color: "#9166aa"},
                {
                    name: "Total Interest",
                    value: calculations.totalInterest,
                    color: "#62c1a5",
                },
                {
                    name: "Mandatory Fees",
                    value: calculations.mandatoryFees,
                    color: "#f59e0b",
                },
            ].filter((item) => item.value > 0)
            : [];

    const comparisonData =
        calculations && [
            {
                name: "Annual Interest Rate",
                value: calculations.annualRate.toFixed(2) + "%",
            },
            {
                name: "Monthly Interest Rate",
                value: calculations.monthlyRate.toFixed(3) + "%",
            },
            {
                name: "Daily Interest Rate",
                value: calculations.dailyRate.toFixed(4) + "%",
            },
            {name: "Yield / Interest as a % of Loan", value: calculations.yieldRate.toFixed(3) + "%"},
            {name: "Factor Rate", value: calculations.factorRate.toFixed(4)},
            {name: "Flat Rate", value: calculations.flatRate.toFixed(1) + "%"},
        ];

    const formatNumber = (value: number) => value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Business Loan Calculator
                </h1>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Left - Input Form */}
                    <Card className="shadow-xl rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-primary">
                                Add Your Quote Details
                            </CardTitle>
                            <p className="text-sm text-gray-600">
                                Enter your loan terms below to compare costs based on interest rate,
                                yield and factor rate.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Loan Amount */}
                            <div>
                                <label className="text-sm font-medium">Loan Amount</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-lg">£</span>
                                    <Input
                                        type="number"
                                        value={amount ?? ""}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        min={1000}
                                        max={2000000}
                                    />
                                </div>
                            </div>

                            {/* Months slider */}
                            <div>
                                <label className="text-sm font-medium">
                                    Loan Term: {months ?? 0} months
                                </label>
                                <Slider
                                    value={[months ?? 1]}
                                    min={1}
                                    max={120}
                                    step={1}
                                    onValueChange={(v) => setMonths(v[0])}
                                    className="mt-2"
                                />
                            </div>

                            {/* Rate Type */}
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    The quote I have received is based on
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        "Annual Interest Rate",
                                        "Monthly Interest Rate",
                                        "Daily Interest Rate",
                                        "Yield",
                                        "Factor Rate",
                                        "Flat Rate",
                                    ].map((type) => (
                                        <Button
                                            key={type}
                                            variant={rateType === type ? "default" : "outline"}
                                            size="sm"
                                            className={`text-xs ${
                                                rateType === type
                                                    ? "bg-primary text-white"
                                                    : "hover:bg-blue-100"
                                            }`}
                                            onClick={() => {
                                                setRateType(type as RateType)
                                                if (type == "Annual Interest Rate") {
                                                    setRateValue(30)
                                                } else if (type == "Daily Interest Rate") {
                                                    setRateValue(0.0822)
                                                } else if (type == "Monthly Interest Rate") {
                                                    setRateValue(2.500)
                                                } else if (type == "Yield") {
                                                    setRateValue(25.406)
                                                } else if (type == "Factor Rate") {
                                                    setRateValue(1.2541)
                                                } else if (type == "Flat Rate") {
                                                    setRateValue(16.9)
                                                }
                                            }}
                                        >
                                            {type}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Rate Value */}
                            <div>
                                <label className="text-sm font-medium">Rate Value</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <Input
                                        type="number"
                                        value={rateValue ?? ""}
                                        onChange={(e) => setRateValue(Number(e.target.value))}
                                        step={0.01}
                                        min={0.01}
                                        max={95}
                                    />
                                    <span className="text-sm">
                                        {rateType === "Factor Rate" ? "" : "%"}
                                    </span>
                                </div>
                            </div>

                            {/* Mandatory Fees */}
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Has the company added any mandatory fees?
                                </label>
                                <div className="space-y-2">
                                    {[
                                        "No",
                                        "Yes (as a percentage of the loan)",
                                        "Yes (as fixed costs)",
                                    ].map((option) => (
                                        <label key={option} className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                value={option}
                                                checked={hasFees === option}
                                                onChange={(e) => setHasFees(e.target.value)}
                                                className="text-blue-600"
                                            />
                                            <span className="text-sm">{option}</span>
                                        </label>
                                    ))}
                                </div>

                                {hasFees === "Yes (as a percentage of the loan)" && (
                                    <div className="mt-2">
                                        <Input
                                            type="number"
                                            value={feePercentage ?? ""}
                                            onChange={(e) => setFeePercentage(Number(e.target.value))}
                                            placeholder="Fee percentage"
                                            step={0.1}
                                        />
                                    </div>
                                )}

                                {hasFees === "Yes (as fixed costs)" && (
                                    <div className="mt-2">
                                        <Input
                                            type="number"
                                            value={fixedFee ?? ""}
                                            onChange={(e) => setFixedFee(Number(e.target.value))}
                                            placeholder="Fixed fee amount (£)"
                                        />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Middle - Chart */}
                    <Card className="shadow-xl rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Loan Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {calculations ? (
                                <>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={chartData}
                                                    innerRadius={60}
                                                    outerRadius={100}
                                                    paddingAngle={2}
                                                    dataKey="value"
                                                    cx="50%"
                                                    cy="50%"
                                                >
                                                    {chartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color}/>
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    formatter={(val: number) => `£${val.toLocaleString()}`}
                                                />
                                                <Legend/>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="mt-4 space-y-3">
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <p className="text-sm font-medium text-green-800">
                                                TOTAL PAYABLE
                                            </p>
                                            <p className="text-2xl font-bold text-green-600">
                                                £{formatNumber(calculations.totalPayable).toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                                            <p className="text-sm font-medium text-blue-800">
                                                MONTHLY PAYMENT
                                            </p>
                                            <p className="text-xl font-bold text-blue-600">
                                                £{formatNumber(calculations.monthlyPayment).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    Enter loan details to see breakdown.
                                </p>
                            )}
                            <p className={"text-xs text-gray-500 mt-4"}>
                                Disclaimer – The calculators on this website are being provided for educational purposes only. The
                                results are estimates based on information you provide and may not reflect actual results. The
                                results of the calculations are not a promise or guarantee of a customer’s eligibility or terms for
                                a specific product or service.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Right - Summary */}
                    <div className="space-y-6">
                        {/* Rate Comparison */}
                        <Card className="shadow-xl rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">
                                    See How Your Quote Translates
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {comparisonData ? (
                                    <div className="space-y-3">
                                        <h4 className="font-bold text-sm">
                                            Your Loan Quote Comparison (Excluding Fees)
                                        </h4>
                                        {comparisonData.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between py-2 border-b border-gray-100"
                                            >
                                                <span className="text-sm font-medium">{item.name}</span>
                                                <span className="text-sm font-bold">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No comparison available.</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Loan Summary */}
                        <Card className="shadow-xl rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">
                                    Your Loan Quote Summary (Including Fees)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {calculations ? (
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm">Loan Amount</span>
                                            <span className="font-bold">
                                                £{amount?.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Mandatory Fees</span>
                                            <div className="text-right">
                                                <div className="font-bold">
                                                    £{calculations.mandatoryFees.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {(
                                                        (calculations.mandatoryFees / (amount ?? 1)) *
                                                        100
                                                    ).toFixed(2)}
                                                    % of Loan Value
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between border-t pt-2">
                                            <span className="text-sm">Total Loan Amount</span>
                                            <span className="font-bold">
                                                £{calculations.totalLoanAmount.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Loan Term</span>
                                            <span className="font-bold">{months} Months</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Monthly Payment Amount</span>
                                            <span className="font-bold">
                                                £{formatNumber(calculations.monthlyPayment).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Total Interest Amount</span>
                                            <span className="font-bold">
                                                £{formatNumber(calculations.totalInterest).toLocaleString()}
                                            </span>
                                        </div>
                                        <div
                                            className="flex justify-between border-t pt-3 mt-3 bg-green-50 p-3 rounded">
                                            <span className="font-bold">Total Payable</span>
                                            <span className="text-xl font-bold text-green-600">
                                                £{formatNumber(calculations.totalPayable).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">Enter values to see summary.</p>
                                )}
                            </CardContent>
                            <CardFooter>
                                <button
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                    Apply Now
                                </button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}