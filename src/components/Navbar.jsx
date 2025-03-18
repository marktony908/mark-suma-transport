import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Navbar({ session }) {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Mark.Suma Transport
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-blue-200">
              Home
            </Link>
            {session ? (
              <>
                <Link to="/booking" className="hover:text-blue-200">
                  Book Trip
                </Link>
                <Link to="/my-bookings" className="hover:text-blue-200">
                  My Bookings
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-blue-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200">
                  Login
                </Link>
                <Link to="/register" className="hover:text-blue-200">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar