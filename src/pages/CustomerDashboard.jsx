import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Customer Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h4>🍽️ Book Reservation</h4>

              <p className="text-muted">Reserve a table for your next visit.</p>

              <Link to="/book" className="btn btn-primary">
                Book Now
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h4>📅 My Reservations</h4>

              <p className="text-muted">View and cancel your reservations.</p>

              <Link to="/my-reservations" className="btn btn-success">
                View Reservations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
