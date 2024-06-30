export const selectRatingByMovieId = (state, movieId) => {
  return state.ratings.ratings[movieId];
};
