export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_KEY,
  },
};

export const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;
