"use client";

import React from "react";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa"; // You might need to install react-icons if not present, checking package.json
// If react-icons is not available, I will use a Lucide alternative or SVG.
// Checking package.json... "react-icons": "^5.5.0" is present.

export default function FloatingContactButtons() {
    const phoneNumber = "020 7078 7446";
    const whatsappNumber = "447366917038"; // Assuming same for now, or I'll check for a mobile number.
    // Often landlines don't have WA. I'll stick to the one I found or a generic one if not found.
    // Actually, I'll search for "whatsapp" first to see if there is a specific one.

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
            {/* WhatsApp Button */}
            <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center shadow-lg hover:shadow-[#25D366]/40 transition-all hover:scale-110 group"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp className="w-8 h-8 text-white" />
                <span className="absolute left-full ml-3 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    WhatsApp Us
                </span>
            </a>

            {/* Phone Button */}
            <a
                href={`tel:${phoneNumber}`}
                className="w-14 h-14 bg-[#1CB5E0] hover:bg-[#159cc2] rounded-full flex items-center justify-center shadow-lg hover:shadow-[#1CB5E0]/40 transition-all hover:scale-110 group"
                aria-label="Call Us"
            >
                <Phone className="w-6 h-6 text-white" />
                <span className="absolute left-full ml-3 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Call Us
                </span>
            </a>
        </div>
    );
}
