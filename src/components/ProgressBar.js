import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress, currentQuestion, totalQuestions }) => {
  const getProgressColor = (progress) => {
    if (progress < 30) return '#f44336';
    if (progress < 60) return '#ff9800';
    if (progress < 90) return '#4caf50';
    return '#2196f3';
  };

  const getProgressMessage = (progress) => {
    if (progress < 20) return 'Just getting started!';
    if (progress < 40) return 'Making good progress!';
    if (progress < 60) return 'Halfway there!';
    if (progress < 80) return 'Almost done!';
    if (progress < 100) return 'Final stretch!';
    return 'Quiz complete!';
  };

  return (
    <div className="progress-container">
      <div className="progress-header">
        <div className="progress-info">
          <span className="progress-text">
            Progress: {currentQuestion} of {totalQuestions} questions
          </span>
          <span className="progress-percentage">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="progress-message">
          {getProgressMessage(progress)}
        </div>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar"
          style={{ 
            width: `${progress}%`,
            backgroundColor: getProgressColor(progress)
          }}
        >
          <div className="progress-bar-fill"></div>
        </div>
      </div>
      
      <div className="progress-steps">
        {Array.from({ length: totalQuestions }, (_, index) => (
          <div
            key={index}
            className={`progress-step ${
              index < currentQuestion ? 'completed' : 
              index === currentQuestion - 1 ? 'current' : 'pending'
            }`}
          >
            <div className="step-number">
              {index < currentQuestion ? '✓' : index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;

