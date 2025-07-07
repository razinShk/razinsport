import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Check, Star, Zap, Crown, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
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

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [promoCode, setPromoCode] = useState('');

  const plans = [
    {
      name: "Starter",
      icon: <Star className="h-6 w-6" />,
      description: "Perfect for small businesses and startups",
      monthlyPrice: 299,
      yearlyPrice: 2990,
      features: [
        "Basic website development",
        "Responsive design",
        "SEO optimization",
        "2 rounds of revisions",
        "Basic support",
        "1 month maintenance"
      ],
      popular: false,
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "Pro",
      icon: <Zap className="h-6 w-6" />,
      description: "Ideal for growing businesses",
      monthlyPrice: 599,
      yearlyPrice: 5990,
      features: [
        "Everything in Starter",
        "Advanced functionality",
        "Database integration",
        "Payment gateway setup",
        "5 rounds of revisions",
        "Priority support",
        "3 months maintenance",
        "Performance optimization"
      ],
      popular: true,
      color: "from-purple-400 to-purple-600"
    },
    {
      name: "Enterprise",
      icon: <Crown className="h-6 w-6" />,
      description: "For large-scale applications",
      monthlyPrice: 999,
      yearlyPrice: 9990,
      features: [
        "Everything in Pro",
        "Custom backend development",
        "Mobile app development",
        "Advanced integrations",
        "Unlimited revisions",
        "24/7 dedicated support",
        "6 months maintenance",
        "Team training",
        "Custom hosting setup"
      ],
      popular: false,
      color: "from-teal-400 to-teal-600"
    }
  ];

  const addOns = [
    { name: "Additional revisions", price: 99 },
    { name: "Rush delivery (50% faster)", price: 499 },
    { name: "Extended maintenance (per month)", price: 199 },
    { name: "Mobile app development", price: 2999 },
    { name: "SEO package", price: 399 },
    { name: "Content management training", price: 299 }
  ];

  const getPrice = (plan: any) => {
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    return billingCycle === 'yearly' ? price / 12 : price;
  };

  const getYearlySavings = (plan: any) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyPrice;
    return monthlyCost - yearlyCost;
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
              Choose Your <span className="text-gradient">Plan</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing options to fit your project needs and budget
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="glass-effect rounded-lg p-1 flex">
              <Button
                variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                onClick={() => setBillingCycle('monthly')}
                className="rounded-md"
              >
                Monthly
              </Button>
              <Button
                variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
                onClick={() => setBillingCycle('yearly')}
                className="rounded-md"
              >
                Yearly
                <Badge className="ml-2 bg-green-500 text-white">Save 17%</Badge>
              </Button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`glass-effect hover-glow transition-all duration-300 relative overflow-hidden ${
                  plan.popular ? 'ring-2 ring-purple-400 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-400 to-blue-400 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`text-center ${plan.popular ? 'pt-8' : ''}`}>
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center text-white`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="text-center">
                  <div className="mb-6">
                    <div className="text-4xl font-bold mb-2">
                      ₹{Math.floor(getPrice(plan))}
                      <span className="text-lg text-muted-foreground">
                        /{billingCycle === 'monthly' ? 'mo' : 'mo'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="text-sm text-green-400">
                        Save ₹{getYearlySavings(plan)} yearly
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8 text-left">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild
                    className={`w-full hover-glow bg-gradient-to-r ${plan.color}`}
                  >
                    <Link to="/contact">
                      Get Started
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Promo Code Section */}
          <div className="max-w-md mx-auto mb-16">
            <Card className="glass-effect">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Have a Promo Code?</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add-ons */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Optional Add-ons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addOns.map((addon, index) => (
                <Card key={index} className="glass-effect">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{addon.name}</span>
                      <span className="text-lg font-bold text-gradient">
                        ₹{addon.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "Can I change my plan later?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise clients."
                },
                {
                  question: "Is there a money-back guarantee?",
                  answer: "Yes, we offer a 14-day money-back guarantee if you're not satisfied with our service."
                },
                {
                  question: "Do you offer custom pricing for large projects?",
                  answer: "Absolutely! Contact us for custom pricing on large-scale or enterprise projects."
                }
              ].map((faq, index) => (
                <Card key={index} className="glass-effect">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
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
                  Choose the plan that fits your needs and let's build something amazing together.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  <strong>Note:</strong> To complete the payment integration, please provide your Stripe or Razorpay API keys and webhook URLs.
                </p>
                <Button asChild size="lg" className="hover-glow">
                  <a href="/contact">Contact for Custom Quote</a>
                </Button>
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

export default Pricing;
