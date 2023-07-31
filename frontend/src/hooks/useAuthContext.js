import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

// Custom hook to access the AuthContext and get the context value
export const useAuthContext = () => {
  // Get the context value using the useContext hook
  const context = useContext(AuthContext)

  // Check if the context is available and not null
  if(!context) {
    // If the context is not available, throw an error
    throw Error('useAuthContext must be used inside a AuthContextProvider')
  }

  // Return the context value
  return context
}
