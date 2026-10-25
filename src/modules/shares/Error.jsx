const Error = () => {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center overflow-hidden position-relative"
      style={{
        fontFamily: "'Inter', sans-serif",
        background:
          "radial-gradient(circle at 15% 20%, #f0eaff 0%, transparent 30%), radial-gradient(circle at 85% 80%, #fff0f7 0%, transparent 30%), #ffffff",
      }}
    >
      {/* Decorative Background Circles */}

      <div
        className="position-absolute rounded-circle border"
        style={{
          width: "180px",
          height: "180px",
          top: "8%",
          left: "7%",
          borderColor: "#e5d9ff",
        }}
      ></div>

      <div
        className="position-absolute rounded-circle border"
        style={{
          width: "100px",
          height: "100px",
          right: "10%",
          bottom: "12%",
          borderColor: "#f5d9eb",
        }}
      ></div>

      {/* Main Error Content */}

      <div className="container position-relative py-5" style={{ zIndex: 2 }}>
        <div className="row justify-content-center text-center">
          <div className="col-lg-7 col-md-9 col-12">
            {/* Eventora Logo */}

            <a
              href="/"
              className="d-inline-flex align-items-center gap-2 text-decoration-none mb-5"
              style={{ color: "#211b35" }}
            >
              <span
                className="d-flex align-items-center justify-content-center rounded-3 text-white"
                style={{
                  width: "45px",
                  height: "45px",
                  background: "linear-gradient(135deg, #9670ff, #6035d4)",
                  boxShadow: "0 7px 18px rgba(121, 80, 232, 0.25)",
                }}
              >
                <i className="bi bi-calendar2-heart-fill fs-5"></i>
              </span>

              <span
                className="fw-bold"
                style={{ fontSize: "27px", letterSpacing: "-1px" }}
              >
                Event<span style={{ color: "#7950e8" }}>ora</span>
              </span>
            </a>

            {/* Error Illustration */}

            <div className="position-relative d-inline-block mb-4">
              <div
                className="position-absolute top-50 start-50 translate-middle rounded-circle"
                style={{
                  width: "260px",
                  height: "260px",
                  background:
                    "radial-gradient(circle, rgba(121,80,232,0.13), transparent 70%)",
                }}
              ></div>

              <div
                className="position-relative d-flex align-items-center justify-content-center fw-bold"
                style={{
                  fontSize: "clamp(100px, 20vw, 175px)",
                  lineHeight: 1,
                  letterSpacing: "-8px",
                  background: "linear-gradient(135deg, #a58aff, #6035d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 10px 15px rgba(121,80,232,0.12))",
                }}
              >
                404
              </div>

              {/* Floating Icons */}

              <span
                className="position-absolute d-flex align-items-center justify-content-center rounded-4 shadow-sm bg-white"
                style={{
                  top: "0",
                  left: "-15px",
                  width: "48px",
                  height: "48px",
                  color: "#e05d9e",
                  fontSize: "22px",
                  transform: "rotate(-12deg)",
                }}
              >
                <i className="bi bi-balloon-heart"></i>
              </span>

              <span
                className="position-absolute d-flex align-items-center justify-content-center rounded-4 shadow-sm bg-white"
                style={{
                  top: "15px",
                  right: "-15px",
                  width: "45px",
                  height: "45px",
                  color: "#7950e8",
                  fontSize: "21px",
                  transform: "rotate(12deg)",
                }}
              >
                <i className="bi bi-stars"></i>
              </span>

              <span
                className="position-absolute d-flex align-items-center justify-content-center rounded-4 shadow-sm bg-white"
                style={{
                  bottom: "0",
                  left: "20px",
                  width: "42px",
                  height: "42px",
                  color: "#df8b3f",
                  fontSize: "20px",
                }}
              >
                <i className="bi bi-gift"></i>
              </span>
            </div>

            {/* Error Message */}

            <div className="mb-4">
              <span
                className="d-inline-block rounded-pill px-3 py-2 fw-semibold mb-3"
                style={{
                  color: "#7950e8",
                  backgroundColor: "#eee8ff",
                  fontSize: "11px",
                  letterSpacing: "1px",
                }}
              >
                <i className="bi bi-exclamation-circle me-2"></i>
                OOPS! SOMETHING WENT OFF TRACK
              </span>

              <h1
                className="fw-bold mb-3"
                style={{
                  color: "#211b35",
                  fontSize: "clamp(27px, 4vw, 39px)",
                  letterSpacing: "-1px",
                }}
              >
                Looks like this event doesn't exist!
              </h1>

              <p
                className="mx-auto mb-0"
                style={{
                  maxWidth: "470px",
                  color: "#77738b",
                  fontSize: "15px",
                  lineHeight: 1.9,
                }}
              >
                The page you're looking for may have moved, been removed, or
                never existed. Don't worry — there's still something wonderful
                waiting for you.
              </p>
            </div>

            {/* Action Buttons */}

            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-stretch gap-3 mt-4">
              <a
                href="/"
                className="btn text-white rounded-3 px-4 py-3 fw-semibold"
                style={{
                  background: "linear-gradient(135deg, #916af5, #6035d4)",
                  border: "none",
                  boxShadow: "0 8px 20px rgba(121,80,232,0.22)",
                  fontSize: "14px",
                }}
              >
                <i className="bi bi-house-door me-2"></i>
                Back to Home
              </a>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="btn rounded-3 px-4 py-3 fw-semibold"
                style={{
                  color: "#6035d4",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e4d9ff",
                  fontSize: "14px",
                }}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Go Back
              </button>
            </div>

            {/* Bottom Message */}

            <div
              className="d-flex align-items-center justify-content-center gap-2 mt-5 pt-4 border-top"
              style={{ borderColor: "#efecf6" }}
            >
              <i
                className="bi bi-calendar2-heart"
                style={{ color: "#7950e8" }}
              ></i>

              <p
                className="mb-0"
                style={{ color: "#77738b", fontSize: "12px" }}
              >
                Every great moment starts somewhere. Start again with{" "}
                <a
                  href="/"
                  className="fw-bold text-decoration-none"
                  style={{ color: "#7950e8" }}
                >
                  Eventora
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
