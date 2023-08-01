

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

// Define the user schema with email and password fields
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

// static signup method for the user schema
userSchema.statics.signup = async function(email, password) {

    // validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }


    // Check if the email already exists in the database
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    // Generate a salt and hash the password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    // Create a new user with the hashed password
    const user = await this.create({ email, password: hashPassword })

    return user
}


//static login method
userSchema.statics.login = async function (email,password){
    // validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    // Check if the email already exists in the database
    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password')
    }

    return user

}

userSchema.statics.editProfile = async function(email, newEmail, password,confirmPassword){
    // validation
    if(!newEmail || !password || !confirmPassword){
        throw Error('All fields must be filled')
    }

    // Check if the email already exists in the database
    const user = await this.findOne({ email })

    // Check if the user exists
    if (!user) {
        throw new Error('User not found');
    }

    // Compare the new password and confirmPassword to ensure they match
    if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
    }

    // Generate a salt and hash the password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    // Update the user's email and password and save the changes
    user.email = newEmail;
    user.password = hashPassword;
    await user.save();

    // Return a success message or the updated user object
    return user;
 
}



// Export the mongoose model with the user schema
module.exports = mongoose.model('User', userSchema)
