import React, { createContext, useReducer } from 'react';

export const appContext = createContext();

const initialState = {
  questions: JSON.parse(localStorage.getItem('questions')) || [],
  currentQues: Number(JSON.parse(localStorage.getItem('currentQues'))) || 0,
  correctAns: Number(JSON.parse(localStorage.getItem('newCorrectAns'))) || 0,
};

export function appReducer(state, action) {
  switch (action.type) {
    case 'getQuestionsRequest':
      return {
        ...state,
        loading: true,
        questions: [],
      };

    case 'getQuestionsSuccess':
      return {
        ...state,
        loading: false,
        questions: action.payload,
        error: false,
        currentQues: 0,
        correctAns:
          Number(JSON.parse(localStorage.getItem('newCorrectAns'))) || 0,
      };

    case 'getQuestionsFail':
      return {
        ...state,
        loading: false,
        questions: [],
        error: action.payload,
      };

    case 'increase':
      return {
        ...state,
        currentQues: action.payload,
        correctAns:
          Number(JSON.parse(localStorage.getItem('newCorrectAns'))) || 0,
      };

    case 'getRankRequest':
      return {
        ...state,
        loading: true,
      };

    case 'getRankSuccess':
      return {
        ...state,
        loading: false,
        rank: action.payload,
      };

    case 'getRankFail':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <appContext.Provider value={{ state, dispatch }}>
      {children}
    </appContext.Provider>
  );
}
