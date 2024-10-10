import React from 'react';
import './mainMovieCard.css';

const MainMovieCard = React.memo(({ title, duration, rating, description, imageUrl, ottPlatform }) => {
    return (
      
            
            <div className="main-movie-card " style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="main-movie-info">
                    <h2 className="main-movie-title">{title}</h2>
                    <p className="main-movie-duration">{duration} Minutes</p>
                    <div className="main-movie-rating">
                        <span>{rating}</span>
                        <span className="star">★</span>
                    </div>
                    <p className="main-movie-description">{description}</p>
                    <button className="main-watch-button" onClick={() => window.location.href = ottPlatform}>WATCH MOVIE</button>
                </div>
            </div>
        

    )
});

export default MainMovieCard;