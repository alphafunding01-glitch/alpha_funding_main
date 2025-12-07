"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const decision = localStorage.getItem("cookieConsent");
        if (!decision) {
            setTimeout(() => setVisible(true), 1000); // delay before showing
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", "declined");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            className="fixed bottom-5 left-5 max-w-sm p-4 bg-white shadow-lg rounded-2xl border border-gray-200 animate-slide-in"
        >
            <p className="text-sm text-gray-700">
                We use cookies to improve your experience. By continuing, you agree to
                our cookie policy.
            </p>
            <div className="flex gap-2 mt-4">
                <Button size="sm" onClick={handleAccept}>
                    Accept
                </Button>
                <Button size="sm" variant="outline" onClick={handleDecline}>
                    Decline
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
                    Read Policy
                </Button>
            </div>

            {/* Cookie Policy Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Cookie Policy</DialogTitle>
                        <DialogDescription>
                            Our website uses cookies to personalize content, enhance site
                            navigation, analyze usage, and assist in our marketing efforts.
                            You can choose to accept or decline cookies. For more information,
                            review this generic cookie policy.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
