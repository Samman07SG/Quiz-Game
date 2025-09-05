import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { calculateQuizStats } from '../services/quizApi';
import './Results.css';

const Results = ({ userName, onRestart }) => {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [stats, setStats] = useState(null);
  const [showDetailedResults, setShowDetailedResults] = useState(false);
  const [highScores, setHighScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // General knowledge tips data
  const knowledgeTips = [
    {
      icon: "🌍",
      category: "Geography",
      title: "Amazing Earth Facts",
      tip: "Mount Everest grows about 4mm taller each year due to tectonic plate movement! The Himalayas are still rising as the Indian plate continues to push into the Eurasian plate."
    },
    {
      icon: "🔬",
      category: "Science",
      title: "Physics Wonders",
      tip: "Light travels at 299,792,458 meters per second - that's about 7.5 times around Earth in one second! This speed is the universal speed limit in our universe."
    },
    {
      icon: "📚",
      category: "History",
      title: "Historical Myths",
      tip: "The Great Wall of China is not visible from space with the naked eye, despite popular belief! It's only about 6-7 meters wide, making it too thin to see from orbit."
    },
    {
      icon: "🎨",
      category: "Art & Culture",
      title: "Artistic Secrets",
      tip: "Leonardo da Vinci wrote his notes in mirror writing - you need a mirror to read them normally! This was likely to protect his ideas and make them harder to copy."
    },
    {
      icon: "🏃",
      category: "Sports",
      title: "Olympic Trivia",
      tip: "Olympic gold medals are actually made of 92.5% silver and only 6 grams of gold plating! The last solid gold medals were awarded in 1912."
    },
    {
      icon: "🎵",
      category: "Music",
      title: "Musical Genius",
      tip: "Beethoven composed his famous 9th Symphony when he was completely deaf! He had to feel the vibrations of the piano to compose his masterpieces."
    },
    {
      icon: "🌊",
      category: "Nature",
      title: "Ocean Mysteries",
      tip: "We've explored less than 5% of our oceans! The deep sea remains one of the last frontiers on Earth, with countless species yet to be discovered."
    },
    {
      icon: "🚀",
      category: "Space",
      title: "Cosmic Facts",
      tip: "A day on Venus is longer than its year! Venus takes 243 Earth days to rotate once but only 225 Earth days to orbit the Sun."
    }
  ];

  const updateHighScores = (playerName, quizStats) => {
    setTimeout(() => {
      try {
        const newScore = {
          player: playerName,
          score: quizStats.correctAnswers,
          total: quizStats.totalQuestions,
          percentage: quizStats.percentage,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString()
        };

        const updatedScores = [...highScores, newScore]
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 10);

        setHighScores(updatedScores);
        localStorage.setItem('quizHighScores', JSON.stringify(updatedScores));
      } catch (error) {
        console.warn('Error updating high scores:', error);
      }
    }, 0);
  };

  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem('quizAnswers');
      const savedQuestions = localStorage.getItem('quizQuestions');
      const savedHighScores = localStorage.getItem('quizHighScores');
      
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
      if (savedQuestions) {
        setQuestions(JSON.parse(savedQuestions));
      }
      if (savedHighScores) {
        setHighScores(JSON.parse(savedHighScores));
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading quiz data:', error);
      localStorage.clear();
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (answers.length > 0 && questions.length > 0) {
      const quizStats = calculateQuizStats(questions, answers);
      setStats(quizStats);
      updateHighScores(userName, quizStats);
    }
  }, [answers, questions, userName]);

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return "Outstanding! You're a true knowledge master! 🏆";
    if (percentage >= 80) return "Excellent work! You really know your stuff! 🌟";
    if (percentage >= 70) return "Great job! You have solid knowledge! 👍";
    if (percentage >= 60) return "Good effort! Keep learning and improving! 📚";
    if (percentage >= 50) return "Not bad! There's room for improvement! 💪";
    return "Keep studying! Every expert was once a beginner! 🌱";
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return "#4CAF50";
    if (percentage >= 80) return "#8BC34A";
    if (percentage >= 70) return "#FFC107";
    if (percentage >= 60) return "#FF9800";
    if (percentage >= 50) return "#FF5722";
    return "#F44336";
  };

  const getPerformanceEmoji = (percentage) => {
    if (percentage >= 90) return "🏆";
    if (percentage >= 80) return "🌟";
    if (percentage >= 70) return "👍";
    if (percentage >= 60) return "📚";
    if (percentage >= 50) return "💪";
    return "🌱";
  };

  const handleRestart = () => {
    localStorage.removeItem('quizUser');
    localStorage.removeItem('quizCompleted');
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('quizQuestions');
    localStorage.removeItem('quizScore');
    onRestart();
  };

  const copyToClipboard = () => {
    const text = `I just scored ${stats.percentage}% on the Knowledge Quiz! Can you beat my score? 🧠✨`;
    navigator.clipboard.writeText(text).then(() => {
      alert('Score copied to clipboard!');
    });
  };

  if (isLoading) {
    return (
      <div className="results-container">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <h2>Calculating your results...</h2>
            <p>Analyzing your performance...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stats || !questions.length || !answers.length) {
    return (
      <div className="results-container">
        <div className="container">
          <div className="error-state">
            <h2>⚠️ No Quiz Data Found</h2>
            <p>It looks like there's no quiz data to display. Please take a quiz first!</p>
            <button onClick={onRestart} className="restart-button">
              🔄 Take a Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="container">
        {/* Header Section */}
        <div className="results-header">
          <div className="celebration-emoji">🎉</div>
          <h1>Quiz Complete!</h1>
          <p className="welcome-message">Amazing work, <span className="user-name">{userName}</span>!</p>
        </div>

        {/* Score Display Section */}
        <div className="score-section">
          <div className="main-score-card">
            <div className="score-circle" style={{ borderColor: getPerformanceColor(stats.percentage) }}>
              <div className="score-number" style={{ color: getPerformanceColor(stats.percentage) }}>
                {stats.percentage}%
              </div>
              <div className="score-label">Final Score</div>
            </div>
            <div className="performance-message">
              <div className="performance-emoji">{getPerformanceEmoji(stats.percentage)}</div>
              <div className="performance-text">{getPerformanceMessage(stats.percentage)}</div>
            </div>
          </div>

          <div className="score-stats">
            <div className="stat-item correct">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-number">{stats.correctAnswers}</div>
                <div className="stat-label">Correct</div>
              </div>
            </div>
            <div className="stat-item incorrect">
              <div className="stat-icon">❌</div>
              <div className="stat-content">
                <div className="stat-number">{stats.totalQuestions - stats.correctAnswers}</div>
                <div className="stat-label">Incorrect</div>
              </div>
            </div>
            <div className="stat-item accuracy">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-number">{stats.accuracy}%</div>
                <div className="stat-label">Accuracy</div>
              </div>
            </div>
            <div className="stat-item time">
              <div className="stat-icon">⏱️</div>
              <div className="stat-content">
                <div className="stat-number">{stats.averageTime}s</div>
                <div className="stat-label">Avg Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            onClick={() => setShowDetailedResults(!showDetailedResults)}
            className="btn btn-secondary"
          >
            {showDetailedResults ? '📝 Hide Details' : '📝 View Details'}
          </button>
          <button onClick={handleRestart} className="btn btn-primary">
            🔄 Take Another Quiz
          </button>
        </div>

        {/* Detailed Results */}
        {showDetailedResults && (
          <div className="detailed-results">
            <h3>📝 Question-by-Question Breakdown</h3>
            <div className="questions-list">
              {useMemo(() => 
                questions.slice(0, 15).map((question, index) => {
                  const answer = answers[index];
                  const isCorrect = answer?.isCorrect || false;
                  const selectedAnswer = answer?.selectedAnswer || 'No answer';
                  
                  return (
                    <div key={index} className={`question-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                      <div className="question-header">
                        <div className="question-number">Q{index + 1}</div>
                        <div className="question-status">
                          {isCorrect ? '✅ Correct' : '❌ Incorrect'}
                        </div>
                      </div>
                      <div className="question-text">{question.question}</div>
                      <div className="answer-details">
                        <div className="answer-row">
                          <span className="answer-label">Your answer:</span>
                          <span className={`answer-value ${isCorrect ? 'correct' : 'incorrect'}`}>
                            {selectedAnswer}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="answer-row">
                            <span className="answer-label">Correct answer:</span>
                            <span className="answer-value correct">
                              {question.correct_answer}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }), [questions, answers]
              )}
            </div>
          </div>
        )}

        {/* High Scores Section */}
        <div className="high-scores-section">
          <div className="section-header">
            <h3>🏆 High Scores</h3>
            <p>See how you rank against other players!</p>
          </div>
          
          <div className="high-scores-list">
            {highScores.length > 0 ? (
              highScores.map((score, index) => (
                <div 
                  key={index} 
                  className={`high-score-item ${score.player === userName ? 'current-player' : ''}`}
                >
                  <div className="rank">
                    {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}
                  </div>
                  <div className="player-info">
                    <div className="player-name">
                      {score.player} {score.player === userName && '👑'}
                    </div>
                    <div className="score-details">
                      {score.score}/{score.total} ({score.percentage}%)
                    </div>
                  </div>
                  <div className="date">{score.date}</div>
                </div>
              ))
            ) : (
              <div className="no-scores">
                <p>No high scores yet. Be the first to set a record! 🎯</p>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all high scores?')) {
                setHighScores([]);
                localStorage.removeItem('quizHighScores');
              }
            }}
            className="btn btn-danger"
          >
            🗑️ Clear High Scores
          </button>
        </div>

        {/* General Knowledge Tips */}
        <div className="knowledge-tips-section">
          <div className="section-header">
            <h3>🧠 General Knowledge Tips</h3>
            <p>Expand your knowledge with these fascinating facts!</p>
          </div>
          
          <div className="tips-grid">
            {knowledgeTips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-header">
                  <div className="tip-icon">{tip.icon}</div>
                  <div className="tip-category">{tip.category}</div>
                </div>
                <h4 className="tip-title">{tip.title}</h4>
                <p className="tip-content">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="share-section">
          <div className="section-header">
            <h3>🎉 Share Your Achievement</h3>
            <p>Proud of your score? Share it with friends!</p>
          </div>
          
          <div className="share-buttons">
            <button onClick={copyToClipboard} className="btn btn-share">
              📋 Copy Score
            </button>
            <button className="btn btn-share">
              🐦 Share on Twitter
            </button>
            <button className="btn btn-share">
              📘 Share on Facebook
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="footer-actions">
          <Link to="/" className="btn btn-outline">
            🏠 Back to Home
          </Link>
          <button onClick={handleRestart} className="btn btn-primary">
            🔄 Take Another Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;