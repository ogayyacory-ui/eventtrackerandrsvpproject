import useAuth from "../hooks/useAuth";

function Profile() {

  const { user } = useAuth();

  return (

    <div className="container">

      <div className="card shadow">

        <div className="card-body">

          <h2>My Profile</h2>

          <hr />

          <p><strong>Name:</strong> {user?.name}</p>

          <p><strong>Email:</strong> {user?.email}</p>

          <p><strong>Role:</strong> {user?.role}</p>

        </div>

      </div>

    </div>

  );

}

export default Profile;