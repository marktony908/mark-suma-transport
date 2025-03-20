import { useState } from 'react';
import QRCode from 'react-qr-code';

const routes = [
  { id: 1, from: 'Nairobi', to: 'Mombasa', price: 2000 },
  { id: 2, from: 'Mombasa', to: 'Nairobi', price: 2000 },
  { id: 3, from: 'Nairobi', to: 'Kisumu', price: 1500 },
  { id: 4, from: 'Kisumu', to: 'Nairobi', price: 1500 },
  { id: 5, from: 'Nairobi', to: 'Nakuru', price: 800 },
  { id: 6, from: 'Nakuru', to: 'Nairobi', price: 800 },
  { id: 7, from: 'Nairobi', to: 'Eldoret', price: 1200 },
  { id: 8, from: 'Eldoret', to: 'Nairobi', price: 1200 },
  { id: 9, from: 'Nairobi', to: 'Malindi', price: 2500 },
  { id: 10, from: 'Malindi', to: 'Nairobi', price: 2500 },
  { id: 11, from: 'Nairobi', to: 'Meru', price: 1000 },
  { id: 12, from: 'Meru', to: 'Nairobi', price: 1000 },
  { id: 13, from: 'Nairobi', to: 'Nanyuki', price: 900 },
  { id: 14, from: 'Nanyuki', to: 'Nairobi', price: 900 },
];

export default function BookingPage() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [passengerName, setPassengerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [qrValue, setQrValue] = useState('');

  const handleBooking = (event) => {
    event.preventDefault();
    if (!selectedRoute || !passengerName || !phoneNumber) {
      alert('Please complete all fields before booking.');
      return;
    }

    const message = `Your booking for ${passengerName} from ${selectedRoute.from} to ${selectedRoute.to} for KES ${selectedRoute.price} is confirmed! Safe travels.`;

    const smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

    setQrValue(smsLink);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Book Your Trip</h1> 
      
      <form onSubmit={handleBooking} style={styles.form}>
        <label style={styles.label}>Select Route:</label>
        <select style={styles.select} onChange={(e) => setSelectedRoute(routes.find(route => route.id == e.target.value))}>
          <option value="">-- Choose a Route --</option>
          {routes.map(route => (
            <option key={route.id} value={route.id}>
              {route.from} - {route.to} (KES {route.price})
            </option>
          ))}
        </select>

        <label style={styles.label}>Passenger Name:</label>
        <input type="text" style={styles.input} value={passengerName} onChange={(e) => setPassengerName(e.target.value)} required />

        <label style={styles.label}>Phone Number:</label>
        <input type="text" style={styles.input} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

        <button type="submit" style={styles.button}>Confirm Booking</button>
      </form>

      {qrValue && (
        <div style={styles.qrContainer}>
          <h3>Scan to Open SMS Confirmation</h3>
          <QRCode value={qrValue} size={200} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    display: 'block', 
    fontSize: '2.5rem', 
    fontWeight: 'bold', 
    color: '#fff', 
    backgroundColor: '#007bff', 
    padding: '1rem', 
    textAlign: 'center', 
    borderRadius: '8px', 
    marginBottom: '1.5rem', 
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    fontSize: '1rem',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  select: {
    padding: '0.5rem',
    fontSize: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.8rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  qrContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
};
