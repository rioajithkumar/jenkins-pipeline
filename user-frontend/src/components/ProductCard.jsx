import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
      />

      <h3>{product.name}</h3>

      <p className="price">
        ₹{product.price}
      </p>

      <Link
        className="view-btn"
        to={`/products/${product.id}`}
      >
        View Product
      </Link>

    </div>
  );
}
