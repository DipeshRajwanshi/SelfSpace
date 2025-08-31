import React from "react";
import { useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();

  // For now using static data (later replace with backend or context API)
  const books = [
    { id: 1, title: "BCA Semester 1 Notes", semester: 1, cover: "/coverB1.jpg", description: "Complete notes for BCA semester 1." },
    { id: 2, title: "DBMS Book", semester: 2, cover: "/coverB2.jpg", description: "Database Management System reference book." },
    { id: 3, title: "OS Notes", semester: 3, cover: "/coverB1.jpg", description: "Operating System important notes." },
  ];

  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return <h2 className="text-center text-xl text-red-500 mt-10">❌ Book not found</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-12 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <img src={book.cover} alt={book.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-purple-700">{book.title}</h2>
          <p className="text-gray-600 mt-2">Semester {book.semester}</p>
          <p className="mt-4 text-gray-700">{book.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
