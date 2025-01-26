'use client';
import React, { useEffect, useState } from 'react';

type FilterComponentProps = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  handleSort: () => void;
  sortOrder: 'asc' | 'desc' | 'none';
};

const FilterComponent = ({
  searchTerm,
  setSearchTerm,
  setSelectedCategory,
  handleSort,
  sortOrder,
}: FilterComponentProps) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <input
        type='text'
        placeholder='Search'
        className='border border-gray-300 rounded-md px-3 py-2  outline-none'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className='border border-gray-300 rounded-md px-3 py-2'
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value=''>All Categories</option>
        {categories.map((category: string) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button
        onClick={handleSort}
        className='border border-gray-300 rounded-md px-3 py-2'
      >
        {sortOrder === 'none'
          ? 'Sort by Quantity'
          : sortOrder === 'asc'
          ? 'Sort by Quantity (Asc)'
          : 'Sort by Quantity (Desc)'}
      </button>
    </>
  );
};

export default FilterComponent;
