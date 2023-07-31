// Import required libraries
import { createContext, useReducer, useEffect } from 'react';

// Create a new Context to hold the authentication state and dispatch function
export const AuthContext = createContext();

// Reducer function to handle authentication actions and update the state
export const authReducer = (state, action) => {
  // Check the type of action and update the state accordingly
  switch (action.type) {
    case 'LOGIN':
      // Set the user data in the state when the user logs in
      return { user: action.payload };

    case 'LOGOUT':
      // Clear the user data from the state when the user logs out
      return { user: null };

    case 'EDIT_PROFILE':
      // Set the user data in the state when user edit profile
      return { user: action.payload };

    default:
      // Return the current state if the action type is not recognized
      return state;
  }
}

// AuthContextProvider component to manage authentication state and provide it to its children
export const AuthContextProvider = ({ children }) => {
  // Use the authReducer to create the state and dispatch function
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })


  // Set Initial Auth Status, check if a user is stored in local storage when the page is refresh or start at first time
  useEffect(() => {
    // Get the user data from local storage
    const user = JSON.parse(localStorage.getItem('user'))

    // If a user is found, dispatch the LOGIN action to update the state with the user data
    if (user) {
      dispatch({
        type: 'LOGIN',
        payload: user
      })
    }
  }, [])

  // Log the current state for debugging purposes
  console.log('AuthContext state:', state)

  // Provide the authentication state and dispatch function to the children components
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
