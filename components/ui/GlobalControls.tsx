"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function GlobalControls() {
    const { t } = useLanguage();
    const pathname = usePathname();

    return (
        <div className="fixed top-6 right-6 flex gap-3 items-center z-50">
            {pathname !== "/" && (
                <Link
                    href="/"
                    className="px-4 py-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition shadow-sm"
                >
                    {t.patient.backHome}
                </Link>
            )}
            <LanguageSwitcher />
            <ThemeToggle />
        </div>
    );
}
