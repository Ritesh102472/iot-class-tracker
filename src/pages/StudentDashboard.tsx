import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import AttendanceTable from "@/components/AttendanceTable";
import { Calendar, CheckCircle, TrendingUp, Clock, LogOut, RefreshCw } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import IoTStatus from "@/components/IoTStatus";
import IoTFeed from "@/components/IoTFeed";
import { useToast } from "@/components/ui/use-toast";
import { useAttendance } from "@/hooks/useAttendance";
import { useStudents } from "@/hooks/useStudents";
import { supabase } from "@/integrations/supabase/client";
import AttendanceChatBot from "@/components/AttendanceChatBot";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state as { name?: string; email?: string; role?: string } || {};
  const [isIoTConnected, setIsIoTConnected] = useState(true);
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());
  const { toast } = useToast();
  const { attendance, refetch: refetchAttendance } = useAttendance();
  const { students, refetch: refetchStudents } = useStudents();
  
  const [totalStudents, setTotalStudents] = useState(0);
  const [overallAttendance, setOverallAttendance] = useState(0);
  const [classesAttended, setClassesAttended] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [thisMonthAttended, setThisMonthAttended] = useState(0);
  const [thisMonthTotal, setThisMonthTotal] = useState(0);
  const [lateArrivals, setLateArrivals] = useState(0);

  const lastFiveAttendance = [...attendance]
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
    .slice(0, 5);
  
  useEffect(() => {
    if (!userData.name) {
      navigate("/");
    }
  }, [userData, navigate]);

  useEffect(() => {
    setTotalStudents(students.length);
  }, [students]);

  useEffect(() => {
    if (attendance.length > 0) {
      const presentCount = attendance.filter(a => a.status === 'present').length;
      const percentage = Math.round((presentCount / attendance.length) * 100);
      setOverallAttendance(percentage);
      setClassesAttended(presentCount);
      setTotalClasses(attendance.length);

      const lateCount = attendance.filter(a => a.status === 'late').length;
      setLateArrivals(lateCount);

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      const thisMonthRecords = attendance.filter(a => {
        if (!a.date) return false;
        const recordDate = new Date(a.date);
        return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
      });
      
      const thisMonthPresent = thisMonthRecords.filter(a => a.status === 'present').length;
      setThisMonthAttended(thisMonthPresent);
      setThisMonthTotal(thisMonthRecords.length);
    } else {
      setOverallAttendance(0);
      setClassesAttended(0);
      setTotalClasses(0);
      setThisMonthAttended(0);
      setThisMonthTotal(0);
      setLateArrivals(0);
    }
  }, [attendance]);

  useEffect(() => {
    const studentsChannel = supabase
      .channel('students-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'students'
        },
        () => {
          refetchStudents();
        }
      )
      .subscribe();

    const attendanceChannel = supabase
      .channel('attendance-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'attendance'
        },
        () => {
          refetchAttendance();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(studentsChannel);
      supabase.removeChannel(attendanceChannel);
    };
  }, [refetchStudents, refetchAttendance]);

  const handleSyncData = () => {
    refetchStudents();
    refetchAttendance();
    setLastSync(new Date().toLocaleTimeString());
    toast({
      title: "Data Synced",
      description: "Successfully refreshed data from IoT device",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {userData.name || "Student"}</p>
          </div>
          <div className="flex items-center gap-4">
            <IoTStatus isConnected={isIoTConnected} />
            <Button variant="ghost" onClick={() => navigate("/")}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">Last data received from IoT module: {lastSync}</p>
          <Button onClick={handleSyncData} variant="hero">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Data from IoT Device
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Overall Attendance"
            value={totalClasses > 0 ? `${overallAttendance}%` : "0%"}
            icon={TrendingUp}
            trend={totalClasses > 0 ? `${classesAttended}/${totalClasses} classes` : "No data"}
            variant="success"
          />
          <StatsCard
            title="Classes Attended"
            value={`${classesAttended}/${totalClasses}`}
            icon={CheckCircle}
            trend={totalClasses > 0 ? `${totalClasses - classesAttended} missed` : "No classes recorded"}
            variant="default"
          />
          <StatsCard
            title="This Month"
            value={`${thisMonthAttended}/${thisMonthTotal}`}
            icon={Calendar}
            trend={thisMonthTotal > 0 ? `${Math.round((thisMonthAttended / thisMonthTotal) * 100)}% attendance` : "No data this month"}
            variant="accent"
          />
          <StatsCard
            title="Late Arrivals"
            value={lateArrivals.toString()}
            icon={Clock}
            trend="This semester"
            variant="warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 p-6 shadow-card">
            <h2 className="text-xl font-semibold mb-4">Recent Attendance</h2>
            <AttendanceTable />
          </Card>

          <div className="space-y-6">
            <IoTFeed attendanceData={lastFiveAttendance} />
            
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Overall Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Attendance Rate</span>
                    <span className="font-semibold">{overallAttendance}%</span>
                  </div>
                  <Progress value={overallAttendance} className="h-2" />
                </div>
                {thisMonthTotal > 0 && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>This Month</span>
                      <span className="font-semibold">{Math.round((thisMonthAttended / thisMonthTotal) * 100)}%</span>
                    </div>
                    <Progress value={Math.round((thisMonthAttended / thisMonthTotal) * 100)} className="h-2" />
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Upcoming Classes</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Calculus</p>
                    <p className="text-sm text-muted-foreground">Today, 2:00 PM - Dr. Chandrashekhar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Digital Verilog</p>
                    <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM - Dr. Manoj Majumder</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">IT Workshop</p>
                    <p className="text-sm text-muted-foreground">Friday, 3:00 PM - Dr. K G Srinivasa</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <AttendanceChatBot />
    </div>
  );
};

export default StudentDashboard;
