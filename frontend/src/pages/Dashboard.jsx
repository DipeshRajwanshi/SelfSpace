import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("activity");

  // Sample data
  const userBooks = [
    {
      id: 1,
      title: "BCA Semester 1 Notes",
      semester: 1,
      cover: "/coverB1.jpg",
    },
    { id: 2, title: "DBMS Book", semester: 2, cover: "/coverB2.jpg" },
    { id: 3, title: "OS Notes", semester: 3, cover: "/coverB1.jpg" },
  ];

  const activities = [
    {
      id: 1,
      type: "Bought",
      title: "Networking Notes",
      price: 150,
      date: "2025-08-30",
    },
    {
      id: 2,
      type: "Sold",
      title: "C Programming Notes",
      price: 100,
      date: "2025-08-28",
    },
    {
      id: 3,
      type: "Viewed",
      title: "Data Structures Book",
      price: 0,
      date: "2025-08-27",
    },
  ];

  const notifications = [
    "Your note 'OS Notes' was purchased.",
    "New comment on 'DBMS Notes'.",
    "New buyer request for 'Networking Notes'.",
  ];

  const stats = [
    {
      label: "My Listings",
      value: userBooks.length,
      color: "from-purple-600 to-orange-500",
    },
    {
      label: "Total Sales",
      value: "₹2500",
      color: "from-purple-500 to-purple-700",
    },
    {
      label: "Total Purchases",
      value: "₹1200",
      color: "from-orange-400 to-orange-600",
    },
    {
      label: "Most Viewed Note",
      value: "DBMS Notes",
      color: "from-purple-300 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col space-y-12">
      {/* Hero Stats */}
      <section className="px-6 md:px-12 pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl p-6 text-white shadow-lg bg-gradient-to-r ${stat.color} hover:scale-105 transform transition`}
          >
            <h2 className="text-3xl font-bold">{stat.value}</h2>
            <p className="mt-2 text-sm opacity-90">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* My Books */}
      <section className="px-6 md:px-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">📚 My Books</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {userBooks.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transform transition"
            >
              <Link to={`/mybooks/${book.id}`}>
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-purple-700 font-semibold text-lg">
                    {book.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Semester {book.semester}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Activity & Notifications Tabs */}
      <section className="px-6 md:px-12">
        <div className="flex gap-4 border-b mb-4">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "activity"
                ? "border-b-2 border-purple-600 text-purple-700"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("activity")}
          >
            Recent Activity
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "notifications"
                ? "border-b-2 border-purple-600 text-purple-700"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === "activity" ? (
            <ul className="space-y-3 max-h-64 overflow-y-auto bg-white p-4 rounded-xl shadow">
              {activities.map((act) => (
                <li
                  key={act.id}
                  className="flex justify-between p-3 border-b last:border-b-0 rounded hover:bg-purple-50 transition"
                >
                  <div>
                    <h3 className="font-semibold">{act.title}</h3>
                    <p className="text-gray-500 text-sm">
                      {act.type} on {act.date}
                    </p>
                  </div>
                  <div className="font-bold">
                    {act.price > 0 ? `₹${act.price}` : "-"}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-3 max-h-64 overflow-y-auto bg-white p-4 rounded-xl shadow">
              {notifications.map((note, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-3 bg-purple-50 rounded hover:bg-purple-100 transition"
                >
                  {note}
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default Dashboard;
