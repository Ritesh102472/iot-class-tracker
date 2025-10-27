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
    default: "from-primary/10 to-primary/5 text-primary",
    success: "from-success/10 to-success/5 text-success",
    warning: "from-warning/10 to-warning/5 text-warning",
    accent: "from-accent/10 to-accent/5 text-accent",
  };

  return (
    <Card className="p-6 shadow-card hover:shadow-elegant transition-all duration-500 hover:gold-glow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2 font-body tracking-wide">{title}</p>
          <p className="text-4xl font-bold font-heading bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">{value}</p>
          {trend && (
            <p className="text-xs text-muted-foreground mt-3 font-body">{trend}</p>
          )}
        </div>
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${variantStyles[variant]} flex items-center justify-center shadow-glow`}>
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
