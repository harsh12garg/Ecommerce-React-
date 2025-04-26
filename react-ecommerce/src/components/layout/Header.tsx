
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, Menu, X, User, Heart, Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useShop } from '@/contexts/ShopContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { SearchBar } from '@/components/search/SearchBar';

export const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const { cartCount, wishlist } = useShop();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo and mobile menu button */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="md:hidden"
              aria-label="Menu"
            >
              <Menu size={24} />
            </Button>
            <Link to="/" className="text-2xl font-semibold tracking-tight">
              Elegance
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={cn("link-hover", location.pathname === "/" && "font-medium")}>
              Home
            </Link>
            <Link to="/products" className={cn("link-hover", location.pathname.includes("/products") && "font-medium")}>
              Shop
            </Link>
            <Link to="/categories" className={cn("link-hover", location.pathname.includes("/categories") && "font-medium")}>
              Categories
            </Link>
            <Link to="/about" className={cn("link-hover", location.pathname === "/about" && "font-medium")}>
              About
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className={cn(
              "overflow-hidden transition-all duration-300",
              searchOpen ? "w-[200px]" : "w-0"
            )}>
              <SearchBar 
                placeholder="Search products..." 
                className="border-none focus-visible:ring-0 bg-transparent"
              />
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </Button>

            <ThemeToggle />

            <Link to="/wishlist">
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Favorites"
                className="hidden sm:flex relative"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>
            
            <Link to="/profile">
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Account"
                className="hidden sm:flex"
              >
                <User size={20} />
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Cart"
                className="relative"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
