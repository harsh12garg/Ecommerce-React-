
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/ui/product-card';
import { categories, getProductsByCategory } from '@/lib/data/products';

const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const category = categories.find(c => c.slug === slug);
  const products = getProductsByCategory(slug || '');
  
  if (!category) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/categories">Browse Categories</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>
        
        <div className="container-custom relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">{category.description}</p>
        </div>
      </section>
      
      <div className="container-custom py-16">
        {/* Subcategories */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Browse {category.name} Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {category.subcategories.map((subcategory) => (
                <Link 
                  key={subcategory.id}
                  to={`/categories/${category.slug}/${subcategory.slug}`}
                  className="flex flex-col items-center justify-center p-6 border border-border rounded-lg hover:border-primary hover:bg-secondary/50 transition-colors text-center group"
                >
                  <span className="font-medium mb-2">{subcategory.name}</span>
                  <ChevronRight 
                    size={16} 
                    className="text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300" 
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Products */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Popular in {category.name}</h2>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-secondary/50 rounded-lg">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">We're constantly adding new products. Check back soon!</p>
              <Button asChild>
                <Link to="/categories">Browse Other Categories</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryDetail;
