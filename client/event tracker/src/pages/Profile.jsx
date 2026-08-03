import useAuth from "../hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  const displayName = user?.username || user?.name || "Unknown";
  const displayEmail = user?.email || "Not available";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "35px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#1e293b",
          }}
        >
          My Profile
        </h2>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #e5e7eb",
            marginBottom: "25px",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <ProfileItem label="Name" value={displayName} />
          <ProfileItem label="Email" value={displayEmail} />
          <ProfileItem label="Role" value={user?.role || "Not assigned"} />
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 18px",
        background: "#f8fafc",
        borderRadius: "10px",
        border: "1px solid #e2e8f0",
      }}
    >
      <span
        style={{
          fontWeight: "600",
          color: "#334155",
        }}
      >
        {label}
      </span>

      <span
        style={{
          color: "#475569",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default Profile;