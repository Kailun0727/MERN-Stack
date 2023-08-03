import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"


// Import components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import SearchBar from "../components/SearchBar"
import PaginationBar from "../components/PaginationBar"
import { usePageContext } from "../hooks/usePageContext"

const Home = () => {
  // Access the workouts and dispatch function from the global context using the custom hook
  const { workouts, dispatch } = useWorkoutsContext()

  const {page, dispatch : pageDispatch} = usePageContext()

  const [loading, setLoading] = useState(true);

  // Get the user from the auth context using the custom hook
  const {user} = useAuthContext()

  // Fetch workouts data from the server when the component mounts or when the 'dispatch' function changes
  useEffect(() => {
    // Define an async function to fetch workouts from the server
    const fetchWorkouts = async () => {
      const response = await fetch('https://mern-stack-backend-n3jh.onrender.com/api/workouts', {
        headers : {
          //use `` backtick when want to use variable inside string
          'Authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      // If the server responds successfully, update the global context with the fetched workouts
      if (response.ok) {
        // Use the 'dispatch' function to set the workouts in the global context
        dispatch({type: 'SET_WORKOUTS', payload: json.workouts})

        pageDispatch({ type: 'SET_PAGES', payload: {
          "currentPage" : json.currentPage,
          "totalPages" : json.totalPages,
          "totalWorkouts" : json.totalWorkouts
        } })
        
        

        setLoading(false);
        
      }
    }

    if(user){
        // Call the fetchWorkouts function to retrieve workouts when the component mounts
        fetchWorkouts()
        
        
    }

    
  }, [dispatch, user, page, pageDispatch]) // The 'dispatch' and 'user' dependency ensures the effect runs whenever the dispatch function changes

  return (
    <div className="home">
      {/* Display all the workout details */}
      <div className="workouts">
        
      <SearchBar/>

      <h3>Page {page.currentPage} of {page.totalPages}</h3>
      
      
      {loading ? ( // Check if 'loading' is true, display a loading message
          <h3>Loading...</h3>
        ) : workouts && workouts.length > 0 ? (// If 'loading' is false and 'workouts' array is not empty
          // Map through the 'workouts' array and display the details of each workout
          workouts.map(workout => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))
            
         

        ) : (// If 'loading' is false but 'workouts' array is empty
          <h3>Try to add some workouts!</h3>// Display a message to encourage adding workouts
        )}
        <PaginationBar
            currentPage={page.currentPage}
            totalPages = {page.totalPages}
           
        
        />
      </div>
      {/* Display the form to add new workouts */}
      <WorkoutForm />
    </div>
  )
}

export default Home;
