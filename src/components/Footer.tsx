import { Link } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border relative z-20">
      <div className="container mx-auto px-4 py-12 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gradient">Razin Shaikh</h3>
            <p className="text-muted-foreground">
              Full Stack & Mobile App Developer building innovative digital solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/razinShk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-400 transition-colors relative z-40"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/razin-shaikh-a72a30343/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-400 transition-colors relative z-40"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Projects', path: '/projects' },
                { name: 'Pricing', path: '/pricing' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-muted-foreground hover:text-blue-400 transition-colors block py-1 relative z-40"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                { name: 'Website Development', id: 'website' },
                { name: 'Mobile Apps', id: 'mobile' },
                { name: 'Full-stack Solutions', id: 'fullstack' },
                { name: 'Maintenance', id: 'maintenance' }
              ].map((service) => (
                <li key={service.name}>
                  <Link
                    to={`/services#${service.id}`}
                    className="text-muted-foreground hover:text-blue-400 transition-colors block py-1 relative z-40"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:razinshaikh3133@gmail.com"
                  className="text-muted-foreground hover:text-blue-400 transition-colors block py-1 relative z-40"
                >
                  Send Email
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919665448256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue-400 transition-colors block py-1 relative z-40"
                >
                  WhatsApp Chat
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-blue-400 transition-colors block py-1 relative z-40"
                >
                  Contact Form
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-muted-foreground hover:text-blue-400 transition-colors block py-1 relative z-40"
                >
                  View Pricing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center relative z-30">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Razin Shaikh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
