
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For discounted products
  category: string;
  subcategory?: string;
  tags: string[];
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  stock: number;
  featured: boolean;
  new: boolean;
  bestSeller: boolean;
  specifications?: Record<string, string>;
  options?: {
    name: string;
    values: string[];
  }[];
  relatedProducts?: number[];
  createdAt: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Experience unparalleled sound quality with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for extended listening sessions.",
    price: 299.99,
    category: "Electronics",
    subcategory: "Audio",
    tags: ["wireless", "headphones", "premium", "noise-cancellation"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
      "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=1000",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=1000"
    ],
    rating: 4.8,
    reviews: 253,
    stock: 45,
    featured: true,
    new: true,
    bestSeller: true,
    specifications: {
      "Bluetooth Version": "5.2",
      "Battery Life": "30 hours",
      "Noise Cancellation": "Active",
      "Weight": "250g",
      "Charging": "USB-C"
    },
    options: [
      {
        name: "Color",
        values: ["Black", "White", "Rose Gold"]
      }
    ],
    relatedProducts: [2, 3, 8],
    createdAt: "2023-07-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    description: "Monitor your health and stay connected with this sleek smart watch. Features heart rate monitoring, sleep tracking, and notifications from your smartphone.",
    price: 249.99,
    originalPrice: 299.99,
    category: "Electronics",
    subcategory: "Wearables",
    tags: ["smart watch", "fitness", "wearable"],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=989",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=989",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1064",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1027"
    ],
    rating: 4.6,
    reviews: 189,
    stock: 32,
    featured: true,
    new: false,
    bestSeller: true,
    specifications: {
      "Display": "AMOLED",
      "Battery Life": "48 hours",
      "Water Resistance": "50m",
      "Connectivity": "Bluetooth 5.0, WiFi",
      "Sensors": "Heart rate, Accelerometer, Gyroscope"
    },
    options: [
      {
        name: "Size",
        values: ["40mm", "44mm"]
      },
      {
        name: "Band Color",
        values: ["Black", "Blue", "Red", "Green"]
      }
    ],
    relatedProducts: [1, 3, 5],
    createdAt: "2023-09-20T08:15:00Z"
  },
  {
    id: 3,
    name: "Ultra-Slim Laptop Pro",
    description: "Powerful performance in an incredibly thin and light design. Features the latest processors, stunning display, and all-day battery life.",
    price: 1299.99,
    category: "Electronics",
    subcategory: "Computers",
    tags: ["laptop", "ultrabook", "premium"],
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1171",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1171",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1120",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1171"
    ],
    rating: 4.9,
    reviews: 321,
    stock: 18,
    featured: true,
    new: true,
    bestSeller: true,
    specifications: {
      "Processor": "Intel Core i7, 12th Gen",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Display": "14-inch Retina",
      "Graphics": "Intel Iris Xe",
      "Battery": "Up to 12 hours"
    },
    options: [
      {
        name: "Storage",
        values: ["256GB", "512GB", "1TB"]
      },
      {
        name: "RAM",
        values: ["8GB", "16GB", "32GB"]
      },
      {
        name: "Color",
        values: ["Space Gray", "Silver"]
      }
    ],
    relatedProducts: [5, 8, 9],
    createdAt: "2023-06-10T14:20:00Z"
  },
  {
    id: 4,
    name: "Designer Leather Bag",
    description: "Handcrafted from premium Italian leather, this designer bag combines timeless elegance with practical functionality. Features multiple compartments and adjustable straps.",
    price: 349.99,
    category: "Fashion",
    subcategory: "Bags",
    tags: ["leather", "designer", "bag", "accessory"],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1169",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1169",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1035",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1171"
    ],
    rating: 4.7,
    reviews: 156,
    stock: 25,
    featured: true,
    new: false,
    bestSeller: false,
    specifications: {
      "Material": "Full grain Italian leather",
      "Dimensions": "30cm x 25cm x 10cm",
      "Strap": "Adjustable, detachable",
      "Lining": "Premium cotton",
      "Hardware": "Gold-toned"
    },
    options: [
      {
        name: "Color",
        values: ["Black", "Brown", "Tan", "Navy"]
      }
    ],
    relatedProducts: [10, 11, 12],
    createdAt: "2023-08-05T09:45:00Z"
  },
  {
    id: 5,
    name: "Professional DSLR Camera",
    description: "Capture stunning photos and videos with this professional-grade DSLR camera. Features a high-resolution sensor, advanced autofocus, and 4K video recording.",
    price: 1499.99,
    originalPrice: 1699.99,
    category: "Electronics",
    subcategory: "Cameras",
    tags: ["camera", "photography", "DSLR", "professional"],
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1164",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1164",
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=1170",
      "https://images.unsplash.com/photo-1563006769-4dc21647d9a4?q=80&w=1167"
    ],
    rating: 4.9,
    reviews: 287,
    stock: 15,
    featured: true,
    new: false,
    bestSeller: true,
    specifications: {
      "Sensor": "Full-frame 45MP",
      "ISO Range": "100-51,200 (expandable)",
      "Video": "4K/60fps",
      "Autofocus": "Dual Pixel CMOS AF",
      "Connectivity": "WiFi, Bluetooth, USB-C",
      "Weight": "850g (body only)"
    },
    options: [
      {
        name: "Kit",
        values: ["Body Only", "With 24-70mm Lens", "With 24-105mm Lens"]
      }
    ],
    relatedProducts: [8, 9, 3],
    createdAt: "2023-05-12T11:30:00Z"
  },
  {
    id: 6,
    name: "Premium Yoga Mat",
    description: "Enhance your yoga practice with this premium non-slip mat. Made from eco-friendly materials with extra cushioning for joint protection.",
    price: 79.99,
    category: "Sports",
    subcategory: "Yoga",
    tags: ["yoga", "fitness", "mat", "eco-friendly"],
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=1287",
    images: [
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=1287",
      "https://images.unsplash.com/photo-1562088287-bde35a1ea917?q=80&w=1364",
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1170"
    ],
    rating: 4.6,
    reviews: 204,
    stock: 65,
    featured: false,
    new: true,
    bestSeller: false,
    specifications: {
      "Material": "Eco-friendly TPE",
      "Thickness": "6mm",
      "Dimensions": "183cm x 61cm",
      "Weight": "1.1kg",
      "Features": "Non-slip, Moisture-resistant"
    },
    options: [
      {
        name: "Color",
        values: ["Blue", "Purple", "Green", "Black", "Pink"]
      }
    ],
    relatedProducts: [14, 15, 16],
    createdAt: "2023-10-30T15:20:00Z"
  },
  {
    id: 7,
    name: "Minimalist Concrete Watch",
    description: "A striking timepiece that blends industrial materials with minimalist design. The concrete dial creates a unique texture that makes each watch one-of-a-kind.",
    price: 129.99,
    category: "Fashion",
    subcategory: "Watches",
    tags: ["watch", "concrete", "minimalist", "unique"],
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1289",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1289",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1170",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1142"
    ],
    rating: 4.5,
    reviews: 128,
    stock: 38,
    featured: false,
    new: true,
    bestSeller: false,
    specifications: {
      "Case Material": "Stainless steel",
      "Dial": "Concrete",
      "Movement": "Japanese Quartz",
      "Water Resistance": "5 ATM",
      "Band": "Genuine leather",
      "Glass": "Hardened mineral"
    },
    options: [
      {
        name: "Band Color",
        values: ["Black", "Brown", "Navy", "Gray"]
      },
      {
        name: "Case Size",
        values: ["38mm", "42mm"]
      }
    ],
    relatedProducts: [2, 11, 12],
    createdAt: "2023-11-05T10:15:00Z"
  },
  {
    id: 8,
    name: "Wireless Earbuds Pro",
    description: "True wireless earbuds with premium sound quality, active noise cancellation, and sweat resistance. Perfect for workouts and everyday use.",
    price: 149.99,
    originalPrice: 179.99,
    category: "Electronics",
    subcategory: "Audio",
    tags: ["earbuds", "wireless", "audio"],
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1170",
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1170",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1229",
      "https://images.unsplash.com/photo-1631177389816-1b6650f8d219?q=80&w=1125"
    ],
    rating: 4.7,
    reviews: 312,
    stock: 42,
    featured: false,
    new: false,
    bestSeller: true,
    specifications: {
      "Driver Size": "10mm",
      "Battery Life": "8 hours (30 with case)",
      "Water Resistance": "IPX5",
      "Connectivity": "Bluetooth 5.2",
      "Noise Cancellation": "Active"
    },
    options: [
      {
        name: "Color",
        values: ["Black", "White", "Blue"]
      }
    ],
    relatedProducts: [1, 3, 9],
    createdAt: "2023-07-28T13:40:00Z"
  },
  {
    id: 9,
    name: "Ultra HD Smart TV 55\"",
    description: "Experience stunning 4K visuals and smart features on this premium TV. Includes voice control, streaming apps, and game mode.",
    price: 799.99,
    originalPrice: 899.99,
    category: "Electronics",
    subcategory: "TVs",
    tags: ["smart tv", "4K", "ultra hd"],
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1057",
    images: [
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1057",
      "https://images.unsplash.com/photo-1601944177325-f8867652837f?q=80&w=1287",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=1033"
    ],
    rating: 4.5,
    reviews: 268,
    stock: 20,
    featured: true,
    new: false,
    bestSeller: false,
    specifications: {
      "Resolution": "4K Ultra HD",
      "Display Technology": "LED",
      "Smart Features": "Voice control, Apps",
      "HDR": "Yes",
      "Refresh Rate": "120Hz",
      "Ports": "4x HDMI, 2x USB"
    },
    options: [
      {
        name: "Size",
        values: ["55\"", "65\"", "75\""]
      }
    ],
    relatedProducts: [3, 5, 8],
    createdAt: "2023-09-02T16:30:00Z"
  },
  {
    id: 10,
    name: "Cashmere Sweater",
    description: "Luxuriously soft cashmere sweater with a classic design. Perfect for layering in colder weather while maintaining a sophisticated look.",
    price: 189.99,
    category: "Fashion",
    subcategory: "Clothing",
    tags: ["cashmere", "sweater", "winter", "luxury"],
    image: "https://images.unsplash.com/photo-1624824216985-5639f42ef14b?q=80&w=1229",
    images: [
      "https://images.unsplash.com/photo-1624824216985-5639f42ef14b?q=80&w=1229",
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=1026",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1074"
    ],
    rating: 4.8,
    reviews: 176,
    stock: 30,
    featured: false,
    new: false,
    bestSeller: true,
    specifications: {
      "Material": "100% Cashmere",
      "Care": "Dry clean only",
      "Style": "Crewneck",
      "Weight": "Light to Medium",
      "Origin": "Scotland"
    },
    options: [
      {
        name: "Size",
        values: ["XS", "S", "M", "L", "XL"]
      },
      {
        name: "Color",
        values: ["Camel", "Gray", "Navy", "Burgundy", "Black"]
      }
    ],
    relatedProducts: [4, 11, 12],
    createdAt: "2023-08-22T12:15:00Z"
  },
  {
    id: 11,
    name: "Premium Sunglasses",
    description: "Handcrafted designer sunglasses with polarized lenses for maximum UV protection and crystal-clear vision. Lightweight frame for all-day comfort.",
    price: 159.99,
    category: "Fashion",
    subcategory: "Accessories",
    tags: ["sunglasses", "designer", "polarized", "UV protection"],
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1160",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1160",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1160",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=1170"
    ],
    rating: 4.6,
    reviews: 203,
    stock: 45,
    featured: false,
    new: true,
    bestSeller: false,
    specifications: {
      "Frame Material": "Acetate",
      "Lens": "Polarized",
      "UV Protection": "100%",
      "Weight": "28g",
      "Case": "Included"
    },
    options: [
      {
        name: "Frame Color",
        values: ["Black", "Tortoise", "Clear", "Havana"]
      },
      {
        name: "Lens Color",
        values: ["Gray", "Green", "Blue"]
      }
    ],
    relatedProducts: [4, 7, 10],
    createdAt: "2023-10-15T09:20:00Z"
  },
  {
    id: 12,
    name: "Leather Minimalist Wallet",
    description: "Slim and functional wallet crafted from full-grain leather. Features RFID blocking technology and smart organization for cards and cash.",
    price: 49.99,
    category: "Fashion",
    subcategory: "Accessories",
    tags: ["wallet", "leather", "minimalist", "RFID"],
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1287",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1287",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1287",
      "https://images.unsplash.com/photo-1618520408846-fff18a378ddb?q=80&w=1064"
    ],
    rating: 4.7,
    reviews: 312,
    stock: 75,
    featured: false,
    new: false,
    bestSeller: true,
    specifications: {
      "Material": "Full-grain leather",
      "Capacity": "8 cards, bills",
      "RFID Blocking": "Yes",
      "Dimensions": "10cm x 7.5cm x 1cm",
      "Finish": "Hand-stitched edges"
    },
    options: [
      {
        name: "Color",
        values: ["Black", "Brown", "Tan", "Navy"]
      }
    ],
    relatedProducts: [4, 7, 11],
    createdAt: "2023-09-10T14:50:00Z"
  }
];

