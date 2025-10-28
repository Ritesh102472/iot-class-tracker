import { Badge } from "@/components/ui/badge";

interface IoTStatusProps {
  isConnected: boolean;
}

const IoTStatus = ({ isConnected }: IoTStatusProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-body font-bold tracking-wide">IoT Device:</span>
      {isConnected ? (
        <Badge variant="default" className="glass-card bg-success/20 text-success border-success/30 shadow-[0_0_40px_hsl(142_76%_55%/0.4)] font-bold">
          Connected ✅
        </Badge>
      ) : (
        <Badge variant="default" className="glass-card bg-destructive/20 text-destructive border-destructive/30 shadow-sm font-bold">
          Offline ❌
        </Badge>
      )}
    </div>
  );
};

export default IoTStatus;
