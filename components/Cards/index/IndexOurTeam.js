import React from 'react';
import Image from "next/image";
import IntroductionCard from "./IntroductionCard";

const IndexOurTeam = () => {

    const foundingTeam = [
    //     {
    //         "linkImg": "/img/web/team/team_426.png",
    //         "title": "mr. kaizen tran",
    //         "description": "CO-FOUNDER"
    //     },
        {
            "linkImg": "/img/web/team/team_425.png",
            "title": "mr. hagi vo",
            "description": "CEO"
        },
        {
            "linkImg": "/img/web/team/team_429.png",
            "title": "mr. hien nguyen",
            "description": "Co-founder"
        },
        {
            "linkImg": "/img/web/team/team_427.png",
            "title": "mr. hai phi",
            "description": "CGO"
        },
        {
            "linkImg": "/img/web/advisor/advisor_405.png",
            "title": "mr. ngoc le",
            "description": "CTO"
        },
    ];

    const memberTeam = [
        {
            "linkImg": "/img/web/team/team_381.png",
            "title": "mr. an pham",
            "description": "Game Engine"
        },
        {
            "linkImg": "/img/web/team/team_387.png",
            "title": "mr. cong thinh",
            "description": "Blockchain Engineer"
        },
        {
            "linkImg": "/img/web/team/team_385.png",
            "title": "mr. trung hieu",
            "description": "Game Artist"
        },
        {
            "linkImg": "/img/web/team/team_386.png",
            "title": "mr. vuong nguyen",
            "description": "Blockchain Engineer"
        },
        {
            "linkImg": "/img/web/team/team_377.png",
            "title": "mr. dung truong",
            "description": "Blockchain Developer"
        },
        {
            "linkImg": "/img/web/team/team_424.png",
            "title": "ms. mei lin",
            "description": "CMO"
        },
        {
            "linkImg": "/img/web/team/team_383.png",
            "title": "mr. hades",
            "description": "Community Manager"
        },
        {
            "linkImg": "/img/web/team/team_379.png",
            "title": "mr. hoyuka",
            "description": "Booking PR"
        },
        {
            "linkImg": "/img/web/team/team_384_1.png",
            "title": "ms. hoai linh",
            "description": "Social Manager"
        },
        {
            "linkImg": "/img/web/team/team_384.png",
            "title": "ms. gigi",
            "description": "Marketing Designer"
        },
        {
            "linkImg": "/img/web/team/team_379_2.png",
            "title": "mr. phung manh",
            "description": "Marketing Designer"
        },
        {
            "linkImg": "/img/web/team/team_379_3.png",
            "title": "mr. duc lam",
            "description": "Marketing Designer"
        },
        {
            "linkImg": "/img/web/team/team_379_1.png",
            "title": "mr. trung truong",
            "description": "Product Manager"
        },
    ];

    return (
        <div className="">
            <div id="our_team _1" className="w-screen">
                <section className="relative items-center flex">
                    <div className="container mx-auto items-center mb-12 pt-12">
                        <div className="flex flex-col">
                            <div className="mx-auto">
                                <p className="text-2xl lg:text-4xl font-evil letter-spacing-base text-white uppercase font-bold  mb:display sm:display-none ">Our Team</p>
                            </div>
                            <div className="mx-auto pt-6 mb:display sm:display-none">
                                <p className="text-xs sm:text-base text-white font-exo-2 font-bold text-center mx-4">  We are Strong and United team working together for almost 10 years in technology and blockchain.</p>
                            </div>
                            <div className="mx-auto">
                                <p className="text-2xl text-white lg:text-4xl lg:pt-12 font-evil letter-spacing-base uppercase font-bold pt-4">Founding Team</p>
                            </div>
                            <div className="mx-auto pt-6 mb:display-none mb:display-none sm:display">
                                <p className="text-xs sm:text-base text-white font-exo-2 text-center font-bold mx-4">  We are Strong and United team working together for almost 10 years in technology and blockchain.</p>
                            </div>
                            <div className="sm:mx-auto flex mb:flex-col sm:flex-row pt-6 sm:mx-4">
                                <div className="sm:mx-auto mb:pt-4 flex flex-row">
                                    <div className="mx-auto sm:ml-4">
                                        <IntroductionCard linkImg={foundingTeam[0].linkImg} title={foundingTeam[0].title} description={foundingTeam[0].description}/>
                                    </div>
                                    <div className="mx-auto sm:ml-4">
                                        <IntroductionCard linkImg={foundingTeam[1].linkImg} title={foundingTeam[1].title} description={foundingTeam[1].description}/>
                                    </div>
                                </div>
                                <div className="sm:mx-auto flex flex-row mb:pt-4">
                                    <div className="mx-auto sm:ml-4">
                                        <IntroductionCard linkImg={foundingTeam[2].linkImg} title={foundingTeam[2].title} description={foundingTeam[2].description}/>
                                    </div>
                                    <div className="mx-auto sm:ml-4">
                                        <IntroductionCard linkImg={foundingTeam[3].linkImg} title={foundingTeam[3].title} description={foundingTeam[3].description}/>
                                    </div>
                                </div>
                            </div>
                            <div className="mx-auto">
                                <p className="text-2xl text-white lg:text-3xl lg:pt-32 font-evil letter-spacing-base uppercase font-bold pt-8">Team Members</p>
                            </div>
                            <div className="sm:mx-auto flex mb:flex-col sm:flex-row pt-6">
                                <div className="sm:mx-auto flex flex-row mb:pt-4">
                                    <div className="mx-auto sm:ml-2">
                                        <IntroductionCard linkImg={memberTeam[0].linkImg} title={memberTeam[0].title} description={memberTeam[0].description}/>
                                    </div>
                                    <div className="mx-auto sm:ml-4">
                                        <IntroductionCard linkImg={memberTeam[1].linkImg} title={memberTeam[1].title} description={memberTeam[1].description}/>
                                    </div>
                                </div>
                                <div className="sm:mx-auto flex flex-row mb:pt-4">
                                    <div className="mx-auto sm:ml-4">
                                        <IntroductionCard linkImg={memberTeam[2].linkImg} title={memberTeam[2].title} description={memberTeam[2].description}/>
                                    </div>
                                    <div className="mx-auto sm:ml-4">
                                        <IntroductionCard linkImg={memberTeam[3].linkImg} title={memberTeam[3].title} description={memberTeam[3].description}/>
                                    </div>
                                </div>
                                <div className="sm:mx-auto flex flex-row mb:pt-4">
                                    <div className="mx-auto sm:ml-4">
                                        <IntroductionCard linkImg={memberTeam[4].linkImg} title={memberTeam[4].title} description={memberTeam[4].description}/>
                                    </div>
                                    <div className="mx-auto sm:ml-4 sm:display-none">
                                        <IntroductionCard linkImg={memberTeam[5].linkImg} title={memberTeam[5].title} description={memberTeam[5].description}/>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:mx-auto flex mb:flex-col sm:flex-row pt-6 pb-16">
                                <div className="sm:mx-auto flex flex-row mb:pt-4">
                                    <div className="mx-auto sm:ml-2 mb:display-none sm:display">
                                        <IntroductionCard linkImg={memberTeam[5].linkImg} title={memberTeam[5].title} description={memberTeam[5].description}/>
                                    </div>
                                    <div className="mx-auto sm:ml-4">
                                        <IntroductionCard linkImg={memberTeam[6].linkImg} title={memberTeam[6].title} description={memberTeam[6].description}/>
                                    </div>
                                    <div className="mx-auto sm:ml-4">
                                        <IntroductionCard linkImg={memberTeam[7].linkImg} title={memberTeam[7].title} description={memberTeam[7].description}/>
                                    </div>
                                </div>
                                <div className="sm:mx-auto flex flex-row mb:pt-4">
                                    <div className="mx-auto sm:ml-4">
                                        <IntroductionCard linkImg={memberTeam[8].linkImg} title={memberTeam[8].title} description={memberTeam[8].description}/>
                                    </div>
                                    <div className="mx-auto sm:ml-4">
                                        <IntroductionCard linkImg={memberTeam[9].linkImg} title={memberTeam[9].title} description={memberTeam[9].description}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );

}

export default IndexOurTeam
