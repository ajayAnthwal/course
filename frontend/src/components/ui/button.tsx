"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "gradient" | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, leftIcon, rightIcon, disabled, children, ...props }, ref) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center font-semibold rounded-xl",
      "transition-all duration-200 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
      "active:scale-[0.98] transform-gpu",
      "select-none whitespace-nowrap"
    );

    const variants = {
      primary: cn(
        "bg-primary-600 text-white shadow-sm shadow-primary-600/25",
        "hover:bg-primary-700 hover:shadow-md hover:shadow-primary-700/25",
        "active:bg-primary-800"
      ),
      secondary: cn(
        "bg-secondary-500 text-white shadow-sm shadow-secondary-500/25",
        "hover:bg-secondary-600 hover:shadow-md hover:shadow-secondary-600/25",
        "active:bg-secondary-700"
      ),
      outline: cn(
        "border-2 border-neutral-200 bg-white text-neutral-700",
        "hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700",
        "active:bg-primary-100"
      ),
      ghost: cn(
        "text-neutral-600",
        "hover:bg-neutral-100 hover:text-neutral-900",
        "active:bg-neutral-200"
      ),
      danger: cn(
        "bg-error-500 text-white shadow-sm shadow-error-500/25",
        "hover:bg-error-600 hover:shadow-md hover:shadow-error-600/25",
        "active:bg-error-700"
      ),
      gradient: cn(
        "bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 text-white",
        "shadow-lg shadow-primary-500/25",
        "hover:shadow-xl hover:shadow-primary-500/30 hover:brightness-110",
        "active:brightness-95"
      ),
      link: cn(
        "text-primary-600 underline-offset-4 hover:underline",
        "p-0 h-auto"
      ),
    };

    const sizes = {
      xs: "h-7 px-2.5 text-xs gap-1.5 rounded-lg",
      sm: "h-9 px-3.5 text-sm gap-2 rounded-lg",
      md: "h-11 px-5 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
      xl: "h-14 px-8 text-base gap-3 rounded-2xl",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoading && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
