
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/data/products';
import { useShop } from '@/contexts/ShopContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart, addToWishlist, isInWishlist, isInCart } = useShop();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
  };
  
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToWishlist(product);
  };

  const discountPercentage = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <Link 
      to={`/products/${product.id}`} 
      className={cn("product-card group bg-background dark:bg-zinc-800 border dark:border-zinc-700", className)}
    >
      {/* Product image and badges */}
      <div className="product-image-wrapper">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          loading="lazy"
        />
        
        {/* Status badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.new && (
            <Badge className="bg-primary text-white">New</Badge>
          )}
          {product.bestSeller && (
            <Badge className="bg-amber-500 text-white">Best Seller</Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="bg-red-500 text-white">-{discountPercentage}%</Badge>
          )}
        </div>
        
        {/* Quick actions */}
        <div className="absolute bottom-2 left-2 right-2 flex gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <Button 
            variant={isInWishlist(product.id) ? "default" : "secondary"}
            size="icon" 
            className={cn(
              "rounded-full shadow-md", 
              isInWishlist(product.id) && "bg-red-500 hover:bg-red-600"
            )} 
            onClick={handleAddToWishlist}
            aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={18} className={isInWishlist(product.id) ? "fill-white" : ""} />
          </Button>
          <Button 
            className={cn(
              "flex-1 rounded-full shadow-md",
              isInCart(product.id) && "bg-green-600 hover:bg-green-700"
            )} 
            onClick={handleAddToCart}
            aria-label={isInCart(product.id) ? "Added to cart" : "Add to cart"}
          >
            <ShoppingCart size={18} className="mr-2" />
            {isInCart(product.id) ? "Added" : "Add to Cart"}
          </Button>
        </div>
      </div>
      
      {/* Product details */}
      <div className="p-4 space-y-2">
        <div className="text-sm text-muted-foreground">{product.category}</div>
        <h3 className="font-medium line-clamp-1">{product.name}</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-sm">
            <span className="text-amber-500">★</span>
            <span>{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
