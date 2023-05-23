import React from 'react';
import Image from 'next/image';

const IntroductionCard = ({linkImg, title, description}) => {
    return (
        <div className="sm:m-2">
            <div className="mx-auto flex flex-col">
                <div className="mx-auto flex relative">
                    <div className="">
                        <div className="relative mb:image-auto-scale lg:image-auto-scale  sm:image-auto-scale md:image-auto-scale xl:image-auto-scale">
                            <Image src={linkImg} layout='fill'></Image>
                        </div>
                    </div>
                </div>
                <div className="mx-auto flex mt-4">
                    <p className="text-xs sm:text-xs md:text-xs lg:text-base font-evil letter-spacing-1 font-bold text-center text-white uppercase">{title}</p>
                </div>
                <div className="mx-auto flex">
                    <p className="text-xs text-white font-exo-2 font-bold text-center">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default  IntroductionCard
