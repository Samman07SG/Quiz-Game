import React, { createContext, useContext, useReducer, useEffect } from 'react';

const QuizContext = createContext();

// Quiz state reducer
const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_QUESTIONS':
      return { 
        ...state, 
        questions: action.payload, 
        loading: false, 
        error: null,
        currentQuestionIndex: 0,
        answers: [],
        score: 0,
        timer: 30
      };
    
    case 'SET_ANSWER':
      const newAnswers = [...state.answers];
      newAnswers[state.currentQuestionIndex] = {
        questionIndex: state.currentQuestionIndex,
        selectedAnswer: action.payload,
        isCorrect: action.payload === state.questions[state.currentQuestionIndex]?.correct_answer,
        timeSpent: action.timeSpent || 0
      };
      
      return {
        ...state,
        answers: newAnswers,
        score: newAnswers.filter(answer => answer.isCorrect).length
      };
    
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1
      };
    
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)
      };
    
    case 'GO_TO_QUESTION':
      return {
        ...state,
        currentQuestionIndex: action.payload
      };
    
    case 'SET_TIMER':
      return {
        ...state,
        timer: action.payload
      };
    
    case 'RESET_QUIZ':
      return {
        ...state,
        questions: [],
        currentQuestionIndex: 0,
        answers: [],
        score: 0,
        loading: false,
        error: null,
        timer: 30
      };
    
    default:
      return state;
  }
};

// Initial state
const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  loading: false,
  error: null,
  timer: 30,
  timeRemaining: 30
};

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Don't load quiz data on mount - let each quiz start fresh
  // This prevents old answers from interfering with new quizzes

  // Save answers to localStorage whenever answers change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (state.answers.length > 0) {
        localStorage.setItem('quizAnswers', JSON.stringify(state.answers));
        localStorage.setItem('quizScore', state.score.toString());
      }
    }, 500); // Debounce to avoid excessive localStorage writes

    return () => clearTimeout(timeoutId);
  }, [state.answers, state.score]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (state.timer > 0 && state.loading === false && state.questions.length > 0) {
      interval = setInterval(() => {
        dispatch({ type: 'SET_TIMER', payload: state.timer - 1 });
      }, 1000);
    } else if (state.timer === 0 && state.questions.length > 0) {
      // Auto-submit when timer runs out
      const currentQuestion = state.questions[state.currentQuestionIndex];
      if (currentQuestion && !state.answers[state.currentQuestionIndex]) {
        dispatch({ 
          type: 'SET_ANSWER', 
          payload: null, // No answer selected
          timeSpent: 30 - state.timer
        });
      }
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.timer, state.loading, state.questions, state.currentQuestionIndex, state.answers]);

  const value = {
    ...state,
    dispatch
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

