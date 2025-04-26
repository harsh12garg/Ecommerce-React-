
import { useState, useEffect } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { categories } from '@/lib/data/products';

export type FilterOptions = {
  categories: string[];
  priceRange: [number, number];
  rating: number | null;
  onSale: boolean;
  newArrivals: boolean;
};

type ProductFiltersProps = {
  onFilterChange: (filters: FilterOptions) => void;
  maxPrice: number;
  minPrice: number;
  initialFilters?: Partial<FilterOptions>;
  className?: string;
};

export const ProductFilters = ({
  onFilterChange,
  maxPrice,
  minPrice,
  initialFilters = {},
  className = '',
}: ProductFiltersProps) => {
  // Initialize filters with defaults or provided values
  const [filters, setFilters] = useState<FilterOptions>({
    categories: initialFilters.categories || [],
    priceRange: initialFilters.priceRange || [minPrice, maxPrice],
    rating: initialFilters.rating || null,
    onSale: initialFilters.onSale || false,
    newArrivals: initialFilters.newArrivals || false,
  });

  // When the filters state changes, notify parent component
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // Function to handle category checkbox changes
  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category),
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: [minPrice, maxPrice],
      rating: null,
      onSale: false,
      newArrivals: false,
    });
  };

  return (
    <div className={`product-filters space-y-6 ${className}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetFilters}
          className="text-xs flex items-center"
        >
          <X className="h-3 w-3 mr-1" /> Clear all
        </Button>
      </div>
      
      <Accordion type="multiple" defaultValue={["categories", "price", "rating", "status"]}>
        {/* Categories Filter */}
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={filters.categories.includes(category.slug)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.slug, checked === true)
                    }
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Filter */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>${filters.priceRange[0].toFixed(0)}</span>
                <span>${filters.priceRange[1].toFixed(0)}</span>
              </div>
              <Slider
                defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                min={minPrice}
                max={maxPrice}
                step={1}
                onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, priceRange: [value[0], value[1]] }))
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating Filter */}
        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.rating === rating}
                    onCheckedChange={(checked) => 
                      setFilters(prev => ({ 
                        ...prev, 
                        rating: checked ? rating : null 
                      }))
                    }
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    {Array(rating).fill(0).map((_, i) => (
                      <span key={i} className="text-amber-500">★</span>
                    ))}
                    {Array(5 - rating).fill(0).map((_, i) => (
                      <span key={i} className="text-gray-300">★</span>
                    ))}
                    <span className="ml-1">& Up</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Status Filter */}
        <AccordionItem value="status">
          <AccordionTrigger>Product Status</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="on-sale"
                  checked={filters.onSale}
                  onCheckedChange={(checked) => 
                    setFilters(prev => ({ ...prev, onSale: checked === true }))
                  }
                />
                <label
                  htmlFor="on-sale"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  On Sale
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="new-arrivals"
                  checked={filters.newArrivals}
                  onCheckedChange={(checked) => 
                    setFilters(prev => ({ ...prev, newArrivals: checked === true }))
                  }
                />
                <label
                  htmlFor="new-arrivals"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  New Arrivals
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
