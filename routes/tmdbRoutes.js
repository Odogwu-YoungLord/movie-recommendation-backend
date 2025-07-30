// import express from 'express';
// import { searchMovies, getGenres } from '../controllers/tmdbController.js';
// import { getMovieDetails } from "../controllers/tmdbController.js";

// const router = express.Router();

// router.get('/search', searchMovies);
// router.get('/genres', getGenres);
// router.get("/movie/:id", getMovieDetails); // Add this line

// export default router;
import express from "express";
import {
  searchMovies,
  getMovieDetails,
  getMovieRecommendations,
  getGenres,
  getRecommendations,
} from "../controllers/tmdbController.js";

const router = express.Router();

router.get("/search", searchMovies);
router.get("/movie/:id", getMovieDetails);
router.get("/movie/:id/recommendations", getMovieRecommendations);
router.get('/genres', getGenres);
router.get("/recommendations/:userId", getRecommendations); // Add route for user-specific recommendations

export default router;
