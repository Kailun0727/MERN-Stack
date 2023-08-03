// Import required libraries
import { createContext, useReducer } from 'react';

// Create a new Context to hold the page state and dispatch function
export const PageContext = createContext();

// Reducer function to handle state updates based on dispatched actions
export const pageReducer = (state, action) => {
  switch (action.type) {
    // Action to set the page details
    case 'SET_PAGES':
      return { 
        page: action.payload
      }

    // Default case, return the current state for unknown actions
    default:
      return state
  }
}

// Provider component to wrap the application with the PageContext
export const PageContextProvider = ({ children }) => {
  // Use the reducer and provide an initial state for the page
  const [state, dispatch] = useReducer(pageReducer, { 
    page: { "currentPage": "1", "totalPages": "1", "totalWorkouts": "0" }
  })
  
  // Return the PageContext.Provider with the state and dispatch function as values
  return (
    <PageContext.Provider value={{ ...state, dispatch }}>
      { children }
    </PageContext.Provider>
  )
}
