const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn : '3d'})
}

// Function to login a user
const loginUser = async (req, res) => {
    const {email,password} = req.body

    try {
        // Call the User.signup method to create a new user
        const user = await User.login(email, password)

        //create token
        const token = createToken(user._id)

        // Send a success response with the user's email and data
        res.status(200).json({ email, token })
    } catch (error) {
        // If there's an error during signup, send an error response
        res.status(400).json({ error: error.message })
    }
}

// Function to signup a new user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // Call the User.signup method to create a new user
        const user = await User.signup(email, password)

        //create token
        const token = createToken(user._id)

        // Send a success response with the user's email and data
        res.status(200).json({ email, token })
    } catch (error) {
        // If there's an error during signup, send an error response
        res.status(400).json({ error: error.message })
    }
}

const editProfile = async(req,res) =>{
    const { email, newEmail, password, confirmPassword } = req.body

    try {
        // Call the User.signup method to create a new user
        const user = await User.editProfile(email, newEmail, password, confirmPassword)

        //create token
        const token = createToken(user._id)

        // Send a success response with the new user's info
        res.status(200).json({ email: newEmail, token })
    } catch (error) {
        // If there's an error during signup, send an error response
        res.status(400).json({ error: error.message })
    }
}

module.exports = { signupUser, loginUser , editProfile}