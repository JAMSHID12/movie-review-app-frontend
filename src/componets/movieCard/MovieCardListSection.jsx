import React, { useState } from 'react';
import './movieCardListSection.css';
const MovieCardListSection = ({ movie }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmitReview = () => {
        // You can add API logic here to submit the review
        console.log(`Movie: ${movie.title}, Rating: ${rating}, Comment: ${comment}`);
        setIsModalOpen(false);
        setRating('');
        setComment('');
    };

    return (
        <div className="movie-card">
            <img src={movie.imageUrl} alt={movie.title} className="movie-image" />
            <div className="movie-details">
                <h3>{movie.title}</h3>
                <div className="genre-language-row">
                    <div className="genre-section">
                        <strong>Genre: </strong>
                        {movie.genres.map((gen, index) => (
                            <span key={index} className="genre-item">{gen.name}</span>
                        ))}
                    </div>
                    <div className="language-section">
                        <strong>Language: </strong>
                        {movie.languages.map((language, index) => (
                            <span key={index} className="language-item">{language.name}</span>
                        ))}
                    </div>
                </div>
                <p>Release Date: {movie.releaseDate}</p>
                <p>Rating: {movie.totalRating}</p>
                <button className="review-button" onClick={() => setIsModalOpen(true)}>
                    Add Review
                </button>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Review {movie.title}</h2>
                        <div className="review-form">
                            <label>Rating:</label>
                            <input
                                type="number"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                min="1"
                                max="5"
                                placeholder="Rate from 1 to 5"
                            />
                            <label>Comment:</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write your comment here"
                            ></textarea>
                            <button className="submit-review" onClick={handleSubmitReview}>
                                Submit Review
                            </button>
                            <button className="close-modal" onClick={() => setIsModalOpen(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieCardListSection;
