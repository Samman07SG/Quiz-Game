import React, { useState } from 'react';
import './UsernameForm.css';

const UsernameForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim() || null,
      timestamp: new Date().toISOString()
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="username-form-container">
      <div className="container fade-in">
        <div className="header">
          <h1>🎯 Quiz Master</h1>
          <p>Welcome! Let's get to know you before we start the quiz.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="username-form" noValidate>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter your full name"
              required
              autoComplete="name"
              maxLength={50}
            />
            {errors.name && (
              <div className="error-message" role="alert">
                {errors.name}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email address"
              autoComplete="email"
              maxLength={100}
            />
            {errors.email && (
              <div className="error-message" role="alert">
                {errors.email}
              </div>
            )}
            <small className="form-help">
              We'll use this to save your quiz results (optional)
            </small>
          </div>
          
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !formData.name.trim()}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Getting Ready...
                </>
              ) : (
                'Start Quiz Journey'
              )}
            </button>
          </div>
        </form>
        
        <div className="welcome-features">
          <h3>What to expect:</h3>
          <ul>
            <li>🎯 5-10 random questions from various topics</li>
            <li>⏱️ 30 seconds per question to test your knowledge</li>
            <li>📊 Detailed results and performance analysis</li>
            <li>🏆 High score tracking and leaderboard</li>
            <li>🎓 Educational content to learn more</li>
            <li>📱 Fully responsive design</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsernameForm;

