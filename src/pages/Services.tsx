import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Globe, Smartphone, Code, Wrench, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Services = () => {
  // Cursor following functionality
  useEffect(() => {
    const cursorFollower = document.getElementById('cursor-follower');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      const speed = 0.1;
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;
      
      if (cursorFollower) {
        cursorFollower.style.left = cursorX - 10 + 'px';
        cursorFollower.style.top = cursorY - 10 + 'px';
      }
      
      requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    const handleMouseEnter = () => {
      if (cursorFollower) {
        cursorFollower.style.transform = 'scale(2)';
        cursorFollower.style.background = 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(168, 85, 247, 0.2) 70%, transparent 100%)';
        cursorFollower.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.8), 0 0 60px rgba(168, 85, 247, 0.6)';
      }
    };

    const handleMouseLeave = () => {
      if (cursorFollower) {
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.background = 'radial-gradient(circle, rgba(96, 165, 250, 0.8) 0%, rgba(96, 165, 250, 0.2) 70%, transparent 100%)';
        cursorFollower.style.boxShadow = '0 0 20px rgba(96, 165, 250, 0.6), 0 0 40px rgba(96, 165, 250, 0.4)';
      }
    };

    // Only attach hover effects to non-navigation elements to avoid interfering with links
    const interactiveElements = document.querySelectorAll('button, .card, .hover-glow');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const services = [
    {
      icon: <Globe className="h-12 w-12 text-blue-400" />,
      title: "Website Development",
      description: "Modern, responsive websites built with cutting-edge technologies",
      features: [
        "Custom React/Next.js applications",
        "Responsive design for all devices",
        "SEO optimization",
        "Performance optimization",
        "CMS integration",
        "E-commerce solutions"
      ],
      price: "Starting at ₹2,49,999"
    },
    {
      icon: <Smartphone className="h-12 w-12 text-purple-400" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: [
        "React Native development",
        "Native iOS/Android apps",
        "Cross-platform solutions",
        "App Store deployment",
        "Push notifications",
        "Offline functionality"
      ],
      price: "Starting at ₹4,99,999"
    },
    {
      icon: <Code className="h-12 w-12 text-teal-400" />,
      title: "Full-stack Solutions",
      description: "Complete end-to-end applications with backend and database",
      features: [
        "API development",
        "Database design",
        "Cloud deployment",
        "Authentication systems",
        "Real-time features",
        "Scalable architecture"
      ],
      price: "Starting at ₹5,99,999"
    },
    {
      icon: <Wrench className="h-12 w-12 text-orange-400" />,
      title: "Maintenance & Support",
      description: "Ongoing support and maintenance for your applications",
      features: [
        "Bug fixes and updates",
        "Performance monitoring",
        "Security updates",
        "Feature enhancements",
        "24/7 support",
        "Regular backups"
      ],
      price: "Starting at ₹24,999/month"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We start by understanding your requirements, goals, and target audience to create a detailed project plan."
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description: "Creating wireframes and prototypes to visualize the user experience and get your approval before development."
    },
    {
      step: "03",
      title: "Development",
      description: "Building your application using modern technologies with regular updates and feedback sessions."
    },
    {
      step: "04",
      title: "Testing & Launch",
      description: "Thorough testing across all devices and platforms, followed by deployment and launch support."
    },
    {
      step: "05",
      title: "Support & Maintenance",
      description: "Ongoing support, updates, and maintenance to ensure your application runs smoothly."
    }
  ];

  return (
    <div className="min-h-screen bg-background futuristic-cursor relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float-particles"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <Navigation />
      
      <div className="pt-20 pb-16 px-4 relative z-10">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <Card 
                key={index} 
                id={['website', 'mobile', 'fullstack', 'maintenance'][index]}
                className="glass-effect hover-glow transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="mb-6 flex justify-center animate-float">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-center">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 text-center">{service.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center border-t border-border pt-6">
                    <div className="text-2xl font-bold text-gradient mb-4">{service.price}</div>
                    <Button asChild className="w-full hover-glow">
                      <Link to="/contact">
                        Start Project <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Process Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">My Development Process</h2>
            <div className="space-y-8">
              {process.map((item, index) => (
                <Card key={index} className="glass-effect">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                      <div className="text-4xl font-bold text-gradient flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Choose Me */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Me?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Quality Code",
                  description: "Clean, maintainable, and scalable code following best practices and industry standards."
                },
                {
                  title: "Fast Delivery",
                  description: "Efficient development process with regular updates and on-time project delivery."
                },
                {
                  title: "Ongoing Support",
                  description: "Continuous support and maintenance to ensure your application stays up-to-date."
                }
              ].map((item, index) => (
                <Card key={index} className="glass-effect text-center">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="glass-effect max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-muted-foreground mb-6">
                  Let's discuss your project requirements and create something amazing together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="hover-glow">
                    <Link to="/contact">
                      Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="hover-glow">
                    <Link to="/pricing">View Pricing Plans</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Animated Cursor Follower */}
      <div id="cursor-follower" className="cursor-follower"></div>
    </div>
  );
};

export default Services;
