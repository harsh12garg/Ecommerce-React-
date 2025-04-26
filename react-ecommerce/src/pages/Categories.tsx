
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { CategoryCard } from '@/components/ui/category-card';
import { categories } from '@/lib/data/products';

const Categories = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <h1 className="text-3xl font-semibold mb-4">Shop by Category</h1>
        <p className="text-muted-foreground mb-12 max-w-2xl">Browse our complete collection organized by category. Find exactly what you're looking for from our extensive range of products.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
