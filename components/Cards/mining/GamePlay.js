import React from 'react'
import GamePlayCard from "./GamePlayCard";

const GamePlay = () => {

    const gameplay = [
        {
            icon: "/img/web/mining/icon/icon-02.svg",
            title: "game play",
            content: "The game is inspired by the cinematic machines with the use of robots to carry out tasks that cannot be done by human power, especially underground exploration. The game has brought a future perspective where the underground contains endless minerals. Using cyborgs to start underground mining in search of rare in-game resources and artifacts. The items obtained are usually used for trading and exchanging under the BAoE token."
        },
        {
            icon: "/img/web/mining/icon/icon-01.svg",
            title: "single play",
            content: "Players will start the game screen by choosing the map with the robot that they will use and start the game. Players can let the machine dig with the quickplay mechanism, on the contrary, the game also has a control mechanism so that the player can control the direction of movement and the profit margin of the two gameplay will be different. The better you are, the more tokens you get."
        },
        {
            icon: "/img/web/mining/icon/icon-03.svg",
            title: "pup play",
            content: "To make it more competitive, the game includes a PvP mode in which players fight to maximize earnings. The system will split the pair and select the map, then the two participants will agree to bet any number of tokens and start mining together. After an estimated time, who collects the most will get all the tokens."
        },
    ];

    return(
      <>
          <div className="mx-auto flex mb:flex-col sm:flex-row items-center lg:pt-32">
              <div className="mx-auto flex pt-6 pr-4">
                  <GamePlayCard title={gameplay[0].title} icon={gameplay[0].icon} content={gameplay[0].content} />
              </div>
              <div className="mx-auto flex pt-6 pr-4">
                  <GamePlayCard title={gameplay[1].title} icon={gameplay[1].icon} content={gameplay[1].content} />
              </div>
              <div className="mx-auto flex pt-6 pr-4">
                  <GamePlayCard title={gameplay[2].title} icon={gameplay[0].icon} content={gameplay[2].content} />
              </div>
          </div>
      </>
    );
}

export default GamePlay
