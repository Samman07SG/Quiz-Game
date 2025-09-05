import React, { useState, useEffect } from 'react';
import './QuestionCard.css';

const QuestionCard = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  selectedAnswer, 
  onAnswerSelect, 
  timer 
}) => {
  const [selectedOption, setSelectedOption] = useState(selectedAnswer);
  const [isSubmitted, setIsSubmitted] = useState(!!selectedAnswer);
  const [timeSpent, setTimeSpent] = useState(0);

  // Track time spent on question
  useEffect(() => {
    if (!isSubmitted) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isSubmitted]);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(selectedAnswer);
    setIsSubmitted(!!selectedAnswer);
    setTimeSpent(0);
  }, [question, selectedAnswer]);

  const handleOptionSelect = (option) => {
    if (isSubmitted) return;
    
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted) return;
    
    setIsSubmitted(true);
    onAnswerSelect(selectedOption, timeSpent);
  };

  const getOptionClass = (option) => {
    if (!isSubmitted) {
      return selectedOption === option ? 'option selected' : 'option';
    }
    
    const isCorrect = option === question.correct_answer;
    const isSelected = option === selectedOption;
    
    if (isCorrect) {
      return 'option correct';
    } else if (isSelected && !isCorrect) {
      return 'option incorrect';
    } else {
      return 'option disabled';
    }
  };

  const getOptionIcon = (option) => {
    if (!isSubmitted) {
      return selectedOption === option ? '✓' : '';
    }
    
    const isCorrect = option === question.correct_answer;
    const isSelected = option === selectedOption;
    
    if (isCorrect) {
      return '✓';
    } else if (isSelected && !isCorrect) {
      return '✗';
    } else {
      return '';
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: '#4CAF50',
      medium: '#FF9800',
      hard: '#F44336'
    };
    return colors[difficulty] || '#666';
  };

  if (!question) {
    return (
      <div className="question-card">
        <div className="question-loading">
          <div className="spinner"></div>
          <p>Loading question...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="question-card">
      <div className="question-header">
        <div className="question-meta">
          <span className="question-number">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span 
            className="difficulty-badge"
            style={{ backgroundColor: getDifficultyColor(question.difficulty) }}
          >
            {question.difficulty}
          </span>
        </div>
        <div className="question-category">
          {question.category}
        </div>
      </div>

      <div className="question-content">
        <h2 className="question-text">
          {question.question}
        </h2>
        
        <div className="options-container">
          {question.answers.map((option, index) => (
            <button
              key={index}
              className={getOptionClass(option)}
              onClick={() => handleOptionSelect(option)}
              disabled={isSubmitted}
              aria-pressed={selectedOption === option}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
              <span className="option-icon">
                {getOptionIcon(option)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="question-footer">
        <div className="question-stats">
          <span className="time-spent">
            Time spent: {timeSpent}s
          </span>
          {isSubmitted && (
            <span className="submitted-status">
              ✓ Answer submitted
            </span>
          )}
        </div>
        
        <div className="question-actions">
          {!isSubmitted ? (
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!selectedOption}
            >
              Submit Answer
            </button>
          ) : (
            <div className="submitted-feedback">
              <span className="feedback-text">
                {selectedOption === question.correct_answer 
                  ? '🎉 Correct!' 
                  : '❌ Incorrect'
                }
              </span>
              {selectedOption !== question.correct_answer && (
                <span className="correct-answer">
                  Correct answer: {question.correct_answer}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

