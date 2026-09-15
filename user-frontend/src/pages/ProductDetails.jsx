import { useParams, Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 55000,
    description: "Powerful laptop for work and entertainment.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
  },
  {
    id: 2,
    name: "Smart Phone",
    price: 25000,
    description: "Modern smartphone with excellent performance.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },
  {
    id: 3,
    name: "Headphones",
    price: 3500,
    description: "Wireless headphones with clear sound.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 5000,
    description: "Smart watch with fitness tracking features.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  }
];

export default function ProductDetails() {

  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <h2 className="page">Product not found</h2>;
  }

  return (
    <div className="product-details">

      <img
        src={product.image}
        alt={product.name}
      />

      <div>

        <h1>{product.name}</h1>

        <h2>
          ₹{product.price}
        </h2>

        <p>
          {product.description}
        </p>

        <button className="buy-btn">
          Buy Now
        </button>

        <br />

        <Link to="/products">
          ← Back to Products
        </Link>

      </div>

    </div>
  );
}
