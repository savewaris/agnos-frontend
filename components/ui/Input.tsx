import { InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-[var(--card-text)] opacity-90">
                    {label} {props.required && <span className="text-red-500">*</span>}
                </label>
                <input
                    ref={ref}
                    className={twMerge(
                        clsx(
                            "border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-500 text-[var(--card-text)] bg-[var(--input-bg)]",
                            error ? "border-red-500 focus:ring-red-500" : "border-[var(--border-color)]",
                            className
                        )
                    )}
                    {...props}
                />
                {error && <span className="text-xs text-red-500">{error}</span>}
            </div>
        );
    }
);

Input.displayName = "Input";
