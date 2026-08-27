import React from "react";
import { Link } from "react-router-dom";
import { BiFilm } from "react-icons/bi";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navy-900 px-4 text-center">
      <BiFilm className="text-6xl text-red-500 mb-4" />
      <h1 className="text-5xl font-bold text-white mb-2">404</h1>
      <p className="text-gray-300 text-lg mb-8">
        This scene didn't make the final cut. The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-red-500 hover:bg-red-600 transition-colors text-white font-semibold px-6 py-3 rounded-lg"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
