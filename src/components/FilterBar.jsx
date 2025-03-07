import React from 'react';

function FilterBar({ onFilterChange, filters }) {
  return (
    <div className="filter-section">
      <div className="filter-bar">
        <select 
          className="filter-select"
          value={filters.timeRange}
          onChange={(e) => onFilterChange('timeRange', e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="1">Last Year</option>
          <option value="5">Last 5 Yrs</option>
          <option value="10">Last 10 Yrs</option>
        </select>

        <select
          className="filter-select"
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
        >
          <option value="all">All</option>
          <option value="india">India</option>
        </select>

        <select
          className="filter-select"
          value={filters.sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
        >
          <option value="relevance">Relevant</option>
          <option value="views">Views</option>
          <option value="subscribers">Subs</option>
          <option value="engagement">Engage</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar; 