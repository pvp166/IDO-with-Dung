import React from 'react';

import { Slide } from "react-slideshow-image";
import Image from "next/image";
import IndexGameStoryCard from "./IndexGameStoryCard";

// Import css files
import 'react-slideshow-image/dist/styles.css'
import IntroductionCard from "./IntroductionCard";

const IndexGameStory = () => {

     const gameStories = [
         {
             map: 1,
             title: "game story",
             content: "In the year 3000, humankind discovered resources that can generate " +
                 "marvelous energy for machines operation with incredible capacity. Concurrently," +
                 " many mysterious lands with strange abundant resources on the Earth were explored." +
                 " Therefore, these amazing sources attracted states and entrepreneurs came to mark " +
                 "their proprietorship on those lands. The branches here are variable and mining " +
                 "is the most developed of all. At these branches, there are also different kinds of robots" +
                 " that take charge of different functions. Recognizing the potential of this land, entrepreneurs " +
                 "started to build up their corporations and establish a business empire for their own." +
                 " That’s when BAoE was born.",
         },
         {
             map: 2,
             title: "ez mode",
             content: "Set in the year 3002, gold and gem resources become a fad after a man " +
                 "discovers a lump of gold in a riverbed by accident. As a result of this news, " +
                 "individuals all over the world hurried to investigate the underground" +
                 " in every part of the globe in the hope of finding a life-changing chance." +
                 " The game's protagonists aren't immune to this tendency and begin their exploration. " +
                 "Travel to five nations known for their riches and products, but also for their dangers." +
                 " When mining on specific terrains, innovators' tools, and machinery provide benefits." +
                 " Join in the competition to gather the most resources in the hopes of transforming people's lives in the future.",
         },
         {
             map: 3,
             title: "team mode",
             content: "People have progressively become conscious of the necessity of building firms to enhance their lives," +
                 " rather than focusing on gold mining in the future. Today's entrepreneurs choose to accept the risk of starting" +
                 " their own business. Recruiting for internal positions and offering training to support the smooth operation of the firm. " +
                 "Key positions such as CTO or CMO will be required if you want to compete. Once they have a strong enough lineup of specialists, " +
                 "they will participate in an investment \"war\" with four options: real estate, tourist, mining, and banking in a new form." +
                 " Which empire will rise to the top and rule the world?",
         },
    ];

    const properties = {
        duration: 500000,
        transitionDuration: 500,
        prevArrow:  <div className="flex m-2 mb:arrow-slideshow sm:arrow-slideshow lg:arrow-slideshow relative"><Image src="/img/web/item/arrow_back.png" layout={"fill"} ></Image></div>,
        nextArrow: <div className="flex m-2 mb:arrow-slideshow sm:arrow-slideshow lg:arrow-slideshow  relative"><Image src="/img/web/item/arrow_next.png" layout={"fill"} ></Image></div>
    };

    return (
        <>
            <div>
                {/*<Slide {...properties}>*/}
                {/*    {gameStories.map((each, index) => (*/}
                {/*        <div key={index} className="mx-auto">*/}
                {/*            <div className="">*/}
                {/*                <IndexGameStoryCard title={gameStories[index].title} content={gameStories[index].content} />*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</Slide>*/}
                <div className="mx-auto">
                    <div className="">
                        <IndexGameStoryCard title={gameStories[0].title} content={gameStories[0].content} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default IndexGameStory
