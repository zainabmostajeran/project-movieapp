import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
  id: string;
  name: string;
  genre: string;
  rating: number;
}

type SortOrder = "asc" | "desc";

interface MoviesState {
  movies: Movie[];
  sortBy: keyof Movie | null;
  sortOrder: SortOrder;
}

const initialState: MoviesState = {
  movies: [],
  sortBy: null,
  sortOrder: "asc",
};

const sortMoviesHelper = (
  state: MoviesState,
  newMovie: Movie | null,
  sortBy: keyof Movie | null,
  sortOrder: SortOrder
) => {
  if (!sortBy) return;

  state.movies.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Omit<Movie, "id">>) => {
      const newMovie: Movie = {
        id: Date.now().toString(),
        ...action.payload,
      };
      state.movies.push(newMovie);

      sortMoviesHelper(state, newMovie, state.sortBy, state.sortOrder);
    },
    deleteMovie: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
    sortMovies: (state, action: PayloadAction<{ sortBy: keyof Movie }>) => {
      if (state.sortBy === action.payload.sortBy) {
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      } else {
        state.sortBy = action.payload.sortBy;
        state.sortOrder = "asc";
      }
      sortMoviesHelper(state, null, state.sortBy, state.sortOrder);
    },
  },
});

export const { addMovie, deleteMovie, sortMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
