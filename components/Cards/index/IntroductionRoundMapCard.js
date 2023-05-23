import React from 'react';
import Image from 'next/image';
import IntroductionCard from "./IntroductionCard";

const IntroductionRoundMapCard = ({time, content}) => {
    return (
      <div className="m-2">
          <div className="relative flex flex-col">
              <div className="flex mx-auto mb:display sm:display-none">
                  <p className="text-base lg:text-xl font-exo-2 text-white font-bold text-center">{time}</p>
              </div>
              <div className="flex flex-col">
                  <div className="relative mb:round-map-hx md:round-map-hx sm:round-map-hx lg:round-map-hx xl:round-map-hx">
                      <Image src="/img/web/item/frame_roadmap.png" layout='fill'/>
                      <div className="absolute inset-0 mb:round-map-position
                      md:round-map-position sm:round-map-position lg:round-map-position xl:round-map-position xl:pt-6 pr-2 xl:pr-4">
                          {content.map((each, index) => (
                              <div key={index} className="flex flex-row  lg:pr-2 sm:pr-1 lg:pt-1">
                                  <div className="items-center mb:pr-1-5">
                                      <p className="text-white span-middle text-center"><span>&#8226;    </span></p>
                                  </div>
                                  <p className="mb:text-xs font-exo-2 lg:text-base overflow-ellipsis text-white font-semibold -left-20-px">{content[index]}</p>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
              <div className="mx-auto mb:display-none sm:display">
                  <div className="relative sm:tag-date-roadmap">
                      <Image src="/img/web/item/tag_date_roadmap.png" layout={"fill"}/>
                  </div>
              </div>
              <div className="flex mx-auto mb:display-none sm:display">
                  <p className="text-base lg:text-xl font-exo-2 text-white font-bold text-center">{time}</p>
              </div>
          </div>

      </div>
    );
}

export default  IntroductionRoundMapCard
