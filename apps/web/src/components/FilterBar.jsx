import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const FilterBar = ({ filters, setFilters }) => {
  const categories = ['All', 'Perfume', 'Musk', 'Body Splash'];

  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category });
  };

  const handlePriceChange = (value) => {
    setFilters({ ...filters, priceRange: value });
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      priceRange: [0, 300],
      searchQuery: ''
    });
  };

  const hasActiveFilters = filters.category !== 'All' || 
    filters.priceRange[0] !== 0 || 
    filters.priceRange[1] !== 300 ||
    filters.searchQuery !== '';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div>
        <Label className="text-sm font-medium mb-3 block">Category</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                filters.category === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium mb-3 block">
          Price range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </Label>
        <Slider
          min={0}
          max={300}
          step={10}
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default FilterBar;