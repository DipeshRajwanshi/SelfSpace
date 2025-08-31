import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { addBook, getBooks } from "../services/BookService"; // ✅ API helpers

const SellNotes = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [semester, setSemester] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState(null);
  const [file, setFile] = useState(null);

  const [books, setBooks] = useState([]); // ✅ Books from backend
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch books from backend on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load books.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !semester || !description || !price) {
      setMessage("⚠️ Please fill all fields!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("semester", semester);
      formData.append("description", description);
      formData.append("price", price);
      if (cover) formData.append("cover", cover);
      if (file) formData.append("file", file);

      const savedBook = await addBook(formData, token);

      setBooks([...books, savedBook]);
      setMessage("✅ Book submitted successfully!");

      // Reset form
      setTitle("");
      setSemester("");
      setDescription("");
      setPrice("");
      setCover(null);
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 flex flex-col items-center py-12"
    >
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Sell a Note 📚</h1>

      {/* Success/Error Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            key="msg"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`mb-4 p-3 rounded-lg shadow ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <input
          type="text"
          placeholder="Semester / Subject"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          rows={4}
          required
        />
        <input
          type="number"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />

        {/* File Upload */}
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Upload Cover Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files[0])}
          className="mb-4"
        />

        <label className="block mb-2 text-sm font-medium text-gray-600">
          Upload PDF (optional)
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white p-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Preview of Submitted Books */}
      <div className="mt-10 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          📖 My Listed Books
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : books.length === 0 ? (
          <p className="text-gray-500">No books listed yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {books.map((book) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                {book.coverUrl && (
                  <img
                    src={`http://localhost:5000${book.coverUrl}`}
                    alt={book.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-purple-700">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Semester: {book.semester}
                  </p>
                  <p className="text-sm mt-2 text-gray-600">
                    {book.description}
                  </p>
                  <p className="text-sm font-bold text-green-600 mt-2">
                    ₹ {book.price}
                  </p>
                  {book.fileUrl && (
                    <a
                      href={`http://localhost:5000${book.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-500 underline mt-1 block"
                    >
                      📄 Download PDF
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SellNotes;
