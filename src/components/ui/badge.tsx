import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full glass-card border px-3 py-1 text-xs font-semibold font-body transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-glass",
  {
    variants: {
      variant: {
        default: "border-primary/30 bg-gradient-primary text-primary-foreground shadow-glow hover:scale-105",
        secondary: "border-secondary/30 bg-secondary/50 text-secondary-foreground hover:bg-secondary/70",
        destructive: "border-destructive/30 bg-destructive/20 text-destructive hover:bg-destructive/30",
        outline: "text-foreground border-border/50 hover:glass-card",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
