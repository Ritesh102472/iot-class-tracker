import { Badge } from "@/components/ui/badge";

interface IoTStatusProps {
  isConnected: boolean;
}

const IoTStatus = ({ isConnected }: IoTStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">IoT Device:</span>
      {isConnected ? (
        <Badge variant="default" className="bg-success/10 text-success border-success/20">
          Connected ✅
        </Badge>
      ) : (
        <Badge variant="default" className="bg-destructive/10 text-destructive border-destructive/20">
          Offline ❌
        </Badge>
      )}
    </div>
  );
};

export default IoTStatus;
