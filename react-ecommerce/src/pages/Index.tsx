
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/product-card';
import { CategoryCard } from '@/components/ui/category-card';
import { 
  getFeaturedProducts, 
  getNewArrivals, 
  getBestSellers,
  categories 
} from '@/lib/data/products';

const Index = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 8);
  const newArrivals = getNewArrivals().slice(0, 4);
  const bestSellers = getBestSellers().slice(0, 8);
  
  // Animation on scroll
  const animatedEls = useRef<HTMLElement[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      observer.observe(el);
      animatedEls.current.push(el as HTMLElement);
    });
    
    return () => {
      animatedEls.current.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
        
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-2xl text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover Timeless Elegance
            </h1>
            <p className="text-xl text-white/80">
              Curated collections that blend premium quality with modern aesthetics. 
              Elevate your style with our exclusive products.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" asChild className="rounded-full">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                <Link to="/categories">Explore Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-20 animate-on-scroll">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Explore our wide range of products across categories</p>
            </div>
            <Button variant="ghost" asChild className="group">
              <Link to="/categories" className="flex items-center gap-2">
                All Categories <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((category, index) => (
              <CategoryCard 
                key={category.id} 
                {...category} 
                featured={index === 0}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20 bg-secondary animate-on-scroll">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked selections from our catalog</p>
            </div>
            <Button variant="ghost" asChild className="group">
              <Link to="/products/featured" className="flex items-center gap-2">
                View All <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* New Arrivals Banner */}
      <section className="py-20 relative overflow-hidden animate-on-scroll">
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left column - text */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">New Arrivals</h2>
              <p className="text-muted-foreground mb-8 max-w-lg">
                Discover the latest additions to our collection. Fresh designs and innovative products that just arrived.
              </p>
              <Button asChild className="w-fit rounded-full">
                <Link to="/products/new-arrivals">Shop New Arrivals</Link>
              </Button>
            </div>
            
            {/* Right column - product grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Best Sellers */}
      <section className="py-20 bg-secondary animate-on-scroll">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Best Sellers</h2>
              <p className="text-muted-foreground">Our most popular products</p>
            </div>
            <Button variant="ghost" asChild className="group">
              <Link to="/products/best-sellers" className="flex items-center gap-2">
                View All <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-24 relative overflow-hidden animate-on-scroll">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2070" 
            alt="Newsletter background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 backdrop-blur-sm" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Join Our Newsletter</h2>
            <p className="text-white/80 mb-8">
              Subscribe to receive updates on new arrivals, special offers and other discount information.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <Button type="submit" className="rounded-full" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
