import React from 'react';

function CourseCard({ course }) {
  // Format subscriber count
  const formatSubscribers = (count) => {
    const num = parseInt(count);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };

  // Format watch time
  const formatWatchTime = (time) => {
    const hours = parseInt(time);
    if (hours >= 1) {
      return `${hours}h`;
    }
    return `${time} min`;
  };

  const handleCardClick = () => {
    const searchQuery = `${course.courseName} ${course.youtuberName} youtube`;
    const youtubeURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    window.open(youtubeURL, '_blank');
  };

  return (
    <div className="course-card" onClick={handleCardClick}>
      <div className="course-header">
        <img src={course.profilePhoto} alt={course.youtuberName} className="profile-photo" />
        <div className="header-info">
          <h3>
            {course.youtuberName} 
            {course.isVerified && (
              <i 
                className="fas fa-check-circle verified-icon" 
                title="Verified Channel"
              />
            )}
          </h3>
          <span className="location" title="Creator's Location">
            <i className="fas fa-map-marker-alt location-icon"></i> {course.location}
          </span>
        </div>
      </div>
      
      <div className="course-details">
        <h4>{course.courseName}</h4>
        <div className="course-meta">
          <div className="meta-item" title="Watch Time">
            <i className="fas fa-clock"></i>
            <span>{formatWatchTime(course.watchTime)}</span>
          </div>
          <div className="meta-item" title="Subscriber Count">
            <i className="fas fa-users"></i>
            <span>{formatSubscribers(course.subscribers)}</span>
          </div>
          <div className="meta-item" title="Engagement Rate">
            <i className="fas fa-chart-line"></i>
            <span>{course.engagement}</span>
          </div>
          <div className="meta-item" title="Published Year">
            <i className="fas fa-calendar"></i>
            <span>{course.publishedYear}</span>
          </div>
        </div>
      </div>

      <div className="card-overlay">
        <i className="fas fa-play-circle"></i>
        <span>Watch on YouTube</span>
      </div>
    </div>
  );
}

export default CourseCard; 