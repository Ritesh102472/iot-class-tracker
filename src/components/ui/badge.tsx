import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full glass-card border px-3 py-1.5 text-xs font-bold font-body transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-glass",
  {
    variants: {
      variant: {
        default: "border-primary/30 bg-gradient-primary text-primary-foreground shadow-neon-teal hover:scale-110 hover:shadow-neon-purple",
        secondary: "border-secondary/30 bg-secondary/20 text-secondary hover:bg-secondary/30 hover:scale-110 hover:shadow-neon-purple",
        destructive: "border-destructive/30 bg-destructive/20 text-destructive hover:bg-destructive/30 hover:scale-110",
        outline: "text-foreground border-border/50 hover:glass-card hover:scale-110",
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
