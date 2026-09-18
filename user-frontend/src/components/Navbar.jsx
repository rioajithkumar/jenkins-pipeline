import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/">AmdinShop</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>

    </nav>
  );
}
