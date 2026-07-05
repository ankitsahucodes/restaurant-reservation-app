const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div className="container">
        <p className="mb-1">
          Built with <span className="text-danger">❤️</span> by{" "}
          <a
            href="https://github.com/ankitsahucodes"
            target="_blank"
            rel="noreferrer"
            className="text-warning text-decoration-none fw-semibold"
          >
            Ankit Sahu
          </a>
        </p>

        <small className="text-secondary">
          &copy; 2026 Restaurant Reservation System. All Rights Reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
