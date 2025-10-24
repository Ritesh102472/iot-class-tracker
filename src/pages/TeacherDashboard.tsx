import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import AttendanceTable from "@/components/AttendanceTable";
import { Users, CheckCircle, TrendingUp, AlertCircle, LogOut, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome, Prof. Michael Roberts</p>
          </div>
          <Button variant="ghost" onClick={() => navigate("/")}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Students"
            value="156"
            icon={Users}
            trend="Across 4 courses"
            variant="default"
          />
          <StatsCard
            title="Average Attendance"
            value="87%"
            icon={TrendingUp}
            trend="+3% this week"
            variant="success"
          />
          <StatsCard
            title="Present Today"
            value="42/45"
            icon={CheckCircle}
            trend="Current class"
            variant="accent"
          />
          <StatsCard
            title="Low Attendance"
            value="8"
            icon={AlertCircle}
            trend="Students <75%"
            variant="warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Today's Attendance - Computer Science 101</h2>
              <Button variant="hero">
                <Plus className="w-4 h-4 mr-2" />
                Mark Attendance
              </Button>
            </div>
            <AttendanceTable />
          </Card>

          <div className="space-y-6">
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">My Courses</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium">Computer Science 101</p>
                    <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">45 students</p>
                  <p className="text-sm text-muted-foreground">Avg: 89%</p>
                </div>
                <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium">Data Structures</p>
                    <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">38 students</p>
                  <p className="text-sm text-muted-foreground">Avg: 85%</p>
                </div>
                <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium">Advanced Algorithms</p>
                    <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">32 students</p>
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
                  <p className="text-xs text-muted-foreground mt-1">CS 101 - Today 2:00 PM</p>
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
