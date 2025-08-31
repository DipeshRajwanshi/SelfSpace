import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const notes = [
  { id: 1, title: "DBMS Notes", semester: "Semester 3", price: 120 },
  { id: 2, title: "OS Notes", semester: "Semester 2", price: 100 },
  { id: 3, title: "Networking Notes", semester: "Semester 4", price: 150 },
];

const BrowseNotes = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!token) {
    navigate("/login");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <h1 className="text-3xl font-bold text-center mb-10 text-purple-700">
        Browse Notes & Books 📚
      </h1>
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
            <p className="text-gray-600 mb-2">{note.semester}</p>
            <p className="text-gray-800 font-bold mb-4">₹{note.price}</p>
            <button className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
              View Details
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BrowseNotes;
