import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AttendanceWithStudent {
  id: string;
  date: string | null;
  status: string | null;
  student_id: string;
  student_name: string;
  student_roll: string | null;
}

export const useAttendance = () => {
  const [attendance, setAttendance] = useState<AttendanceWithStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('attendance')
        .select(`
          id,
          date,
          status,
          student_id,
          students (
            name,
            roll
          )
        `)
        .order('date', { ascending: false });

      if (fetchError) throw fetchError;

      const formattedData: AttendanceWithStudent[] = (data || []).map((record: any) => ({
        id: record.id,
        date: record.date,
        status: record.status,
        student_id: record.student_id,
        student_name: record.students?.name || 'Unknown',
        student_roll: record.students?.roll || null,
      }));

      setAttendance(formattedData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  };

  const addAttendance = async (student_id: string, date: string, status: string) => {
    try {
      const { error: insertError } = await supabase
        .from('attendance')
        .insert({ student_id, date, status });

      if (insertError) throw insertError;
      
      await fetchAttendance();
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to add attendance' 
      };
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return { attendance, loading, error, refetch: fetchAttendance, addAttendance };
};
