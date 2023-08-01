

const express = require('express')

const {
    signupUser, 
    loginUser,
    editProfile
  } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

router.patch('/editProfile', editProfile)

module.exports = router