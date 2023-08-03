import { PageContext } from "../context/PageContext"
import { useContext } from "react"

// Custom hook to access the PageContext and get the context value
export const usePageContext = () => {
  // Get the context value using the useContext hook
  const context = useContext(PageContext)

  // Check if the context is available and not null
  if (!context) {
    // If the context is not available, throw an error
    throw Error('usePageContext must be used inside a PageContextProvider')
  }

  // Return the context value
  return context
}
