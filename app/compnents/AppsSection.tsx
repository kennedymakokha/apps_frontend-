'use client'

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Link from "next/link";

const apps = [
    { name: "Dashboard", icon: "📊" },
    { name: "QR Code Generator", icon: "🔳", href: "/QR-code-generator" },
    { name: "Project Manager", icon: "🗂️" },
    { name: "Invoice Generator", icon: "🧾" },
    { name: "Real-Time Chat", icon: "💬" },
    { name: "Scheduling Tool", icon: "📅" },
    { name: "Form Builder", icon: "📝" },
];

export default function AppsSection() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleClick = (href?: string) => {
        if (!href) return; // Prevent navigating if no href
        startTransition(() => {
            router.push(href);
        });
    };

    return (
        <section className="py-16 bg-slate-200 text-slate-800 px-6">
            <h2 className="text-3xl font-bold text-center mb-10">Explore Our Apps</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
                {apps.map((app, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(app.href)}
                        className={`bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center hover:scale-[1.03] cursor-pointer ${
                            app.href ? "" : "opacity-50 cursor-not-allowed"
                        }`}
                    >
                        <div className="text-4xl mb-2">{app.icon}</div>
                        <h3 className="font-semibold text-lg">{app.name}</h3>
                        <p className="text-gray-500 mt-2 text-sm">
                            {app.href ? "Click to open the app." : "Coming soon..."}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
