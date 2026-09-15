const orders = [
  {
    id: "ORD1001",
    product: "Laptop",
    amount: 55000,
    status: "Delivered"
  },
  {
    id: "ORD1002",
    product: "Headphones",
    amount: 3500,
    status: "Processing"
  }
];

export default function Orders() {

  return (
    <div className="page">

      <h1>My Orders</h1>

      <div className="orders">

        {orders.map((order) => (

          <div
            className="order-card"
            key={order.id}
          >

            <h3>{order.id}</h3>

            <p>
              Product: {order.product}
            </p>

            <p>
              Amount: ₹{order.amount}
            </p>

            <p>
              Status: <strong>{order.status}</strong>
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}
