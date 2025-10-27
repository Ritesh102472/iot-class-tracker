import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "success" | "warning" | "accent";
}

const StatsCard = ({ title, value, icon: Icon, trend, variant = "default" }: StatsCardProps) => {
  const variantStyles = {
    default: "from-primary/10 to-primary/5 text-primary group-hover:shadow-neon-teal",
    success: "from-success/10 to-success/5 text-success group-hover:shadow-[0_0_40px_hsl(142_76%_55%/0.4)]",
    warning: "from-warning/10 to-warning/5 text-warning group-hover:shadow-[0_0_40px_hsl(38_92%_55%/0.4)]",
    accent: "from-accent/10 to-accent/5 text-accent group-hover:shadow-neon-gold",
  };

  const borderStyles = {
    default: "border-primary/20 hover:border-primary/50",
    success: "border-success/20 hover:border-success/50",
    warning: "border-warning/20 hover:border-warning/50",
    accent: "border-accent/20 hover:border-accent/50",
  };

  return (
    <Card className={`p-8 group hover-lift ${borderStyles[variant]} transition-all duration-500`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-3 font-medium tracking-wider uppercase">{title}</p>
          <p className="text-5xl font-black mb-2 gradient-text">{value}</p>
          {trend && (
            <p className="text-sm text-muted-foreground mt-2 font-medium">{trend}</p>
          )}
        </div>
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${variantStyles[variant]} flex items-center justify-center transition-all duration-500`}>
          <Icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-500" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
