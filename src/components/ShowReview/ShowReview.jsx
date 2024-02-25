import Image from "next/image";
import ReviewStar from "./ReviewStar";
import HeadingText from "../UI/HeadingText";

const ShowReview = ({ review }) => {
  return (
    <>
      <HeadingText title="User Reviews" className="text-center" />
      <div className="grid max-w-screen-xl grid-cols-1 grid-rows-1 py-10 mx-auto md:grid-cols-2 shadow-lg mb-10">
        <div className="p-10">
          <div>
            {/* <p>Hello</p> */}
            <span className="font-semibold text-lg">{review?.user?.name}</span>
          </div>
          <div className="mt-1">
            <ReviewStar rating={review?.rating} />
          </div>
          <div className="mt-2">
            <span className="font-medium text-base">
              {review?.review_item_name}
            </span>
          </div>
          <div className="mt-2">
            <span className="italic text-gray-600">
              {review?.review_description}
            </span>
          </div>
        </div>
        <div className="h-full relative ">
          <Image
            src={review?.review_cover[0]}
            alt="rental"
            layout="fill"
            className="absolute"
          />
        </div>
      </div>
    </>
  );
};

export default ShowReview;
