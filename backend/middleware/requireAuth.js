

const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

// Middleware function to require authentication for protected routes
const requireAuth = async (req, res, next) => {

    // Verify authentication
    const { authorization } = req.headers

    // Check if authorization token is present in the request headers
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    // Extract the token from the "Authorization" header
    const token = authorization.split(' ')[1]

    try {
        // Verify the token and extract the user ID (_id) from it
        const { _id } = jwt.verify(token, process.env.SECRET)

        // Find the user with the extracted ID and add it into Request
        req.user = await User.findOne({ _id }).select('_id')

        // Proceed to the next middleware or route handler
        next()
    } catch (error) {
        // Handle authentication errors
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    }

}

// Export the requireAuth middleware
module.exports = requireAuth
