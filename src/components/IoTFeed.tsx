import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface AttendanceRecord {
  id: string;
  student_name: string | null;
  student_roll: string | null;
  date: string | null;
  status: string | null;
}

interface IoTFeedProps {
  attendanceData: AttendanceRecord[];
}

const IoTFeed = ({ attendanceData }: IoTFeedProps) => {

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex items-center">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <div className="absolute w-2 h-2 bg-success rounded-full animate-ping" />
        </div>
        <h3 className="text-lg font-semibold">Live IoT Attendance Feed</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-3">Active Connection</p>
      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {attendanceData.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No recent attendance records
            </div>
          ) : (
            attendanceData.map((record, index) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="font-medium text-sm">{record.student_name || 'Unknown'}</span>
                <span className="text-xs text-muted-foreground">
                  {record.status} - {record.date ? (() => {
                    const date = new Date(record.date);
                    return !isNaN(date.getTime()) ? format(date, 'MMM dd, h:mm a') : record.date;
                  })() : 'No date'}
                </span>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default IoTFeed;
