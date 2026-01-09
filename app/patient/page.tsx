"use client";

import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with socket.io on the client
const PatientForm = dynamic(() => import("@/components/features/PatientForm"), {
    ssr: false,
});

export default function PatientPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
            <PatientForm />
        </div>
    );
}
