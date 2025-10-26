import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import AttendanceTable from "@/components/AttendanceTable";
import { Users, CheckCircle, TrendingUp, AlertCircle, LogOut, Plus, RefreshCw } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import IoTStatus from "@/components/IoTStatus";
import IoTFeed from "@/components/IoTFeed";
import { useToast } from "@/components/ui/use-toast";
import { useStudents } from "@/hooks/useStudents";
import { useAttendance } from "@/hooks/useAttendance";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state as { name?: string; email?: string; role?: string } || {};
  const [isIoTConnected, setIsIoTConnected] = useState(true);
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());
  const { toast } = useToast();
  const { students, refetch: refetchStudents } = useStudents();
  const { attendance, refetch: refetchAttendance } = useAttendance();

  const totalStudents = students.length;
  const totalAttendance = attendance.length;
  const presentCount = attendance.filter(a => a.status === 'present').length;
  const averageAttendance = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0;
  
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayAttendance = attendance.filter(a => a.date === today);
  const presentToday = todayAttendance.filter(a => a.status === 'present').length;
  const totalToday = todayAttendance.length;

  const lowAttendanceStudents = students.filter(student => {
    const studentAttendance = attendance.filter(a => a.student_id === student.id);
    if (studentAttendance.length === 0) return false;
    const studentPresent = studentAttendance.filter(a => a.status === 'present').length;
    return (studentPresent / studentAttendance.length) < 0.75;
  }).length;

  const lastFiveAttendance = [...attendance]
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
    .slice(0, 5);
  
  useEffect(() => {
    if (!userData.name) {
      navigate("/");
    }
  }, [userData, navigate]);

  useEffect(() => {
    const channel = supabase
      .channel('dashboard-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'students' },
        () => {
          refetchStudents();
          setLastSync(new Date().toLocaleTimeString());
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'attendance' },
        () => {
          refetchAttendance();
          setLastSync(new Date().toLocaleTimeString());
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
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
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome, {userData.name || "Professor"}</p>
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
            title="Total Students"
            value={totalStudents.toString()}
            icon={Users}
            trend="Across 3 courses"
            variant="default"
          />
          <StatsCard
            title="Average Attendance"
            value={`${averageAttendance}%`}
            icon={TrendingUp}
            trend="All time average"
            variant="success"
          />
          <StatsCard
            title="Present Today"
            value={`${presentToday}/${totalToday}`}
            icon={CheckCircle}
            trend="Current class"
            variant="accent"
          />
          <StatsCard
            title="Low Attendance"
            value={lowAttendanceStudents.toString()}
            icon={AlertCircle}
            trend="Students <75%"
            variant="warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Today's Attendance - Calculus</h2>
              <Button variant="hero">
                <Plus className="w-4 h-4 mr-2" />
                Mark Attendance
              </Button>
            </div>
            <AttendanceTable />
          </Card>

          <div className="space-y-6">
            <IoTFeed attendanceData={lastFiveAttendance} />
            
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">My Courses</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium">Calculus</p>
                    <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">101 students</p>
                  <p className="text-sm text-muted-foreground">Avg: 89%</p>
                </div>
                <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium">Digital Verilog</p>
                    <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">101 students</p>
                  <p className="text-sm text-muted-foreground">Avg: 85%</p>
                </div>
                <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium">IT Workshop</p>
                    <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">101 students</p>
                  <p className="text-sm text-muted-foreground">Avg: 91%</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Alerts</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <p className="text-sm font-medium text-warning">Low Attendance Alert</p>
                  <p className="text-xs text-muted-foreground mt-1">3 students below 75%</p>
                </div>
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm font-medium text-accent">Class Scheduled</p>
                  <p className="text-xs text-muted-foreground mt-1">Calculus - Today 2:00 PM</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
