import Image from 'next/image';
import ReviewStar from './ReviewStar';
const ShowReview = ({ review }) => {
    return (
        <div className=" m-10">
            <div className='grid grid-cols-1 md:grid-cols-2 h-full  min-h-[650px] md:min-h-[350px] items-center shadow-lg '>
                <div className='p-10'>
                    <div>
                        {/* <p>Hello</p> */}
                        <span className='font-semibold text-lg'>{review?.user?.name}</span>
                    </div>
                    <div className='mt-1'>
                        <ReviewStar rating={review?.rating} />
                    </div>
                    <div className='mt-2'>
                        <span className='font-medium text-base'>{review?.review_item_name}</span>
                    </div>
                    <div className='mt-2'>
                        <span className='italic text-gray-600'>
                            {review?.review_description}
                        </span>
                    </div>
                </div>
                <div className='h-full relative '>
                    <Image src={review?.review_cover[0]} alt='rental' layout='fill' className='absolute' />
                </div>
            </div>
        </div >
    );
};

export default ShowReview;