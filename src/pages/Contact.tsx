import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageCircle, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });

  // Get current domain for redirect
  const redirectUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/contact?success=true`
    : 'https://razinshk.netlify.app/contact?success=true';

  // Check for success parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message. I'll get back to you within 24 hours.",
      });
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [toast]);

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

  const handleSubmit = (e: React.FormEvent) => {
    // Don't prevent default - let FormSubmit handle the submission
    toast({
      title: "Sending Message...",
      description: "Your message is being sent. You'll be redirected to a confirmation page.",
    });

    // Reset form state after a short delay
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        projectType: '',
        budget: '',
        message: ''
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to start your project? Let's discuss how I can help bring your ideas to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-in">
              <Card className="glass-effect">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
                  <form 
                    action="https://formsubmit.co/razinshaikh3133@gmail.com" 
                    method="POST"
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    {/* Hidden FormSubmit configuration fields */}
                    <input type="hidden" name="_subject" value="New Contact Form Submission - Portfolio Website" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_next" value={redirectUrl} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Project Type</label>
                        <select 
                          name="project_type"
                          value={formData.projectType}
                          onChange={(e) => handleInputChange('projectType', e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        >
                          <option value="">Select project type</option>
                          <option value="website">Website Development</option>
                          <option value="mobile">Mobile App</option>
                          <option value="fullstack">Full-stack Solution</option>
                          <option value="maintenance">Maintenance & Support</option>
                          <option value="consultation">Consultation</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Budget Range</label>
                        <select 
                          name="budget_range"
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        >
                          <option value="">Select budget range</option>
                          <option value="under-5k">Under ₹4,00,000</option>
                          <option value="5k-10k">₹4,00,000 - ₹8,00,000</option>
                          <option value="10k-25k">₹8,00,000 - ₹20,00,000</option>
                          <option value="25k-50k">₹20,00,000 - ₹40,00,000</option>
                          <option value="50k-plus">₹40,00,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Project Details *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full hover-glow" size="lg">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8 animate-fade-in">
              {/* Contact Details */}
              <Card className="glass-effect">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground">razinshaikh3133@gmail.com</p>
                        <a 
                          href="mailto:razinshaikh31333@gmail.com"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Send an email
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <MessageCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">WhatsApp</h3>
                        <a 
                          href="https://wa.me/919665448256"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300 transition-colors"
                        >
                          Chat on WhatsApp
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Address</h3>
                        <p className="text-muted-foreground">501. Shantai Heritage, Near Majestic Hotel</p>
                        <p className="text-muted-foreground">Akurdi, Pune - 411035</p>
                        <p className="text-purple-400 mt-1">Available for remote work worldwide</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="glass-effect">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Follow Me</h2>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/razinShk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg hover:scale-110 transition-transform"
                    >
                      <Github className="h-6 w-6 text-white" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/razin-shaikh-a72a30343/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg hover:scale-110 transition-transform"
                    >
                      <Linkedin className="h-6 w-6 text-white" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="glass-effect">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Response Time</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Email inquiries</span>
                      <span className="text-blue-400">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>WhatsApp messages</span>
                      <span className="text-green-400">Within 4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Project consultations</span>
                      <span className="text-purple-400">Same day booking</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "How long does a typical project take?",
                  answer: "Project timelines vary depending on complexity. A simple website takes 2-4 weeks, while complex applications can take 3-6 months. I'll provide a detailed timeline during our consultation."
                },
                {
                  question: "Do you work with international clients?",
                  answer: "Yes! I work with clients worldwide and am comfortable with different time zones. I use modern collaboration tools to ensure smooth communication."
                },
                {
                  question: "What's included in your maintenance packages?",
                  answer: "Maintenance includes bug fixes, security updates, performance optimization, content updates, and technical support. I offer different tiers based on your needs."
                },
                {
                  question: "Can you help with existing projects?",
                  answer: "Absolutely! I can help with bug fixes, feature additions, performance optimization, or complete redesigns of existing applications."
                }
              ].map((faq, index) => (
                <Card key={index} className="glass-effect">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </CardContent>
                </Card>
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

export default Contact;
