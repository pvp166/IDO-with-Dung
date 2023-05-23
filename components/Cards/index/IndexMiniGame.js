import React from 'react'
import IndexMiniGameCard from "./IndexMiniGameCard";
import Image from "next/image";
import { Slide } from "react-slideshow-image";

import 'react-slideshow-image/dist/styles.css'
import IndexGameStoryCard from "./IndexGameStoryCard";
import 'react-slideshow-image/dist/styles.css'

const IndexMiniGame = () => {
    const miniGameProperties = {
        duration: 5000,
        transitionDuration: 1000,
        indicators: true,
        prevArrow:  <div className=""> </div>,
        nextArrow: <div className=""> </div>,
    };

    const miniGames = [
        {
            title: "Mining Simulator",
            imageUrl: "/img/web/mining/mining.svg",
            active: true
        },
        {
            title: "Travelling Simulator",
            imageUrl: "/img/web/mining/coming_soon.svg",
            active: false
        },
        {
            title: "Financing Simulator",
            imageUrl: "/img/web/mining/coming_soon.svg",
            active: false
        }
    ];

    return (
        <div>
            <div className="pt-6 mb:display sm:display-none">
                <Slide  {...miniGameProperties}>
                    {miniGames.map((each, index) => (
                        <div key={index} className="mx-auto">
                            <div className="mx-auto">
                                <IndexMiniGameCard title={miniGames[index].title} imageUrl={miniGames[index].imageUrl} active={miniGames[index].active}/>
                            </div>
                        </div>
                    ))}
                </Slide>
            </div>

            <div className="flex flex-col">
                <div className="mx-auto pt-6 mb:display-none sm:display">
                    <div className="flex flex-row">
                        <div className="mx-4">
                            <IndexMiniGameCard title={"Mining Simulator"} imageUrl={"/img/web/mining/mining.svg"} active={true}/>
                        </div>
                        <div className="mx-4">
                            <IndexMiniGameCard title={"Travelling Simulator"} imageUrl={"/img/web/mining/coming_soon.svg"} active={false}/>
                        </div>
                        <div className="mx-4">
                            <IndexMiniGameCard title={"Financing Simulator"} imageUrl={"/img/web/mining/coming_soon.svg"} active={false}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IndexMiniGame
