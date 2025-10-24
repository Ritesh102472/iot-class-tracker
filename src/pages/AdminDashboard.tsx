import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import { Users, BookOpen, TrendingUp, Activity, LogOut, Settings, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">System Overview & Management</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" onClick={() => navigate("/")}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Students"
            value="1,248"
            icon={Users}
            trend="+15 this week"
            variant="default"
          />
          <StatsCard
            title="Active Courses"
            value="42"
            icon={BookOpen}
            trend="8 departments"
            variant="accent"
          />
          <StatsCard
            title="System Attendance"
            value="89%"
            icon={TrendingUp}
            trend="+2% vs last month"
            variant="success"
          />
          <StatsCard
            title="IoT Devices"
            value="156"
            icon={Activity}
            trend="All online"
            variant="default"
          />
        </div>

        <Card className="p-6 shadow-card mb-8">
          <Tabs defaultValue="students" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="teachers">Teachers</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
              </TabsList>
              <Button variant="hero">
                <UserPlus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>

            <TabsContent value="students">
              <div className="rounded-lg border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>STU001</TableCell>
                      <TableCell className="font-medium">Alice Johnson</TableCell>
                      <TableCell>Computer Science</TableCell>
                      <TableCell>92%</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs bg-success/10 text-success">Active</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>STU002</TableCell>
                      <TableCell className="font-medium">Bob Smith</TableCell>
                      <TableCell>Mathematics</TableCell>
                      <TableCell>85%</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs bg-success/10 text-success">Active</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>STU003</TableCell>
                      <TableCell className="font-medium">Carol White</TableCell>
                      <TableCell>Physics</TableCell>
                      <TableCell>78%</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs bg-warning/10 text-warning">Warning</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="teachers">
              <div className="rounded-lg border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Teacher ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>TCH001</TableCell>
                      <TableCell className="font-medium">Prof. Michael Roberts</TableCell>
                      <TableCell>Computer Science</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs bg-success/10 text-success">Active</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>TCH002</TableCell>
                      <TableCell className="font-medium">Dr. Sarah Johnson</TableCell>
                      <TableCell>Mathematics</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs bg-success/10 text-success">Active</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="courses">
              <div className="rounded-lg border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Code</TableHead>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>CS101</TableCell>
                      <TableCell className="font-medium">Computer Science 101</TableCell>
                      <TableCell>Computer Science</TableCell>
                      <TableCell>45</TableCell>
                      <TableCell>Prof. Michael Roberts</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MATH201</TableCell>
                      <TableCell className="font-medium">Advanced Calculus</TableCell>
                      <TableCell>Mathematics</TableCell>
                      <TableCell>38</TableCell>
                      <TableCell>Dr. Sarah Johnson</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
