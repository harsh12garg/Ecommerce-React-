
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useShop } from '@/contexts/ShopContext';
import { ProductCard } from '@/components/ui/product-card';
import { 
  User, Settings, ShoppingBag, Heart, MapPin, 
  CreditCard, LogOut, Edit, Camera, Plus
} from 'lucide-react';

// Dummy orders data
const orders = [
  {
    id: 'ORD-1234',
    date: '2023-06-15',
    status: 'Delivered',
    items: 3,
    total: 189.99,
  },
  {
    id: 'ORD-1235',
    date: '2023-06-02',
    status: 'Processing',
    items: 1,
    total: 79.99,
  },
  {
    id: 'ORD-1236',
    date: '2023-05-27',
    status: 'Shipped',
    items: 2,
    total: 129.99,
  },
];

// Dummy address data
const addresses = [
  {
    id: 1,
    type: 'Home',
    name: 'John Doe',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'United States',
    isDefault: true,
  },
  {
    id: 2,
    type: 'Work',
    name: 'John Doe',
    address: '456 Business Ave',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
    isDefault: false,
  },
];

const Profile = () => {
  const { wishlist } = useShop();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Dummy user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: null,
    memberSince: 'June 2022',
  };

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - user summary */}
          <div className="w-full md:w-64 shrink-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={user.avatar || ''} />
                      <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full" 
                      aria-label="Upload photo"
                    >
                      <Camera size={14} />
                    </Button>
                  </div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Badge variant="outline" className="mt-2">Member since {user.memberSince}</Badge>
                </div>

                <nav className="space-y-1">
                  <Button 
                    variant={activeTab === 'profile' ? 'default' : 'ghost'} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Button>
                  <Button 
                    variant={activeTab === 'orders' ? 'default' : 'ghost'} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab('orders')}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                  <Button 
                    variant={activeTab === 'wishlist' ? 'default' : 'ghost'} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Button>
                  <Button 
                    variant={activeTab === 'addresses' ? 'default' : 'ghost'} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab('addresses')}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Addresses
                  </Button>
                  <Button 
                    variant={activeTab === 'settings' ? 'default' : 'ghost'} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                </nav>

                <Separator className="my-4" />
                
                <Button variant="outline" className="w-full" onClick={() => alert('Logout functionality will be implemented')}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                    <CardDescription>
                      Manage your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="full-name">Full Name</Label>
                          <Input id="full-name" defaultValue={user.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue={user.email} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" defaultValue={user.phone} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="birthday">Birthday</Label>
                          <Input id="birthday" type="date" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Preferences</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Order confirmations and updates</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Promotions and special offers</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span>Product recommendations</span>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto">Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>
                      View and track your order history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map(order => (
                          <div key={order.id} className="border rounded-lg p-4">
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{order.id}</h3>
                                  <Badge variant={
                                    order.status === 'Delivered' ? 'default' :
                                    order.status === 'Shipped' ? 'secondary' : 'outline'
                                  }>
                                    {order.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Placed on {new Date(order.date).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">${order.total.toFixed(2)}</div>
                                <p className="text-sm text-muted-foreground">
                                  {order.items} {order.items === 1 ? 'item' : 'items'}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              {order.status === 'Delivered' && (
                                <Button variant="outline" size="sm">
                                  Write Review
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-6">
                          You haven't placed any orders yet.
                        </p>
                        <Button asChild>
                          <a href="/products">Start Shopping</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <Card>
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                    <CardDescription>
                      Products you've saved for later
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {wishlist.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {wishlist.map(item => (
                          <ProductCard key={item.product.id} product={item.product} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                        <p className="text-muted-foreground mb-6">
                          Browse our products and add items you love to your wishlist.
                        </p>
                        <Button asChild>
                          <a href="/products">Browse Products</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <CardTitle>My Addresses</CardTitle>
                    <CardDescription>
                      Manage your shipping and billing addresses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map(address => (
                        <div key={address.id} className="border rounded-lg p-4 relative">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{address.type}</span>
                              {address.isDefault && (
                                <Badge variant="outline">Default</Badge>
                              )}
                            </div>
                            <div className="flex gap-1">
                              <Button size="icon" variant="ghost" className="h-8 w-8">
                                <Edit size={16} />
                              </Button>
                            </div>
                          </div>
                          <div className="text-sm space-y-1">
                            <p>{address.name}</p>
                            <p>{address.address}</p>
                            <p>{address.city}, {address.state} {address.postalCode}</p>
                            <p>{address.country}</p>
                          </div>
                        </div>
                      ))}
                      
                      {/* Add new address card */}
                      <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center min-h-[180px]">
                        <Button variant="outline" className="mb-2">
                          <Plus size={16} className="mr-2" />
                          Add New Address
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          Add a new shipping or billing address
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account settings and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Password</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button className="w-fit">Update Password</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Account Privacy</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Two-factor authentication</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Email me when someone logs into my account</span>
                        </label>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
