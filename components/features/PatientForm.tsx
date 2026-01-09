"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema, PatientFormData } from "@/lib/validation";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { io } from "socket.io-client";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

let socket: any;

export default function PatientForm() {
    const { t } = useLanguage();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formId, setFormId] = useState("");

    useEffect(() => {
        setFormId(Math.random().toString(36).substr(2, 9));
    }, []);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<PatientFormData>({
        resolver: zodResolver(patientSchema),
    });

    // Watch all fields to broadcast updates
    const formData = watch();

    useEffect(() => {
        socket = io();

        socket.on("connect", () => {
            console.log("Connected to server");
            socket.emit("join_room", "patient");
        });

        return () => {
            if (socket) socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket && !isSubmitted && formId) {
            socket.emit("patient_update", {
                status: "filling",
                data: formData,
                formId
            });
        }
    }, [formData, isSubmitted, formId]);

    const onSubmit = (data: PatientFormData) => {
        console.log("Submitting:", data);
        if (socket && formId) {
            socket.emit("patient_submit", { data, formId });
        }
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="max-w-xl mx-auto p-10 bg-white dark:bg-gray-800 shadow-lg rounded-xl my-20 text-center animate-fade-in transition-colors">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="w-24 h-24 text-green-500 animate-bounce" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{t.patient.successTitle}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    {t.patient.successDesc}
                </p>
                <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 mb-8">
                    <span className="font-semibold">{t.staff.status}:</span> {t.patient.status}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/" className="px-6 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition">
                        {t.patient.goHome}
                    </Link>
                    <button
                        onClick={() => {
                            setIsSubmitted(false);
                            reset();
                            setFormId(Math.random().toString(36).substr(2, 9));
                        }}
                        className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                    >
                        {t.patient.submitAnother}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto my-10 px-4">
            <div className="p-6 bg-[var(--card-bg)] shadow-lg rounded-xl transition-colors">
                <h1 className="text-2xl font-bold mb-6 text-[var(--card-text)]">{t.patient.title}</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label={t.patient.firstName} {...register("firstName")} error={errors.firstName?.message} required />
                        <Input label={t.patient.middleName} {...register("middleName")} error={errors.middleName?.message} />
                        <Input label={t.patient.lastName} {...register("lastName")} error={errors.lastName?.message} required />
                        <Input type="date" label={t.patient.dob} {...register("birthDate")} error={errors.birthDate?.message} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                            label={t.patient.gender}
                            {...register("gender")}
                            error={errors.gender?.message}
                            required
                            options={[
                                { label: t.options.gender.male, value: "Male" },
                                { label: t.options.gender.female, value: "Female" },
                                { label: t.options.gender.other, value: "Other" },
                            ]}
                        />
                        <Input label={t.patient.phone} {...register("phone")} error={errors.phone?.message} placeholder="+1234567890" required />
                    </div>

                    <Input label={t.patient.email} type="email" {...register("email")} error={errors.email?.message} required />
                    <Input label={t.patient.address} {...register("address")} error={errors.address?.message} required />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                            label={t.patient.language}
                            {...register("preferredLanguage")}
                            error={errors.preferredLanguage?.message}
                            required
                            options={[
                                { label: t.options.language.english, value: "English" },
                                { label: t.options.language.spanish, value: "Spanish" },
                                { label: t.options.language.french, value: "French" },
                                { label: t.options.language.thai, value: "Thai" },
                                { label: t.options.language.chinese, value: "Chinese" },
                                { label: t.options.language.other, value: "Other" },
                            ]}
                        />
                        <Select
                            label={t.patient.nationality}
                            {...register("nationality")}
                            error={errors.nationality?.message}
                            required
                            options={[
                                { label: t.options.nationality.thai, value: "Thai" },
                                { label: t.options.nationality.american, value: "American" },
                                { label: t.options.nationality.british, value: "British" },
                                { label: t.options.nationality.chinese, value: "Chinese" },
                                { label: t.options.nationality.other, value: "Other" },
                            ]}
                        />
                    </div>

                    <div className="border-t pt-4 mt-4 dark:border-gray-700">
                        <h2 className="text-lg font-semibold mb-3 text-[var(--card-text)]">{t.patient.emergency}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label={t.patient.name} {...register("emergencyContactName")} error={errors.emergencyContactName?.message} />
                            <Select
                                label={t.patient.relation}
                                {...register("emergencyContactRelation")}
                                error={errors.emergencyContactRelation?.message}
                                options={[
                                    { label: t.options.relation.parent, value: "Parent" },
                                    { label: t.options.relation.spouse, value: "Spouse" },
                                    { label: t.options.relation.sibling, value: "Sibling" },
                                    { label: t.options.relation.child, value: "Child" },
                                    { label: t.options.relation.friend, value: "Friend" },
                                    { label: t.options.relation.other, value: "Other" },
                                ]}
                            />
                        </div>
                    </div>

                    <Input label={t.patient.religion} {...register("religion")} error={errors.religion?.message} />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                    >
                        {t.patient.submit}
                    </button>
                </form>
            </div>
        </div>
    );
}
