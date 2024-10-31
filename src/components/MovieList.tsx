import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { deleteMovie, sortMovies, Movie } from "../store/moviesSlice";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

const MovieList: React.FC = () => {
  const movies = useAppSelector((state) => state.movies.movies);
  const sortBy = useAppSelector((state) => state.movies.sortBy);
  const sortOrder = useAppSelector((state) => state.movies.sortOrder);
  const dispatch = useAppDispatch();

  const handleSort = (column: keyof Movie) => {
    dispatch(sortMovies({ sortBy: column }));
  };

  const renderSortIcon = (column: keyof Movie) => {
    if (sortBy !== column) {
      return <MdOutlineKeyboardDoubleArrowDown />
      ;
    }
    return sortOrder === "asc" ? (
      <MdOutlineKeyboardDoubleArrowDown />

    ) : (
      <MdOutlineKeyboardDoubleArrowDown />
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center justify-center">
                Name <span className="ml-2">{renderSortIcon("name")}</span>
              </div>
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort("genre")}
            >
              <div className="flex items-center justify-center">
                Genre <span className="ml-2">{renderSortIcon("genre")}</span>
              </div>
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort("rating")}
            >
              <div className="flex items-center justify-center">
                Rating <span className="ml-2">{renderSortIcon("rating")}</span>
              </div>
            </th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No movies added yet.
              </td>
            </tr>
          ) : (
            movies.map((movie) => (
              <tr key={movie.id} className="text-center">
                <td className="py-2 px-4 border-b">{movie.name}</td>
                <td className="py-2 px-4 border-b">{movie.genre}</td>
                <td className="py-2 px-4 border-b">{movie.rating}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => dispatch(deleteMovie(movie.id))}
                    className="bg-red-500 px-2 py-1 rounded-md text-white hover:text-black hover:bg-gray-400"
                  >
                    remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
