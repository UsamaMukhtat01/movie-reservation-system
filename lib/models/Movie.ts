import mongoose, { Schema, models, model } from "mongoose";

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  genres: [
    {
      type: String,
      required: true,
    },
  ],
  showTime: [
    {
      date: { type: Date, required: true },
      time: { type: String, required: true, unique: true },
      capacity: { type: Number, required: true },
      reservedSeats: { type: [Number], default: [] },
    },
  ],
  type: {
    type: String,
    enum: ["Coming Soon", "Selling"],
    default: "Selling",
  },
});

// ✅ Prevent model overwrite in Next.js hot reload
const Movie = models.Movie || model("Movie", MovieSchema);

export default Movie;
