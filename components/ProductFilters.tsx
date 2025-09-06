// components/ProductFilters.tsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "use-debounce"; // We'll install this next

const categories = [
  "all",
  "electronics",
  "fashion",
  "home-goods",
  "books",
  "other",
];

interface ProductFiltersProps {
  onFilterChange: (filters: { searchTerm: string; category: string }) => void;
}

export default function ProductFilters({
  onFilterChange,
}: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300); // Debounce to avoid excessive API calls

  useEffect(() => {
    onFilterChange({ searchTerm: debouncedSearchTerm, category });
  }, [debouncedSearchTerm, category, onFilterChange]);

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Input
          placeholder="Search by keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            onClick={() => setCategory(cat)}
            className="capitalize"
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
}
