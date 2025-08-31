import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-gradient-to-r from-purple-700 to-orange-600 text-white mt-auto"
    >
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">BCA StudyHub</h2>
          <p className="mt-2 text-sm text-gray-200">
            A platform to buy and sell BCA books & notes with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "Sell Notes", "Browse Notes", "My Books", "Profile"].map((item, idx) => (
              <motion.li key={idx} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 200 }}>
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
                  className="hover:underline"
                >
                  {item}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            {[Facebook, Twitter, Instagram, Github].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
              >
                <Icon className="w-6 h-6 hover:text-gray-300 transition" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black bg-opacity-30 text-center py-3 text-sm">
        © {new Date().getFullYear()} BCA StudyHub. All rights reserved.
      </div>
    </motion.footer>
  );
}

export default Footer;
