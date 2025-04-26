
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <Layout>
      <div className="container-custom py-20 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-9xl font-bold text-primary mb-6">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">Go Home</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
