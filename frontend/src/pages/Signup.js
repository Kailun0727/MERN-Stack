import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

// Define the Signup component
const Signup = () => {
    // State variables to store email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Custom hook to handle user signup logic
    const { signup, error, isLoading } = useSignup()

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Call the signup function with email and password as arguments
        await signup(email, password)
    }

    // Render the signup form
    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3 className="signup" >Sign Up</h3>

            <label>Email:</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button className="signup" disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup
