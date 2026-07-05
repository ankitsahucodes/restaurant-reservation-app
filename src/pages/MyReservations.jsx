import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const res = await api.get("/reservation/my");
      setReservations(res.data.reservations);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch reservations",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this reservation?",
    );

    if (!confirmCancel) return;

    try {
      const res = await api.put(`/reservation/${id}`);

      toast.success(res.data.message);

      fetchReservations();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to cancel reservation",
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">📅 My Reservations</h2>

      {reservations.length === 0 ? (
        <div className="alert alert-info text-center">
          You don't have any reservations yet.
        </div>
      ) : (
        <div className="row">
          {reservations.map((reservation) => (
            <div className="col-lg-6 mb-4" key={reservation._id}>
              <div className="card shadow-sm h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    Table #{reservation.table.tableNumber}
                  </h5>

                  <span
                    className={`badge ${
                      reservation.status === "booked"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {reservation.status}
                  </span>
                </div>

                <div className="card-body">
                  <p>
                    <strong>📅 Date:</strong>{" "}
                    {new Date(reservation.date).toLocaleDateString("en-GB")}
                  </p>

                  <p>
                    <strong>🕒 Time:</strong> {reservation.timeSlot}
                  </p>

                  <p>
                    <strong>👥 Guests:</strong> {reservation.guests}
                  </p>

                  <p>
                    <strong>🍽️ Capacity:</strong> {reservation.table.capacity}
                  </p>
                </div>

                <div className="card-footer bg-white">
                  {reservation.status === "booked" ? (
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => handleCancel(reservation._id)}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReservations;
