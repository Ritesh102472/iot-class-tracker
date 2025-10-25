import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FeedItem {
  studentId: string;
  timestamp: string;
}

const IoTFeed = () => {
  const feedItems: FeedItem[] = [
    { studentId: "STU101", timestamp: "09:15 AM" },
    { studentId: "STU045", timestamp: "09:14 AM" },
    { studentId: "STU089", timestamp: "09:13 AM" },
    { studentId: "STU023", timestamp: "09:12 AM" },
    { studentId: "STU067", timestamp: "09:11 AM" },
  ];

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
          {feedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="font-medium text-sm">{item.studentId}</span>
              <span className="text-xs text-muted-foreground">
                Attendance Marked at {item.timestamp}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default IoTFeed;
