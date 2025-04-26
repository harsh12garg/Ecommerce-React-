
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ui/product-card';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, List, Grid, ArrowUpDown } from 'lucide-react';
import { SearchBar } from '@/components/search/SearchBar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFilters, FilterOptions } from '@/components/filters/ProductFilters';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { getAllProducts, Product } from '@/lib/data/products';

// Sorting options type
type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'best-selling' | 'top-rated';

const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  
  // State for products and UI
  const [products, setProducts] = useState<Product[]>(getAllProducts());
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isGridView, setIsGridView] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  
  // Calculate price range for all products
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));
  
  // Initialize filters
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [minPrice, maxPrice],
    rating: null,
    onSale: false,
    newArrivals: false,
  });

  // Apply filters and search whenever dependencies change
  useEffect(() => {
    let result = [...products];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description?.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.some(cat => 
          product.category.toLowerCase().includes(cat.toLowerCase()) ||
          product.subcategory?.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }
    
    // Apply price range filter
    result = result.filter(
      product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    
    // Apply rating filter
    if (filters.rating) {
      result = result.filter(product => product.rating >= filters.rating!);
    }
    
    // Apply sale filter
    if (filters.onSale) {
      result = result.filter(product => product.originalPrice && product.originalPrice > product.price);
    }
    
    // Apply new arrivals filter
    if (filters.newArrivals) {
      result = result.filter(product => product.new);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming newer products have higher IDs or a date field
        result.sort((a, b) => b.id - a.id);
        break;
      case 'best-selling':
        result = result.filter(p => p.bestSeller).concat(result.filter(p => !p.bestSeller));
        break;
      case 'top-rated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        // No sorting needed, default order is assumed to be featured
        break;
    }
    
    setFilteredProducts(result);
  }, [products, filters, sortBy, searchQuery]);

  // Handle search from the search bar
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Browse our collection of high-quality products
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            className="max-w-xl" 
            onSearch={handleSearch}
            initialValue={searchQuery}
          />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 shrink-0">
            <ProductFilters
              onFilterChange={setFilters}
              minPrice={minPrice}
              maxPrice={maxPrice}
              initialFilters={filters}
            />
          </div>
          
          {/* Mobile Filter Button & Sheet */}
          <div className="lg:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center w-full justify-between">
                  <span className="flex items-center">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </span>
                  <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-1">
                    {Object.values(filters).flat().filter(Boolean).length}
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-md overflow-auto">
                <ProductFilters
                  onFilterChange={setFilters}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  initialFilters={filters}
                  className="pt-4"
                />
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Products Section */}
          <div className="flex-1">
            {/* Sort & View Controls */}
            <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortOption)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="best-selling">Best Selling</SelectItem>
                    <SelectItem value="top-rated">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">View:</span>
                <div className="flex border rounded-md overflow-hidden">
                  <Button
                    variant={isGridView ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none"
                    onClick={() => setIsGridView(true)}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={!isGridView ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none"
                    onClick={() => setIsGridView(false)}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
            
            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={`${isGridView 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "flex flex-col space-y-4"}`}
              >
                {filteredProducts.map((product) => (
                  <div key={product.id} className={!isGridView ? "border rounded-lg p-4" : ""}>
                    {isGridView ? (
                      <ProductCard product={product} />
                    ) : (
                      <div className="flex gap-4">
                        <div className="w-32 h-32 shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{product.name}</h3>
                          <div className="flex items-center gap-1 text-sm mt-1">
                            <span className="text-amber-500">★</span>
                            <span>{product.rating}</span>
                            <span className="text-muted-foreground">({product.reviews})</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {product.description || "No description available"}
                          </p>
                          <div className="flex items-baseline gap-2 mt-2">
                            <span className="font-semibold">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-secondary/50">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFilters({
                      categories: [],
                      priceRange: [minPrice, maxPrice],
                      rating: null,
                      onSale: false,
                      newArrivals: false,
                    });
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
