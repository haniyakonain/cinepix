<h1>CinePix:</h1>
Your Ultimate Movie Experience <br>
Welcome to CinePix, your premier destination for all things cinema. <br>CinePix brings you the latest movie releases, seamless ticket booking, <br> exclusive movie premieres, and trailers.  <br>Enjoy browsing movies, reading real user reviews, and watching HD trailers all in one place.

<h2>Features:</h2>
Latest Movie Releases: View the latest Hollywood, Bollywood, and Regional movie releases. <br>
Instant Ticket Booking: Book your tickets easily with seat selection. <br>
Real User Reviews and Ratings: Read reviews and ratings from other moviegoers. <br>
Live Showtimes: Check real-time movie showtimes and booking availability. <br>

<h2>Installation:</h2>
To get started with CinePix on your local machine, follow these steps: <br>

<h3>Clone the repository:</h3>
git clone https://github.com/your-username/cinepix.git <br>
cd cinepix <br>

<h3>Install dependencies:</h3>
npm install <br>

<h3>Set up environment variables:</h3>
Create a .env file in the root directory with your API keys: <br>
REACT_APP_TMDB_TOKEN=your_tmdb_api_key <br>

<h3>Run the development server:</h3>
npm start <br>
Your app should now be running on http://localhost:3000. <br>

<h2>Project Structure</h2>
Here's an overview of the project's file structure: <br>
CinePix/ <br>
├── node_modules <br>
├── public/ <br>
│   ├── cinepix.png <br>
│   ├── index.html <br>
│   └── manifest.json <br>
├── src/ <br>
│   ├── App.js <br>
│   ├── components/ <br>
│   │   ├── Booking/ <br>
│   │   │   └── SeatSelection.Component.jsx <br>
│   │   ├── Cast/ <br>
│   │   │   └── Cast.Component.jsx <br>
│   │   ├── Entertainment/ <br>
│   │   │   └── EntertainmentCard.Component.jsx <br>
│   │   ├── Footer/ <br>
│   │   │   └── Footer.Component.jsx <br>
│   │   ├── HeroCarousel/ <br>
│   │   │   ├── Arrows.Component.jsx <br>
│   │   │   └── HeroCarousel.Component.jsx <br>
│   │   ├── HeroSection/ <br>
│   │   │   └── Hero.Component.jsx <br>
│   │   ├── Loader/ <br>
│   │   │   ├── Loader.css <br>
│   │   │   └── Loader.jsx <br>
│   │   ├── MovieHero/ <br>
│   │   │   ├── MovieHero.Component.jsx <br>
│   │   │   └── MovieInfo.Component.jsx <br>
│   │   ├── Navbar/ <br>
│   │   │   ├── MovieNavbar.Component.jsx <br>
│   │   │   └── Navbar.Component.jsx <br>
│   │   ├── PaymentModel/ <br>
│   │   │   └── Payment.Component.jsx <br>
│   │   ├── Poster/ <br>
│   │   │   └── Poster.Component.jsx <br>
│   │   ├── PosterSlider/ <br>
│   │   │   └── PosterSlider.Component.jsx <br>
│   │   ├── Reviews/ <br>
│   │   │   └── Reviews.Component.jsx <br>
│   │   ├── ShowTimes/ <br>
│   │   │   └── ShowTimes.Component.jsx <br>
│   │   └── Trailers/ <br>
│   │       └── TrailerCard.Component.jsx <br>
│   ├── config/ <br>
│   │   └── tmdbApi.js <br>
│   ├── context/ <br>
│   │   └── Movie.context.jsx <br>
│   ├── index.css <br>
│   ├── index.js <br>
│   ├── layout/ <br>
│   │   ├── Default.layout.jsx <br>
│   │   └── Movie.layout.jsx <br>
│   ├── pages/ <br>
│   │   ├── 404.jsx <br>
│   │   ├── Home.jsx <br>
│   │   ├── Home.Page.jsx <br>
│   │   ├── Movie.jsx <br>
│   │   ├── Movie.Page.jsx <br>
│   │   ├── Order.Page.jsx <br>
│   │   └── Play.Page.jsx <br>
│   └── services/ <br>
│       ├── api.config.js <br>
│       ├── axios.config.js <br>
│       └── movie.service.js <br>
├── package.json <br>
├── package-lock.json <br>
├── postcss.config.js <br>
├── webpack.config.js <br>
└── tailwind.config.js <br>

<h2>Usage:</h2>
Once the app is running, you can explore the following features: <br>
Home Page: View featured movies and their details. <br>
Movie Page: Detailed information about a specific movie, including cast, trailers, reviews, and showtimes. <br>
Ticket Booking: Select seats and book tickets for your desired showtime. <br>
Reviews: Read and write reviews for movies. <br>
Trailers: Watch trailers for upcoming movies. <br>
Payment: Complete your booking with a payment modal. <br>

<h2>Technologies Used:</h2>
React: JavaScript library for building user interfaces. <br>
Tailwind CSS: A utility-first CSS framework for styling. <br>
Axios: Promise-based HTTP client for making requests to APIs. <br>
The Movie Database (TMDb) API: External API for fetching movie data, including information on movies, showtimes, trailers, and reviews. <br>
