"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { dictionary, Locale, Dictionary } from "@/lib/dictionary";

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "language-preference";

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Initialize with default, but effects will handle the rest
    const [locale, setLocaleState] = useState<Locale>("en");
    const [mounted, setMounted] = useState(false);

    // Initial load from local storage
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem(STORAGE_KEY) as Locale;
        if (saved && (saved === "en" || saved === "th")) {
            setLocaleState(saved);
            document.documentElement.lang = saved;
        }
    }, []);

    // Handle updates and persistence
    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem(STORAGE_KEY, newLocale);
        document.documentElement.lang = newLocale;
    };

    // Listen for storage events (cross-tab sync)
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                const newValue = e.newValue as Locale;
                if (newValue && (newValue === "en" || newValue === "th")) {
                    setLocaleState(newValue);
                    document.documentElement.lang = newValue;
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t: dictionary[locale] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
