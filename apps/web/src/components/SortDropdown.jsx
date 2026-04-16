import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SortDropdown = ({ sortBy, setSortBy }) => {
  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest first</SelectItem>
        <SelectItem value="price-low">Price: low to high</SelectItem>
        <SelectItem value="price-high">Price: high to low</SelectItem>
        <SelectItem value="rating">Highest rated</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortDropdown;