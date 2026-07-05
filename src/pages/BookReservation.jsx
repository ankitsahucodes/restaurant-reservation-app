import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const timeSlots = [
  "10:00 AM - 11:30 AM",
  "11:30 AM - 1:00 PM",
  "1:00 PM - 2:30 PM",
  "2:30 PM - 4:00 PM",
  "4:00 PM - 5:30 PM",
  "5:30 PM - 7:00 PM",
  "7:00 PM - 8:30 PM",
  "8:30 PM - 10:00 PM",
];

const BookReservation = () => {
  const [formData, setFormData] = useState({
    date: "",
    timeSlot: "",
    guests: 1,
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "guests" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/reservation", formData);

      toast.success(res.data.message);

      setFormData({
        date: "",
        timeSlot: "",
        guests: 1,
      });

      setTimeout(() => {
        navigate("/my-reservations");
      }, 500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reservation Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-dark text-white text-center py-3">
              <h3 className="mb-0">🍽️ Book a Table</h3>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    📅 Reservation Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">🕒 Time Slot</label>

                  <select
                    className="form-select"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Time Slot</option>

                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    👥 Number of Guests
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    name="guests"
                    min="1"
                    max="10"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                  />

                  <small className="text-muted">
                    Maximum 10 guests per reservation.
                  </small>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 py-2"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Book Reservation"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReservation;
