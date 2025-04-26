
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/data/products';
import { useToast } from '@/hooks/use-toast';

type CartItem = {
  product: Product;
  quantity: number;
};

type WishlistItem = {
  product: Product;
};

interface ShopContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: number) => boolean;
  isInCart: (productId: number) => boolean;
  cartTotal: number;
  cartCount: number;
}

const ShopContext = createContext<ShopContextType | null>(null);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const { toast } = useToast();
  
  // Initialize state from localStorage if available
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save to localStorage whenever cart or wishlist changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add product to cart
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Update quantity if product already in cart
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new product to cart
        return [...prevCart, { product, quantity }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart.`,
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    
    toast({
      title: "Removed from cart",
      description: "Item removed from your cart.",
    });
  };

  // Update cart item quantity
  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  // Add product to wishlist
  const addToWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      // Check if product is already in wishlist
      const isAlreadyInWishlist = prevWishlist.some(
        item => item.product.id === product.id
      );
      
      if (isAlreadyInWishlist) {
        // If already in wishlist, remove it
        const newWishlist = prevWishlist.filter(
          item => item.product.id !== product.id
        );
        
        toast({
          title: "Removed from wishlist",
          description: `${product.name} removed from your wishlist.`,
        });
        
        return newWishlist;
      } else {
        // Add to wishlist
        toast({
          title: "Added to wishlist",
          description: `${product.name} added to your wishlist.`,
        });
        
        return [...prevWishlist, { product }];
      }
    });
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId: number) => {
    setWishlist(prevWishlist => 
      prevWishlist.filter(item => item.product.id !== productId)
    );
    
    toast({
      title: "Removed from wishlist",
      description: "Item removed from your wishlist.",
    });
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlist([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.product.id === productId);
  };

  // Check if product is in cart
  const isInCart = (productId: number) => {
    return cart.some(item => item.product.id === productId);
  };

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + (item.product.price * item.quantity), 
    0
  );

  // Calculate cart count
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    isInCart,
    cartTotal,
    cartCount
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};
