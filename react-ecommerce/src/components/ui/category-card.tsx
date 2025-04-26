
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image: string;
  subcategories?: { id: number; name: string; slug: string }[];
  className?: string;
  featured?: boolean;
}

export function CategoryCard({ 
  name, 
  slug, 
  description, 
  image, 
  subcategories, 
  className,
  featured = false
}: CategoryCardProps) {
  return (
    <Link 
      to={`/categories/${slug}`} 
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl bg-background border border-border transition-all duration-300 hover:shadow-lg h-full",
        featured ? "col-span-2 row-span-2" : "",
        className
      )}
    >
      <div className={cn(
        "relative overflow-hidden", 
        featured ? "aspect-[16/9]" : "aspect-square"
      )}>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
          <h3 className="text-xl sm:text-2xl font-semibold mb-2">{name}</h3>
          {description && <p className="text-sm text-white/80 mb-4 line-clamp-2">{description}</p>}
          
          <div className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/20 backdrop-blur-sm rounded-full py-2 px-4 w-fit">
            Explore <ArrowRight size={16} />
          </div>
        </div>
      </div>
      
      {subcategories && subcategories.length > 0 && (
        <div className="p-4 grid grid-cols-2 gap-2">
          {subcategories.slice(0, 4).map((subcat) => (
            <Link 
              key={subcat.id}
              to={`/categories/${slug}/${subcat.slug}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full border border-border hover:border-primary"
              onClick={(e) => e.stopPropagation()}
            >
              {subcat.name}
            </Link>
          ))}
        </div>
      )}
    </Link>
  );
}
