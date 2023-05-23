import React from 'react';

import IntroductionCard from "./IntroductionCard";
import Image from "next/image";
import { Slide } from "react-slideshow-image";
import AdvisorCard from "./AdvisorCard";

const IndexAdvisor = () => {

    const teamInfoMobile = [
        {
            "linkImg": "/img/web/advisor/advisor_409.png",
            "title": "MR. Akihiro Yanagi",
            "description": "Technology Advisor"
        },
        {
            "linkImg": "/img/web/advisor/advisor_407.png",
            "title": "mr. kozo inada",
            "description": "Community Advisor"
        },
        {
            "linkImg": "/img/web/advisor/advisor_406.png",
            "title": "mr. han jae kyu",
            "description": "Blockchain Advisor"
        },
    ];
    return (
        <div className="z-index-zero mb-8">
            <div className="">
                <div className="flex">
                    <div className="mx-auto flex mb:flex-col sm:flex-row">
                        <div className="mb:mx-auto mb:pt-2 sm:mr-4 lg:mr-8">
                            <AdvisorCard linkImg={teamInfoMobile[0].linkImg} title={teamInfoMobile[0].title}
                                         description={teamInfoMobile[0].description}/>
                        </div>
                        <div className="mb:mx-auto mb:pt-2 sm:mr-4 lg:mr-8">
                            <AdvisorCard linkImg={teamInfoMobile[1].linkImg} title={teamInfoMobile[1].title}
                                         description={teamInfoMobile[1].description}/>
                        </div>
                        <div className="mb:mx-auto mb:pt-2 sm:mr-4 lg:mr-8">
                            <AdvisorCard linkImg={teamInfoMobile[2].linkImg} title={teamInfoMobile[2].title}
                                         description={teamInfoMobile[2].description}/>
                        </div>
                        {/*<div className="mb:mx-auto mb:pt-2 sm:mr-4 lg:mr-8">*/}
                        {/*    <AdvisorCard linkImg={teamInfoMobile[2].linkImg} title={teamInfoMobile[2].title}*/}
                        {/*                 description={teamInfoMobile[2].description}/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>


    );
}

export default IndexAdvisor
