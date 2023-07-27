import { WorkoutsContext } from "../context/WorkoutsContext"
import { useContext } from "react"

// Custom hook to access the WorkoutsContext and get the context value
export const useWorkoutsContext = () => {
  // Get the context value using the useContext hook
  const context = useContext(WorkoutsContext)

  // Check if the context is available and not null
  if(!context) {
    // If the context is not available, throw an error
    throw Error('useWorkoutsContext must be used inside a WorkoutsContextProvider')
  }

  // Return the context value
  return context
}
