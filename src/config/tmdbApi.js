import axios from "axios";

const tmdbApi = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	params: {
		api_key: process.env.REACT_APP_TMDB_API_KEY // Use the API key from the .env file
	}
});

export default tmdbApi;
