<h1>CinePix:</h1>
Your Ultimate Movie Experience <br>
Welcome to CinePix, your premier destination for all things cinema. <br>CinePix brings you the latest movie releases, seamless ticket booking, <br> exclusive movie premieres, and trailers.  <br>Enjoy browsing movies, reading real user reviews, and watching HD trailers all in one place.

<h2>Why CinePix?</h2>
The website's vibrant color scheme of red, green, and blue represents the essence of Cinema (Cine) and Pixels (Pix),<br> celebrating both the art of filmmaking and the technological marvel that brings it to life on screen.<br> These colors are a tribute to the magic of cinema and digital imagery.<br>

<h2>Important Note:</h2>
Due to restrictions on accessing movie data in certain regions,<br> we recommend using a VPN to get the full experience of the CinePix platform.<br> The Movie Database (TMDb) API, which powers many of the movie-related features on the website, <br>may not work properly in India.

<h2>Features:</h2>
Latest Movie Releases: View the latest Hollywood, Bollywood, and Regional movie releases. <br>
Instant Ticket Booking: Book your tickets easily with seat selection. <br>
Real User Reviews and Ratings: Read reviews and ratings from other moviegoers. <br>
Live Showtimes: Check real-time movie showtimes and booking availability. <br>

<h2>Installation:</h2>
To get started with CinePix on your local machine, follow these steps: <br>

<h3>Clone the repository:</h3>
git clone git@github.com:haniyakonain/cinepix.git <br>
cd cinepix <br>

<h3>Install dependencies:</h3>
npm install <br>

<h3>Set up environment variables:</h3>
Create a .env file in the root directory with your API keys: <br>
REACT_APP_TMDB_TOKEN=your_tmdb_api_key <br>

<h3>Run the development server:</h3>
npm start <br>
Your app should now be running on http://localhost:3000. <br>

## Project Structure
```
CinePix/
├── node_modules 
├── public/ 
│   ├── cinepix.png 
│   ├── index.html 
│   └── manifest.json 
├── src/ 
│   ├── App.js 
│   ├── components/ 
│   │   ├── Booking/ 
│   │   │   └── SeatSelection.Component.jsx
│   │   ├── Cast/ 
│   │   │   └── Cast.Component.jsx 
│   │   ├── Entertainment/
│   │   │   └── EntertainmentCard.Component.jsx
│   │   ├── Footer/ 
│   │   │   └── Footer.Component.jsx 
│   │   ├── HeroCarousel/ 
│   │   │   ├── Arrows.Component.jsx 
│   │   │   └── HeroCarousel.Component.jsx 
│   │   ├── HeroSection/
│   │   │   └── Hero.Component.jsx 
│   │   ├── Loader/ 
│   │   │   ├── Loader.css 
│   │   │   └── Loader.jsx 
│   │   ├── MovieHero/ 
│   │   │   ├── MovieHero.Component.jsx 
│   │   │   └── MovieInfo.Component.jsx 
│   │   ├── Navbar/ 
│   │   │   ├── MovieNavbar.Component.jsx 
│   │   │   └── Navbar.Component.jsx 
│   │   ├── PaymentModel/
│   │   │   └── Payment.Component.jsx 
│   │   ├── Poster/ 
│   │   │   └── Poster.Component.jsx 
│   │   ├── PosterSlider/ 
│   │   │   └── PosterSlider.Component.jsx 
│   │   ├── Reviews/ 
│   │   │   └── Reviews.Component.jsx 
│   │   ├── ShowTimes/
│   │   │   └── ShowTimes.Component.jsx
│   ├── config/ 
│   │   └── tmdbApi.js 
│   ├── context/ 
│   │   └── Movie.context.jsx 
│   ├── index.css 
│   ├── index.js 
│   ├── layout/ 
│   │   ├── Default.layout.jsx 
│   │   └── Movie.layout.jsx 
│   ├── pages/ 
│   │   ├── 404.jsx 
│   │   ├── Home.jsx 
│   │   ├── Home.Page.jsx 
│   │   ├── Movie.jsx 
│   │   ├── Movie.Page.jsx 
│   │   ├── Order.Page.jsx 
│   │   └── Play.Page.jsx 
│   └── services/ 
│       ├── api.config.js 
│       ├── axios.config.js 
│       └── movie.service.js
├── package.json 
├── package-lock.json 
├── postcss.config.js 
├── webpack.config.js 
└── tailwind.config.js
```

<h2>Usage:</h2>
Once the app is running, you can explore the following features: <br>
Home Page: View featured movies and their details. <br>
Movie Page: Detailed information about a specific movie, including cast, trailers, reviews, and showtimes. <br>
Showtimes: Real-time theatre showtimes and its trailer's. <br>
Book Tickets: Latest Movies in Theaters<br>
Reviews: Read and write reviews for movies. <br>


<h2>Technologies Used:</h2>
React: JavaScript library for building user interfaces. <br>
Tailwind CSS: A utility-first CSS framework for styling. <br>
Axios: Promise-based HTTP client for making requests to APIs. <br>
The Movie Database (TMDb) API: External API for fetching movie data, including information on movies, showtimes, trailers, and reviews. <br>
