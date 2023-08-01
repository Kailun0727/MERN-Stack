
const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

// Get all workouts
const getWorkouts = async (req, res) => {
   // Get the user_id from the middleware request body
  const user_id = req.user._id



  // Retrieve all workouts from the database that belongs to specific "user_id" and sort them by createdAt in descending order
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

  // Respond with the list of workouts in JSON format
  res.status(200).json(workouts);
};

// Get a single workout by ID
const getWorkout = async (req, res) => {
  const { id } = req.params;

  // Check if the provided workout ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  // Retrieve the workout by its ID from the database
  const workout = await Workout.findById(id);

  // Check if the workout with the provided ID exists
  if (!workout) {
    return res.status(404).json({ error: 'No such workout' });
  }

  // Respond with the retrieved workout data in JSON format
  res.status(200).json(workout);
};

// Create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  // Check which fields are empty, if any, add those fields to the emptyField array
  let emptyField = [];
  if (!title) {
    emptyField.push('title');
  }
  if (!load) {
    emptyField.push('load');
  }
  if (!reps) {
    emptyField.push('reps');
  }

  // If any fields are empty, respond with an error and the emptyField array
  if (emptyField.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyField });
  }

  // If all fields are provided, create a new workout and add it to the database
  try {

    // Get the user_id from the middleware request body
    const user_id = req.user._id

    const workout = await Workout.create({ title, load, reps, user_id});
    // Respond with the newly created workout data in JSON format
    res.status(200).json(workout);
  } catch (error) {
    // If there was an error while creating the workout, respond with the error message
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout by ID
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  // Check if the provided workout ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such workout' });
  }

  // Find the workout by its ID and remove it from the database
  const workout = await Workout.findOneAndDelete({ _id: id });

  // Check if the workout with the provided ID exists
  if (!workout) {
    return res.status(400).json({ error: 'No such workout' });
  }

  // Respond with the deleted workout data in JSON format
  res.status(200).json(workout);
};

// Update a workout by ID
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, load, reps } = req.body;

  // Check which fields are empty, if any, add those fields to the emptyField array
  let emptyField = [];
  if (!title) {
    emptyField.push('title');
  }
  if (load === null || load === undefined || load === '') {
    emptyField.push('load');
  }
  if (reps === null || reps === undefined || reps === '') {
    emptyField.push('reps');
  }

  // If any fields are empty, respond with an error and the emptyField array
  if (emptyField.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyField });
  }

  // Check if the provided workout ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such workout' });
  }

  // Find the workout by its ID, update it with the new data, and return the updated workout
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

  // Check if the workout with the provided ID exists
  if (!workout) {
    return res.status(400).json({ error: 'No such workout' });
  }

  // Respond with the updated workout data in JSON format
  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
