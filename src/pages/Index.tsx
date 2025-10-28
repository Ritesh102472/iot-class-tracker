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
      
      {/* Hero Section with Gradient */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={heroBg} 
            alt="Hero Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 rounded-full glass-card border border-primary/30 animate-fade-in-up">
              <span className="gradient-text font-bold text-sm tracking-wide">✨ NEXT-GEN IoT ATTENDANCE</span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="gradient-text">Smart Attendance</span>
              <br />
              <span className="text-foreground">Management Portal</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Experience the future of attendance tracking with cutting-edge IoT technology. Automated, secure, and lightning-fast for modern institutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button 
                asChild 
                size="lg"
                className="relative group px-8 py-7 text-lg font-bold bg-gradient-primary hover:scale-110 shadow-neon-teal hover:shadow-neon-purple transition-all duration-500"
              >
                <Link to="/auth">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8 py-7 text-lg font-semibold glass-card border-primary/30 hover:border-primary hover:bg-primary/10">
                <Link to="/auth">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6 gradient-text">Why Choose SmartAttend?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced IoT technology meets seamless user experience in a powerful SaaS platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 group hover-lift border-primary/20 hover:border-primary/50 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:shadow-neon-teal transition-all duration-500">
                <Wifi className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">IoT Integration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Automated attendance tracking using RFID and NFC technologies for seamless and proxy-proof check-ins.
              </p>
            </Card>

            <Card className="p-8 group hover-lift border-accent/20 hover:border-accent/50 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:shadow-neon-gold transition-all duration-500">
                <Clock className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">Real-Time Updates</h3>
              <p className="text-muted-foreground leading-relaxed">
                Instant attendance updates and notifications for students, teachers, and administrators in real-time.
              </p>
            </Card>

            <Card className="p-8 group hover-lift border-success/20 hover:border-success/50 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mb-6 group-hover:shadow-[0_0_40px_hsl(142_76%_55%/0.4)] transition-all duration-500">
                <Shield className="w-8 h-8 text-success group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-success transition-colors">Secure & Reliable</h3>
              <p className="text-muted-foreground leading-relaxed">
                Enterprise-grade security with encrypted data storage and role-based access control.
              </p>
            </Card>

            <Card className="p-8 group hover-lift border-secondary/20 hover:border-secondary/50 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:shadow-neon-purple transition-all duration-500">
                <BarChart3 className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-secondary transition-colors">Analytics Dashboard</h3>
              <p className="text-muted-foreground leading-relaxed">
                Comprehensive insights and reports on attendance patterns, trends, and performance metrics.
              </p>
            </Card>

            <Card className="p-8 group hover-lift border-primary/20 hover:border-primary/50 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:shadow-neon-teal transition-all duration-500">
                <Users className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Multi-Role Access</h3>
              <p className="text-muted-foreground leading-relaxed">
                Customized dashboards for students, teachers, and administrators with role-specific features.
              </p>
            </Card>

            <Card className="p-8 group hover-lift border-accent/20 hover:border-accent/50 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:shadow-neon-gold transition-all duration-500">
                <CheckCircle className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">Easy Integration</h3>
              <p className="text-muted-foreground leading-relaxed">
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
      <section className="py-32 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(178_100%_55%/0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(264_80%_60%/0.15),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Ready to Transform</span>
            <br />
            <span className="text-foreground">Your Attendance Management?</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join hundreds of institutions already using SmartAttend for efficient, automated attendance tracking.
          </p>
          <Button 
            asChild 
            size="lg"
            className="px-10 py-8 text-xl font-bold bg-gradient-primary hover:scale-110 shadow-neon-teal hover:shadow-neon-purple transition-all duration-500"
          >
            <Link to="/auth">Start Your Free Trial</Link>
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }} />
      </section>

      {/* Footer */}
      <footer className="glass-card border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-neon-teal">
                <Wifi className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">SmartAttend</span>
            </div>
            <p className="text-muted-foreground text-center">
              © 2025 SmartAttend. All rights reserved. | Next-Gen IoT Attendance Management
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
