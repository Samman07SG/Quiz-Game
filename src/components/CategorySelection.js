import React, { useState, useEffect } from 'react';
import { getCategories, getDifficultyLevels } from '../services/quizApi';
import './CategorySelection.css';

const CategorySelection = ({ onSelect, userName }) => {
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, difficultiesData] = await Promise.all([
          Promise.resolve(getCategories()),
          Promise.resolve(getDifficultyLevels())
        ]);
        
        setCategories(categoriesData);
        setDifficulties(difficultiesData);
        setSelectedCategory(categoriesData[0]?.id || 'general');
      } catch (error) {
        console.error('Error loading categories:', error);
        // Fallback data
        setCategories([
          { id: 'general', name: 'General Knowledge', apiId: 9 },
          { id: 'science', name: 'Science', apiId: 17 },
          { id: 'history', name: 'History', apiId: 23 },
          { id: 'geography', name: 'Geography', apiId: 22 },
          { id: 'sports', name: 'Sports', apiId: 21 }
        ]);
        setDifficulties([
          { id: 'easy', name: 'Easy' },
          { id: 'medium', name: 'Medium' },
          { id: 'hard', name: 'Hard' }
        ]);
        setSelectedCategory('general');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleAmountChange = (amount) => {
    setSelectedAmount(parseInt(amount));
  };

  const handleStartQuiz = () => {
    if (!selectedCategory) return;
    
    onSelect({
      id: selectedCategory,
      name: categories.find(cat => cat.id === selectedCategory)?.name || 'General Knowledge',
      difficulty: selectedDifficulty,
      amount: selectedAmount
    });
  };

  const getCategoryIcon = (categoryId) => {
    const icons = {
      general: '🧠',
      science: '🔬',
      history: '📚',
      geography: '🌍',
      sports: '⚽',
      art: '🎨',
      music: '🎵',
      film: '🎬',
      books: '📖',
      television: '📺',
      video_games: '🎮',
      science_nature: '🌿',
      science_computers: '💻',
      science_mathematics: '📐',
      mythology: '🏛️',
      politics: '🏛️',
      celebrities: '⭐',
      animals: '🐾',
      vehicles: '🚗',
      comics: '💥',
      science_gadgets: '🔧',
      anime_manga: '🎌',
      cartoon_animation: '🎭'
    };
    return icons[categoryId] || '❓';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: '#4CAF50',
      medium: '#FF9800',
      hard: '#F44336'
    };
    return colors[difficulty] || '#666';
  };

  if (loading) {
    return (
      <div className="category-selection-container">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading quiz categories...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="category-selection-container">
      <div className="container fade-in">
        <div className="header">
          <h1>Welcome, {userName}! 👋</h1>
          <p>Choose your quiz category and difficulty level to begin your knowledge journey.</p>
        </div>

        <div className="selection-grid">
          <div className="selection-section">
            <h3>📚 Choose Category</h3>
            <div className="category-grid">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="category-icon">
                    {getCategoryIcon(category.id)}
                  </span>
                  <span className="category-name">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="selection-section">
            <h3>⚡ Difficulty Level</h3>
            <div className="difficulty-options">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty.id}
                  className={`difficulty-card ${selectedDifficulty === difficulty.id ? 'selected' : ''}`}
                  onClick={() => handleDifficultyChange(difficulty.id)}
                  style={{
                    '--difficulty-color': getDifficultyColor(difficulty.id)
                  }}
                >
                  <span className="difficulty-name">{difficulty.name}</span>
                  <span className="difficulty-indicator"></span>
                </button>
              ))}
            </div>
          </div>

          <div className="selection-section">
            <h3>📊 Number of Questions</h3>
            <div className="amount-selector">
              <label htmlFor="question-amount" className="sr-only">
                Number of questions
              </label>
              <select
                id="question-amount"
                value={selectedAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="amount-select"
              >
                <option value={5}>5 Questions (Quick Quiz)</option>
                <option value={10}>10 Questions (Standard)</option>
                <option value={15}>15 Questions (Extended)</option>
                <option value={20}>20 Questions (Marathon)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="quiz-preview">
          <h3>🎯 Quiz Preview</h3>
          <div className="preview-info">
            <div className="preview-item">
              <span className="preview-label">Category:</span>
              <span className="preview-value">
                {getCategoryIcon(selectedCategory)} {categories.find(cat => cat.id === selectedCategory)?.name || 'General Knowledge'}
              </span>
            </div>
            <div className="preview-item">
              <span className="preview-label">Difficulty:</span>
              <span className="preview-value" style={{ color: getDifficultyColor(selectedDifficulty) }}>
                {difficulties.find(diff => diff.id === selectedDifficulty)?.name || 'Medium'}
              </span>
            </div>
            <div className="preview-item">
              <span className="preview-label">Questions:</span>
              <span className="preview-value">{selectedAmount}</span>
            </div>
            <div className="preview-item">
              <span className="preview-label">Time per question:</span>
              <span className="preview-value">30 seconds</span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button
            onClick={handleStartQuiz}
            className="btn btn-primary"
            disabled={!selectedCategory}
          >
            Start Quiz 🚀
          </button>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline"
          >
            ← Back to Profile
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="btn btn-outline"
            style={{ background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)', color: 'white', border: 'none' }}
          >
            🔄 Start Fresh
          </button>
        </div>

        <div className="quiz-tips">
          <h4>💡 Pro Tips</h4>
          <ul>
            <li>Read each question carefully before selecting an answer</li>
            <li>Use the 30-second timer wisely - don't rush!</li>
            <li>You can navigate between questions using Previous/Next buttons</li>
            <li>Your progress is automatically saved</li>
            <li>Check out the General Knowledge section after completing the quiz</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;

