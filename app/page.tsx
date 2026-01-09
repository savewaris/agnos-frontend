"use client";

import Link from "next/link";
import { ArrowRight, User, Users } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center p-6 transition-colors duration-300">

      <div className="max-w-2xl text-center space-y-8 animate-fade-in-up">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Agnos <span className="text-blue-600 dark:text-blue-400">Health</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {t.home.welcome}. {t.home.desc1}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Link
            href="/patient"
            className="group block p-8 bg-[var(--card-bg)] text-[var(--card-text)] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-blue-100 dark:hover:border-blue-900"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
                <User className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-white" />
              </div>
              <h2 className="text-2xl font-bold">{t.home.patientFlow}</h2>
              <p className="text-sm opacity-80">{t.home.start}</p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {t.home.start} <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>

          <Link
            href="/staff"
            className="group block p-8 bg-[var(--card-bg)] text-[var(--card-text)] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full group-hover:bg-indigo-600 transition-colors duration-300">
                <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400 group-hover:text-white" />
              </div>
              <h2 className="text-2xl font-bold">{t.home.staffDash}</h2>
              <p className="text-sm opacity-80">{t.home.monitor}</p>
              <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {t.home.monitor} <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
