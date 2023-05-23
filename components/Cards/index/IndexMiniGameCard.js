import React from 'react'
import Image from 'next/image'

const IndexMiniGameCard = ({active, imageUrl, title}) => {

    return (
        <div className="z-index-zero">
            <div className="flex flex-col mx-auto">
                <div className="flex relative mx-auto">
                    <Image src={imageUrl} width={"200"} height={"133"} priority={true}/>
                </div>
                <div className="flex mx-auto pt-2">
                    <p className={`text-xs sm:text-base font-bold lg:text-base font-exo-2 ${ active ? 'text-white' : 'text-gray-500'}`
                    }>{title}</p>
                </div>
            </div>
        </div>
    );
}

export default IndexMiniGameCard
