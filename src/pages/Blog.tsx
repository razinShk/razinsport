import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, Clock, ArrowRight, ChevronDown, ChevronUp, Search, Tag, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
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

  const [expandedPosts, setExpandedPosts] = useState<Record<number, boolean>>({});
  const [expandedFeatured, setExpandedFeatured] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const togglePost = (postId: number) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications: Best Practices for 2024",
      excerpt: "Learn the latest techniques and patterns for building maintainable and scalable React applications that can grow with your business.",
      content: `
        In the rapidly evolving world of web development, building scalable React applications has become more crucial than ever. As businesses grow and user bases expand, developers need to ensure their applications can handle increased complexity and traffic while maintaining performance and maintainability.

        **Key Principles for Scalable React Apps:**

        1. **Component Architecture**: Design reusable, modular components that follow the single responsibility principle. This makes your codebase easier to maintain and test.

        2. **State Management**: Choose the right state management solution for your app size. For smaller apps, React's built-in state might suffice, but larger applications benefit from Redux Toolkit or Zustand.

        3. **Code Splitting**: Implement lazy loading and code splitting to reduce initial bundle size and improve loading times.

        4. **Performance Optimization**: Use React.memo, useMemo, and useCallback strategically to prevent unnecessary re-renders.

        5. **Testing Strategy**: Implement comprehensive testing with Jest and React Testing Library to ensure reliability as your app grows.

        By following these principles and staying updated with the latest React patterns, you can build applications that scale effectively with your business needs.
      `,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      author: "Razin Shaikh",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["React", "JavaScript", "Best Practices"],
      featured: true
    },
    {
      id: 2,
      title: "The Future of Mobile Development: React Native vs Flutter",
      excerpt: "A comprehensive comparison of the two leading cross-platform mobile development frameworks and when to choose each.",
      content: `
        The mobile development landscape has been transformed by cross-platform frameworks, with React Native and Flutter leading the charge. Both offer compelling advantages for developers looking to build apps for multiple platforms with a single codebase.

        **React Native Advantages:**
        - Large ecosystem and community support
        - JavaScript familiarity for web developers
        - Hot reloading for faster development
        - Mature platform with extensive third-party libraries

        **Flutter Advantages:**
        - Consistent UI across platforms
        - Excellent performance with Dart
        - Growing popularity and Google backing
        - Comprehensive widget library

        **When to Choose React Native:**
        - Your team has strong JavaScript/React experience
        - You need extensive third-party integrations
        - Rapid prototyping is a priority

        **When to Choose Flutter:**
        - UI consistency is crucial
        - Performance is the top priority
        - You're starting a new project from scratch

        Both frameworks continue to evolve rapidly, and the choice often comes down to team expertise and specific project requirements.
      `,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      author: "Razin Shaikh",
      date: "2024-01-10",
      readTime: "12 min read",
      tags: ["React Native", "Flutter", "Mobile Development"],
      featured: false
    },
    {
      id: 3,
      title: "Optimizing Web Performance: A Complete Guide",
      excerpt: "Essential techniques for improving website performance, from image optimization to code splitting and lazy loading.",
      content: `
        Web performance is crucial for user experience and SEO rankings. A slow website can lead to high bounce rates and lost conversions. Here's a comprehensive guide to optimizing your web applications for maximum performance.

        **Image Optimization:**
        - Use modern formats like WebP and AVIF
        - Implement responsive images with srcset
        - Lazy load images below the fold
        - Compress images without losing quality

        **Code Splitting and Lazy Loading:**
        - Split your JavaScript bundles by routes
        - Implement dynamic imports for heavy components
        - Use React.lazy() for component-level splitting
        - Load third-party libraries only when needed

        **Caching Strategies:**
        - Implement proper HTTP caching headers
        - Use service workers for offline functionality
        - Cache API responses with appropriate TTLs
        - Utilize CDN for static assets

        **Critical Rendering Path:**
        - Minimize render-blocking resources
        - Inline critical CSS
        - Defer non-critical JavaScript
        - Optimize font loading

        By implementing these techniques, you can significantly improve your website's loading times and overall user experience.
      `,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop",
      author: "Razin Shaikh",
      date: "2024-01-05",
      readTime: "10 min read",
      tags: ["Performance", "Web Development", "Optimization"],
      featured: false
    },
    {
      id: 4,
      title: "Database Design Patterns for Modern Applications",
      excerpt: "Explore common database design patterns and learn how to choose the right approach for your application's needs.",
      content: `
        Database design is the foundation of any robust application. Choosing the right patterns and approaches can make the difference between a scalable system and one that struggles under load.

        **Common Database Patterns:**

        **1. Repository Pattern:**
        - Encapsulates data access logic
        - Provides a uniform interface for data operations
        - Makes testing easier with mock repositories

        **2. Unit of Work Pattern:**
        - Maintains a list of objects affected by business transaction
        - Coordinates writing out changes
        - Ensures data consistency

        **3. Active Record vs Data Mapper:**
        - Active Record: Objects carry both data and behavior
        - Data Mapper: Separates domain objects from database schema
        - Choose based on complexity and ORM preferences

        **Modern Considerations:**
        - NoSQL vs SQL for different use cases
        - Event sourcing for audit trails
        - CQRS for read/write optimization
        - Database sharding strategies

        **Best Practices:**
        - Design for your access patterns
        - Consider eventual consistency
        - Plan for data migration early
        - Monitor and optimize query performance

        The right database design pattern depends on your specific needs, but understanding these fundamentals will help you make informed decisions.
      `,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
      author: "Razin Shaikh",
      date: "2023-12-28",
      readTime: "15 min read",
      tags: ["Database", "Architecture", "Backend"],
      featured: false
    },
    {
      id: 5,
      title: "Getting Started with TypeScript: A Developer's Journey",
      excerpt: "My personal experience learning TypeScript and how it transformed my JavaScript development workflow.",
      content: `
        When I first heard about TypeScript, I was skeptical. "Why add complexity to JavaScript?" I thought. But after diving into it for a recent project, I can confidently say that TypeScript has transformed how I write code.

        **Why I Made the Switch:**
        - Better IDE support with autocomplete and refactoring
        - Catch errors at compile time, not runtime
        - Self-documenting code through type definitions
        - Easier collaboration in team environments

        **Key Learning Points:**
        
        1. **Start Small**: Begin with basic types (string, number, boolean) before moving to complex interfaces.
        
        2. **Embrace Interfaces**: They're your best friend for defining object shapes and ensuring consistency.
        
        3. **Use Union Types**: Perfect for handling multiple possible types in a clean way.
        
        4. **Generic Types**: Powerful for creating reusable components and functions.

        **Common Pitfalls to Avoid:**
        - Don't use 'any' as an escape hatch
        - Understand the difference between types and interfaces
        - Learn when to use strict mode vs. gradual adoption

        The learning curve is worth it. TypeScript has made my code more reliable, maintainable, and enjoyable to write.
      `,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
      author: "Razin Shaikh",
      date: "2023-12-20",
      readTime: "6 min read",
      tags: ["TypeScript", "JavaScript", "Learning"],
      featured: false
    },
    {
      id: 6,
      title: "Building RESTful APIs with Node.js and Express",
      excerpt: "A step-by-step guide to creating robust and scalable REST APIs using Node.js, Express, and modern development practices.",
      content: `
        Building APIs is a core skill for modern developers. A well-designed RESTful API serves as the backbone for web applications, mobile apps, and microservices. Here's how to build them right with Node.js and Express.

        **Setting Up Your Express Server:**
        - Use Express Router for organizing routes
        - Implement proper middleware for logging and error handling
        - Set up CORS and security headers
        - Configure environment variables properly

        **RESTful Design Principles:**
        - Use HTTP methods correctly (GET, POST, PUT, DELETE)
        - Design meaningful resource URLs
        - Return appropriate HTTP status codes
        - Implement consistent response formats

        **Essential Middleware:**
        - Body parsing for JSON and form data
        - Authentication and authorization
        - Rate limiting to prevent abuse
        - Request validation with libraries like Joi

        **Error Handling:**
        - Create custom error classes
        - Implement global error middleware
        - Log errors appropriately
        - Return user-friendly error messages

        **Testing and Documentation:**
        - Write unit tests with Jest
        - Use Swagger/OpenAPI for documentation
        - Implement integration tests
        - Set up continuous integration

        **Security Considerations:**
        - Validate all inputs
        - Use HTTPS in production
        - Implement proper authentication
        - Sanitize user data to prevent injection attacks

        Following these practices will help you build APIs that are maintainable, secure, and scalable.
      `,
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=600&h=400&fit=crop",
      author: "Razin Shaikh",
      date: "2023-12-15",
      readTime: "11 min read",
      tags: ["Node.js", "Express", "API Development"],
      featured: false
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

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
              Tech <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, tutorials, and thoughts on modern web and mobile development
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <Badge className="mb-4 bg-gradient-to-r from-blue-400 to-purple-400">
                Featured Article
              </Badge>
              <Card className="glass-effect hover-glow transition-all duration-300 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="aspect-video lg:aspect-auto overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredPost.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                    <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                    {expandedFeatured && (
                      <div className="text-muted-foreground text-sm mb-6 whitespace-pre-line">
                        {featuredPost.content}
                      </div>
                    )}
                    <Button 
                      className="hover-glow w-fit"
                      onClick={() => setExpandedFeatured(!expandedFeatured)}
                    >
                      {expandedFeatured ? (
                        <>
                          Show Less <ChevronUp className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Read Article <ChevronDown className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <Card key={post.id} className="glass-effect hover-glow transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  {expandedPosts[post.id] && (
                    <div className="text-muted-foreground text-sm mb-4 whitespace-pre-line">
                      {post.content}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => togglePost(post.id)}
                  >
                    {expandedPosts[post.id] ? (
                      <>
                        Show Less <ChevronUp className="ml-2 h-3 w-3" />
                      </>
                    ) : (
                      <>
                        Read More <ChevronDown className="ml-2 h-3 w-3" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 text-center">
            <Card className="glass-effect max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-muted-foreground mb-6">
                  Subscribe to my newsletter for the latest articles on web development, mobile apps, and tech insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-md bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <Button className="hover-glow">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Categories/Tags */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Popular Topics</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['React', 'Node.js', 'TypeScript', 'Mobile Development', 'Performance', 'Best Practices', 'API Development', 'Database'].map((topic) => (
                <Badge 
                  key={topic} 
                  variant="outline" 
                  className="px-4 py-2 hover:bg-blue-400/20 hover:border-blue-400 transition-colors cursor-pointer"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Animated Cursor Follower */}
      <div id="cursor-follower" className="cursor-follower"></div>
    </div>
  );
};

export default Blog;
