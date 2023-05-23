import React from 'react';
import Image from "next/image";

const AdvisorCard = ({linkImg, title, description}) => {

    return (
        <>
        <div className="m-2">
            <div className="flex flex-col">
                <div className="flex mx-auto">
                    <div className="relative">
                        <div className="relative mb:image-auto-scale-2 lg:image-auto-scale-2 sm:image-auto-scale-2
                                    md:image-auto-scale-2 xl:image-auto-scale-2">
                            <Image src={linkImg} layout={'fill'}></Image>
                        </div>
                    </div>
                </div>
                <div className="mx-auto flex pt-2">
                    <p className="mb:text-xs sm:text-xl font-bold font-evil letter-spacing-1 text-white uppercase">{title}</p>
                </div>
                <div className="mx-auto flex">
                    <p className="text-xs sm:text-base lg:text-base font-exo-2 text-white">{description}</p>
                </div>
            </div>
        </div>
        </>
    );
}

export default AdvisorCard
