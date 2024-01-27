// MealComponent.js

import Image from 'next/image';

const MealComponent = ({ meal, selected, onClick, alreadySelected }) => {
    return (
        <div
            key={meal?._id}
            onClick={() => onClick(meal?._id)}
            className={`flex selectable justify-between items-center rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ${selected ? 'border-2 border-blue-800 rounded-sm' : ''
                } ${alreadySelected ? 'opacity-[0.6] border-2 rounded-sm border-blue-800' : ''
                }`}
        >
            <div className="flex flex-col max-w-[14rem] md:max-w-lg pl-0 md:pl-8">
                <div className="flex justify-between">
                    <span className="text-base font-medium">{meal?.meal_name}</span>
                </div>
                <div className="flex justify-between ">
                    <div>
                        <p className="leading-normal text-neutral-800">
                            <span>Protein:</span> {meal?.protein}
                        </p>
                        <p className="leading-normal text-neutral-800">
                            <span>Carbs:</span> {meal?.carbs}
                        </p>
                        <p className="leading-normal text-neutral-800">
                            <span>Fat:</span> {meal?.fat}
                        </p>
                    </div>
                </div>
                <span className="leading-normal text-neutral-800">
                    Prepare time: {meal?.prep_time} minutes
                </span>
            </div>

            <div className="relative w-40 h-40">
                <Image
                    src={meal?.meal_cover[0]}
                    alt="meal-img"
                    layout="fill"
                    className="absolute object-cover"
                />
            </div>
        </div>
    );
};

export default MealComponent;
