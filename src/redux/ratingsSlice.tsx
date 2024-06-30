import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RatingState {
  ratings: Record<string, number>;
}

const initialState: RatingState = {
  ratings: {},
};

const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    setRating(
      state,
      action: PayloadAction<{ movieId: string; rating: number }>
    ) {
      const { movieId, rating } = action.payload;
      state.ratings[movieId] = rating;
    },
    clearRatings(state) {
      state.ratings = {};
    },
  },
});

export const { setRating, clearRatings } = ratingsSlice.actions;
export default ratingsSlice.reducer;
