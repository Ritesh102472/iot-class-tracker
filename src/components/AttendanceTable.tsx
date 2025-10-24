import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

/**
 * AttendanceTable Component
 * 
 * This component displays attendance records.
 * Currently using mock data for demonstration purposes.
 * 
 * IoT Integration:
 * - This component is designed to receive real-time data from IoT devices (RFID/NFC readers)
 * - The data structure matches the expected format from iotDataService.ts
 * - Once your IoT project is built, replace mockData with live data from the IoT service
 * - See src/services/iotDataService.ts for IoT data integration guide
 */

interface AttendanceRecord {
  id: string;
  studentName: string;
  date: string;
  time: string;
  status: "present" | "absent" | "late";
  course: string;
}

// Mock data - Replace with live IoT data when devices are connected
const mockData: AttendanceRecord[] = [
  { id: "1", studentName: "Aarav Sharma", date: "2025-01-15", time: "09:00 AM", status: "present", course: "Computer Science" },
  { id: "2", studentName: "Priya Patel", date: "2025-01-15", time: "09:05 AM", status: "late", course: "Computer Science" },
  { id: "3", studentName: "Rahul Kumar", date: "2025-01-15", time: "-", status: "absent", course: "Computer Science" },
  { id: "4", studentName: "Ananya Singh", date: "2025-01-15", time: "08:58 AM", status: "present", course: "Computer Science" },
  { id: "5", studentName: "Arjun Reddy", date: "2025-01-15", time: "09:02 AM", status: "present", course: "Computer Science" },
];

const AttendanceTable = () => {
  const getStatusBadge = (status: AttendanceRecord["status"]) => {
    switch (status) {
      case "present":
        return (
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Present
          </Badge>
        );
      case "late":
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
            <Clock className="w-3 h-3 mr-1" />
            Late
          </Badge>
        );
      case "absent":
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
            <XCircle className="w-3 h-3 mr-1" />
            Absent
          </Badge>
        );
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card shadow-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.studentName}</TableCell>
              <TableCell>{record.course}</TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.time}</TableCell>
              <TableCell>{getStatusBadge(record.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTable;
