import { createSlice } from "@reduxjs/toolkit";

const gptSearchSlice = createSlice({
  name: "gptSearch",
  initialState: {
    showGptSearch: false,
    gptSearchMovies: null,
    gptSearchTmdbResults: null,
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptTmdbResults: (state, action) => {
      const { movieArray, tmdbMovieResults } = action.payload;
      state.gptSearchMovies = movieArray;
      state.gptSearchTmdbResults = tmdbMovieResults;
    },
  },
});

export const { toggleGptSearch, addGptTmdbResults } = gptSearchSlice.actions;
export default gptSearchSlice.reducer;
