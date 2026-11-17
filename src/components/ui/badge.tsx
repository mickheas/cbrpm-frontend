import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 text-xs font-semibold bg-transparent border-0 p-0 rounded-none",
  {
    variants: {
      variant: {
        default: "text-[#00594C] dark:text-[#00A38C]",
        secondary: "text-[var(--color-slate)] font-normal",
        destructive: "text-rose-600 dark:text-rose-400",
        outline: "text-[var(--color-slate)] font-medium",
        
        // Exact civic status variants
        paid: "text-emerald-600 dark:text-emerald-400",
        approved: "text-emerald-600 dark:text-emerald-400",
        resolved: "text-emerald-600 dark:text-emerald-400",
        
        pending: "text-amber-600 dark:text-amber-400",
        in_progress: "text-[#00594C] dark:text-[#00A38C]",
        
        overdue: "text-rose-600 dark:text-rose-400",
        rejected: "text-rose-600 dark:text-rose-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type BadgeVariantType =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "paid"
  | "approved"
  | "resolved"
  | "pending"
  | "in_progress"
  | "overdue"
  | "rejected";

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: BadgeVariantType;
  children?: React.ReactNode;
  className?: string;
};

export const Badge: React.FC<BadgeProps> = ({ 
  className, 
  variant = "default", 
  children, 
  ...props 
}) => {
  return (
    <div className={cn(badgeVariants({ variant: (variant || "default") as any }), className)} {...props}>
      {children}
    </div>
  );
};
