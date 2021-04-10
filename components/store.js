import React, { createContext, useReducer } from 'react';

const initialState = {
  user: null,
  people: [],
  loading: false,
  uploading: false,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_PROFILE':
        return {
          ...state,
          user: action.user
        };
      case 'RESTRUCTURE_PEOPLE':
        return {
          ...state,
          people: action.people
        };
      case 'SET_LOADING':
        return {
          ...state,
          loading: action.loading
        };
      case 'SET_LOADING_UPLOAD':
        return {
          ...state,
          uploading: action.loading
        };
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }