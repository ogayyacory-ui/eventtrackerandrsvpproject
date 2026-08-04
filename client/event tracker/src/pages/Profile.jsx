import useAuth from "../hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  const displayName = user?.username || user?.name || "Unknown";
  const displayEmail = user?.email || "Not available";

  return (
    <main className="info-page">
      <div style={{ width: "min(700px, calc(100% - 48px))", margin: "60px auto" }}>
        <div className="highlight-card">
          <h2 style={{ textAlign: "center", marginBottom: 18, color: "#1e293b" }}>My Profile</h2>
          <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", marginBottom: 18 }} />

          <div>
            <div className="profile-item"><strong>Name</strong><p>{displayName}</p></div>
            <div className="profile-item"><strong>Email</strong><p>{displayEmail}</p></div>
            <div className="profile-item"><strong>Role</strong><p>{user?.role || "Not assigned"}</p></div>
          </div>
        </div>
      </div>
    </main>
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