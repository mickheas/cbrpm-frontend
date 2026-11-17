import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-semibold ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00594C] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#00594C] text-white hover:bg-[#00483D] dark:bg-[#00A38C] dark:hover:bg-[#008F7A]",
        destructive:
          "bg-[#B3261E] text-white hover:bg-[#8F1E17] dark:bg-[#EF4444] dark:hover:bg-[#DC2626]",
        outline:
          "border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-base)] hover:text-[var(--color-ink)]",
        secondary:
          "bg-[var(--color-base)] text-[var(--color-ink)] hover:bg-[var(--color-line)]",
        ghost:
          "text-[var(--color-slate)] hover:bg-[var(--color-base)] hover:text-[var(--color-ink)]",
        link:
          "text-[#00594C] underline-offset-4 hover:underline dark:text-[#00A38C]",
        accentDim:
          "bg-[#E8F5F1] text-[#00594C] hover:bg-[#D4EFE8] dark:bg-[#03241E] dark:text-[#00A38C] dark:hover:bg-[#06332B]",
      },
      size: {
        default: "h-8 px-3.5 py-1.5",
        sm: "h-7 rounded-sm px-2.5 text-[11px]",
        lg: "h-10 rounded-md px-5 text-sm",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
