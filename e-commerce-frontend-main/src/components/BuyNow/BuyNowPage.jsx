import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BookNowNavbar from "../BookNowNavBar.jsx";
import NivzoneFooter from "../NivzoneFooter.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useOrder } from "../context/OrderContext.jsx";
import { initiatePayment } from "../../utils/razorpayIntegration.js";
import Alert from "../Alert";
import {
  bestDealsPage,
  electronicsPage,
  fashionPage,
  bestOfElectronicsHome,
  topStylesHome,
  bestDealsHome,
  bestSellersHome,
  bestSellersPage,
} from "../../utils/data.js";

const BuyNowPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alert, setAlert] = useState(null);
  const { addToCart, clearCart } = useCart();
  const { addOrder } = useOrder();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const allProducts = [
      ...bestDealsPage,
      ...electronicsPage,
      ...fashionPage,
      ...bestOfElectronicsHome,
      ...topStylesHome,
      ...bestDealsHome,
      ...bestSellersHome,
      ...bestSellersPage,
    ];

    const selectedProduct = allProducts.find((product) => product.id === id);
    setProduct(selectedProduct);
  }, [id]);

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate("/Login", { state: { from: location.pathname } });
      return;
    }
    try {
      const paymentResult = await initiatePayment([product], product.discountPrice);
      if (paymentResult.success) {
        const orderItem = {
          productId: product.id,
          productName: product.productName || product.title,
          img: product.img,
          price: Number(product.price) || 0,
          discountPrice: Number(product.discountPrice) || undefined,
          amount: 1
        };
        await addOrder([orderItem], product.discountPrice); // Pass numeric total
        await clearCart(); // Clear the cart after successful payment and order
        navigate("/", {
          state: {
            alert: {
              message: "Payment successful! Order placed.",
              type: "success",
            },
          },
        });
      } else {
        throw new Error("Payment not completed");
      }
    } catch (error) {
      setAlert({
        message: "Payment failed or was canceled. Please try again.",
        type: "error",
      });
    }
  };

  if (!product) return <div className="text-center mt-[120px]">Loading...</div>;

  return (
    <>
      <BookNowNavbar />
      <div className="md:flex justify-between mt-[120px] max-w-[1400px] mx-auto">
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        <div className="flex flex-col mb-[100px] group overflow-hidden">
          <div className="md:h-[540px] md:w-[640px] mt-[40px] h-[400px] overflow-hidden">
            <img
              className="h-full w-full object-contain object-center md:ml-[40px] pb-[20px] transition-transform duration-300 ease-in-out active:scale-[1.2] overflow-hidden md:hover:scale-[1.1]"
              src={product.img}
              alt={product.productName}
            />
          </div>
          <div>
            <button
              onClick={() => addToCart(product, navigate, location)}
              className="text-[1.3rem] font-semibold text-white md:ml-[80px] md:inline flex mx-auto border-solid border-[2px] border-[#f19c0a] bg-[#f19c0a] rounded-[6px] md:px-[44px] px-[60px] md:mx-[0] py-[8px] hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white mb-[26px] z-10"
            >
              ADD TO CART
            </button>
            <button
              onClick={handleBuyNow}
              className="text-[1.3rem] font-semibold text-white md:ml-[56px] border-solid border-[2px] border-[#fb4913] bg-[#fb4913] rounded-[6px] md:px-[60px] px-[80px] py-[8px] md:inline flex md:mx-[0] mx-auto hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white z-10"
            >
              BUY NOW
            </button>
          </div>
        </div>
        <div className="md:w-[50%]">
          <div className="max-w-xl rounded-lg shadow p-[40px] space-y-2 md:ml-[26px] md:mt-[60px] mt-[20px]">
            <div className="font-semibold mb-[10px]">
              <h3 className="text-[1.8rem] font-semibold">{product.productName}</h3>
              <span className="text-[1.36rem] text-gray-500">{product.productFeature}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-green-600 text-white text-sm px-2 py-1 rounded">{product.ratings}</span>
              <span className="text-gray-600 text-sm">{product.reviews}</span>
              <span className="text-blue-700 font-semibold text-sm md:block hidden">✔️ Assured</span>
            </div>
            <div className="text-green-700 font-semibold text-lg">Special price</div>
            <div className="flex items-end space-x-2">
              <span className="text-2xl font-bold text-red-600">₹{product.discountPrice.toLocaleString('en-IN')}</span>
              <span className="line-through text-gray-500">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-green-600 font-semibold">{product.specialDiscount}% off</span>
            </div>
            <p className="text-sm text-gray-700">Secure delivery in {product.delivery} days</p>
            <p className="text-red-600 text-sm font-medium">Hurry, Only a few left!</p>
            <div>
              <span className="font-semibold mb-1">Available offers</span>
              <ul className="space-y-1 text-sm text-gray-800">
                <li>
                  <span className="text-green-600 font-bold">🏷️ Bank Offer</span> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card
                  <a href="#" className="text-blue-600 ml-1">
                    T&C
                  </a>
                </li>
                <li>
                  <span className="text-green-600 font-bold">🏷️ Bank Offer</span> 10% off up to ₹1,000 on all Axis Bank Credit Card (incl. migrated ones) EMI Txns of ₹7,490 and above
                  <a href="#" className="text-blue-600 ml-1">
                    T&C
                  </a>
                </li>
                <li>
                  <span className="text-green-600 font-bold">🏷️ Bank Offer</span> 10% off on BOBCARD EMI Transactions, up to ₹1,500 on orders of ₹5,000 and above
                  <a href="#" className="text-blue-600 ml-1">
                    T&C
                  </a>
                </li>
                <li>
                  <span className="text-green-600 font-bold">🏷️ Special Price</span> Get extra 9% off (price inclusive of cashback/coupon)
                  <a href="#" className="text-blue-600 ml-1">
                    T&C
                  </a>
                </li>
              </ul>
              <a href="#" className="text-blue-600 mt-1 inline-block text-sm">
                View 2 more offers
              </a>
            </div>
          </div>
        </div>
      </div>
      <NivzoneFooter />
    </>
  );
};

export default BuyNowPage;