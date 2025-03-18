import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('travel_date', { ascending: true });

      if (error) throw error;

      setBookings(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Bookings</h2>
      {bookings.length === 0 ? (
        <p style={styles.noBookings}>No bookings found</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Route</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Seat</th>
              <th style={styles.th}>Vehicle</th>
              <th style={styles.th}>Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} style={styles.tr}>
                <td style={styles.td}>{booking.route_from} to {booking.route_to}</td>
                <td style={styles.td}>{format(new Date(booking.travel_date), 'MMM dd, yyyy')}</td>
                <td style={styles.td}>Seat {booking.seat_number}</td>
                <td style={styles.td}>{booking.vehicle_type}</td>
                <td style={styles.td}>KES {booking.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#555',
  },
  error: {
    textAlign: 'center',
    color: '#ff0000',
    backgroundColor: '#ffe6e6',
    padding: '1rem',
    borderRadius: '4px',
    margin: '2rem auto',
    maxWidth: '400px',
  },
  noBookings: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#555',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  th: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '1rem',
    textAlign: 'left',
  },
  tr: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #f0f0f0',
    transition: 'background-color 0.3s ease',
  },
  td: {
    padding: '1rem',
    color: '#555',
  },
};