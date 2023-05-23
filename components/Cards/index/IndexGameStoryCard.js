import React from 'react';
import Image from 'next/image';

const IndexGameStoryCard = ({title, content}) => {
    return (
        <div className="z-index-zero">
            <div className="flex flex-col mx-auto">
                <div>
                    <p className="mb:text-2xl sm:text-2xl lg:text-4xl  letter-spacing-base font-evil text-white font-bold text-center uppercase">{title}</p>
                </div>
                <div className="relative mx-auto">
                    <div className="relative mb:bg-game-story mb:display sm:display-none">
                        <Image src={"/img/mobile/item/game_story_frame.png"} layout={"fill"}/>
                    </div>
                    <div className="relative sm:bg-game-story md:bg-game-story lg:bg-game-story
                                mb:display-none sm:display">
                        <Image src={"/img/web/item/game_story_frame.png"} layout={"fill"}/>

                    </div>
                    <div className="absolute inset-0 mb:title-game-story sm:title-game-story
                            md:title-game-story lg:title-game-story mb:pt-2">
                        <p className="mb:text-xs sm:text-base lg:text-base text-justify font-exo-2 text-white font-semibold">{content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IndexGameStoryCard
