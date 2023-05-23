import React from 'react';
import Image from 'next/image';

const GamePlayCard = ({icon, title, content}) => {
    return (
        <>
            <div className="mx-auto flex flex-col">
                <div className="mx-auto relative mb:gameplay-mining-title sm:gameplay-mining-title lg:gameplay-mining-title xl:gameplay-mining-title">
                    <Image src={icon} layout={'fill'}/>
                </div>
                <div className="flex mx-auto pt-2 lg:pt-6">
                    <p className="mb:text-3xl lg:text-4xl xl:text-5xl thickOutlined text-color-brown font-evil uppercase">{title}</p>
                </div>
                <div className="flex flex-col mx-auto">
                    <div className="relative">
                        <div className="relative mb:frame-mining-gameplay sm:frame-mining-gameplay lg:frame-mining-gameplay xl:frame-mining-gameplay">
                            <Image src="/img/web/mining/frame/frame_text_1.png" layout='fill' priority={true}/>
                        </div>
                        <div className="absolute inset-0 mb:frame-mining-gameplay-content sm:frame-mining-gameplay-content
                        lg:frame-mining-gameplay-content xl:frame-mining-gameplay-content">
                            <p className="text-white mb:text-xss lg:text-xs xl:text-xs font-bold font-exo-2 text-justify">
                                {content}
                            </p>
                        </div>
                    </div>
                    {/*<div className="absolute inset-0 top-0">*/}
                    {/*    <div className="relative mb:frame-environment-info">*/}
                    {/*        <Image src="/img/web/mining/frame/frame_text_2.png" layout={'fill'}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
            </div>
        </>
    );
}

export  default  GamePlayCard
