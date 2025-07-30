import axios from 'axios';
import User from "../models/User.js";

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (req, res) => {
  const { q, query, year, genre, sort_by } = req.query;
  const searchQuery = q || query;

  if (!searchQuery) {
    return res.status(400).json({ message: "Missing search query" });
  }

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: searchQuery,
        primary_release_year: year,
        with_genres: genre,
        sort_by: sort_by || 'popularity.desc',
      },
    });

    res.json(response.data.results); // Return only results array
  } catch (error) {
    console.error("🔴 TMDB Search Error:", error.message);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

export const getGenres = async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    });
    res.json(response.data.genres);
  } catch (error) {
    console.error("🔴 Genre fetch failed:", error.message);
    res.status(500).json({ message: "Failed to fetch genres" });
  }
};

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Missing movie ID" });
  }

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        append_to_response: 'videos,credits,images', // Optional extras
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("🔴 TMDB Movie Detail Error:", error.message);
    res.status(500).json({ message: "Failed to fetch movie details" });
  }
};



export const getMovieRecommendations = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Missing movie ID" });
  }

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("🔴 TMDB Recommendation Error:", error.message);
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
};



export const getRecommendations = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user || !user.likedMovies || user.likedMovies.length === 0) {
      return res.status(404).json({ message: "No liked movies found" });
    }

    const recommendations = [];

    for (const movieId of user.likedMovies) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations`,
        {
          params: {
            api_key: process.env.TMDB_API_KEY,
          },
        }
      );
      recommendations.push(...response.data.results);
    }

    // Optional: remove duplicates by movie ID
    const uniqueRecommendations = [
      ...new Map(recommendations.map((m) => [m.id, m])).values(),
    ];

    res.json(uniqueRecommendations);
  } catch (error) {
    console.error("🔴 Error fetching recommendations:", error.message);
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
};
