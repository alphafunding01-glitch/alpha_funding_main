import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


export default function ContactFormDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild className={"text-xs uppercase"}>
                <Button variant={"ghost"} className={"text-xs text-white hover:text-white"}>
                    Contact Us
                </Button>
            </DialogTrigger>
            <DialogContent className={"min-w-[80vw]"}>
                <div className="grid md:grid-cols-2 gap-8 p-6">
                    {/* Left Side - Contact Form */}
                    <div>
                        <h2 className="text-2xl font-semibold text-[#101828]">Contact Us</h2>
                        <p className="text-sm text-gray-600 mt-2">
                            We are deeply committed to delivering unparalleled service and unwavering support to ensure
                            your experience exceeds expectations.
                        </p>

                        <form className="mt-6 space-y-4">
                            {/* First & Last Name */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className={"flex flex-col gap-1.5"}>
                                    <Label htmlFor="firstName">
                                        First Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input id="firstName" placeholder="First Name" />
                                </div>
                                <div className={"flex flex-col gap-1.5"}>
                                    <Label htmlFor="lastName">
                                        Last Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input id="lastName" placeholder="Last Name" />
                                </div>
                            </div>

                            {/* Email */}
                            <div className={"flex gap-3"}>
                                <div className={"flex w-full flex-col gap-1.5"}>
                                    <Label htmlFor="email">
                                        Email <span className="text-red-500">*</span>
                                    </Label>
                                    <Input id="email" placeholder="Email" />
                                </div>
                                <div className={"flex w-full flex-col gap-1.5"}>
                                    <Label htmlFor="company">
                                        Company Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input id="company" placeholder="Company Name" />
                                </div>
                            </div>

                            {/* Description */}
                            <div className={"flex flex-col gap-1.5"}>
                                <Label htmlFor="description">
                                    Description <span className="text-red-500">*</span>
                                </Label>
                                <Textarea id="description" placeholder="Message" />
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="w-full bg-brand-purple hover:bg-[#7b5592] text-white"
                            >
                                Submit
                            </Button>
                        </form>
                    </div>

                    {/* Right Side - Contact Info */}
                    <div className="space-y-4">
                        {/* Address */}
                        <div className="bg-brand-purple text-white p-4 rounded-lg">
                            <h3 className="font-semibold">London Office</h3>
                            <p className="text-sm">307 Euston Road, London NW1 3AD</p>
                            <h3 className="font-semibold mt-2">Wirral Office</h3>
                            <p className="text-sm">Commerce House, Campbeltown Rd, Tranmere, Wirral, CH41 9HP</p>
                        </div>

                        {/* Contact */}
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-semibold">Contact</h3>
                            <p className="text-sm text-gray-600">Talk to us and see how we can work</p>
                            <p className="text-sm font-medium">020 7078 7446</p>
                        </div>

                        {/* Email */}
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-semibold">Email</h3>
                            <p className="text-sm text-gray-600">We're usually replying within 24 hours</p>
                            <p className="text-sm font-medium">contact@alpha-funding.co.uk</p>
                        </div>

                        {/* Working Hours */}
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-semibold">Working Hours</h3>
                            <p className="text-sm">Mon To fri - 10 am To 7 pm</p>
                            <p className="text-sm">Sunday - 11 am To 5 pm</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}