import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const ReviewCard = ({ review }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-rose-gold',
      'bg-gold',
      'bg-accent',
      'bg-secondary',
      'bg-primary'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Card className="luxury-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className={`${getAvatarColor(review.name)} rounded-xl`}>
            <AvatarFallback className="bg-transparent text-primary-foreground rounded-xl">
              {getInitials(review.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{review.name}</h4>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-accent text-accent'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;