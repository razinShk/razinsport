
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ExternalLink, Github, Filter } from 'lucide-react';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Website', 'Mobile App', 'Full Stack'];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A comprehensive e-commerce solution with payment integration, inventory management, and admin dashboard. Built with modern React architecture and scalable backend.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      category: "Full Stack",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      challenges: "Implemented complex state management for cart functionality and integrated multiple payment gateways.",
      featured: true
    },
    {
      id: 2,
      title: "Fitness Tracking App",
      description: "Cross-platform mobile app for fitness enthusiasts with workout tracking, progress monitoring, and social features.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      tech: ["React Native", "Firebase", "Redux", "Expo"],
      category: "Mobile App",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      challenges: "Optimized app performance for real-time data synchronization and offline functionality.",
      featured: true
    },
    {
      id: 3,
      title: "Project Management Tool",
      description: "Collaborative project management platform with real-time updates, task tracking, and team communication features.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop",
      tech: ["Next.js", "PostgreSQL", "Socket.io", "TypeScript"],
      category: "Full Stack",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      challenges: "Implemented real-time collaboration features and complex permission systems.",
      featured: true
    },
    {
      id: 4,
      title: "Restaurant Website",
      description: "Modern restaurant website with online ordering, reservation system, and menu management.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
      tech: ["React", "Gatsby", "Contentful", "Stripe"],
      category: "Website",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      challenges: "Created smooth animations and optimized loading times for menu images.",
      featured: false
    },
    {
      id: 5,
      title: "Travel Planning App",
      description: "Mobile app for planning trips with itinerary management, expense tracking, and location services.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
      tech: ["Flutter", "Firebase", "Google Maps API", "Dart"],
      category: "Mobile App",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      challenges: "Integrated complex mapping features and offline data storage.",
      featured: false
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "Responsive portfolio website for a creative agency with smooth animations and modern design.",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=600&h=400&fit=crop",
      tech: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
      category: "Website",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      challenges: "Implemented complex 3D animations while maintaining smooth performance.",
      featured: false
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work and the technologies I've used to bring ideas to life
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="hover-glow"
              >
                <Filter className="mr-2 h-4 w-4" />
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className="glass-effect hover-glow transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="aspect-video overflow-hidden relative">
                  {project.featured && (
                    <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-400 to-purple-400">
                      Featured
                    </Badge>
                  )}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Project Details Modal would go here */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No projects found in this category.
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Card className="glass-effect max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">Like What You See?</h2>
                <p className="text-muted-foreground mb-6">
                  Let's work together to create something amazing for your business.
                </p>
                <Button asChild size="lg" className="hover-glow">
                  <a href="/contact">Start Your Project</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
