import React from 'react';
import ReactStars from "react-rating-stars-component";

const StarRating = ({ setRating }) => {
    const ratingChanged = (newRating) => {
        setRating(newRating);
    };
    return (
        <div>
            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={30}
                activeColor="#ffd700"
            />,
        </div>
    );
};

export default StarRating;