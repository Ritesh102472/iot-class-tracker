import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import AttendanceTable from "@/components/AttendanceTable";
import { Calendar, CheckCircle, TrendingUp, Clock, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state as { name?: string; email?: string; role?: string } || {};
  
  useEffect(() => {
    if (!userData.name) {
      navigate("/");
    }
  }, [userData, navigate]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {userData.name || "Student"}</p>
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
            title="Overall Attendance"
            value="92%"
            icon={TrendingUp}
            trend="+5% from last month"
            variant="success"
          />
          <StatsCard
            title="Classes Attended"
            value="87/101"
            icon={CheckCircle}
            trend="14 missed classes"
            variant="default"
          />
          <StatsCard
            title="This Month"
            value="18/20"
            icon={Calendar}
            trend="90% attendance"
            variant="accent"
          />
          <StatsCard
            title="Late Arrivals"
            value="3"
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
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Course Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Calculus</span>
                    <span className="font-semibold">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Digital Verilog</span>
                    <span className="font-semibold">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>IT Workshop</span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
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
    </div>
  );
};

export default StudentDashboard;
