import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const History = () => {
  const { token } = useContext(AuthContext);

  // Placeholder data
  const allActivities = [
    { id: 1, type: "Bought", title: "Networking Notes", price: 150, date: "2025-08-30" },
    { id: 2, type: "Sold", title: "C Programming Notes", price: 100, date: "2025-08-28" },
    { id: 3, type: "Viewed", title: "Data Structures Book", price: 0, date: "2025-08-27" },
    { id: 4, type: "Bought", title: "OS Notes", price: 120, date: "2025-08-26" },
    { id: 5, type: "Sold", title: "DBMS Notes", price: 90, date: "2025-08-25" },
    { id: 6, type: "Viewed", title: "Java Notes", price: 0, date: "2025-08-24" },
    // Add more for testing pagination
  ];

  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  if (!token) return null; // Protected: wrap in ProtectedRoute

  // Filter activities
  const filteredActivities = allActivities.filter(
    (act) => filter === "All" || act.type === filter
  );

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center text-purple-700 mb-6"
      >
        My Activity History
      </motion.h1>

      {/* Filter */}
      <div className="flex justify-center gap-4 mb-6">
        {["All", "Bought", "Sold", "Viewed"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setFilter(type);
              setCurrentPage(1); // reset page on filter change
            }}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filter === type
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 shadow hover:bg-purple-100"
            } transition`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        {paginatedActivities.map((act, i) => (
          <motion.div
            key={act.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border-b last:border-b-0 py-3 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-gray-800">{act.title}</h2>
              <p className="text-sm text-gray-600">{act.type} on {act.date}</p>
            </div>
            <div className="text-gray-800 font-bold">{act.price > 0 ? `₹${act.price}` : "-"}</div>
          </motion.div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
