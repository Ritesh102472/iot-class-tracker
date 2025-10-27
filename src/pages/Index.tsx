import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { Wifi, Shield, Clock, BarChart3, Users, CheckCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import iotNetwork from "@/assets/iot-network.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-background/90" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-primary font-semibold">IoT-Powered Attendance</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-primary">
              Smart Student Attendance Management Portal
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Revolutionize attendance tracking with IoT technology. Automated, accurate, and efficient attendance management for modern educational institutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose SmartAttend?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced IoT technology meets seamless user experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 shadow-card hover:shadow-elegant transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4">
                <Wifi className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">IoT Integration</h3>
              <p className="text-muted-foreground">
                Automated attendance tracking using RFID and NFC technologies for seamless and proxy-proof check-ins.
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-elegant transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Updates</h3>
              <p className="text-muted-foreground">
                Instant attendance updates and notifications for students, teachers, and administrators in real-time.
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-elegant transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-success/10 to-success/5 flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security with encrypted data storage and role-based access control.
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-elegant transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 flex items-center justify-center mb-4">
                <BarChart3 className="w-7 h-7 text-warning" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Comprehensive insights and reports on attendance patterns, trends, and performance metrics.
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-elegant transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Role Access</h3>
              <p className="text-muted-foreground">
                Customized dashboards for students, teachers, and administrators with role-specific features.
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-elegant transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Integration</h3>
              <p className="text-muted-foreground">
                Simple integration with existing systems and support for multiple IoT devices and protocols.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">How It Works</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">IoT Device Setup</h3>
                    <p className="text-muted-foreground">
                      Install IoT devices (RFID/NFC readers) at entry points. Students receive unique identification cards for secure, proxy-proof authentication.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Automatic Check-In</h3>
                    <p className="text-muted-foreground">
                      Students tap their RFID/NFC cards when entering. The IoT system automatically records attendance with timestamp and location, preventing proxy attendance.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Real-Time Updates</h3>
                    <p className="text-muted-foreground">
                      Attendance data is instantly synced to the cloud. Teachers and administrators can view real-time attendance reports and analytics.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={iotNetwork} 
                alt="IoT Network" 
                className="rounded-2xl shadow-elegant w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-primary-foreground">
            Ready to Transform Your Attendance Management?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join hundreds of institutions already using SmartAttend for efficient, automated attendance tracking.
          </p>
          <Button asChild size="lg" variant="secondary" className="shadow-elegant">
            <Link to="/auth">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 SmartAttend. All rights reserved. | IoT-Powered Attendance Management
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
