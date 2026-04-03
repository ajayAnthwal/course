import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  bordered?: boolean;
}

export function Card({ children, className, hover = false, padding = "md", bordered = true }: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl",
        bordered && "border border-slate-200",
        "shadow-md",
        hover && [
          "cursor-pointer hover:shadow-xl hover:border-slate-300",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-1",
        ],
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("mb-5", className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardHeaderProps) {
  return <h3 className={cn("text-lg font-semibold text-neutral-900 tracking-tight", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: CardHeaderProps) {
  return <p className={cn("text-sm text-neutral-500 mt-1.5 leading-relaxed", className)}>{children}</p>;
}

export function CardContent({ children, className }: CardHeaderProps) {
  return <div className={cn(className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("mt-5 pt-5 border-t border-neutral-100", className)}>
      {children}
    </div>
  );
}
