import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useCart } from "./context/CartContext.jsx";
import { useOrder } from "./context/OrderContext.jsx";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart, fetchCart } = useCart();
  const { fetchOrders } = useOrder();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (isLogin) {
        await clearCart();
        const response = await axios.post("https://e-commerce-h39e.onrender.com/auth/signin", {
          email,
          password,
        });
        localStorage.setItem("token", response.data.jwt);
        await fetchCart();
        await fetchOrders();
        navigate(location.state?.from || "/", {
          state: { alert: { message: "Logged in successfully!", type: "success" } }
        });
        setEmail("");
        setPassword("");
      } else {
        const response = await axios.post("https://e-commerce-h39e.onrender.com/auth/signup", {
          fullName,
          email,
          password,
        });
        setMessage("Account created successfully! Please log in.");
        setIsLogin(true);
        setFullName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl transform transition-all duration-500 ease-in-out animate-slide-in"
      >
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6 animate-fade-in">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h3>
        {message && (
          <div
            className={`text-center p-3 mb-6 rounded-lg text-sm font-medium animate-fade-in-fast ${
              message.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
        {!isLogin && (
          <div className="mb-5">
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}
        <div className="mb-5">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-6">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-105"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>
        <div className="mt-4 text-center">
          <span
            onClick={toggleForm}
            className="text-blue-600 font-medium cursor-pointer hover:text-blue-800 transition-colors duration-300"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;