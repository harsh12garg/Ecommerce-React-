
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ui/product-card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useShop } from '@/contexts/ShopContext';
import { Separator } from '@/components/ui/separator';

const Wishlist = () => {
  const { wishlist, clearWishlist } = useShop();

  if (wishlist.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like you haven't added any products to your wishlist yet.
            Browse our products and add items you love.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold flex items-center">
              <Heart className="mr-2 h-6 w-6" />
              My Wishlist ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
            </h1>
            <p className="text-muted-foreground mt-1">
              Products you've saved for later
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              asChild
              className="flex items-center"
            >
              <Link to="/cart">
                <ShoppingCart size={18} className="mr-2" />
                View Cart
              </Link>
            </Button>
            
            {wishlist.length > 0 && (
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-destructive"
                onClick={clearWishlist}
              >
                Clear Wishlist
              </Button>
            )}
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <ProductCard key={item.product.id} product={item.product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
