import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

// Define the Login component
const Login = () => {
    // State variables to store email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {login, error, isLoading}= useLogin()

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email,password)
    }

    // Render the login form
    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3 className="login">Login</h3>

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
            <button className="login" disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div> }
        </form>
    )
}

export default Login
