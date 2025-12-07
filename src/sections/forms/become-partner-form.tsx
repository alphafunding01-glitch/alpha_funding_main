"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpRight } from "lucide-react";

const partnerFormSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    contactNo: z.string().min(5, "Contact number is required"),
    jobProfile: z.string().min(1, "Job profile is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

export default function BecomePartnerForm() {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof partnerFormSchema>>({
        resolver: zodResolver(partnerFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            contactNo: "",
            jobProfile: "",
            description: "",
        },
    });

    async function onSubmit(values: z.infer<typeof partnerFormSchema>) {
        setLoading(true);
        try {
            const res = await fetch("/api/sendPartnerMail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("✅ Partner form submitted successfully!");
                form.reset();
            } else {
                toast.error(data.error || "❌ Failed to submit. Please try again.");
            }
        } catch (error) {
            console.error("Partner form error:", error);
            toast.error("❌ Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild className="text-xs uppercase">
                <Button size="lg" className="md:w-[200px]">
                    Become a Partner <ArrowUpRight />
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[50vw]">
                <div>
                    <h2 className="text-2xl font-semibold text-[#101828]">
                        Become A Partner
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                        Alpha Funding’s partner and vendor finance programs give your customers
                        the flexibility to purchase what they need without the pressure of
                        upfront costs. Whether you’re a supplier, manufacturer, service
                        provider, or industry association, our tailored finance solutions
                        help you drive sales, improve client satisfaction, and fuel
                        long-term business growth.
                    </p>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="mt-6 space-y-4"
                        >
                            {/* First & Last Name */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                First Name <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="First Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Last Name <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Last Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Email & Contact */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="contactNo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Contact No. <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Contact Number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Job Profile */}
                            <FormField
                                control={form.control}
                                name="jobProfile"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Job Profile <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Job Profile" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Description <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Message" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit */}
                            <Button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-brand-purple hover:bg-[#7b5592] text-white"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
