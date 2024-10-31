import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks";
import { addMovie } from "../store/moviesSlice";

interface FormInputs {
  name: string;
  genre: string;
  rating: number;
}

const MovieForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: FormInputs) => {
    dispatch(addMovie(data));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Movie Name
        </label>
        <input
          id="name"
          {...register("name", { required: true })}
          className={`shadow appearance-none border ${
            errors.name ? "border-red-500" : ""
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="text"
          placeholder="Enter movie name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">Name is required.</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="genre"
        >
          Genre
        </label>
        <input
          id="genre"
          {...register("genre", { required: true })}
          className={`shadow appearance-none border ${
            errors.genre ? "border-red-500" : ""
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="text"
          placeholder="Enter genre"
        />
        {errors.genre && (
          <p className="text-red-500 text-xs italic">Genre is required.</p>
        )}
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="rating"
        >
          Rating
        </label>
        <input
          id="rating"
          {...register("rating", { required: true, min: 0, max: 10 })}
          className={`shadow appearance-none border ${
            errors.rating ? "border-red-500" : ""
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="number"
          placeholder="Enter rating (0-10)"
          step="0.1"
        />
        {errors.rating && (
          <p className="text-red-500 text-xs italic">
            Rating must be between 0 and 10.
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Movie
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
