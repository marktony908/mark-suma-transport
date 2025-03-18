import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Mark.Suma Transport</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-xl mb-6">
          Your trusted partner for comfortable and reliable transportation across Kenya
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-blue-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Bus Services</h2>
            <ul className="text-left space-y-2">
              <li>✓ Nairobi - Kisumu (KES 1,500)</li>
              <li>✓ Nairobi - Mombasa (KES 2,000)</li>
              <li>✓ Comfortable seating</li>
              <li>✓ Professional drivers</li>
            </ul>
          </div>
          <div className="p-6 bg-blue-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Car Services</h2>
            <ul className="text-left space-y-2">
              <li>✓ Mombasa - Nairobi (KES 2,000)</li>
              <li>✓ Private transport</li>
              <li>✓ Flexible scheduling</li>
              <li>✓ Door-to-door service</li>
            </ul>
          </div>
        </div>
        <Link
          to="/booking"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Book Your Trip Now
        </Link>
      </div>
    </div>
  )
}