import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  semester: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  coverUrl: { type: String }, // uploaded image
  fileUrl: { type: String },  // uploaded pdf
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // user who posted
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
