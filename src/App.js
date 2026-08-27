import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePage from "./pages/Home.Page";
import MoviePage from "./pages/Movie.Page";
import PlayPage from "./pages/Play.Page";
import NotFoundPage from "./pages/404";
import { SearchProvider } from "./context/Search.context";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = {};
axios.defaults.params["api_key"] = process.env.REACT_APP_TMDB_TOKEN;

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/plays" element={<PlayPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SearchProvider>
  );
}

export default App;