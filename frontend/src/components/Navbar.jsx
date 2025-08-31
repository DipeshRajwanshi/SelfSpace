import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Navbar fixed at top */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-md z-50"
      >
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold tracking-wide">
            BCA StudyHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {["Home", "Sell Notes", "Browse Notes", "My Books", "Profile"].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={
                    item === "Home"
                      ? "/dashboard"
                      : item === "Sell Notes"
                      ? "/dashboard/sell"
                      : item === "Browse Notes"
                      ? "/dashboard/browse"
                      : item === "My Books"
                      ? "/dashboard/my-books"
                      : "/dashboard/profile"
                  }
                  className="hover:text-gray-200 transition"
                >
                  {item}
                </Link>
              </motion.div>
            ))}

            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="ml-4 bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Logout
              </motion.button>
            ) : (
              <div className="space-x-4">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/login"
                    className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/register"
                    className="bg-orange-100 text-orange-700 font-semibold px-4 py-2 rounded-lg hover:bg-orange-200 transition"
                  >
                    Register
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button onClick={toggleMenu} className="md:hidden focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-r from-purple-700 to-orange-600 px-6 py-4 space-y-4"
          >
            <Link to="/dashboard" className="block hover:text-gray-200" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/dashboard/sell" className="block hover:text-gray-200" onClick={toggleMenu}>
              Sell Notes
            </Link>
            <Link to="/dashboard/browse" className="block hover:text-gray-200" onClick={toggleMenu}>
              Browse Notes
            </Link>
            <Link to="/dashboard/my-books" className="block hover:text-gray-200" onClick={toggleMenu}>
              My Books
            </Link>
            <Link to="/dashboard/profile" className="block hover:text-gray-200" onClick={toggleMenu}>
              Profile
            </Link>

            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="w-full bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Logout
              </motion.button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="block w-full text-center bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={toggleMenu}
                  className="block w-full text-center bg-orange-100 text-orange-700 font-semibold px-4 py-2 rounded-lg hover:bg-orange-200 transition"
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </motion.nav>

      {/* Spacer so content doesn't hide behind fixed navbar */}
      <div className="h-20"></div>
    </>
  );
}

export default Navbar;
