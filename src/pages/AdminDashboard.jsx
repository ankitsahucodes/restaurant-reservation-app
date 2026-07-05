import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const getReservations = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${BASE_URL}/reservation`, {
        withCredentials: true,
      });

      setReservations(res.data.reservations);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterReservations = async (selectedDate) => {
    if (!selectedDate) {
      getReservations();
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/reservation/date/${selectedDate}`,
        {
          withCredentials: true,
        },
      );

      setReservations(res.data.reservations);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (id) => {
    if (!window.confirm("Cancel this reservation?")) return;

    try {
      await axios.put(
        `${BASE_URL}/reservation/admin/${id}`,
        {},
        {
          withCredentials: true,
        },
      );

      getReservations();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <div className="container py-4">
      <div className="row align-items-center mb-4 g-3">
        <div className="col-md-6">
          <h2 className="mb-1">Admin Dashboard</h2>
          <p className="text-muted mb-0">Manage restaurant reservations</p>
        </div>

        <div className="col-md-3">
          <div className="card text-center border-primary">
            <div className="card-body py-3">
              <h3 className="mb-0">{reservations.length}</h3>
              <small className="text-muted">Total Reservations</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              filterReservations(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="d-md-none">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : reservations.length === 0 ? (
          <div className="alert alert-info">No reservations found.</div>
        ) : (
          reservations.map((reservation) => (
            <div className="card shadow-sm mb-3" key={reservation._id}>
              <div className="card-body">
                <h5>{reservation.user?.name}</h5>

                <p className="mb-1">
                  <strong>Email:</strong> {reservation.user?.email}
                </p>

                <p className="mb-1">
                  <strong>Table:</strong> Table {reservation.table?.tableNumber}
                </p>

                <p className="mb-1">
                  <strong>Guests:</strong> {reservation.guests}
                </p>

                <p className="mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(reservation.date).toLocaleDateString("en-GB")}
                </p>

                <p className="mb-1">
                  <strong>Time:</strong> {reservation.timeSlot}
                </p>

                <p className="mb-3">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      reservation.status === "booked"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {reservation.status}
                  </span>
                </p>

                {reservation.status === "booked" ? (
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => cancelReservation(reservation._id)}
                  >
                    Cancel Reservation
                  </button>
                ) : (
                  <button className="btn btn-secondary w-100" disabled>
                    Cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="card shadow-sm d-none d-md-block">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Reservations</h5>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Table</th>
                <th>Guests</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    <div className="spinner-border text-primary"></div>
                  </td>
                </tr>
              ) : reservations.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No reservations found.
                  </td>
                </tr>
              ) : (
                reservations.map((reservation) => (
                  <tr key={reservation._id}>
                    <td>{reservation.user?.name}</td>
                    <td>{reservation.user?.email}</td>
                    <td>Table {reservation.table?.tableNumber}</td>
                    <td>{reservation.guests}</td>
                    <td>
                      {new Date(reservation.date).toLocaleDateString("en-GB")}
                    </td>
                    <td>{reservation.timeSlot}</td>
                    <td>
                      <span
                        className={`badge ${
                          reservation.status === "booked"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {reservation.status}
                      </span>
                    </td>
                    <td>
                      {reservation.status === "booked" ? (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => cancelReservation(reservation._id)}
                        >
                          Cancel
                        </button>
                      ) : (
                        <button className="btn btn-sm btn-secondary" disabled>
                          Cancelled
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
