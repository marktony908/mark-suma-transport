import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

function Navbar({ session }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.navContent}>
          <Link to="/" style={styles.brand}>
            Mark.Suma Transport
          </Link>
          <div style={styles.links}>
            <Link to="/" style={styles.link}>
              Home
            </Link>
            {session ? (
              <>
                <Link to="/booking" style={styles.link}>
                  Book Trip
                </Link>
                <Link to="/my-bookings" style={styles.link}>
                  My Bookings
                </Link>
                <button onClick={handleLogout} style={styles.button}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={styles.link}>
                  Login
                </Link>
                <Link to="/register" style={styles.link}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

const styles = {
  nav: {
    backgroundColor: '#007bff',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'opacity 0.3s ease',
  },
  button: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid #fff',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
};