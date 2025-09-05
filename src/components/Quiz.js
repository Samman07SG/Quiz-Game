import React, { useState, useEffect, useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';
import { fetchQuestions, calculateQuizStats } from '../services/quizApi';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import Timer from './Timer';
import './Quiz.css';

const Quiz = ({ userName, onComplete }) => {
  const { 
    questions, 
    currentQuestionIndex, 
    answers, 
    loading, 
    error, 
    timer,
    dispatch 
  } = useQuiz();
  
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Load questions when component mounts
  useEffect(() => {
    const loadQuestions = async () => {
      // Always reset quiz state when starting a new quiz
      dispatch({ type: 'RESET_QUIZ' });
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        // Load 5-10 random questions from Open Trivia DB
        const questionCount = Math.floor(Math.random() * 6) + 5; // Random between 5-10
        const fetchedQuestions = await fetchQuestions(
          'general', // Use general category
          'medium',  // Medium difficulty
          questionCount
        );
        
        // Debug logging
        console.log(`Requested: ${questionCount} questions, Got: ${fetchedQuestions.length} questions`);
        
        dispatch({ type: 'SET_QUESTIONS', payload: fetchedQuestions });
        // Save questions to localStorage for faster results loading
        localStorage.setItem('quizQuestions', JSON.stringify(fetchedQuestions));
      } catch (error) {
        console.error('Error fetching questions:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };

    loadQuestions();
  }, [dispatch]);

  // Start quiz timer when quiz begins
  useEffect(() => {
    if (quizStarted && questions.length > 0) {
      dispatch({ type: 'SET_TIMER', payload: 30 });
    }
  }, [quizStarted, questions.length, dispatch]);

  // Handle timer expiration
  useEffect(() => {
    if (timer === 0 && quizStarted && questions.length > 0) {
      handleAnswerSubmit(null, 30 - timer);
    }
  }, [timer, quizStarted, questions.length]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    dispatch({ type: 'SET_TIMER', payload: 30 });
  };

  const handleAnswerSubmit = (selectedAnswer, timeSpent = null) => {
    const actualTimeSpent = timeSpent !== null ? timeSpent : 30 - timer;
    
    dispatch({ 
      type: 'SET_ANSWER', 
      payload: selectedAnswer,
      timeSpent: actualTimeSpent
    });

    // Move to next question or finish quiz
    if (currentQuestionIndex < questions.length - 1) {
      dispatch({ type: 'NEXT_QUESTION' });
      dispatch({ type: 'SET_TIMER', payload: 30 });
    } else {
      // Quiz completed
      setShowResults(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      dispatch({ type: 'PREVIOUS_QUESTION' });
      dispatch({ type: 'SET_TIMER', payload: 30 });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch({ type: 'NEXT_QUESTION' });
      dispatch({ type: 'SET_TIMER', payload: 30 });
    }
  };

  const handleGoToQuestion = (questionIndex) => {
    dispatch({ type: 'GO_TO_QUESTION', payload: questionIndex });
    dispatch({ type: 'SET_TIMER', payload: 30 });
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestionIndex];
  };

  const getCurrentAnswer = () => {
    return answers[currentQuestionIndex];
  };

  const getProgress = useMemo(() => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  }, [currentQuestionIndex, questions.length]);

  const getStats = useMemo(() => {
    return calculateQuizStats(questions, answers);
  }, [questions, answers]);

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <h2>Loading your quiz...</h2>
            <p>Preparing 5-10 random questions from various topics</p>
            <div className="loading-details">
              <div className="loading-step">
                <span className="step-icon">⚡</span>
                <span>Preparing random questions...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container">
        <div className="container">
          <div className="error-state">
            <h2>❌ Error Loading Quiz</h2>
            <p>{error}</p>
            <div className="error-details">
              <p><strong>Quiz Type:</strong> Random Questions</p>
              <p><strong>Difficulty:</strong> Medium</p>
              <p><strong>Question Count:</strong> 5-10 questions</p>
            </div>
            <div className="error-actions">
              <button 
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                🔄 Try Again
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/';
                }}
              >
                🏠 Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <div className="container fade-in">
          <div className="quiz-intro">
            <div className="header">
              <h1>🎯 Random Knowledge Quiz</h1>
              <p>Welcome, {userName}! Get ready to test your knowledge with random questions.</p>
            </div>
            
            <div className="quiz-info">
              <div className="info-card">
                <h3>📊 Quiz Details</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Quiz Type:</span>
                    <span className="info-value">Random Questions</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Difficulty:</span>
                    <span className="info-value">Medium</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Questions:</span>
                    <span className="info-value">{questions.length}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Time per question:</span>
                    <span className="info-value">30 seconds</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Total time:</span>
                    <span className="info-value">{questions.length * 30} seconds</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Topics:</span>
                    <span className="info-value">Mixed</span>
                  </div>
                </div>
              </div>
              
              <div className="instructions-card">
                <h3>📝 Instructions</h3>
                <ul>
                  <li>You have 30 seconds to answer each question</li>
                  <li>Select the best answer from the four options</li>
                  <li>You can navigate between questions using Previous/Next</li>
                  <li>Your progress is automatically saved</li>
                  <li>Once you select an answer, you can't change it</li>
                </ul>
              </div>
            </div>
            
            <div className="start-quiz-section">
              <button 
                className="btn btn-primary btn-large"
                onClick={handleStartQuiz}
              >
                Start Quiz 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const stats = getStats;
    return (
      <div className="quiz-container">
        <div className="container fade-in">
          <div className="quiz-complete">
            <div className="completion-animation">
              <div className="trophy">🏆</div>
              <h1>Quiz Complete!</h1>
              <p>Great job, {userName}!</p>
            </div>
            
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-number">{stats.correctAnswers}</span>
                <span className="stat-label">Correct</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.percentage}%</span>
                <span className="stat-label">Accuracy</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{Math.round(stats.averageTime)}s</span>
                <span className="stat-label">Avg Time</span>
              </div>
            </div>
            
            <p className="redirect-message">
              Redirecting to detailed results...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();
  const currentAnswer = getCurrentAnswer();
  const progress = getProgress;

  return (
    <div className="quiz-container">
      <div className="container">
        <div className="quiz-header">
          <div className="quiz-title">
            <h1>Random Knowledge Quiz</h1>
            <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
          </div>
          
          <div className="quiz-controls">
            <Timer timeRemaining={timer} />
            <div className="quiz-stats">
              <span className="score">Score: {answers.filter(a => a?.isCorrect).length}/{questions.length}</span>
            </div>
          </div>
        </div>

        <ProgressBar 
          progress={progress} 
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />

        <div className="quiz-content">
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={currentAnswer?.selectedAnswer}
            onAnswerSelect={handleAnswerSubmit}
            timer={timer}
          />

          <div className="quiz-navigation">
            <button
              className="btn btn-outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              ← Previous
            </button>
            
            <div className="question-indicators">
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`question-indicator ${
                    index === currentQuestionIndex ? 'current' : ''
                  } ${
                    answers[index] ? 'answered' : ''
                  }`}
                  onClick={() => handleGoToQuestion(index)}
                  title={`Question ${index + 1}${answers[index] ? ' (Answered)' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <button
              className="btn btn-outline"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

