
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications: Best Practices for 2024",
      excerpt: "Learn the latest techniques and patterns for building maintainable and scalable React applications that can grow with your business.",
      content: "Full article content would go here...",
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
      content: "Full article content would go here...",
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
      content: "Full article content would go here...",
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
      content: "Full article content would go here...",
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
      content: "Full article content would go here...",
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
      content: "Full article content would go here...",
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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
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
                    <Button className="hover-glow w-fit">
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
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
                  <Button variant="outline" size="sm" className="w-full">
                    Read More
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
    </div>
  );
};

export default Blog;
