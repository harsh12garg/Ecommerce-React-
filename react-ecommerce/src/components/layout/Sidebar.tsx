
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronRight, Home, ShoppingBag, Grid, Info, User, Heart, ShoppingCart, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const categories = [
  { id: 1, name: 'Electronics', slug: 'electronics' },
  { id: 2, name: 'Clothing', slug: 'clothing' },
  { id: 3, name: 'Home & Kitchen', slug: 'home-kitchen' },
  { id: 4, name: 'Beauty', slug: 'beauty' },
  { id: 5, name: 'Books', slug: 'books' },
  { id: 6, name: 'Sports', slug: 'sports' },
  { id: 7, name: 'Toys', slug: 'toys' },
  { id: 8, name: 'Jewelry', slug: 'jewelry' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  
  // Menu items
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: ShoppingBag, label: 'Shop', path: '/products' },
    { icon: Grid, label: 'Categories', path: '/categories' },
    { icon: Info, label: 'About', path: '/about' },
  ];
  
  // Account items
  const accountItems = [
    { icon: User, label: 'Account', path: '/account' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: ShoppingCart, label: 'Orders', path: '/orders' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 h-screen w-[300px] bg-background z-50 shadow-xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close sidebar">
              <X size={20} />
            </Button>
          </div>
          
          <Separator />
          
          {/* Scrollable content */}
          <ScrollArea className="flex-1 px-6">
            {/* Main menu */}
            <nav className="py-6">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link 
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-2 py-2 rounded-md hover:bg-secondary transition-colors",
                        location.pathname === item.path && "bg-secondary font-medium"
                      )}
                      onClick={onClose}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <Separator className="my-2" />
            
            {/* Categories */}
            <div className="py-6">
              <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Categories</h3>
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link 
                      to={`/categories/${category.slug}`}
                      className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-secondary transition-colors"
                      onClick={onClose}
                    >
                      <span>{category.name}</span>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator className="my-2" />
            
            {/* Account */}
            <div className="py-6">
              <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Account</h3>
              <ul className="space-y-2">
                {accountItems.map((item) => (
                  <li key={item.label}>
                    <Link 
                      to={item.path}
                      className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-secondary transition-colors"
                      onClick={onClose}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>
          
          {/* Footer */}
          <div className="mt-auto p-6">
            <Button className="w-full" size="lg">
              Log In / Sign Up
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
