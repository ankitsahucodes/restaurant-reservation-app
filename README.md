# Restaurant Reservation System

A full-stack Restaurant Reservation System built using the MERN Stack. Customers can register, log in, reserve tables, view their reservations, and cancel bookings. Administrators can manage all reservations through a dedicated dashboard.

---

## Demo Link

[Live Demo](https://restaurant-reservation-webapp.vercel.app)


# Tech Stack

## Frontend
- React.js
- React Router DOM
- Bootstrap 5
- Axios
- React Toastify

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser
- bcrypt

---

# Features

## Customer
- User Registration & Login
- Secure JWT Authentication
- Book Restaurant Table
- View My Reservations
- Cancel Reservation

## Admin
- View All Reservations
- Filter Reservations by Date
- Cancel Any Reservation


# Setup Instructions


# Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ankitsahucodes/restaurant-reservation-app.git
cd restaurant-reservation-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Start the Application

```bash
npm run dev
```

---

# Assumptions Made

- Every reservation is assigned to only one table.
- One table can have only one reservation for a specific date and time slot.
- Customers can reserve tables for 1–10 guests.
- The system automatically assigns the smallest suitable available table.
- Cancelled reservations remain in the database for record keeping.
- Only authenticated users can make reservations.
- Only administrators can access reservation management features.

---

# Reservation & Availability Logic

1. Customer selects:
   - Reservation Date
   - Time Slot
   - Number of Guests

2. The system searches for tables whose capacity is greater than or equal to the requested guests.

3. Matching tables are sorted by capacity so that the smallest suitable table is assigned first.

4. The system checks whether the table is already booked for the selected date and time slot.

5. The first available table is assigned to the reservation.

6. If no suitable table is available, the booking request is rejected.

This approach avoids double booking while efficiently utilizing restaurant tables.

---

# Role-Based Access

## Customer

Customers can:

- Register
- Login
- Book reservations
- View their own reservations
- Cancel their own reservations

---

## Admin

Administrators can:

- View all reservations
- Filter reservations by date
- Cancel any reservation

All admin routes are protected using JWT authentication and role-based authorization middleware.

---

# Known Limitations

- Reservation editing is not implemented.
- Restaurant table management (CRUD) is not included.
- Fixed reservation time slots.
- No email confirmation or notifications.
- No payment integration.
- No search or pagination for reservations.
- No analytics dashboard.

---

# Areas for Improvement

With additional development time, the following enhancements could be added:

- Edit reservation functionality.
- Restaurant table management (Add, Update, Delete tables).
- Email confirmation and reminder notifications.
- Real-time table availability.
- Reservation calendar view.
- Customer profile management.
- Dashboard analytics and reports.
- Search, filtering, and pagination.
- Unit and integration testing.
- Google OAuth authentication.

---

# API Endpoints

## Authentication

```
POST /auth/signup
POST /auth/login
POST /auth/logout
GET  /auth/me
```

## Customer

```
POST /reservation
GET  /reservation/my
PUT  /reservation/:id
```

## Admin

```
GET /reservation
GET /reservation/date/:date
PUT /reservation/admin/:id
```

---

## Contact

For bugs or feature requests, please reach out to ankitsahu2829@gmail.com