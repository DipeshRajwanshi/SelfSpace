import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });
      alert("Password reset link has been sent to your email!");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to send reset link");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-orange-500 px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-6">
          Forgot Password 🔑
        </h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your email address and we’ll send you a reset link.
        </p>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
        >
          Send Reset Link
        </button>

        {/* Back to login */}
        <div className="mt-4 text-sm text-center text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-medium text-purple-600 hover:underline"
          >
            Login
          </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default ForgotPassword;
