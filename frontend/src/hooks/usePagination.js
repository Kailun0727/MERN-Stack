import { useWorkoutsContext } from './useWorkoutsContext'
import { useAuthContext } from './useAuthContext'
import { usePageContext } from './usePageContext'

// Custom hook for pagination
export const usePagination = () => {
  // Access the user from the authentication context using the custom hook
  const { user } = useAuthContext()

  // Access the workouts dispatch function from the workouts context using the custom hook
  const { dispatch } = useWorkoutsContext()

  // Access the page dispatch function from the page context using the custom hook
  const { dispatch: pageDispatch } = usePageContext()

  // Function to handle page change
  const pageChange = async (page) => {
    // Log the current clicked page
    console.log('Current page is ' + page)

    // Define the URL for the API request
    const url = '/api/workouts?page=' + page

    // Send a request to the server to get workouts for the selected page
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    // Handle response based on success or error
    if (!response.ok) {
      // If there are no workouts, show an alert
      window.alert('No workouts found!');
    }

    if (response.ok) {
      // Update the workouts context with the fetched workouts data
      dispatch({ type: 'SET_WORKOUTS', payload: json.workouts })

      // Create a page object with the relevant page data
      const page = {
        currentPage: json.currentPage,
        totalPages: json.totalPages,
        totalWorkouts: json.totalWorkouts
      }

      // Update the page context with the page object
      pageDispatch({ type: 'SET_PAGES', payload: page })
    }
  }

  // Return the pageChange function
  return { pageChange }
}
