import React from "react";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Movies List App</h1>
        <MovieForm />
        <MovieList />
      </div>
    </div>
  );
};

export default App;
