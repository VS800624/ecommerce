import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "./context/OrderContext";
import BookNowNavbar from "./BookNowNavBar";

const OrderHistory = () => {
  const { orders, fetchOrders } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Login", { state: { from: "/Orders" } });
    } else {
      fetchOrders();
    }
  }, [navigate, fetchOrders]);

  if (!orders || orders.length === 0) {
    return (
      <>
        <BookNowNavbar />
        <section className="max-w-[1280px] mx-auto mt-32 p-4 text-center">
          <h2 className="text-2xl font-semibold">No Orders Yet</h2>
          <p className="text-gray-600">Your order history will appear here after you place an order.</p>
        </section>
      </>
    );
  }

  return (
    <>
      <BookNowNavbar />
      <section className="max-w-[1280px] mx-auto mt-32 p-4">
        <h2 className="text-2xl font-semibold mb-6">Your Order History</h2>
        {orders.map((order, index) => (
          <div
            key={order._id || index}
            className="border-b border-gray-200 py-4 mb-4 bg-gray-50 rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Order #{index + 1}</h3>
              <p className="text-gray-600">
                {new Date(order.timestamp).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between md:flex-row flex-col text-center gap-4 py-2"
              >
                <div className="flex items-center gap-4 md:flex-row flex-col">
                  <img
                    src={item.img}
                    alt={item.productName || "Product"}
                    className="w-16 h-16 object-contain"
                  />
                  <p className="text-md font-medium">
                    {item.productName || "Unknown Product"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-md">
                    Qty: {item.amount || 1}
                  </span>
                  <span className="text-md font-semibold">
                    ₹{((item.discountPrice || item.price || 0) * (item.amount || 1)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex justify-end text-lg font-semibold mt-4">
              <span>Total: ₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default OrderHistory;