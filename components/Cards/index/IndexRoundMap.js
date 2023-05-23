import React from 'react';
import { Slide } from 'react-slideshow-image';
import Image from "next/image";

import IntroductionRoundMapCard from './IntroductionRoundMapCard';

const IndexRoundMap = () => {

    const slideImages = [
        "assets/images/slide_2.jpg",
        "assets/images/slide_3.jpg",
    ];

    const mapInfo = [
        [
            {
                "time": "Nov 2021",
                "content": [
                    "Building And Setup Team",
                    "Building Social Channel",
                    "Start Seed Round",
                    "Start Private Round",
                ]
            },
            {
                "time": "Dec 2021",
                "content": [
                    "Release Website",
                    "Build Community",
                    "Complete Testnet 2D",
                    "Whitelist Public Events",
                ]
            },
            {
                "time": "Jan 2022",
                "content": [
                    "Start IDO",
                    "Release Marketplace",
                    "Release Testnet game",
                    "Listing & launching Mainnet Game",
                ]
            }
        ],
        [
            {
                "time": "Q3-4/2022",
                "content": [
                    "Complete 3D Graphic Design",
                    "Release Testnet 3D",
                    "Public Workshop Function",
                    "Organize Tournaments"
                ]
            },
            {
                "time": "Q1-2/2023",
                "content": [
                    "Complete Testnet 3D",
                    "Release Mainnet 3D",
                    "Set up Ecosystem Gamefi",
                    "Complete Metaverse R&D"
                ]
            },
            {
                "time": "Q3-4/2023",
                "content": [
                    "Release Game BAoe Metaverse"
                ]
            }
        ]
    ];


    const properties = {
        duration: 500000,
        transitionDuration: 500,
        prevArrow:  <div className="flex m-2 mb:arrow-slideshow sm:arrow-slideshow lg:arrow-slideshow relative sm:mb-24"><Image src="/img/web/item/arrow_back.png" layout={"fill"} ></Image></div>,
        nextArrow: <div className="flex m-2 mb:arrow-slideshow sm:arrow-slideshow lg:arrow-slideshow  relative sm:mb-24"><Image src="/img/web/item/arrow_next.png" layout={"fill"} ></Image></div>
    };


    return (
        <div className="">
            <Slide {...properties}>
                {slideImages.map((each, index) => (
                    <div key={index} className="flex mb:flex-col lg:flex-row sm:flex-row md:flex-row xl:flex-row mx-auto m-2">
                        <div className="mx-auto">
                            <IntroductionRoundMapCard time={mapInfo[index][0].time} content={mapInfo[index][0].content} />
                        </div>
                        <div className="mx-auto">
                            <IntroductionRoundMapCard time={mapInfo[index][1].time} content={mapInfo[index][1].content} />
                        </div>
                        <div className="mx-auto">
                            <IntroductionRoundMapCard time={mapInfo[index][2].time} content={mapInfo[index][2].content} />
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );

}

export default IndexRoundMap
