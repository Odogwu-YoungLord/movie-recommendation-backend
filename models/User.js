import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    favorites: [
      {
        movieId: String,
        title: String,
        poster: String,
      },
    ],
    watchlist: [
      {
        movieId: String,
        title: String,
        poster: String,
      },
    ],
    recommendations: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
