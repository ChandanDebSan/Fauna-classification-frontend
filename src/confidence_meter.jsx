import React from 'react';
import './App.css'; // Importing your CSS file here

const ConfidenceMeter = ({ score }) => {
  // Ensure score is a number
  const numericScore = parseFloat(score);

  // Determine color based on confidence
  const getColor = (value) => {
    if (value > 80) return '#22c55e'; // Green
    if (value > 50) return '#eab308'; // Yellow
    return '#ef4444';                 // Red
  };

  return (
    <div className="meter-container">
      <div className="meter-label">
        <span>Confidence Score</span>
        <span>{numericScore.toFixed(2)}%</span>
      </div>
      
      <div className="meter-track">
        <div 
          className="meter-fill" 
          style={{ 
            width: `${numericScore}%`, 
            backgroundColor: getColor(numericScore) 
          }}
        />
      </div>
    </div>
  );
};

export default ConfidenceMeter;