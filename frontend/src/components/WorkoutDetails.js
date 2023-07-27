import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import UpdateForm from "./UpdateForm";
import { useState } from "react";

//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  // State to control whether the UpdateForm should be shown or hidden
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Get the dispatch function from the global context using the custom hook
  const { dispatch } = useWorkoutsContext();

  // Function to handle the "Update" button click
  const handleUpdateClick = () => {
    // Show the UpdateForm when the button is clicked
    setShowUpdateForm(true);
  };

  // Function to handle the success of updating the workout
  const handleUpdateSuccessOrCancel = () => {
    // Hide the UpdateForm after a successful update
    setShowUpdateForm(false);
  };

  // Function to handle the "Delete" button click
  const handleDeleteClick = async () => {
    // Send a DELETE request to the server to delete the workout
    const response = await fetch('api/workouts/' + workout._id, {
      method: 'DELETE'
    });
    const json = await response.json();

    // If the deletion was successful, update the global context by dispatching the DELETE_WORKOUT action
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix : true} )}</p>

      {/* Button to trigger the display of the UpdateForm */}
      <span className='material-symbols-outlined' onClick={handleUpdateClick} style={{ marginRight: '50px' }}>Edit</span>

      {/* Button to trigger the deletion of the workout */}
      <span className='material-symbols-outlined' onClick={handleDeleteClick}>Delete</span>

      {/* Show the UpdateForm only if showUpdateForm state is true */}
      {showUpdateForm && (
        <UpdateForm
        // Pass the workout data and onSuccess callback to the UpdateForm component
        workout={workout}
        onSuccess={handleUpdateSuccessOrCancel}
      />
      )}
    </div>
  );
};

export default WorkoutDetails;
