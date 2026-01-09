import { forwardRef, SelectHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    options: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, className, options, required, ...props }, ref) => {
        const { t } = useLanguage();
        return (
            <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-[var(--card-text)] opacity-90">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <select
                    ref={ref}
                    required={required}
                    className={twMerge(
                        clsx(
                            "h-11 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-[var(--input-bg)] text-[var(--card-text)]",
                            error ? "border-red-500 focus:ring-red-500" : "border-[var(--border-color)]",
                            className
                        )
                    )}
                    {...props}
                >
                    <option value="" className="text-gray-500">{t.common.select} {label}</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {error && <span className="text-xs text-red-500">{error}</span>}
            </div>
        );
    }
);

Select.displayName = "Select";
