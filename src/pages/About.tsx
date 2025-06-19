
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Download, Code, Smartphone, Globe, Database, Cloud, Users } from 'lucide-react';

const About = () => {
  const skills = [
    { name: "React", level: 95, icon: <Code className="h-5 w-5" /> },
    { name: "Node.js", level: 90, icon: <Database className="h-5 w-5" /> },
    { name: "React Native", level: 88, icon: <Smartphone className="h-5 w-5" /> },
    { name: "Next.js", level: 92, icon: <Globe className="h-5 w-5" /> },
    { name: "MongoDB", level: 85, icon: <Database className="h-5 w-5" /> },
    { name: "AWS", level: 80, icon: <Cloud className="h-5 w-5" /> },
  ];

  const experience = [
    {
      role: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      period: "2022 - Present",
      description: "Led development of multiple web and mobile applications, mentored junior developers, and architected scalable solutions."
    },
    {
      role: "Mobile App Developer",
      company: "InnovateMobile",
      period: "2021 - 2022",
      description: "Developed cross-platform mobile applications using React Native and Flutter for various clients."
    },
    {
      role: "Frontend Developer",
      company: "WebSolutions Inc",
      period: "2020 - 2021",
      description: "Built responsive web applications using React and modern frontend technologies."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate developer with 3+ years of experience creating innovative digital solutions
            </p>
          </div>

          {/* Bio Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="animate-slide-in">
              <Card className="glass-effect h-full">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">My Story</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Hello! I'm Razin Shaikh, a passionate full-stack developer with a love for creating 
                      digital experiences that make a difference. My journey in tech began 3 years ago when 
                      I discovered the power of code to solve real-world problems.
                    </p>
                    <p>
                      I specialize in modern web technologies like React, Node.js, and cloud platforms, 
                      as well as mobile app development for both Android and iOS. My approach combines 
                      technical expertise with creative problem-solving to deliver solutions that are 
                      both functional and beautiful.
                    </p>
                    <p>
                      When I'm not coding, you can find me exploring new technologies, contributing to 
                      open-source projects, or sharing knowledge with the developer community through 
                      blogs and mentoring.
                    </p>
                  </div>
                  <Button className="mt-6 hover-glow">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="animate-fade-in">
              <Card className="glass-effect h-full">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Quick Facts</h2>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Users className="h-6 w-6 text-blue-400" />
                      <div>
                        <div className="font-semibold">30+ Happy Clients</div>
                        <div className="text-sm text-muted-foreground">Worldwide</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Code className="h-6 w-6 text-purple-400" />
                      <div>
                        <div className="font-semibold">50+ Projects</div>
                        <div className="text-sm text-muted-foreground">Successfully Delivered</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Globe className="h-6 w-6 text-teal-400" />
                      <div>
                        <div className="font-semibold">Remote Collaboration</div>
                        <div className="text-sm text-muted-foreground">Available Globally</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Smartphone className="h-6 w-6 text-green-400" />
                      <div>
                        <div className="font-semibold">Cross-Platform Expert</div>
                        <div className="text-sm text-muted-foreground">Web, iOS & Android</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <Card key={skill.name} className="glass-effect">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {skill.icon}
                        <span className="font-semibold">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <Card key={index} className="glass-effect">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-semibold">{exp.role}</h3>
                      <span className="text-blue-400 font-medium">{exp.period}</span>
                    </div>
                    <div className="text-muted-foreground mb-3">{exp.company}</div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Technologies I Work With</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'React', 'Node.js', 'TypeScript', 'Next.js', 'React Native', 'Flutter',
                'MongoDB', 'PostgreSQL', 'Firebase', 'AWS', 'Docker', 'Git',
                'Tailwind CSS', 'Material-UI', 'Express.js', 'GraphQL'
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm hover:bg-blue-500/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
