import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-ink)] transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-[var(--color-slate)]/70 focus-visible:outline-hidden focus-visible:border-[#00594C] focus-visible:ring-1 focus-visible:ring-[#00594C] dark:focus-visible:border-[#00A38C] dark:focus-visible:ring-[#00A38C] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
