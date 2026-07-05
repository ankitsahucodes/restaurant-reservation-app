import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <img
          src="/restaurant.png"
          alt="estaurant Logo"
          width="120"
          className="mb-3"
        />

        <h1>Restaurant Reservation System</h1>

        <p className="lead text-muted">
          Reserve your table in just a few clicks. Fast, secure and hassle-free.
        </p>

        <div className="mt-4">
          <Link to="/book" className="btn btn-primary me-3">
            Book Reservation
          </Link>

          <Link to="/my-reservations" className="btn btn-outline-primary">
            View Reservation
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h4>Easy Booking</h4>
              <p>Reserve tables online within seconds.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h4>Manage Reservations</h4>
              <p>View and cancel your reservations anytime.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h4>Admin Dashboard</h4>
              <p>Manage reservations and restaurant tables efficiently.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
