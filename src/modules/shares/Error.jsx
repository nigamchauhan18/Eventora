import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center text-center">
      <div>
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="fw-bold">Page Not Found</h2>
        <p className="text-secondary">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/" className="btn btn-primary mt-3">
          <i className="bi bi-house-door me-2"></i>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Error;
