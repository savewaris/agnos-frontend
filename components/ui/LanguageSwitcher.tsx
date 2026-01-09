"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { clsx } from "clsx";

export function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();

    return (
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
                onClick={() => setLocale("en")}
                className={clsx(
                    "px-3 py-1 text-sm font-medium rounded-md transition-all",
                    locale === "en"
                        ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                )}
            >
                EN
            </button>
            <button
                onClick={() => setLocale("th")}
                className={clsx(
                    "px-3 py-1 text-sm font-medium rounded-md transition-all",
                    locale === "th"
                        ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                )}
            >
                TH
            </button>
        </div>
    );
}
