// routes/userRoutes.js
import express from 'express';
import {
  addFavorite,
  getFavorites,
  removeFavorite,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile
} from '../controllers/userController.js';

const router = express.Router();

router.post('/favorites/:userId', addFavorite);
router.get('/favorites/:userId', getFavorites);
router.delete('/favorites/:userId/:movieId', removeFavorite);

router.post('/:userId/watchlist', addToWatchlist);
router.delete('/:userId/watchlist/:movieId', removeFromWatchlist);
router.get('/:userId/watchlist', getWatchlist);

router.get('/:userId/profile', getUserProfile);
router.put('/:userId/profile', updateUserProfile);
router.delete('/:userId/profile', deleteUserProfile);

export default router;
