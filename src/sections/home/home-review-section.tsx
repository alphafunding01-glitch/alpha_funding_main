import React from "react";
import {Card, CardContent} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {Star, Check} from "lucide-react";

const reviews = [
    {
        id: 1,
        title: "Making new business dreams come true",
        subtitle:
            "Helping a young entrepreneur to achieve his dream of setting up his first franchise restaurant.",
        name: "Robert Knowles",
        role: "Franchise Owner",
        achievements: [
            "£250k funding secured",
            "approval in 3 days",
        ],
        testimonial:
            "Alpha Funding went above and beyond on all fronts, and now my dream business has become a reality! Always available to discuss anything and have done their utmost to help achieve the goals set out to help launch my business.",
        rating: 5,
        trustpilot: true,
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
        id: 2,
        title: "Expanding retail operations nationwide",
        subtitle:
            "Supporting an established retailer to secure funding for multiple new store locations.",
        name: "Guy Lilley",
        role: "Retail Chain Owner",
        achievements: [
            "Approval in 1 week",
            "Favorable lending terms",
        ],
        testimonial:
            "The team's expertise in retail financing made all the difference. They understood our business model immediately and found the perfect funding solution for our expansion plans.",
        rating: 5,
        trustpilot: true,
        image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg",
    },
];

export default function HomeReviewSection() {
    return (
        <div className="flex flex-col pt-16 px-[4%] md:px-[6%]">
            <div className="flex gap-2 self-center text-center max-w-3xl flex-col">
                <h1 className="text-3xl font-bold">Empowering businesses to succeed</h1>
                <p className="text-muted-foreground">
                    Every business has a story — whether it’s a passion project, a side
                    hustle turned full-time, or a bold leap forward. We take care of the
                    finances so you can focus on doing what you do best.
                </p>
            </div>

            <Carousel className="w-full mx-auto mt-12">
                <CarouselContent>
                    {reviews.map((review) => (
                        <CarouselItem key={review.id} className="px-2 md:px-6">
                            <div
                                className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-10 text-white shadow-xl">
                                <Card className="rounded-2xl shadow-xl border-0 overflow-hidden">
                                    <CardContent className="p-8 space-y-6 bg-white">

                                        {/* Profile */}
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-900">
                                                    {review.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">{review.role}</p>
                                            </div>
                                        </div>

                                        {/* Testimonial */}
                                        <blockquote
                                            className="relative bg-gray-50 rounded-xl pt-8 pr-2 pb-2 md:p-6 text-gray-700 leading-relaxed">
                      <span className="absolute top-2 left-4 text-5xl text-primary/20 font-bold">
                        “
                      </span>
                                            <p className="pl-8 md:text-base text-xs">{review.testimonial}</p>
                                        </blockquote>

                                        {/* Achievements */}
                                        <div className="flex flex-wrap gap-2">
                                            {review.achievements.map((achievement, i) => (
                                                <span
                                                    key={i}
                                                    className="flex items-center gap-1 bg-primary/10 text-primary text-xs md:text-sm px-3 py-1.5 rounded-full font-medium"
                                                >
                          <Check className="w-3 h-3"/>
                                                    {achievement}
                        </span>
                                            ))}
                                        </div>

                                        {/* Rating + CTA */}
                                        <div
                                            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-gray-200">
                                            {/* Trustpilot */}
                                            <div className="flex items-center gap-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="w-4 h-4 fill-primary text-primary"
                                                    />
                                                ))}
                                                <span className="text-xs font-medium text-gray-600">
                          Trustpilot Excellent
                        </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation */}
                <div className="flex justify-center mt-8 gap-4">
                    <CarouselPrevious className="static transform-none"/>
                    <CarouselNext className="static transform-none"/>
                </div>
            </Carousel>
        </div>
    );
}
