
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070" 
            alt="About us" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container-custom relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Elegance</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Creating exceptional products with meticulous attention to detail.
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold">Our Story</h2>
              <p className="text-muted-foreground">
                Founded in 2015, Elegance was born from a passion for beautifully crafted products that enhance everyday life. What started as a small boutique has grown into a curated destination for those who appreciate quality, design, and functionality.
              </p>
              <p className="text-muted-foreground">
                Our journey has been guided by a simple principle: to offer products that combine aesthetic excellence with practical utility. We believe that the objects we surround ourselves with should not only serve their purpose but also bring joy through their thoughtful design.
              </p>
              <p className="text-muted-foreground">
                Today, we continue to partner with talented designers and ethical manufacturers from around the world to bring you a collection that celebrates craftsmanship and innovation.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070" 
                alt="Our story" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-lg -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      <Separator />
      
      {/* Our Values */}
      <section className="py-20 bg-secondary">
        <div className="container-custom">
          <h2 className="text-3xl font-semibold text-center mb-16">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-background p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-semibold text-primary">01</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality Craftsmanship</h3>
              <p className="text-muted-foreground">
                We believe in products that last. Each item in our collection is chosen for its exceptional craftsmanship, premium materials, and attention to detail.
              </p>
            </div>
            
            <div className="bg-background p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-semibold text-primary">02</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Thoughtful Design</h3>
              <p className="text-muted-foreground">
                We celebrate design that balances form and function. Our products are not only beautiful but also practical, enhancing your everyday experiences.
              </p>
            </div>
            
            <div className="bg-background p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-semibold text-primary">03</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Ethical Practices</h3>
              <p className="text-muted-foreground">
                We are committed to responsible business practices. This means fair partnerships with our suppliers and minimizing our environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-semibold text-center mb-6">Meet Our Team</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            The passionate individuals who bring Elegance to life every day. Our diverse team shares a common dedication to excellence and customer satisfaction.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team member 1 */}
            <div className="text-center">
              <div className="mb-4 relative overflow-hidden rounded-lg aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1287" 
                  alt="James Wilson" 
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                />
              </div>
              <h3 className="font-semibold text-lg">James Wilson</h3>
              <p className="text-primary">Founder & CEO</p>
            </div>
            
            {/* Team member 2 */}
            <div className="text-center">
              <div className="mb-4 relative overflow-hidden rounded-lg aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1288" 
                  alt="Sarah Chen" 
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                />
              </div>
              <h3 className="font-semibold text-lg">Sarah Chen</h3>
              <p className="text-primary">Creative Director</p>
            </div>
            
            {/* Team member 3 */}
            <div className="text-center">
              <div className="mb-4 relative overflow-hidden rounded-lg aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1287" 
                  alt="David Martinez" 
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                />
              </div>
              <h3 className="font-semibold text-lg">David Martinez</h3>
              <p className="text-primary">Product Manager</p>
            </div>
            
            {/* Team member 4 */}
            <div className="text-center">
              <div className="mb-4 relative overflow-hidden rounded-lg aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361" 
                  alt="Emma Taylor" 
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                />
              </div>
              <h3 className="font-semibold text-lg">Emma Taylor</h3>
              <p className="text-primary">Customer Experience</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
