import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { PatientFormData } from "@/lib/validation";
import { clsx } from "clsx";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

let socket: any;

type PatientStatus = "filling" | "details_submitted" | "inactive";

interface PatientEntry {
    id: string; // socket id
    formId?: string; // unique form session id
    data: Partial<PatientFormData>;
    status: PatientStatus;
    lastUpdated: Date;
}

export default function StaffDashboard() {
    const { t } = useLanguage();
    const [patients, setPatients] = useState<Record<string, PatientEntry>>({});

    useEffect(() => {
        socket = io();

        socket.on("connect", () => {
            console.log("Staff connected");
            socket.emit("join_room", "staff");
        });

        socket.on("staff_update", (payload: { id: string, status: PatientStatus, data: Partial<PatientFormData>, formId?: string }) => {
            const key = payload.formId || payload.id;
            setPatients(prev => ({
                ...prev,
                [key]: {
                    id: payload.id,
                    formId: payload.formId,
                    status: payload.status,
                    data: payload.data,
                    lastUpdated: new Date()
                }
            }));
        });

        socket.on("staff_submission", (payload: { id: string, data: PatientFormData, formId?: string }) => {
            console.log("Received submission:", payload);
            const key = payload.formId || payload.id;

            setPatients(prev => {
                const existing = prev[key]?.data || {};
                return {
                    ...prev,
                    [key]: {
                        id: payload.id,
                        formId: payload.formId,
                        status: "details_submitted",
                        data: { ...existing, ...payload.data },
                        lastUpdated: new Date()
                    }
                };
            });
        });

        return () => {
            if (socket) socket.disconnect();
        };
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white transition-colors">{t.staff.title}</h1>
                <div className="flex gap-3">
                    <Link href="/" className="px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 text-sm font-medium transition">
                        {t.staff.backHome}
                    </Link>
                    <Link href="/patient" target="_blank" className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 text-sm font-medium transition">
                        {t.staff.openForm}
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(patients).length === 0 && (
                    <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-20 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 transition-colors">
                        {t.staff.waiting}
                    </div>
                )}

                {Object.values(patients)
                    .sort((a, b) => {
                        // Priority 1: Status "filling" comes first
                        if (a.status === "filling" && b.status !== "filling") return -1;
                        if (a.status !== "filling" && b.status === "filling") return 1;

                        // Priority 2: Newest first (descending by lastUpdated)
                        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
                    })
                    .map((patient) => (
                        <div key={patient.formId || patient.id} className={clsx(
                            "p-4 rounded-xl shadow-sm border-2 transition-all relative text-gray-900 dark:text-gray-100",
                            "bg-[var(--card-bg)] text-[var(--card-text)]",
                            patient.status === "filling"
                                ? "border-blue-400 dark:border-blue-700"
                                : "border-green-500 dark:border-green-700"
                        )}>
                            <div className="flex justify-between items-start mb-4">
                                <span className={clsx(
                                    "px-2 py-1 text-xs font-bold uppercase rounded-full",
                                    patient.status === "filling"
                                        ? "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                                        : "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-100"
                                )}>
                                    {patient.status === "filling" ? t.staff.filling : t.staff.submitted}
                                </span>
                                <div className="text-right">
                                    <span className="block text-xs text-gray-600 dark:text-gray-400 font-medium mb-1">
                                        {t.staff.id}: {(patient.formId || patient.id).slice(0, 4).toUpperCase()}
                                    </span>
                                    <span className="block text-[10px] text-gray-500 dark:text-gray-500">
                                        {new Date(patient.lastUpdated).toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-gray-900 dark:text-gray-200">
                                <p><span className="font-semibold">{t.staff.name}:</span> {patient.data.firstName} {patient.data.lastName}</p>
                                <p><span className="font-semibold">{t.staff.phone}:</span> {patient.data.phone || '-'}</p>
                                <p><span className="font-semibold">{t.staff.email}:</span> {patient.data.email || '-'}</p>

                                {/* Progress Indicator Visualization */}
                                <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-700">
                                    <p className="text-xs text-gray-700 dark:text-gray-400 font-semibold mb-1">{t.staff.livePreview}</p>
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-gray-800 dark:text-gray-300">
                                        <div>{t.staff.gender}: {patient.data.gender}</div>
                                        <div>{t.staff.dob}: {patient.data.birthDate}</div>
                                        <div className="col-span-2 truncate">{t.staff.addr}: {patient.data.address}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
