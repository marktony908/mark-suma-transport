import { useState } from 'react';
import { supabase } from '../lib/supabase';

const routes = [
  {
    from: 'Nairobi',
    to: 'Kisumu',
    price: 1500,
    type: 'bus',
    availableSeats: Array.from({ length: 30 }, (_, i) => i + 1),
  },
  {
    from: 'Nairobi',
    to: 'Mombasa',
    price: 2000,
    type: 'bus',
    availableSeats: Array.from({ length: 30 }, (_, i) => i + 1),
  },
  {
    from: 'Kisumu',
    to: 'Nairobi',
    price: 1500,
    type: 'bus',
    availableSeats: Array.from({ length: 30 }, (_, i) => i + 1),
  },
  {
    from: 'Mombasa',
    to: 'Nairobi',
    price: 2000,
    type: 'car',
    availableSeats: Array.from({ length: 4 }, (_, i) => i + 1),
  },
];

export default function BookingPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedRoute = routes.find(
    (route) => route.from === from && route.to === to
  );

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedRoute || !selectedSeat || !date) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: user.id,
            route_from: from,
            route_to: to,
            seat_number: selectedSeat,
            travel_date: date,
            price: selectedRoute.price,
            vehicle_type: selectedRoute.type,
          },
        ]);

      if (error) throw error;

      alert('Booking successful!');
      setFrom('');
      setTo('');
      setDate('');
      setSelectedSeat('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Book Your Trip</h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleBooking} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>From</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select departure</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Kisumu">Kisumu</option>
            <option value="Mombasa">Mombasa</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>To</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select destination</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Kisumu">Kisumu</option>
            <option value="Mombasa">Mombasa</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Travel Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {selectedRoute && (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Select Seat</label>
              <select
                value={selectedSeat}
                onChange={(e) => setSelectedSeat(e.target.value)}
                style={styles.select}
                required
              >
                <option value="">Choose seat number</option>
                {selectedRoute.availableSeats.map((seat) => (
                  <option key={seat} value={seat}>
                    Seat {seat}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.tripDetails}>
              <h3 style={styles.subHeading}>Trip Details</h3>
              <p>Vehicle Type: {selectedRoute.type.toUpperCase()}</p>
              <p>Price: KES {selectedRoute.price}</p>
            </div>
          </>
        )}

        <button
          type="submit"
          style={styles.button}
          disabled={loading || !selectedRoute}
        >
          {loading ? 'Processing...' : 'Book Now'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  error: {
    color: '#ff0000',
    backgroundColor: '#ffe6e6',
    padding: '0.5rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '1rem',
    color: '#555',
  },
  select: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  tripDetails: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  subHeading: {
    fontSize: '1.25rem',
    color: '#333',
    marginBottom: '0.5rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};