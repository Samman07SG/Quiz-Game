import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import { preloadResources } from './utils/performance';
import './App.css';

// Lazy load components for better performance
const UsernameForm = React.lazy(() => import('./components/UsernameForm'));
const CategorySelection = React.lazy(() => import('./components/CategorySelection'));
const Quiz = React.lazy(() => import('./components/Quiz'));
const Results = React.lazy(() => import('./components/Results'));
const GeneralKnowledge = React.lazy(() => import('./components/GeneralKnowledge'));

function App() {
  const [user, setUser] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Load user data from localStorage on mount and preload resources
  useEffect(() => {
    // Preload critical resources
    preloadResources();
    
    // Load user data
    const savedUser = localStorage.getItem('quizUser');
    const savedQuizCompleted = localStorage.getItem('quizCompleted');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedQuizCompleted) setQuizCompleted(JSON.parse(savedQuizCompleted));
  }, []);

  const handleUserSubmit = (userData) => {
    setUser(userData);
    localStorage.setItem('quizUser', JSON.stringify(userData));
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    localStorage.setItem('quizCompleted', JSON.stringify(true));
  };

  const handleRestart = () => {
    setUser(null);
    setQuizCompleted(false);
    // Clear all quiz-related localStorage
    localStorage.removeItem('quizUser');
    localStorage.removeItem('quizCompleted');
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('quizScore');
    localStorage.removeItem('quizQuestions');
    // Force page reload to reset all state
    window.location.reload();
  };

  return (
    <QuizProvider>
      <Router>
        <div className="App">
          <Suspense fallback={
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading Quiz Master...</p>
            </div>
          }>
            <Routes>
              <Route 
                path="/" 
                element={
                  !user ? (
                    <UsernameForm onSubmit={handleUserSubmit} />
                  ) : !quizCompleted ? (
                    <Quiz 
                      userName={user.name}
                      onComplete={handleQuizComplete}
                    />
                  ) : (
                    <Results 
                      userName={user.name}
                      onRestart={handleRestart}
                    />
                  )
                } 
              />
              <Route 
                path="/general-knowledge" 
                element={<GeneralKnowledge onBack={() => window.history.back()} />} 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App;
