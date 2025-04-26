
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Footer links
  const shopLinks = [
    { label: 'All Products', path: '/products' },
    { label: 'New Arrivals', path: '/products/new-arrivals' },
    { label: 'Featured', path: '/products/featured' },
    { label: 'Discounts', path: '/products/discounts' },
  ];
  
  const companyLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blog', path: '/blog' },
  ];
  
  const supportLinks = [
    { label: 'Help Center', path: '/help' },
    { label: 'Returns & Refunds', path: '/returns' },
    { label: 'Shipping Info', path: '/shipping' },
    { label: 'Track Order', path: '/track-order' },
  ];
  
  const legalLinks = [
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Cookie Policy', path: '/cookies' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Subscription logic would go here
  };

  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container-custom">
        {/* Top section with subscription */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Stay in the loop</h3>
            <p className="text-muted-foreground max-w-md">
              Subscribe to our newsletter to receive updates on new products, special offers, and styling tips.
            </p>
          </div>
          
          <div className="flex items-end">
            <form onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 rounded-full"
                required
              />
              <Button type="submit" className="rounded-full" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Main footer links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Shop</h4>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <span>123 Commerce St, Suite 100, City, State 12345</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} />
                <span>support@elegance.com</span>
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="flex gap-4 pt-4">
              <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              &copy; {currentYear} Elegance. All rights reserved.
            </div>
            
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <Link 
                  key={link.label} 
                  to={link.path} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
