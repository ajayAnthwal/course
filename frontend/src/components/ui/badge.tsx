import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  className?: string;
}

export function Badge({ children, variant = "default", size = "md", dot, className }: BadgeProps) {
  const variants = {
    default: "bg-neutral-100 text-neutral-700 border-neutral-200",
    primary: "bg-primary-50 text-primary-700 border-primary-200",
    secondary: "bg-secondary-50 text-secondary-700 border-secondary-200",
    success: "bg-secondary-50 text-secondary-700 border-secondary-200",
    warning: "bg-accent-50 text-accent-700 border-accent-200",
    danger: "bg-error-50 text-error-600 border-error-200",
    outline: "bg-transparent text-neutral-600 border-neutral-300",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full border",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span className={cn(
          "w-1.5 h-1.5 rounded-full",
          variant === "success" ? "bg-secondary-500" :
          variant === "warning" ? "bg-accent-500" :
          variant === "danger" ? "bg-error-500" :
          "bg-current"
        )} />
      )}
      {children}
    </span>
  );
}
