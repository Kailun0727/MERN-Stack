import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// Custom hook for user login
export const useLogin = () => {
  // State variables to store error and loading status
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  // Access the dispatch function from the Auth context
  const { dispatch } = useAuthContext()

  // Function to handle user signup
  const login = async (email, password) => {
    // Set loading to true and clear any previous error
    setIsLoading(true)
    setError(null)

    // Send signup request to the server
    const response = await fetch('https://mern-stack-backend-83vl.onrender.com/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    // Handle response based on success or error
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // Save the user data to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // Update the authentication context with the user data
      dispatch({ type: 'LOGIN', payload: json })

      // Set loading to false after successful signup
      setIsLoading(false)
    }
  }

  // Return the signup function, loading status, and error message
  return { login, isLoading, error }
}
