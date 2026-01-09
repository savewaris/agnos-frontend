"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function GlobalControls() {
    const { t } = useLanguage();
    return (
        <div className="fixed top-6 right-6 flex gap-3 items-center z-50">
            <LanguageSwitcher />
            <ThemeToggle />
        </div>
    );
}
