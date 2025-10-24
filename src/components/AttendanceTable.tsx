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

interface AttendanceRecord {
  id: string;
  studentName: string;
  date: string;
  time: string;
  status: "present" | "absent" | "late";
  course: string;
}

const mockData: AttendanceRecord[] = [
  { id: "1", studentName: "Alice Johnson", date: "2025-01-15", time: "09:00 AM", status: "present", course: "Computer Science" },
  { id: "2", studentName: "Bob Smith", date: "2025-01-15", time: "09:05 AM", status: "late", course: "Computer Science" },
  { id: "3", studentName: "Carol White", date: "2025-01-15", time: "-", status: "absent", course: "Computer Science" },
  { id: "4", studentName: "David Brown", date: "2025-01-15", time: "08:58 AM", status: "present", course: "Computer Science" },
  { id: "5", studentName: "Emma Davis", date: "2025-01-15", time: "09:02 AM", status: "present", course: "Computer Science" },
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
