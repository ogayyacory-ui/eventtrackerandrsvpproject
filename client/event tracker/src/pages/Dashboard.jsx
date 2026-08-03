import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUsers, FaPlusCircle } from "react-icons/fa";

function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
        }}
      >
        {/* Header */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#1e293b",
              }}
            >
              Organizer Dashboard
            </h1>

            <p
              style={{
                color: "#64748b",
                marginTop: "8px",
              }}
            >
              Manage campus events, RSVPs and performance from one place.
            </p>
          </div>

          <Link
            to="/create-event"
            style={{
              background: "#2563eb",
              color: "#fff",
              textDecoration: "none",
              padding: "14px 24px",
              borderRadius: "10px",
              fontWeight: "600",
            }}
          >
            + Create Event
          </Link>
        </div>

        {/* Statistics */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px",
            marginBottom: "50px",
          }}
        >
          <StatCard
            title="12"
            subtitle="Total Events"
            icon={<FaCalendarAlt size={30} />}
          />

          <StatCard
            title="235"
            subtitle="Total RSVPs"
            icon={<FaUsers size={30} />}
          />

          <StatCard
            title="Fast Actions"
            subtitle="Launch event creation, analytics and management quickly."
            icon={<FaPlusCircle size={30} />}
            primary
          />
        </div>

        {/* Quick Actions */}

        <div>
          <h2
            style={{
              marginBottom: "25px",
              color: "#1e293b",
            }}
          >
            Quick Actions
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: "25px",
            }}
          >
            <ActionCard
              to="/create-event"
              icon="+"
              title="Create Event"
              description="Quickly publish a new campus activity."
            />

            <ActionCard
              to="/manage-events"
              icon="✎"
              title="Manage Events"
              description="Update, edit or remove existing events."
            />

            <ActionCard
              to="/analytics"
              icon="📊"
              title="Analytics"
              description="View attendance statistics and engagement."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, subtitle, icon, primary = false }) {
  return (
    <div
      style={{
        background: primary ? "#2563eb" : "#ffffff",
        color: primary ? "#ffffff" : "#1e293b",
        padding: "30px",
        borderRadius: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "2rem",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            marginTop: "8px",
            opacity: primary ? 0.95 : 0.75,
            lineHeight: "1.5",
          }}
        >
          {subtitle}
        </p>
      </div>

      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: primary
            ? "rgba(255,255,255,.2)"
            : "#eff6ff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: primary ? "#ffffff" : "#2563eb",
        }}
      >
        {icon}
      </div>
    </div>
  );
}

function ActionCard({ to, icon, title, description }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        background: "#ffffff",
        color: "#1e293b",
        borderRadius: "16px",
        padding: "30px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        transition: "0.3s",
      }}
    >
      <div
        style={{
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          background: "#eff6ff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#2563eb",
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#64748b",
          lineHeight: "1.6",
          margin: 0,
        }}
      >
        {description}
      </p>
    </Link>
  );
}

export default Dashboard;