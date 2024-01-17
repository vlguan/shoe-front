// Filter.js
import React from 'react';
import './filter.css'
const Filter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="filter-container">
      <label>Filter by Category:</label>
      <select value={selectedCategory} onChange={(e) => onSelectCategory(e.target.value)}>
        <option value="all">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
