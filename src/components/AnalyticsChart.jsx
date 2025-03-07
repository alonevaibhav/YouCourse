import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function AnalyticsChart({ data }) {
  const chartData = data.map(course => ({
    name: course.youtuberName.split(' ')[0],
    watchTime: parseInt(course.watchTime),
    subscribers: parseInt(course.subscribers)
  }));

  return (
    <div className="chart-container">
      <h3 className="section-title">Analytics</h3>
      <BarChart 
        width={300} 
        height={400} 
        data={chartData}
        layout="vertical"
        margin={{ top: 5, right: 10, left: 40, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" fontSize={10} />
        <YAxis dataKey="name" type="category" width={80} fontSize={10} />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: '10px' }} />
        <Bar dataKey="watchTime" fill="#2193b0" name="Watch hrs" />
        <Bar dataKey="subscribers" fill="#6dd5ed" name="Subs" />
      </BarChart>
    </div>
  );
}

export default AnalyticsChart; 