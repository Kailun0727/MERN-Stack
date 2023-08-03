
import { useWorkoutsContext } from './useWorkoutsContext'
import { useAuthContext } from './useAuthContext'
import { usePageContext } from './usePageContext'


// Custom hook for user login
export const useSearch = () => {
  const {user} = useAuthContext()

  const {dispatch} = useWorkoutsContext()

  const {dispatch: pageDispatch} = usePageContext()

  // Function to handle user signup
  const searchWorkout = async (searchQuery) => {

  
    // Send signup request to the server
    const response = await fetch('/api/workouts?searchQuery='+ searchQuery, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${user.token}`}
    })

    const json = await response.json()

    // Handle response based on success or error
    if (!response.ok) {
      //alert there is no workouts
      window.alert('No workouts found!');
    }
    if (response.ok) {
      // Update the authentication context with the user data
      dispatch({ type: 'SET_WORKOUTS', payload: json.workouts })

      const page = {
        currentPage : json.currentPage, 
        totalPages : json.totalPages,
        totalWorkouts : json.totalWorkouts
    
    }

      pageDispatch({ type: 'SET_PAGES', payload: page })

    }
  }

  // Return the signup function, loading status, and error message
  return { searchWorkout}
}
