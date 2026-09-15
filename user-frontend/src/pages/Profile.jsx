export default function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return (
      <div className="page">
        <h2>Please login first.</h2>
      </div>
    );
  }

  return (
    <div className="page">

      <h1>My Profile</h1>

      <div className="profile-card">

        <h2>{user.name}</h2>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Account:</strong> Active
        </p>

      </div>

    </div>
  );
}
