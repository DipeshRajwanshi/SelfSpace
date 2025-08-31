import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, token } = useContext(AuthContext);

  // Local state for editing (optional)
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    // Placeholder: update API call
    alert("Profile updated successfully!");
    // Later update context and localStorage
  };

  if (!token) return null; // Protected: you can wrap with ProtectedRoute

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-orange-50 p-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          My Profile
        </h1>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <label className="flex flex-col text-gray-700">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </label>

          <label className="flex flex-col text-gray-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </label>

          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:opacity-90 transition"
          >
            Update Profile
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;
