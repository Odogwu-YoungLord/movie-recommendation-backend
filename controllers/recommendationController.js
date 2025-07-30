import axios from 'axios';

export const getRecommendations = async (req, res) => {
  const { genres } = req.query; // e.g., genres=28,35

  if (!genres) {
    return res.status(400).json({ message: "Genres are required for recommendations" });
  }

  try {
    const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
      params: {
        api_key: process.env.TMDB_API_KEY,
        with_genres: genres,
        sort_by: 'popularity.desc'
      }
    });

    res.json(response.data.results);
  } catch (error) {
    console.error("🔴 Recommendation Error:", error.message);
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
};
