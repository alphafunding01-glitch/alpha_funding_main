"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalyticsConsent() {
    const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

    useEffect(() => {
        function checkConsent() {
            try {
                const saved = localStorage.getItem("alpha-cookie-consent");
                if (saved) {
                    const prefs = JSON.parse(saved);
                    setAnalyticsAllowed(!!prefs.analytics);
                }
            } catch {
                // ignore malformed storage
            }
        }

        checkConsent();
        window.addEventListener("cookie-consent-updated", checkConsent);
        return () => window.removeEventListener("cookie-consent-updated", checkConsent);
    }, []);

    if (!GA_ID || !analyticsAllowed) return null;

    return <GoogleAnalytics gaId={GA_ID} />;
}