export const categories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    description: "The latest gadgets and technology",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1170",
    subcategories: [
      { id: 101, name: "Audio", slug: "audio" },
      { id: 102, name: "Wearables", slug: "wearables" },
      { id: 103, name: "Computers", slug: "computers" },
      { id: 104, name: "Cameras", slug: "cameras" },
      { id: 105, name: "TVs", slug: "tvs" }
    ]
  },
  {
    id: 2,
    name: "Fashion",
    slug: "fashion",
    description: "Stylish clothing and accessories",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1171",
    subcategories: [
      { id: 201, name: "Clothing", slug: "clothing" },
      { id: 202, name: "Bags", slug: "bags" },
      { id: 203, name: "Watches", slug: "watches" },
      { id: 204, name: "Accessories", slug: "accessories" }
    ]
  },
  {
    id: 3,
    name: "Sports",
    slug: "sports",
    description: "Equipment and gear for active lifestyles",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1170",
    subcategories: [
      { id: 301, name: "Yoga", slug: "yoga" },
      { id: 302, name: "Fitness", slug: "fitness" },
      { id: 303, name: "Outdoor", slug: "outdoor" }
    ]
  },
  {
    id: 4,
    name: "Home & Kitchen",
    slug: "home-kitchen",
    description: "Beautiful and functional items for your home",
    image: "https://images.unsplash.com/photo-1556911261-6bd341186b2f?q=80&w=1170",
    subcategories: [
      { id: 401, name: "Furniture", slug: "furniture" },
      { id: 402, name: "Kitchenware", slug: "kitchenware" },
      { id: 403, name: "Decor", slug: "decor" }
    ]
  },
  {
    id: 5,
    name: "Beauty",
    slug: "beauty",
    description: "Premium skincare and beauty products",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=1288",
    subcategories: [
      { id: 501, name: "Skincare", slug: "skincare" },
      { id: 502, name: "Makeup", slug: "makeup" },
      { id: 503, name: "Fragrance", slug: "fragrance" }
    ]
  },
  {
    id: 6,
    name: "Books",
    slug: "books",
    description: "Bestsellers and literary treasures",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1228",
    subcategories: [
      { id: 601, name: "Fiction", slug: "fiction" },
      { id: 602, name: "Non-fiction", slug: "non-fiction" },
      { id: 603, name: "Art & Design", slug: "art-design" }
    ]
  }
];

export function getProductsByCategory(categorySlug: string) {
  return products.filter(product => {
    const category = categories.find(c => c.slug === categorySlug);
    return category && product.category === category.name;
  });
}

export function getProductsBySubcategory(categorySlug: string, subcategorySlug: string) {
  const category = categories.find(c => c.slug === categorySlug);
  const subcategory = category?.subcategories.find(s => s.slug === subcategorySlug);
  
  return products.filter(product => 
    product.category === category?.name && product.subcategory === subcategory?.name
  );
}

export function getFeaturedProducts() {
  return products.filter(product => product.featured);
}

export function getNewArrivals() {
  return products.filter(product => product.new);
}

export function getBestSellers() {
  return products.filter(product => product.bestSeller);
}

export function getSaleProducts() {
  return products.filter(product => product.originalPrice !== undefined);
}

export function searchProducts(query: string) {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    (product.subcategory && product.subcategory.toLowerCase().includes(lowercaseQuery)) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
