import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page not found - Nadeel</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1
              className="text-9xl font-bold mb-4 text-primary"
            >
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Page not found
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved
            </p>
            <Link to="/">
              <Button size="lg" className="transition-all duration-200 active:scale-95">
                <Home className="w-5 h-5 mr-2" />
                Back to home
              </Button>
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default NotFoundPage;