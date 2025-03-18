import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import BookingPage from './components/BookingPage'
import MyBookings from './components/MyBookings'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar session={session} />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!session ? <Login /> : <Navigate to="/booking" />}
            />
            <Route
              path="/register"
              element={!session ? <Register /> : <Navigate to="/booking" />}
            />
            <Route
              path="/booking"
              element={session ? <BookingPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/my-bookings"
              element={session ? <MyBookings /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App