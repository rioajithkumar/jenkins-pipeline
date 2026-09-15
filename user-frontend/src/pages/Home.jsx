import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      <section className="hero">

        <div>
          <h1>Welcome to ShopDemo</h1>

          <p>
            Your simple online shopping platform.
          </p>

          <Link
            to="/products"
            className="hero-btn"
          >
            Shop Now
          </Link>
        </div>

      </section>

      <section className="home-section">

        <h2>Why Shop With Us?</h2>

        <div className="features">

          <div>
            <h3>Quality Products</h3>
            <p>High quality products at affordable prices.</p>
          </div>

          <div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable delivery service.</p>
          </div>

          <div>
            <h3>Secure Shopping</h3>
            <p>Your account and orders are protected.</p>
          </div>

        </div>

      </section>

    </div>
  );
}
