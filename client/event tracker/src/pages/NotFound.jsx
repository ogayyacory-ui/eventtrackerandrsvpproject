import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          maxWidth: "600px",
          width: "100%",
          padding: "50px",
          borderRadius: "18px",
          textAlign: "center",
          boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            fontSize: "7rem",
            fontWeight: "700",
            color: "#2563eb",
            lineHeight: 1,
            marginBottom: "10px",
          }}
        >
          404
        </div>

        <h1
          style={{
            color: "#1e293b",
            marginBottom: "15px",
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            color: "#64748b",
            lineHeight: "1.7",
            marginBottom: "35px",
          }}
        >
          Sorry, the page you are looking for doesn't exist, has been moved,
          or the URL may be incorrect.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-block",
            background: "#2563eb",
            color: "#ffffff",
            textDecoration: "none",
            padding: "14px 30px",
            borderRadius: "10px",
            fontWeight: "600",
            transition: "0.3s",
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;