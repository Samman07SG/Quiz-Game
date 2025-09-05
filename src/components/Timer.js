import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ timeRemaining, onTimeUp }) => {
  const [isLowTime, setIsLowTime] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    setIsLowTime(timeRemaining <= 10);
    setIsCritical(timeRemaining <= 5);
  }, [timeRemaining]);

  const getTimerColor = () => {
    if (isCritical) return '#f44336';
    if (isLowTime) return '#ff9800';
    return '#4caf50';
  };

  const getTimerMessage = () => {
    if (timeRemaining <= 5) return 'Hurry up!';
    if (timeRemaining <= 10) return 'Time running out!';
    if (timeRemaining <= 15) return 'Take your time';
    return 'Time remaining';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <div className="timer-display">
        <div 
          className={`timer-circle ${isCritical ? 'critical' : isLowTime ? 'warning' : 'normal'}`}
          style={{ '--timer-color': getTimerColor() }}
        >
          <div className="timer-time">
            {formatTime(timeRemaining)}
          </div>
        </div>
        <div className="timer-message">
          {getTimerMessage()}
        </div>
      </div>
      
      {isLowTime && (
        <div className="timer-warning">
          <div className="warning-icon">
            {isCritical ? '⚠️' : '⏰'}
          </div>
          <div className="warning-text">
            {isCritical ? 'Time almost up!' : 'Time running low!'}
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;

