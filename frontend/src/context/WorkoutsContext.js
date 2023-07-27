// Import required libraries
import { createContext, useReducer } from 'react';

// Create a new Context to hold the workouts state and dispatch function
export const WorkoutsContext = createContext();

// Reducer function to handle state updates based on dispatched actions
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    // Action to set the list of workouts
    case 'SET_WORKOUTS':
      return { 
        workouts: action.payload 
      }
    // Action to add a new workout to the list
    case 'CREATE_WORKOUT':
      return { 
        workouts: [action.payload, ...state.workouts] 
      }
    // Action to remove a workout from the list
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id)
      }
    // Action to update a workout in the list
    case 'UPDATE_WORKOUT':
      // Find the index of the workout to be updated in the workouts array
      const updatedWorkoutIndex = state.workouts.findIndex(
        (w) => w._id === action.payload._id
      );
      
      // Update the workout in the workouts array
      const updatedWorkouts = [...state.workouts];
      updatedWorkouts[updatedWorkoutIndex] = action.payload;
      return {
        workouts: updatedWorkouts,
      }

    // Default case, return the current state for unknown actions
    default:
      return state
  }
}

// Provider component to wrap the application with the WorkoutsContext
export const WorkoutsContextProvider = ({ children }) => {
  // Use the reducer and provide an initial state for the workouts
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: null
  })
  
  // Return the WorkoutsContext.Provider with the state and dispatch function as values
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}
