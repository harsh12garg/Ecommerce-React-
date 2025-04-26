
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  initialValue?: string;
}

export const SearchBar = ({ 
  className = '', 
  placeholder = 'Search for products...',
  onSearch,
  initialValue = ''
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex relative items-center ${className}`}>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="pr-10"
      />
      <Button 
        type="submit" 
        variant="ghost" 
        size="icon" 
        className="absolute right-0"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};
