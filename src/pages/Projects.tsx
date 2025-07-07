import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ExternalLink, Github, Filter, RefreshCw, AlertCircle } from 'lucide-react';
import { useFilteredProjects } from '@/hooks/useNetlifyProjects';
import { ProjectData } from '@/types/netlify';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Use custom hook for Netlify projects
  const { 
    projects,
    filteredProjects,
    isLoading, 
    isError, 
    error,
    refetch,
    isRefetching,
    categories: dynamicCategories,
    totalProjects,
    filteredCount,
    hasProjects
  } = useFilteredProjects(selectedCategory, {
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  });

  // Cursor following functionality
  useEffect(() => {
    // Create cursor follower element
    let cursorFollower = document.getElementById('cursor-follower');
    if (!cursorFollower) {
      cursorFollower = document.createElement('div');
      cursorFollower.id = 'cursor-follower';
      cursorFollower.className = 'cursor-follower';
      document.body.appendChild(cursorFollower);
    }

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

    // Attach hover effects to interactive elements
    const attachHoverEffects = () => {
      const interactiveElements = document.querySelectorAll('button, .card, .hover-glow');
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
      
      return interactiveElements;
    };

    const elements = attachHoverEffects();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      elements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [filteredProjects]); // Re-run when projects change

  // Get categories including 'All' option
  const categories = ['All', ...dynamicCategories];

  const handleRefresh = () => {
    refetch();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background futuristic-cursor relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <Navigation />
        <div className="pt-20 pb-16 px-4 relative z-10">
          <div className="container mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading projects from Netlify...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-background futuristic-cursor relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <Navigation />
        <div className="pt-20 pb-16 px-4 relative z-10">
          <div className="container mx-auto">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Failed to Load Projects</h2>
              <p className="text-muted-foreground mb-4">
                {error instanceof Error ? error.message : 'Unable to fetch projects from Netlify'}
              </p>
              <Button onClick={handleRefresh} className="bg-purple-600 hover:bg-purple-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              My <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover my latest work and projects, automatically synced from Netlify. 
              Each project represents a unique challenge and innovative solution.
            </p>
            
            {/* Refresh Button */}
            <div className="flex justify-center mb-8">
              <Button 
                onClick={handleRefresh} 
                disabled={isRefetching}
                className="bg-purple-600 hover:bg-purple-700 hover-glow"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
                {isRefetching ? 'Refreshing...' : 'Refresh Projects'}
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-12 animate-fade-in">
            <div className="flex flex-wrap gap-2 p-1 bg-background/50 backdrop-blur-sm rounded-full border border-border">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-6 py-2 transition-all duration-300 hover-glow ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                      : 'hover:bg-purple-600/10'
                  }`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Count */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              Showing {filteredCount} of {totalProjects} projects
              {hasProjects && (
                <span className="ml-2 text-sm bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full">
                  Live from Netlify
                </span>
              )}
            </p>
          </div>

          {/* Projects Grid */}
          {filteredCount === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {totalProjects === 0 
                  ? 'No projects available. Make sure your Netlify integration is configured.' 
                  : `No projects found in the "${selectedCategory}" category.`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className={`group overflow-hidden bg-background/50 backdrop-blur-sm border-border hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 card animate-fade-in hover-glow ${
                    project.featured ? 'ring-2 ring-purple-500/20' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-purple-600 text-white">
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className={`${
                        project.status === 'published' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                        project.status === 'building' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' :
                        'bg-red-500/20 text-red-400 border-red-500/50'
                      }`}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {project.description}
                      </p>
                      {project.challenges && (
                        <p className="text-xs text-muted-foreground/80 italic">
                          {project.challenges}
                        </p>
                      )}
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary" 
                            className="text-xs bg-purple-600/20 text-purple-400 border-purple-500/30"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-purple-600 hover:bg-purple-700 hover-glow"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                      {project.githubUrl && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-purple-500/50 hover:bg-purple-600/10 hover-glow"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {/* Deploy Info */}
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <p className="text-xs text-muted-foreground">
                        Deployed: {new Date(project.deployedAt).toLocaleDateString()}
                        {project.framework && (
                          <span className="ml-2 text-purple-400">• {project.framework}</span>
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Projects;
