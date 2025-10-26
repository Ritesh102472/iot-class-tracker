import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";
import { useAttendance } from "@/hooks/useAttendance";
import { format } from "date-fns";

const AttendanceTable = () => {
  const { attendance, loading, error } = useAttendance();
  const getStatusBadge = (status: string | null) => {
    if (!status) return null;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading attendance...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-destructive">
        Error loading attendance: {error}
      </div>
    );
  }

  if (attendance.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No attendance records found. Add records to get started.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card shadow-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Roll Number</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendance.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.student_name}</TableCell>
              <TableCell>{record.student_roll || '-'}</TableCell>
              <TableCell>
                {record.date ? format(new Date(record.date), 'MMM dd, yyyy') : '-'}
              </TableCell>
              <TableCell>{getStatusBadge(record.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTable;
