import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import { Users, BookOpen, TrendingUp, Activity, LogOut, Settings, UserPlus, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import IoTStatus from "@/components/IoTStatus";
import IoTFeed from "@/components/IoTFeed";
import { useToast } from "@/components/ui/use-toast";
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
  const [isIoTConnected, setIsIoTConnected] = useState(true);
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());
  const { toast } = useToast();

  const handleSyncData = () => {
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
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">System Overview & Management</p>
          </div>
          <div className="flex items-center gap-3">
            <IoTStatus isConnected={isIoTConnected} />
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
            value="101"
            icon={Users}
            trend="+5 this week"
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <IoTFeed />
          </div>
          <Card className="lg:col-span-3 p-6 shadow-card">
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
                      <TableCell className="font-medium">Ritesh Kumar</TableCell>
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
                      <TableCell className="font-medium">Srijan Kapoor</TableCell>
                      <TableCell>Computer Science</TableCell>
                      <TableCell>89%</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs bg-success/10 text-success">Active</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>STU003</TableCell>
                      <TableCell className="font-medium">Arya Sharma</TableCell>
                      <TableCell>Computer Science</TableCell>
                      <TableCell>85%</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs bg-success/10 text-success">Active</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>STU004</TableCell>
                      <TableCell className="font-medium">Arpit Jindal</TableCell>
                      <TableCell>Computer Science</TableCell>
                      <TableCell>88%</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs bg-success/10 text-success">Active</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>STU005</TableCell>
                      <TableCell className="font-medium">Shikhar Srivastava</TableCell>
                      <TableCell>Computer Science</TableCell>
                      <TableCell>72%</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs bg-warning/10 text-warning">Warning</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>STU006</TableCell>
                      <TableCell className="font-medium">Suwanvit Mandal</TableCell>
                      <TableCell>Computer Science</TableCell>
                      <TableCell>91%</TableCell>
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
                      <TableCell className="font-medium">Prof. K G Srinivasa</TableCell>
                      <TableCell>Computer Science</TableCell>
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
                      <TableCell className="font-medium">Calculus</TableCell>
                      <TableCell>Computer Science</TableCell>
                      <TableCell>101</TableCell>
                      <TableCell>Prof. K G Srinivasa</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CS102</TableCell>
                      <TableCell className="font-medium">Digital Verilog</TableCell>
                      <TableCell>Computer Science</TableCell>
                      <TableCell>101</TableCell>
                      <TableCell>Prof. K G Srinivasa</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CS103</TableCell>
                      <TableCell className="font-medium">IT Workshop</TableCell>
                      <TableCell>Computer Science</TableCell>
                      <TableCell>101</TableCell>
                      <TableCell>Prof. K G Srinivasa</TableCell>
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
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
