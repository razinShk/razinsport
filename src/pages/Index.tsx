import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, Code, Smartphone, Globe, Star, Play, Pause } from 'lucide-react';
import { useEffect, useState } from 'react';

const Index = () => {
  // Video playlist state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const videoPlaylist = [
    {
      src: "/videos/1vid.mp4",
      title: "Introduction"
    },
    {
      src: "/videos/2vidRazin.mp4", 
      title: "Portfolio Showcase"
    },
    {
      src: "/videos/3vidlowerRazin.mp4",
      title: "Skills & Experience"
    }
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Website"
    },
    {
      id: 2,
      title: "Fitness Tracking App",
      description: "Cross-platform mobile app built with React Native",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
      tech: ["React Native", "Firebase", "Redux"],
      category: "Mobile App"
    },
    {
      id: 3,
      title: "Project Management Tool",
      description: "Full-stack project management solution with real-time collaboration",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&h=300&fit=crop",
      tech: ["Next.js", "PostgreSQL", "Socket.io"],
      category: "Full Stack"
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "30+", label: "Happy Clients" },
    { number: "3+", label: "Years Experience" },
    { number: "99%", label: "Client Satisfaction" }
  ];

  // Handle video end - move to next video
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoPlaylist.length);
  };

  // Handle manual video control
  const togglePlayPause = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle video click to go to next video
  const nextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoPlaylist.length);
  };

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

    // Start cursor animation
    document.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    // Handle hover effects
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

    // Add hover effects to interactive elements
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

  return (
    <div className="min-h-screen bg-background futuristic-cursor">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
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

        {/* Falling Stars Animation - Only on Landing Page */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="falling-star animate-star-fall"
              style={{
                left: `${Math.random() * 20}%`,
                top: `${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 6}s`
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-left">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-gradient neon-glow">Razin Shaikh</span>
                <br />
                <span className="text-2xl md:text-4xl lg:text-5xl font-normal text-slate-300">
                  Full Stack & Mobile App Developer
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-8 max-w-xl leading-relaxed">
                Building high-performance websites & apps for web, Android, and iOS. 
                Transforming ideas into digital reality with cutting-edge technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="hover-glow futuristic-button">
                  <Link to="/projects">
                    Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="hover-glow futuristic-button-outline">
                  <Link to="/contact">Hire Me</Link>
                </Button>
              </div>
            </div>

            {/* Right Video Section */}
            <div className="relative animate-fade-in-right">
              <div className="relative">
                {/* Video Playlist */}
                <div className="relative overflow-hidden rounded-2xl group cursor-pointer" onClick={nextVideo}>
                  <video 
                    id="hero-video"
                    key={currentVideoIndex} // Force re-render when video changes
                    src={videoPlaylist[currentVideoIndex].src}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                    onEnded={handleVideoEnd}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onError={(e) => {
                      // Fallback to image if video fails to load
                      const target = e.target as HTMLVideoElement;
                      const img = document.createElement('img');
                      img.src = "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop";
                      img.alt = "Futuristic Technology";
                      img.className = "w-full h-[500px] object-cover transition-transform duration-500 hover:scale-105";
                      target.parentNode?.replaceChild(img, target);
                    }}
                  />
                  
                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-purple-500/20 mix-blend-overlay"></div>
                  <div className="absolute inset-0 border-2 border-blue-400/50 rounded-2xl neon-border"></div>
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                      <ArrowRight className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
                    <div className="text-xs opacity-80 mb-1">
                      {currentVideoIndex + 1} / {videoPlaylist.length}
                    </div>
                    <div className="text-sm font-medium">
                      {videoPlaylist[currentVideoIndex].title}
                    </div>
                  </div>
                  
                  {/* Live Indicator */}
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    LIVE
                  </div>

                  {/* Play/Pause Button */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-black/70 transition-colors" onClick={(e) => {
                    e.stopPropagation();
                    togglePlayPause();
                  }}>
                    {isPlaying ? (
                      <Pause className="h-4 w-4 text-white" />
                    ) : (
                      <Play className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>

                {/* Video Playlist Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  {videoPlaylist.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentVideoIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentVideoIndex 
                          ? 'bg-blue-400 scale-125' 
                          : 'bg-slate-600 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full blur-xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Circuit Pattern Overlay */}
                <div className="absolute top-4 left-4 w-32 h-32 opacity-30">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                    <path d="M10 10 L90 10 L90 30 L70 30 L70 50 L90 50 L90 90 L10 90 Z" 
                          fill="none" 
                          stroke="url(#circuit-gradient)" 
                          strokeWidth="2"
                          className="animate-pulse" />
                    <circle cx="70" cy="30" r="3" fill="#60a5fa" className="animate-ping" />
                    <circle cx="70" cy="50" r="3" fill="#a855f7" className="animate-ping" style={{ animationDelay: '0.5s' }} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Cursor Follower */}
        <div id="cursor-follower" className="cursor-follower"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Skills Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What I Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="h-12 w-12 text-blue-400" />,
                title: "Website Development",
                description: "Modern, responsive websites built with React, Next.js, and cutting-edge technologies"
              },
              {
                icon: <Smartphone className="h-12 w-12 text-purple-400" />,
                title: "Mobile App Development",
                description: "Native and cross-platform mobile apps for Android and iOS using React Native and Flutter"
              },
              {
                icon: <Code className="h-12 w-12 text-teal-400" />,
                title: "Full-stack Solutions",
                description: "Complete end-to-end solutions with modern backends, databases, and cloud infrastructure"
              }
            ].map((service, index) => (
              <Card key={index} className="glass-effect hover-glow transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center animate-float">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground">Some of my recent work that I'm proud of</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={project.id} className="glass-effect hover-glow transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-md text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/projects">View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg" className="hover-glow">
              <Link to="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStart",
                content: "Razin delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise is outstanding.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Product Manager, InnovateCorp",
                content: "Working with Razin was a pleasure. He built our mobile app with incredible efficiency and quality. Highly recommended!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="glass-effect">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Card className="glass-effect max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-muted-foreground mb-6">
                Let's discuss how I can help bring your ideas to life with modern technology and clean code.
              </p>
              <Button asChild size="lg" className="hover-glow">
                <Link to="/contact">
                  Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
