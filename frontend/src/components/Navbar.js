import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  // Get the logout function from the useLogout hook
  const { logout } = useLogout()

  const {user} = useAuthContext()

  // Function to handle the logout button click
  const handleClick = () => {
    // Call the logout function to log the user out
    logout()
  }

  

  return (
    <header>
      <div className="container">
        {/* Logo with a link to the home page */}
        <Link to="/">
          <h1>FitnessFusion</h1>
        </Link>
        <nav>
        {/* If there is a user in local storage, which mean currently in login status*/}
          {user && (
              <div>
                {/* Display email from global auth context, must be careful about the field*/}
                <span>{user.email}</span>
                {/* Edit Profile button */}
                <Link to="/editProfile"><button>Edit Profile</button></Link>
                {/* Logout button */}
                <button onClick={handleClick}>Log out</button>
              </div>
          )}
         
         {/* If there is no user in local storage, which mean currently in logout status*/}
         {!user && (
            <div>
              {/* Links to the login and signup pages */}
              
              <Link to="/login"><button>Login</button></Link>
             
              <Link to="/signup"> <button className='signup'>Signup</button></Link>
            </div>
         )}
        
        </nav>
      </div>
    </header>
  )
}

export default Navbar
