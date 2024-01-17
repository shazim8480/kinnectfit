import Image from 'next/image';
import React from 'react';
import house from "@/assets/images/rental-housing.png";
import ReviewStar from './ReviewStar';
import { useSelector } from 'react-redux';
const ShowReview = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 h-full  min-h-[650px] md:min-h-[350px] items-center shadow-lg '>
            <div className='p-10'>
                <div>
                    <span className='font-semibold text-lg'>Rovert Endil</span>
                </div>
                <div className='mt-1'>
                    <ReviewStar rating={3} />
                </div>
                <div className='mt-2'>
                    <span className='font-medium text-base'>Vegetable plan</span>
                </div>
                <div className='mt-2'>
                    <span className='italic text-gray-600'>
                        This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.
                    </span>
                </div>
            </div>
            <div className='h-full relative '>
                <Image src={house} alt='rental' layout='fill' className='absolute' />
            </div>
        </div>
    );
};

export default ShowReview;