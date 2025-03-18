import { useState } from 'react'
import { supabase } from '../lib/supabase'

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
]

export default function BookingPage() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [selectedSeat, setSelectedSeat] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const selectedRoute = routes.find(
    (route) => route.from === from && route.to === to
  )

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!selectedRoute || !selectedSeat || !date) {
      setError('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()
      
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
        ])

      if (error) throw error

      alert('Booking successful!')
      setFrom('')
      setTo('')
      setDate('')
      setSelectedSeat('')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Book Your Trip</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleBooking}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select departure</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Kisumu">Kisumu</option>
              <option value="Mombasa">Mombasa</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select destination</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Kisumu">Kisumu</option>
              <option value="Mombasa">Mombasa</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Travel Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {selectedRoute && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Seat</label>
              <select
                value={selectedSeat}
                onChange={(e) => setSelectedSeat(e.target.value)}
                className="w-full p-2 border rounded"
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

            <div className="mb-6 p-4 bg-blue-50 rounded">
              <h3 className="font-semibold mb-2">Trip Details</h3>
              <p>Vehicle Type: {selectedRoute.type.toUpperCase()}</p>
              <p>Price: KES {selectedRoute.price}</p>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading || !selectedRoute}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Book Now'}
        </button>
      </form>
    </div>
  )
}