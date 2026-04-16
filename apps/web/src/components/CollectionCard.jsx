import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CollectionCard = ({ collection }) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-80 overflow-hidden">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-3xl font-bold mb-2">
            {collection.name}
          </h3>
          <p className="text-white/90 mb-4 leading-relaxed">
            {collection.description}
          </p>
          <Link to="/products">
            <Button
              variant="secondary"
              className="transition-all duration-200 hover:gap-3 active:scale-95"
            >
              Explore collection
              <ArrowRight className="w-4 h-4 ml-2 transition-all" />
            </Button>
          </Link>
        </CardContent>
      </div>
    </Card>
  );
};

export default CollectionCard;