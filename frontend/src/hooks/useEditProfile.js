import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// Custom hook for user login
export const useEditProfile = () => {
  // State variables to store error and loading status
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  // Access the dispatch function from the Auth context
  const { user, dispatch } = useAuthContext()

  // Function to handle user signup
  const editProfile = async (email, password, confirmPassword) => {
    // Set loading to true and clear any previous error
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    // Send signup request to the server
    const response = await fetch('https://mern-stack-backend-n3jh.onrender.com/api/user/editProfile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, newEmail: email, password, confirmPassword })
    })
    const json = await response.json()

    // Handle response based on success or error
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      setSuccess(json.success)

      // Save the user data to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // Update the authentication context with the user data
      dispatch({ type: 'EDIT_PROFILE', payload: json })

      // Set loading to false after successful signup
      setIsLoading(false)
    }
  }

  // Return the signup function, loading status, and error message
  return { editProfile, isLoading, error , success}
}
