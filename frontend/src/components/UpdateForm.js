import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const UpdateForm = ({ workout , onSuccess}) => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState(workout.title)
  const [load, setLoad] = useState(workout.load)
  const [reps, setReps] = useState(workout.reps)
  const [error, setError] = useState(null)
  const [emptyField, setEmptyField] = useState([])

  


  const handleCancelClick = () => {
    // Clear form fields and call the onSuccess callback without making the API call
    setTitle('');
    setLoad('');
    setReps('');
    setError(null);
    setEmptyField([]);
    onSuccess();
  };


  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedWorkout = { ...workout, title, load, reps } // Preserve existing workout ID and other properties

    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedWorkout),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error);
      setEmptyField(json.emptyField)
    }
    if (response.ok) {
      // Clear form fields after successful update
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyField([])
      // Update UI with the updated workout data
      dispatch({ type: 'UPDATE_WORKOUT', payload: json })

      onSuccess()// Call the onSuccess callback to notify the parent component
    }
  }

  return (

    <form className="update" onSubmit={handleSubmit}>
      <h3>Update Workout</h3>

      <label>New Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyField.includes('title') ? 'error' : ''}
      />

      <label>New Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyField.includes('load') ? 'error' : ''}
      />

      <label>New Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyField.includes('reps') ? 'error' : ''}
      />

      <button className='update'>Update Workout</button>
      <button className='cancel' onClick={handleCancelClick}>Cancel</button>
      {error && <div className="error">{error}</div>}
    </form>

  )
}

export default UpdateForm
