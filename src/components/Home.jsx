import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Mark.Suma Transport</h1>
      <p style={styles.tagline}>Your trusted partner for comfortable and reliable transportation across Kenya</p>

      <div style={styles.servicesContainer}>
        <div style={styles.serviceCard}>
          <h2 style={styles.serviceTitle}>Bus Services</h2>
          <ul style={styles.serviceList}>
            <li>Nairobi - Kisumu (KES 1,500)</li>
            <li>Nairobi - Mombasa (KES 2,000)</li>
            <li>Comfortable seating</li>
            <li>Professional drivers</li>
          </ul>
        </div>

        <div style={styles.serviceCard}>
          <h2 style={styles.serviceTitle}>Car Services</h2>
          <ul style={styles.serviceList}>
            <li>Mombasa - Nairobi (KES 2,000)</li>
            <li>Private transport</li>
            <li>Flexible scheduling</li>
            <li>Door-to-door service</li>
          </ul>
        </div>
      </div>

      <Link to="/booking" style={styles.bookingLink}>Book Your Trip Now</Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '1rem',
  },
  tagline: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '2rem',
  },
  servicesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
    marginBottom: '2rem',
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    flex: 1,
  },
  serviceTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '1rem',
  },
  serviceList: {
    listStyle: 'none',
    padding: 0,
    textAlign: 'left',
    color: '#555',
  },
  bookingLink: {
    display: 'inline-block',
    padding: '0.8rem 1.5rem',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
};