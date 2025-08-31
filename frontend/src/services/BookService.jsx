export const addBook = async (formData, token) => {
  const res = await fetch("http://localhost:5000/api/books", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // ✅ no JSON.stringify because we are uploading files
  });

  if (!res.ok) throw new Error("Failed to add book");
  return await res.json();
};

export const getBooks = async () => {
  const res = await fetch("http://localhost:5000/api/books");
  return await res.json();
};
