import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import { Users, BookOpen, TrendingUp, Activity, LogOut, Settings, UserPlus, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import IoTStatus from "@/components/IoTStatus";
import IoTFeed from "@/components/IoTFeed";
import { useToast } from "@/components/ui/use-toast";
import StudentsTable from "@/components/StudentsTable";
import AttendanceTable from "@/components/AttendanceTable";
import AddAttendanceForm from "@/components/AddAttendanceForm";
import { useStudents } from "@/hooks/useStudents";
import { useAttendance } from "@/hooks/useAttendance";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isIoTConnected, setIsIoTConnected] = useState(true);
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());
  const [autoSync, setAutoSync] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const { toast } = useToast();
  const { students, refetch: refetchStudents } = useStudents();
  const { attendance, refetch: refetchAttendance, addAttendance } = useAttendance();
  const [totalStudents, setTotalStudents] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(0);

  useEffect(() => {
    setTotalStudents(students.length);
  }, [students]);

  useEffect(() => {
    if (attendance.length > 0) {
      const presentCount = attendance.filter(a => a.status === 'present').length;
      const percentage = Math.round((presentCount / attendance.length) * 100);
      setAttendancePercentage(percentage);
    }
  }, [attendance]);

  const handleSyncData = () => {
    setLastSync(new Date().toLocaleTimeString());
    refetchStudents();
    refetchAttendance();
    toast({
      title: "Data Synced",
      description: "Successfully refreshed data from IoT device",
    });
  };

  const handleAddAttendance = async (studentId: string, date: string, status: string) => {
    const result = await addAttendance(studentId, date, status);
    if (result.success) {
      refetchAttendance();
    }
    return result;
  };

  const lastFiveAttendance = [...attendance]
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">System Overview & Management</p>
          </div>
          <div className="flex items-center gap-3">
            <IoTStatus isConnected={isIoTConnected} />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Admin Settings</DialogTitle>
                  <DialogDescription>
                    Configure your dashboard preferences and IoT device settings.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-sync">Auto-Sync Data</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically sync with IoT devices
                      </p>
                    </div>
                    <Switch
                      id="auto-sync"
                      checked={autoSync}
                      onCheckedChange={setAutoSync}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts for attendance events
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="iot-status">IoT Connection</Label>
                      <p className="text-sm text-muted-foreground">
                        Toggle IoT device connection
                      </p>
                    </div>
                    <Switch
                      id="iot-status"
                      checked={isIoTConnected}
                      onCheckedChange={setIsIoTConnected}
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
            trend={`${students.length} active`}
            variant="default"
          />
          <StatsCard
            title="Attendance Records"
            value={attendance.length.toString()}
            icon={BookOpen}
            trend="Total entries"
            variant="accent"
          />
          <StatsCard
            title="Attendance Rate"
            value={`${attendancePercentage}%`}
            icon={TrendingUp}
            trend="Overall performance"
            variant="success"
          />
          <StatsCard
            title="IoT Devices"
            value="3"
            icon={Activity}
            trend="All online"
            variant="default"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1 space-y-6">
            <IoTFeed attendanceData={lastFiveAttendance} />
            <AddAttendanceForm onAttendanceAdded={handleAddAttendance} />
          </div>
          
          <Card className="lg:col-span-3 p-6 shadow-card">
            <Tabs defaultValue="students" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="attendance">Attendance Records</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="students">
                <StudentsTable />
              </TabsContent>

              <TabsContent value="attendance">
                <AttendanceTable />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
