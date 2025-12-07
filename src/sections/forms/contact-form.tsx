"use client"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import {
    Button
} from "@/components/ui/button"
import {
    useForm
} from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {
    Textarea
} from "@/components/ui/textarea"
import * as z from "zod"
import {Card, CardContent} from "@/components/ui/card";
import {PiCar, PiCaretRight} from "react-icons/pi";
import {useState} from "react";

export interface ActionResponse<T = any> {
    success: boolean
    message: string
    errors?: {
        [K in keyof T]?: string[]
    }
    inputs?: T
}

export const formSchema = z.object({
    "first_name": z.string(),
    "middle_names": z.string().optional(),
    "sur_name": z.string(),
    "email": z.string(),
    "contact": z.string(),
    "company_name": z.string(),
    "job_title": z.string().min(1),
    "website_link": z.string().optional(),
    "message": z.string().optional()
});

const initialState = {
    success: false,
    message: "",
}

export function ContactForm() {
    const [status, setStatus] = useState<{ type: "success" | "error" | ""; msg: string }>({type: "", msg: ""});
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            setStatus({type: "", msg: ""})

            const res = await fetch("/api/sendContactMail", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            })

            const data = await res.json()

            if (res.ok && data.success) {
                setLoading(false);
                setStatus({type: "success", msg: "✅ Form submitted successfully!"})
                form.reset()
            } else {
                setLoading(false);
                setStatus({type: "error", msg: data.error || "❌ Something went wrong."})
            }
        } catch (error: any) {
            setLoading(false);
            setStatus({type: "error", msg: "❌ Failed to send. Please try again."})
            console.error("Submit error:", error)
        }
        setLoading(false);
    }

    return (
        <div className={"pt-20 w-full pb-20"}>
            <Form {...form}>
                <Card>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                              className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md gap-4">
                            <div className="flex items-center justify-between flex-wrap sm:flex-nowrap w-full !gap-3">
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({field}) => (
                                        <FormItem className="w-full">
                                            <FormLabel>First Name *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder=""
                                                    type={"undefined"}
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        field.onChange(val);
                                                    }}
                                                />
                                            </FormControl>

                                            <FormMessage/>
                                        </FormItem>
                                    )
                                    }
                                /><FormField
                                control={form.control}
                                name="middle_names"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Middle Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                type={"undefined"}
                                                value={field.value}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    field.onChange(val);
                                                }}
                                            />
                                        </FormControl>

                                        <FormMessage/>
                                    </FormItem>
                                )
                                }
                            />
                            </div>
                            <FormField
                                control={form.control}
                                name="sur_name"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Surname *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your text"
                                                type={"undefined"}
                                                value={field.value}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    field.onChange(val);
                                                }}
                                            />
                                        </FormControl>

                                        <FormMessage/>
                                    </FormItem>
                                )
                                }
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Business Email*</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                type={"undefined"}
                                                value={field.value}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    field.onChange(val);
                                                }}
                                            />
                                        </FormControl>

                                        <FormMessage/>
                                    </FormItem>
                                )
                                }
                            />
                            <FormField
                                control={form.control}
                                name="contact"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Contact Number*</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                type={"undefined"}
                                                value={field.value}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    field.onChange(val);
                                                }}
                                            />
                                        </FormControl>

                                        <FormMessage/>
                                    </FormItem>
                                )
                                }
                            />
                            <FormField
                                control={form.control}
                                name="company_name"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Company Name*</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                type={"undefined"}
                                                value={field.value}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    field.onChange(val);
                                                }}
                                            />
                                        </FormControl>

                                        <FormMessage/>
                                    </FormItem>
                                )
                                }
                            />

                            <FormField
                                control={form.control}
                                name="job_title"
                                render={({field}) => {
                                    const options = [
                                        {value: 'director', label: 'Director'},
                                        {value: 'director_shareholder', label: 'Director & Shareholder'},
                                        {value: 'shareholder', label: 'Shareholder'},
                                        {value: 'non_executive_director', label: 'Non Executive Director'},
                                        {value: 'sole_trader_proprietor', label: 'Sole Trader Proprietor'},
                                        {value: 'Partner', label: 'Partner'},
                                        {value: 'other', label: 'Other'},
                                    ]
                                    return (
                                        <FormItem>
                                            <FormLabel>Job Title*</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className={"w-full"}>
                                                        <SelectValue placeholder=""/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {options.map(({label, value}) => (
                                                        <SelectItem key={value} value={value}>
                                                            {label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <FormMessage/>
                                        </FormItem>
                                    )
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="website_link"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Website Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                type={"undefined"}
                                                value={field.value}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    field.onChange(val);
                                                }}
                                            />
                                        </FormControl>

                                        <FormMessage/>
                                    </FormItem>
                                )
                                }
                            />

                            <FormField
                                control={form.control}
                                name="message"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder=""
                                                className="resize-none"
                                            />
                                        </FormControl>

                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end items-center w-full pt-3">
                                <Button disabled={loading} size="lg">
                                    Submit <PiCaretRight/>
                                </Button>
                            </div>
                            {/* ✅ Status Message */}
                            {status.msg && (
                                <p
                                    className={`text-sm mt-2 ${
                                        status.type === "success" ? "text-green-600" : "text-red-600"
                                    }`}
                                >
                                    {status.msg}
                                </p>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </Form>
        </div>
    )
}