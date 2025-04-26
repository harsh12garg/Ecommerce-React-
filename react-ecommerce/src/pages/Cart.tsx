
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, 
  Trash2, 
  ChevronRight, 
  CreditCard, 
  Shield, 
  TruckIcon 
} from 'lucide-react';
import { useShop } from '@/contexts/ShopContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart,
    cartTotal
  } = useShop();

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet.
            Browse our products and find something you'll love.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const subtotal = cartTotal;
  const shippingEstimate = 0; // Free shipping
  const taxEstimate = subtotal * 0.08; // Example tax rate
  const totalAmount = subtotal + shippingEstimate + taxEstimate;

  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center">
          <ShoppingCart className="mr-2 h-6 w-6" /> 
          Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-background border rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <h2 className="font-medium">Cart Items</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearCart}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Clear Cart
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="w-full sm:w-24 h-24 bg-secondary/50 rounded-lg overflow-hidden flex-shrink-0">
                        <Link to={`/products/${item.product.id}`}>
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between gap-2">
                          <Link to={`/products/${item.product.id}`} className="font-medium hover:underline">
                            {item.product.name}
                          </Link>
                          <div className="font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-1">
                          ${item.product.price.toFixed(2)} each
                        </p>
                        
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center border rounded-md">
                            <button 
                              className="px-3 py-1 text-muted-foreground"
                              onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-3 py-1 border-x">
                              {item.quantity}
                            </span>
                            <button 
                              className="px-3 py-1 text-muted-foreground"
                              onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-secondary/30 p-4 text-sm flex justify-between items-center border-t">
                <span className="flex items-center text-muted-foreground">
                  <TruckIcon size={16} className="mr-1" />
                  Continue shopping for more items
                </span>
                <Link to="/products" className="text-primary flex items-center hover:underline">
                  Browse Products
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-background border rounded-xl p-6 sticky top-24">
              <h2 className="font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping estimate</span>
                  <span className="text-green-600">Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax estimate</span>
                  <span>${taxEstimate.toFixed(2)}</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-medium text-base">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <Button className="w-full mt-6" size="lg">
                <CreditCard size={18} className="mr-2" />
                Checkout
              </Button>
              
              <div className="mt-4 text-xs text-muted-foreground space-y-2">
                <div className="flex items-center">
                  <TruckIcon size={14} className="mr-1" />
                  Free shipping on orders over $50
                </div>
                <div className="flex items-center">
                  <Shield size={14} className="mr-1" />
                  Secure payment processing
                </div>
              </div>
              
              <div className="mt-4">
                <Input placeholder="Enter coupon code" />
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Apply Coupon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
