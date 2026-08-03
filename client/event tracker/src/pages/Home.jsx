
import { useState } from "react";
import { Link } from "react-router-dom";

/* ---------------- Icons ---------------- */

const Icons = {
  Compass: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),

  CheckCircle: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
      <path d="M22 11.08V12A10 10 0 1 1 12 2" />
      <polyline points="22 4 12 14 9 11" />
    </svg>
  ),

  BarChart: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="18" y1="20" x2="18" y2="10" />
    </svg>
  ),
};

/* ---------------- Feature Card ---------------- */

function FeatureCard({ to, Icon, title, description }) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textDecoration: "none",
        color: "#1e293b",
        background: "#fff",
        borderRadius: "16px",
        padding: "30px",
        textAlign: "center",
        border: hover ? "1px solid #2563eb" : "1px solid #e5e7eb",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        transition: "0.3s",
        boxShadow: hover
          ? "0 20px 40px rgba(37,99,235,.15)"
          : "0 8px 20px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          margin: "0 auto 20px",
          borderRadius: "50%",
          background: "#eff6ff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon />
      </div>

      <h3
        style={{
          marginBottom: "15px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#64748b",
          lineHeight: "1.6",
        }}
      >
        {description}
      </p>
    </Link>
  );
}

/* ---------------- Home ---------------- */

function Home() {
  return (
    <div
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* Hero */}

        <section
          style={{
            background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color: "#fff",
            borderRadius: "20px",
            padding: "80px 30px",
            textAlign: "center",
            marginBottom: "70px",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "20px",
            }}
          >
            Campus Event Tracker & RSVP Portal
          </h1>

          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto 35px",
              fontSize: "1.15rem",
              lineHeight: "1.8",
            }}
          >
            Discover campus events, RSVP instantly, and never miss what's
            happening around you.
          </p>

          <Link
            to="/events"
            style={{
              background: "#fff",
              color: "#2563eb",
              padding: "15px 30px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Browse Events
          </Link>
        </section>

        {/* Features */}

        <section
          style={{
            marginBottom: "70px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "40px",
              fontSize: "2.2rem",
            }}
          >
            Why Use This Platform?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: "25px",
            }}
          >
            <FeatureCard
              to="/events"
              Icon={Icons.Compass}
              title="Discover Events"
              description="Find academic, sports, entertainment and club events happening across campus."
            />

            <FeatureCard
              to="/events"
              Icon={Icons.CheckCircle}
              title="Easy RSVP"
              description="Reserve your seat instantly and receive immediate confirmation."
            />

            <FeatureCard
              to="/dashboard"
              Icon={Icons.BarChart}
              title="Organizer Dashboard"
              description="Create, edit and monitor events with attendance statistics."
            />
          </div>
        </section>

        {/* CTA */}

        <section
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "60px 30px",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "15px",
            }}
          >
            Ready to Explore?
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: "30px",
            }}
          >
            Browse upcoming campus events and RSVP today.
          </p>

          <Link
            to="/events"
            style={{
              background: "#2563eb",
              color: "#fff",
              textDecoration: "none",
              padding: "15px 30px",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            View Events
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Home;