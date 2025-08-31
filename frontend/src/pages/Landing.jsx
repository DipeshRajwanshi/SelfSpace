import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Landing() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProtectedNavigation = (path) => {
    if (token) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  // Dummy Featured Data
  const featuredBooks = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      sem: "Semester 3",
      price: "₹120",
      seller: "Anjali Sharma",
      img: "/coverB1.jpg",
    },
    {
      id: 2,
      title: "Database Management Notes",
      sem: "Semester 4",
      price: "₹100",
      seller: "Rohit Verma",
      img: "/coverB2.jpg",
    },
    {
      id: 3,
      title: "Operating Systems Essentials",
      sem: "Semester 5",
      price: "₹150",
      seller: "Priya Gupta",
      img: "/coverB1.jpg",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Arjun Mehta",
      feedback:
        "This platform helped me save money and find exactly the notes I needed before exams!",
    },
    {
      id: 2,
      name: "Neha Singh",
      feedback:
        "I uploaded my old notes and earned pocket money easily. Super helpful for students!",
    },
    {
      id: 3,
      name: "Karan Patel",
      feedback:
        "The best place for BCA students to exchange resources. Simple, fast, and effective.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 bg-white shadow z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-purple-700">
            SelfSpace 📚
          </Link>
          <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
            <Link to="/login" className="hover:text-purple-700">
              Login
            </Link>
            <Link to="/register" className="hover:text-purple-700">
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-orange-500 text-white py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <p className="uppercase tracking-wide text-lg font-medium text-orange-200">
              Your Student Marketplace
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Buy & Sell Your <br /> BCA Books & Notes
            </h1>
            <p className="mt-4 text-lg text-gray-100">
              Share knowledge, save money, and support your peers in just a few
              clicks.
            </p>

            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <button
                onClick={() => handleProtectedNavigation("/dashboard/sell")}
                className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
              >
                Sell Notes
              </button>
              <button
                onClick={() => handleProtectedNavigation("/dashboard/browse")}
                className="bg-orange-100 text-orange-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-orange-200 transition"
              >
                Browse Notes
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center"
          >
            <img
              src="/coverB2.jpg"
              alt="Books Illustration"
              className="w-96 mx-auto rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Featured Books & Notes
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredBooks.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-transform"
            >
              <img
                src={book.img}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600 text-sm">{book.sem}</p>
                <p className="text-gray-800 font-medium mt-2">{book.price}</p>
                <p className="text-xs text-gray-500">Seller: {book.seller}</p>
                <button
                  onClick={() => handleProtectedNavigation("/dashboard")}
                  className="mt-4 inline-block text-purple-600 font-semibold hover:underline"
                >
                  View Details →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What Students Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition"
              >
                <p className="text-gray-600 italic">“{t.feedback}”</p>
                <h4 className="mt-4 font-semibold text-purple-700">{t.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-r from-purple-700 to-orange-600 text-white py-20 text-center"
      >
        <h2 className="text-3xl font-bold">Start Sharing Knowledge Today 🚀</h2>
        <p className="mt-3 text-lg">
          Upload your BCA notes, help your juniors, and earn while doing it!
        </p>

        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
          >
            Register Now
          </Link>
          <Link
            to="/login"
            className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

export default Landing;
