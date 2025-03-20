import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import BookingPage from './components/BookingPage';
import MyBookings from './components/MyBookings';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const storedSession = sessionStorage.getItem('session');
    setSession(storedSession ? JSON.parse(storedSession) : null);
  }, []);

  return (
    <Router>
      <Navbar session={session} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!session ? <Login /> : <Navigate to="/booking" />}
        />
        <Route
          path="/register"
          element={!session ? <Register /> : <Navigate to="/login" />}
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
    </Router>
  );
}

export default App;
