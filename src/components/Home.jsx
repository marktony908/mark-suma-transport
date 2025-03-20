import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Mark.Suma Transport</h1>
      <p style={styles.tagline}>Your trusted partner for comfortable and reliable transportation across Kenya</p>

      <div style={styles.servicesContainer}>
        {/* Bus Services */}
        <div style={styles.serviceCard}>
          <h2 style={styles.serviceTitle}>Bus Services</h2>
          <ul style={styles.serviceList}>
            <li>Nairobi - Mombasa (KES 2,000)</li>
            <li>Mombasa - Nairobi (KES 2,000)</li>
            <li>Nairobi - Kisumu (KES 1,500)</li>
            <li>Kisumu - Nairobi (KES 1,500)</li>
            <li>Nairobi - Nakuru (KES 800)</li>
            <li>Nakuru - Nairobi (KES 800)</li>
            <li>Nairobi - Eldoret (KES 1,200)</li>
            <li>Eldoret - Nairobi (KES 1,200)</li>
            <li>Nairobi - Malindi (KES 2,500)</li>
            <li>Malindi - Nairobi (KES 2,500)</li>
            <li>Nairobi - Meru (KES 1,000)</li>
            <li>Meru - Nairobi (KES 1,000)</li>
            <li>Nairobi - Nanyuki (KES 900)</li>
            <li>Nanyuki - Nairobi (KES 900)</li>
          </ul>
        </div>

        {/* Private Car Services */}
        <div style={styles.serviceCard}>
          <h2 style={styles.serviceTitle}>Private Car Services</h2>
          <ul style={styles.serviceList}>
            <li>Nairobi - Mombasa (KES 10,000)</li>
            <li>Mombasa - Nairobi (KES 10,000)</li>
            <li>Nairobi - Kisumu (KES 7,500)</li>
            <li>Kisumu - Nairobi (KES 7,500)</li>
            <li>Nairobi - Nakuru (KES 4,000)</li>
            <li>Nakuru - Nairobi (KES 4,000)</li>
            <li>Nairobi - Eldoret (KES 6,500)</li>
            <li>Eldoret - Nairobi (KES 6,500)</li>
            <li>Nairobi - Malindi (KES 12,000)</li>
            <li>Malindi - Nairobi (KES 12,000)</li>
            <li>Nairobi - Meru (KES 5,500)</li>
            <li>Meru - Nairobi (KES 5,500)</li>
            <li>Nairobi - Nanyuki (KES 4,500)</li>
            <li>Nanyuki - Nairobi (KES 4,500)</li>
          </ul>
        </div>
      </div>

      <Link to="/booking" style={styles.bookingLink}>Book Your Trip Now</Link>
      <Link to="/login" style={styles.loginLink}>Login to Book</Link>
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
    marginRight: '1rem',
  },
  loginLink: {
    display: 'inline-block',
    padding: '0.8rem 1.5rem',
    backgroundColor: '#28a745',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
};