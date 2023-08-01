import { useState } from 'react'
import { useEditProfile } from '../hooks/useEditProfile'

// Define the EditProfile component
const EditProfile = () => {
    // State variables to store email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const {editProfile, error, success, isLoading}= useEditProfile()

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        await editProfile(email, password, confirmPassword)

    }

    // Render the login form
    return (
        <form className="edit" onSubmit={handleSubmit}>
            <h3 className="edit">Edit Profile</h3>

            <label>New Email:</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>New Password:</label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <label>Confirm Password:</label>
            <input 
                type="password" 
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
            />
            <button className="edit" disabled={isLoading}>Edit</button>
            {error && <div className="error">{error}</div> }
            {success && <div className="success">{success}</div> }
        </form>
    )
}

export default EditProfile
