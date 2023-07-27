import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// Import components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
  // Access the workouts and dispatch function from the global context using the custom hook
  const { workouts, dispatch } = useWorkoutsContext()

  // Fetch workouts data from the server when the component mounts or when the 'dispatch' function changes
  useEffect(() => {
    // Define an async function to fetch workouts from the server
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json()

      // If the server responds successfully, update the global context with the fetched workouts
      if (response.ok) {
        // Use the 'dispatch' function to set the workouts in the global context
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    // Call the fetchWorkouts function to retrieve workouts when the component mounts
    fetchWorkouts()
  }, [dispatch]) // The 'dispatch' dependency ensures the effect runs whenever the dispatch function changes

  return (
    <div className="home">
      {/* Display all the workout details */}
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      {/* Display the form to add new workouts */}
      <WorkoutForm />
    </div>
  )
}

export default Home;
