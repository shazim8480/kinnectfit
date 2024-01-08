import { FaStar } from "react-icons/fa";
const ReviewStar = ({ rating }) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => {
                const filled = index < rating;
                return <FaStar key={index} color={filled ? 'gold' : 'gray'} />;
            })}
        </div>
    );
};

export default ReviewStar;
