import { useState } from "react";
import { Link } from "react-router-dom";

// Modern SVG Icons Component
const Icons = {
  Compass: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  BarChart: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  )
};

// Reusable Card Component with Professional Inline Styling
function FeatureCard({ to, Icon, title, description }) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    backgroundColor: "#ffffff",
    border: isHovered ? "1px solid #2563eb" : "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "24px",
    textAlign: "center",
    textDecoration: "none",
    color: "#1f2937",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    transition: "all 0.2s ease-in-out",
    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
    boxShadow: isHovered 
      ? "0 10px 25px -5px rgba(37, 99, 235, 0.15), 0 8px 10px -6px rgba(37, 99, 235, 0.1)" 
      : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    cursor: "pointer"
  };

  const iconContainerStyle = {
    backgroundColor: "#eff6ff",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px"
  };

  return (
    <div className="col-md-4 mb-4">
      <Link 
        to={to} 
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={iconContainerStyle}>
          <Icon />
        </div>
        <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "8px" }}>
          {title}
        </h3>
        <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: "1.5", margin: 0 }}>
          {description}
        </p>
      </Link>
    </div>
  );
}

function Home() {
  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 0" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>
        
        {/* Hero Section */}
        <section 
          style={{
            background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
            color: "#ffffff",
            borderRadius: "16px",
            padding: "50px 30px",
            textAlign: "center",
            marginBottom: "48px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
          }}
        >
          <h1 style={{ fontSize: "2.75rem", fontWeight: "800", letterSpacing: "-0.025em" }}>
            Campus Event Tracker & RSVP Portal
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#dbeafe", marginTop: "16px", maxWidth: "650px", margin: "16px auto 0" }}>
            Discover campus events, RSVP instantly, and never miss what's happening around you.
          </p>
          <Link
            to="/events"
            style={{
              display: "inline-block",
              backgroundColor: "#ffffff",
              color: "#1d4ed8",
              fontWeight: "600",
              padding: "12px 28px",
              borderRadius: "8px",
              textDecoration: "none",
              marginTop: "24px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
              transition: "transform 0.2s"
            }}
          >
            Browse Events
          </Link>
        </section>

        {/* Feature Cards Section */}
        <section className="mb-5">
          <h2 style={{ textAlign: "center", fontWeight: "700", color: "#0f172a", marginBottom: "32px" }}>
            Why Use This Platform?
          </h2>

          <div className="row">
            <FeatureCard
              to="/events"
              Icon={Icons.Compass}
              title="Discover Events"
              description="Find academic, sports, entertainment, and club events on campus."
            />
            <FeatureCard
              to="/events"
              Icon={Icons.CheckCircle}
              title="Easy RSVP"
              description="Reserve your seat in one click with instant confirmation."
            />
            <FeatureCard
              to="/dashboard"
              Icon={Icons.BarChart}
              title="Organizer Dashboard"
              description="Create and manage events, view real-time attendees and statistics."
            />
          </div>
        </section>

        {/* Call To Action */}
        <section 
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "40px",
            textAlign: "center"
          }}
        >
          <h2 style={{ fontWeight: "700", color: "#0f172a" }}>Ready to Explore?</h2>
          <p style={{ color: "#64748b", margin: "8px 0 20px" }}>
            Browse upcoming campus events and RSVP today.
          </p>
          <Link
            to="/events"
            style={{
              display: "inline-block",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              fontWeight: "600",
              padding: "10px 24px",
              borderRadius: "8px",
              textDecoration: "none"
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