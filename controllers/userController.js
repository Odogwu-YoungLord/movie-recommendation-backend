import bcrypt from 'bcryptjs';
import User from '../models/User.js';
// Add to favorites
export const addFavorite = async (req, res) => {
  const { userId } = req.params;
  const movie = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const alreadyFavorite = user.favorites.some(m => m.id === movie.id);
    if (alreadyFavorite) return res.status(400).json({ msg: 'Already in favorites' });

    user.favorites.push(movie);
    await user.save();
    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get favorites
export const getFavorites = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove from favorites
export const removeFavorite = async (req, res) => {
  const { userId, movieId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.favorites = user.favorites.filter(m => m.id != movieId);
    await user.save();
    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add to watchlist
export const addToWatchlist = async (req, res) => {
  const { userId } = req.params;
  const movie = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const alreadyInWatchlist = user.watchlist.some(m => m.id === movie.id);
    if (alreadyInWatchlist) return res.status(400).json({ msg: 'Already in watchlist' });

    user.watchlist.push(movie);
    await user.save();
    res.status(200).json(user.watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove from watchlist
export const removeFromWatchlist = async (req, res) => {
  const { userId, movieId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.watchlist = user.watchlist.filter(m => m.id != movieId);
    await user.save();
    res.status(200).json(user.watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get watchlist
export const getWatchlist = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.status(200).json(user.watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findById(req.params.userId);
    if (username) user.name = username;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user profile
export const deleteUserProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
