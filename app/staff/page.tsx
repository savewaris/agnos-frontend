"use client";

import dynamic from "next/dynamic";

const StaffDashboard = dynamic(() => import("@/components/features/StaffDashboard"), {
    ssr: false,
});

export default function StaffPage() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 transition-colors duration-300">
            <StaffDashboard />
        </div>
    );
}
