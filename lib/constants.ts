export type EventItem = {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

export const events: EventItem[] = [
    {
        title: "Next.js Conf 2026",
        image: "/images/event1.png",
        slug: "nextjs-conf-2026",
        location: "San Francisco, CA",
        date: "2026-10-25",
        time: "09:00 AM",
    },
    {
        title: "React Summit",
        image: "/images/event2.png",
        slug: "react-summit",
        location: "Amsterdam, Netherlands",
        date: "2026-06-12",
        time: "10:00 AM",
    },
    {
        title: "Web Performance Workshop",
        image: "/images/event3.png",
        slug: "web-perf-workshop",
        location: "Online",
        date: "2026-09-15",
        time: "02:00 PM",
    },
    {
        title: "AI in Frontend Summit",
        image: "/images/event4.png",
        slug: "ai-frontend-summit",
        location: "New York, NY",
        date: "2026-11-05",
        time: "09:30 AM",
    },
    {
        title: "GraphQL Galaxy",
        image: "/images/event5.png",
        slug: "graphql-galaxy",
        location: "Berlin, Germany",
        date: "2026-12-10",
        time: "11:00 AM",
    },
    {
        title: "TypeScript Congress",
        image: "/images/event6.png",
        slug: "typescript-congress",
        location: "London, UK",
        date: "2027-01-20",
        time: "09:00 AM",
    }
];
