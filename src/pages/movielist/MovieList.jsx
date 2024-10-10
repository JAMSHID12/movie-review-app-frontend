import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './MovieList.css'; // CSS file for styling
import { filterMovies, getAllGenreAndLanguage } from '../../api/api';
import GenreSelect from '../../componets/Genre';
import LanguageSelect from '../../componets/Language';
import MovieCardListSection from '../../componets/movieCard/MovieCardListSection';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    const [genre, setGenre] = useState('');
    const [language, setLanguage] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [rating, setRating] = useState('');
    const [currentPage, setCurrentPage] = useState(-1);
    const [totalPages, setTotalPages] = useState(1);
    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);

    // Fetch movies from API
    const fetchMovies = async () => {
        console.log(genre);
        console.log(language);
        const params = {
            ...(genre && { genreId: genre }),
            ...(language && { languageId: language }),
            ...(releaseDate && { releaseDate: releaseDate }),
            ...(rating !== undefined && { minRating: rating }),
            page: currentPage + 1,
            size: 10,
        }
        try {
            const getAllResponse = await getAllGenreAndLanguage();
            setGenres(getAllResponse.data.data.genres);
            setLanguages(getAllResponse.data.data.language);
            const response = await filterMovies(params);
            console.log(response);
            if (response.status === 200) {
                setMovies(response.data.data.content);
                setTotalPages(response.data.data.page.totalPages);
            }

        } catch (error) {
            setMovies([]);
            setTotalPages([]);
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [currentPage, genre, language, releaseDate, rating]);

    // Handle pagination
    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    return (
        <div className="movie-list-container container">
            <div className="filters">

                <GenreSelect genre={genre} setGenre={setGenre} genres={genres} />
                <LanguageSelect language={language} setLanguage={setLanguage} languages={languages} />
                <input
                    type="date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    placeholder="Release Date"
                />
                <input
                    type="number"
                    placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="0"
                    max="5"
                />
            </div>

            {movies.length === 0 ? (
                <div style={{ textAlign: 'center', paddingTop: '100px' }}>
                    <p>No data available</p>
                </div>
            ) : (
                <div className="movie-grid ">
                    {movies.map((movie) => (
                        <MovieCardListSection key={movie.id} movie={movie} />
                    ))}
                    <div></div>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>

            )}

        </div>
    );
};

export default MovieList;
