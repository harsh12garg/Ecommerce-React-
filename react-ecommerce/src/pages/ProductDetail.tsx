import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Heart, ShoppingCart, Check, 
  Star, Truck, ShieldCheck, RotateCcw 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ProductCard } from '@/components/ui/product-card';
import { products } from '@/lib/data/products';
import { useShop } from '@/contexts/ShopContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist, isInCart } = useShop();
  
  const product = products.find(p => p.id === Number(id));
  
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      
      const defaultOptions: Record<string, string> = {};
      product.options?.forEach(option => {
        defaultOptions[option.name] = option.values[0];
      });
      setSelectedOptions(defaultOptions);
    }
  }, [product]);
  
  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  
  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleAddToWishlist = () => {
    addToWishlist(product);
  };
  
  const relatedProducts = product.relatedProducts
    ? product.relatedProducts.map(id => products.find(p => p.id === id))
      .filter(Boolean) as typeof products
    : products.filter(p => 
        p.id !== product.id && 
        (p.category === product.category || p.tags.some(tag => product.tags.includes(tag)))
      ).slice(0, 4);
  
  const discountPercentage = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <Layout>
      <div className="container-custom py-12">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-6 pl-0 hover:pl-2 transition-all"
        >
          <ChevronLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="bg-secondary/50 dark:bg-zinc-800 rounded-lg overflow-hidden aspect-square">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={cn(
                    "rounded-md overflow-hidden border-2",
                    selectedImage === image ? "border-primary" : "border-transparent"
                  )}
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`} 
                    className="aspect-square object-cover w-full"
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <Link 
                to={`/categories/${product.category.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {product.category}
                {product.subcategory && ` / ${product.subcategory}`}
              </Link>
              <h1 className="text-3xl font-semibold mt-2">{product.name}</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(product.rating) ? "text-amber-500 fill-amber-500" : "text-muted-foreground"} 
                  />
                ))}
              </div>
              <span className="text-sm">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 px-2 py-0.5 rounded">
                    Save {discountPercentage}%
                  </span>
                </>
              )}
            </div>
            
            <Separator className="dark:border-zinc-700" />
            
            <div>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            <div className="space-y-6">
              {product.options?.map((option) => (
                <div key={option.name}>
                  <h3 className="font-medium mb-3">{option.name}</h3>
                  
                  <RadioGroup 
                    defaultValue={option.values[0]}
                    value={selectedOptions[option.name]}
                    onValueChange={(value) => handleOptionChange(option.name, value)}
                  >
                    <div className="flex flex-wrap gap-3">
                      {option.values.map((value) => (
                        <div key={value} className="flex items-center space-x-2">
                          <RadioGroupItem 
                            value={value} 
                            id={`${option.name}-${value}`} 
                            className="peer hidden"
                          />
                          <Label 
                            htmlFor={`${option.name}-${value}`} 
                            className="flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer hover:bg-secondary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-colors min-w-16 text-center dark:hover:bg-zinc-800 dark:peer-data-[state=checked]:bg-primary/20"
                          >
                            {value}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              ))}
              
              <div>
                <h3 className="font-medium mb-3">Quantity</h3>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    aria-label="Increase quantity"
                  >
                    +
                  </Button>
                  <span className="ml-4 text-sm text-muted-foreground">
                    {product.stock} available
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className={cn(
                  "flex-1",
                  isInCart(product.id) && "bg-green-600 hover:bg-green-700"
                )}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} className="mr-2" />
                {isInCart(product.id) ? "Update Cart" : "Add to Cart"}
              </Button>
              <Button 
                variant={isInWishlist(product.id) ? "default" : "outline"} 
                size="lg"
                className={cn(
                  isInWishlist(product.id) && "bg-red-500 hover:bg-red-600 border-red-500"
                )}
                onClick={handleAddToWishlist}
              >
                <Heart 
                  size={18} 
                  className={cn(
                    "mr-2",
                    isInWishlist(product.id) && "fill-white"
                  )} 
                />
                {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-muted-foreground" />
                <span className="text-sm">Free shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-muted-foreground" />
                <span className="text-sm">2 year warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={18} className="text-muted-foreground" />
                <span className="text-sm">30-day returns</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3 max-w-md mb-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <p className="text-lg">{product.description}</p>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                
                <h3 className="text-lg font-medium mt-6">Key Features</h3>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Premium materials for durability and comfort</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Engineered for optimal performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Elegant design that stands out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Versatile functionality for various scenarios</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications">
              <div className="bg-secondary/50 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {product.specifications ? (
                    Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))
                  ) : (
                    <p>No specifications available for this product.</p>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Customer Reviews</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < Math.floor(product.rating) ? "text-amber-500 fill-amber-500" : "text-muted-foreground"} 
                          />
                        ))}
                      </div>
                      <span className="text-sm">Based on {product.reviews} reviews</span>
                    </div>
                  </div>
                  <Button>Write a Review</Button>
                </div>
                
                <div className="space-y-6">
                  <div className="border-b border-border pb-6">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Amazing product!</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={i < 5 ? "text-amber-500 fill-amber-500" : "text-muted-foreground"} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">3 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">By John D.</p>
                    <p className="mt-2">This product exceeded my expectations. The quality is excellent and it works exactly as described. I would definitely recommend it to anyone.</p>
                  </div>
                  
                  <div className="border-b border-border pb-6">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Great value</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={i < 4 ? "text-amber-500 fill-amber-500" : "text-muted-foreground"} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">1 week ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">By Sarah M.</p>
                    <p className="mt-2">Very satisfied with my purchase. The product is well-made and offers great value for the price. Shipping was also very quick.</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Good but could be better</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={i < 3 ? "text-amber-500 fill-amber-500" : "text-muted-foreground"} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">2 weeks ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">By Michael K.</p>
                    <p className="mt-2">The product is decent overall, but there are a few issues that could be improved. The build quality is good, but some of the features don't work as well as I had hoped.</p>
                  </div>
                  
                  <Button variant="outline" className="w-full">Load More Reviews</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-20">
          <h2 className="text-2xl font-semibold mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
