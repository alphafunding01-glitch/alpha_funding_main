"use client"
import {
    useState
} from "react"
import {
    toast
} from "sonner"
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import {
    z
} from "zod"
import {
    cn
} from "@/lib/utils"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import {
    Checkbox
} from "@/components/ui/checkbox"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const formSchema = z.object({
    company_name: z.string().min(1),
    if_not_company: z.boolean().default(true).optional(),
    borrow_amount: z.string(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    contact_number: z.string().min(1),
    email_address: z.string(),
    privacy_policy: z.boolean().refine(val => val === true, {
        message: "You must accept the privacy policy"
    }),
    terms_of_business: z.boolean().refine(val => val === true, {
        message: "You must accept the terms of business"
    })
});

export default function CheckEligibilityForm() {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            privacy_policy: false,
            terms_of_business: false
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            const res = await fetch("/api/sendEnquiryMail", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("✅ Form submitted successfully!");
                form.reset();
                setLoading(false);
            } else {
                toast.error(data.error || "❌ Something went wrong. Please try again.");
                setLoading(false)
            }
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("❌ Failed to submit the form. Please try again.");
            setLoading(false)
        }
    }

    return (
        <Card className={"w-full"}>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto">

                        <FormField
                            control={form.control}
                            name="company_name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""

                                            type="text"
                                            {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="if_not_company"
                            render={({field}) => (
                                <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}

                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Tick here if not a Company</FormLabel>

                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="borrow_amount"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>How much would you like to borrow?</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""

                                            type="number"
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>£10,000 minimum</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-12 gap-4">

                            <div className="col-span-6">

                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder=""

                                                    type="text"
                                                    {...field} />
                                            </FormControl>

                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="col-span-6">

                                <FormField
                                    control={form.control}
                                    name="last_name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder=""

                                                    type="text"
                                                    {...field} />
                                            </FormControl>

                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                        </div>

                        <FormField
                            control={form.control}
                            name="contact_number"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Contact Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""

                                            type="text"
                                            {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email_address"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""

                                            type="email"
                                            {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="privacy_policy"
                            render={({field}) => (
                                <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={!!field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Read & accept the privacy policy</FormLabel>
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="terms_of_business"
                            render={({field}) => (
                                <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={!!field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Read & accept terms of business</FormLabel>
                                        <FormMessage/>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <p className={"text-xs text-muted-foreground"}>
                            Alpha Funding Business Finance is committed to protecting and respecting your privacy, and we’ll
                            only use your personal information to administer your account and to provide the products
                            and services you requested from us. From time to time, we would like to contact you about
                            our products and services, as well as other content that may be of interest to you. If you
                            consent to us contacting you for this purpose, please tick below to say how you would like
                            us to contact you:
                        </p>
                        <Button disabled={loading} type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}