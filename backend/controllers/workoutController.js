
const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

// Get all workouts, supporting pagination and fuzzy search
const getWorkouts = async (req, res) => {
  // Get the user_id from the middleware request body
  const user_id = req.user._id

  // Extract query parameters from the request
  const { searchQuery, page, pageSize } = req.query

  // Define default values for pagination
  const pageNumber = parseInt(page) || 1       // Default to page 1 if not provided
  const itemsPerPage = parseInt(pageSize) || 5 // Default to 5 items per page if not provided
  const skip = (pageNumber - 1) * itemsPerPage // Calculate the number of items to skip for pagination

  // If searchQuery is provided, perform fuzzy search
  if (searchQuery) {
    // Retrieve all workouts that belong to the specific user and sort them by createdAt in descending order
    let workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })

    // Create a regular expression for case-insensitive fuzzy search
    const regex = new RegExp(searchQuery, 'i')

    // Filter the workouts array based on the search query
    workouts = workouts.filter((workout) => regex.test(workout.title))

     // Check if the workouts array after search is empty
    if (workouts.length === 0) {
      return res.status(404).json({ error: 'No such workout' });
    }

    // Calculate the total number of matching workouts and get the paginated results
    const totalWorkouts = workouts.length
    const paginatedWorkouts = workouts.slice(skip, skip + itemsPerPage)

    // Respond with the paginated and searched results in JSON format
    return res.status(200).json({
      totalWorkouts,
      totalPages: Math.ceil(totalWorkouts / itemsPerPage),
      currentPage: pageNumber,
      workouts: paginatedWorkouts,
    })
  }

  // If no searchQuery, retrieve all workouts and send paginated results
  const totalWorkoutsCount = await Workout.countDocuments({ user_id })
  const totalWorkouts = await Workout.find({ user_id }).sort({ createdAt: -1 }).skip(skip).limit(itemsPerPage)

   // Check if the workout no exists
   if (!totalWorkouts) {
    return res.status(404).json({ error: 'No such workout' });
  }

  // Respond with the paginated results in JSON format
  return res.status(200).json({
    totalWorkouts: totalWorkoutsCount,
    totalPages: Math.ceil(totalWorkoutsCount / itemsPerPage),
    currentPage: pageNumber,
    workouts: totalWorkouts,
  })
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
