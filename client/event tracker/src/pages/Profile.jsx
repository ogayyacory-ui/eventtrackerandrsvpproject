import useAuth from "../hooks/useAuth";

function Profile() {

  const { user } = useAuth();
  const displayName = user?.username || user?.name || "Unknown";
  const displayEmail = user?.email || "Not available";

  return (

    <div className="container">

      <div className="card shadow">

        <div className="card-body">

          <h2>My Profile</h2>

          <hr />

          <p><strong>Name:</strong> {displayName}</p>

          <p><strong>Email:</strong> {displayEmail}</p>

          <p><strong>Role:</strong> {user?.role}</p>

        </div>

      </div>

    </div>

  );

}

export default Profile;