import React, { useState } from 'react';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import AnalyticsChart from './AnalyticsChart';
import CourseCard from './CourseCard';
import { fetchCourseAnalytics } from '../services/geminiService';

function Dashboard() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    timeRange: 'all',
    location: 'all',
    sortBy: 'relevance'
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSearch = async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCourseAnalytics(searchTerm, filters);
      
      if (!data || !data.courses || !Array.isArray(data.courses)) {
        throw new Error('Invalid data format received from API');
      }
      
      setCourseData(data.courses);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to fetch course data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="welcome-heading">Welcome <span className="user-name">Vaibhav</span></h1>
      
      <div className="search-filter-container">
        <div className="search-row">
          <SearchBar onSearch={handleSearch} />
        </div>
        <FilterBar onFilterChange={handleFilterChange} filters={filters} />
      </div>
      
      {loading && <div className="loading">Searching for courses...</div>}
      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <p>Please try again or try a different search term.</p>
        </div>
      )}
      
      {courseData.length > 0 ? (
        <div className="results-container">
          <div className="cards-section">
            <h3 className="section-title">Course Results</h3>
            <div className="course-grid">
              {courseData.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          </div>
          <div className="chart-section">
            <AnalyticsChart data={courseData} />
          </div>
        </div>
      ) : !loading && !error && (
        <div className="empty-state">
          <p>Search for YouTube courses to see analytics</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard; 