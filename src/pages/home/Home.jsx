import { useEffect, useState } from "react";
import { fetchReviewBasedOnReview, searchMovies } from "../../api/api";
import { fetchLatestMovies } from "../../api/api";
import MainMovieCard from "../../componets/movie/MainMovieCard";
import './home.css'
import { Carousel } from "react-bootstrap";


const HomePage = () => {

    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [latestMovies, setLatestMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const carouselMovies = [
        { id: 1, title: 'Review the best movie you ever scene', image: require('../../assets/movie-1.jpg') },
        { id: 2, title: 'Make a dream movie', image: require('../../assets/movie-2.jpg') },
        { id: 3, title: 'Get a chance to free ticket ', image: require('../../assets/movie-3.jpg') },
    ];

    useEffect(() => {
        console.log("Fetching movies...");
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const topRatedResponse = await fetchReviewBasedOnReview();
                const latestResponse = await fetchLatestMovies();
                console.log(topRatedResponse.data.data);
                console.log(latestResponse.data.data);
                setTopRatedMovies(topRatedResponse.data.data);
                setLatestMovies(latestResponse.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        console.log(searchQuery);
        const filterMovies = async (e) => {
            if (searchQuery) {
                try {
                    const filtered = await searchMovies(searchQuery);
                    console.log(filtered.data)
                    setFilteredMovies(filtered.data);
                } catch (err) {
                    console.error("Error fetching filtered movies:", err);
                    setFilteredMovies([]);
                }
            } else {
                setFilteredMovies([]);
            }
        };
        filterMovies();
    }, [searchQuery]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching movies: {error}</p>;

    return (

        <div className="movie">
            <Carousel>
                {carouselMovies.map((movie) => (
                    <Carousel.Item key={movie.id}>
                        <img
                            className="d-block w-100"
                            src={movie.image}
                            alt={movie.title}
                        />
                        <Carousel.Caption>
                            <h3>{movie.title}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>


            <div className="movie-search">
                <input
                    type="text"
                    placeholder="Search Movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <div className="search-movie-list">
                    {filteredMovies.map(movie => (
                        <div className="search-movie-item" key={movie.id}>
                            <h3 className="search-movie-title">{movie.title}</h3>
                            <p className="search-movie-description">{movie.description}</p>
                            <span className="search-movie-release">Release Date: {movie.releaseDate}</span>
                            <span className="search-movie-rating">Rating: {movie.rating}</span>
                        </div>
                    ))}
                </div>
            </div>


            <h2 className="mx-4 mb-4 ml-5">Top Rated Movies</h2>
            <div className="container-fluid">
                <div className="row mx-4">
                    {topRatedMovies.map(movie => (
                        <div className="col-md-3 mb-4" key={movie.id}>
                            <MainMovieCard
                                title={movie.title}
                                duration={movie.duration}
                                rating={movie.totalRating}
                                description={movie.description}
                                imageUrl={movie.movieImageUrl}
                                ottPlatform={movie.ottPlatformUrl}
                            />
                        </div>
                    ))}
                </div>
            </div>


            <h2 className="mx-4 mb-4 my-5">Latest Movies</h2>
            <div className="row mx-4">
                {latestMovies.map(movie => (
                    <div className="col-md-3 mb-4" key={movie.id}>
                        <MainMovieCard
                            title={movie.title}
                            duration={movie.duration}
                            rating={movie.rating}
                            description={movie.description}
                            imageUrl={movie.movieImageUrl}
                            ottPlatform={movie.ottPlatformUrl}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage;