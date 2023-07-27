import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
  // Get the dispatch function from the global context using the custom hook
  const { dispatch } = useWorkoutsContext()

  // State to store the input values and error messages
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyField, setEmptyField] = useState([])

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Create a workout object with the form input values
    const workout = { title, load, reps }
    
    // Send a POST request to the server to create a new workout
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    // If the server returns an error, set the error and emptyField states accordingly
    if (!response.ok) {
      setError(json.error)
      setEmptyField(json.emptyField)
    }
    // If the server responds successfully, update the UI and reset the form
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyField([])
      // Update UI by dispatching the CREATE_WORKOUT action with the new workout data
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      {/* Input for Exercise Title */}
      <label>Exercise Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        // Apply the 'error' class to the input if the field is empty
        className={emptyField.includes('title') ? 'error' : ''}
      />

      {/* Input for Load (in kg) */}
      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
        // Apply the 'error' class to the input if the field is empty
        className={emptyField.includes('load') ? 'error' : ''}
      />

      {/* Input for Number of Reps */}
      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
        // Apply the 'error' class to the input if the field is empty
        className={emptyField.includes('reps') ? 'error' : ''}
      />

      {/* Submit button */}
      <button>Add Workout</button>

      {/* Display error message if there is an error */}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm;
