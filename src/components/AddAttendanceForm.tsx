import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStudents } from '@/hooks/useStudents';
import { useToast } from '@/components/ui/use-toast';
import { CalendarIcon, UserPlus } from 'lucide-react';
import { format } from 'date-fns';

interface AddAttendanceFormProps {
  onAttendanceAdded: (studentId: string, date: string, status: string) => Promise<{ success: boolean; error?: string }>;
}

const AddAttendanceForm = ({ onAttendanceAdded }: AddAttendanceFormProps) => {
  const { students, loading: studentsLoading } = useStudents();
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [selectedStatus, setSelectedStatus] = useState<string>('present');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent) {
      toast({
        title: "Error",
        description: "Please select a student",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const result = await onAttendanceAdded(selectedStudent, selectedDate, selectedStatus);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Success",
        description: "Attendance record added successfully",
      });
      setSelectedStudent('');
      setSelectedStatus('present');
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to add attendance",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <UserPlus className="w-5 h-5 text-primary" />
        Add Attendance Record
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Student</label>
          <Select value={selectedStudent} onValueChange={setSelectedStudent} disabled={studentsLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a student..." />
            </SelectTrigger>
            <SelectContent>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name} {student.roll ? `(${student.roll})` : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
              <SelectItem value="late">Late</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting || studentsLoading}>
          {isSubmitting ? 'Adding...' : 'Add Attendance Record'}
        </Button>
      </form>
    </Card>
  );
};

export default AddAttendanceForm;
