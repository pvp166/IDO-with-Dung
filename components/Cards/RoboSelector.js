import React, { useEffect }from 'react';
import Image from 'next/image';
import useWindowDimensions from "../Hooks/useWindowDimension";

const RoboSelector = () => {

    const { height, width } = useWindowDimensions();


    const element = [
        {
            id: 0,
            title: "Fire Robo. Lv1",
            image: "/img/gif/level1_robo.gif",
            type: "UNCOMMON",
            link: "https://sketchfab.com/models/23613f0481a44049b1f040aa2f65a2cd/embed",
            content: "The first robot was created named after the god of the underworld" +
                " with the purpose of mining the lava land which is famous for a lot of resources. " +
                "Has good heat resistance and two pairs of stretchable arms for more multitasking."
        },
        {
            id: 1,
            title: "Fire Robo. Lv2",
            image: "/img/gif/level2_robo.gif",
            type: "COMMON",
            link: "https://sketchfab.com/models/2ee6d22d24c64535ba9bdf69a84ff0c4/embed",
            content: "The son of the brilliant inventor " +
                "- Thomas, was born in the context of the Hades " +
                "version having too many problems. With new capabilities " +
                "such as superior power as well as stronger shaping," +
                " it has brought a new breeze in the robotics industry."
        },
        {
            id: 2,
            title: "Fire Robo. Lv3",
            type: "RARE",
            link: "https://sketchfab.com/models/08f17f6afd0e4454a8e63c660d1aab90/embed",
            image: "/img/gif/level3_robo.gif",
            content: "An upgraded version of inventor Thomas with many outstanding" +
                " features and compensates for the shortcomings of Hagi. Increased " +
                "heat resistance and superior speed have become a favorite of many miners.."
        }
    ];

    const [selector, setSelector] = React.useState(element[0]);

    const next = () => {
        if(selector.id < 2) {
            setSelector(element[selector.id + 1]);
        } else {
            setSelector(element[0]);
        }
    }

    const previous = () => {
        if (selector.id != 0) {
            setSelector(element[selector.id - 1]);
        } else {
            setSelector(element[2]);
        }
    }

    return (
        <div className="container mx-auto items-center h-screen">
            <div className="flex mb:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center">
                <div className="mx-auto flex flex-col mt-20">
                    <div className="items-center">
                        {/* title */}
                        <div className="mb:display sm:display-none lg:display-none xl:display-none">
                            <div className=" flex flex-row mt-6 flex">
                                <div className="mx-auto">
                                    <button>
                                        <p className="text-xl text-white uppercase font-bold underline" >Robo</p>
                                    </button>
                                </div>
                                <div className="mx-auto">
                                    <button>
                                        <p className="text-xl text-white uppercase font-bold" >Resources</p>
                                    </button>
                                </div>
                                <div className="mx-auto">
                                    <button>
                                        <p className="text-xl text-white uppercase font-bold" >Map</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* robo selection */}
                        <div className="flex mb:display sm:display-none lg:display-none xl:display-none">
                            <div className="container flex flex-col justify-center pt-6">
                                <div className="mx-auto flex lg:flex-row">
                                    <div className="flex m-2">
                                        <button onClick={()=> previous()}>
                                            <Image src="/img/robo/previous.png" height="30" width="30" ></Image>
                                        </button>
                                    </div>
                                    <div className="flex m-2">
                                        <div className="relative">
                                            {selector.id == 0 ?
                                                <div>
                                                    <Image src="/img/robo/frame_2.png" height="52" width="52" ></Image>
                                                    <div className="absolute inset-0 left-6-px top-7-px">
                                                        <Image src="/img/robo/robo_lv1.png" height="40" width="40" ></Image>
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <Image src="/img/robo/frame_unselected.png" height="50" width="50" ></Image>
                                                    <div className="absolute inset-0 left-5-px top-5-px">
                                                        <Image src="/img/robo/robo_lv1.png" height="40" width="40" ></Image>
                                                    </div>
                                                </div>}
                                        </div>
                                    </div>
                                    <div className="flex m-2">
                                        <div className="relative">
                                            {selector.id == 1 ?
                                                <div>
                                                    <Image src="/img/robo/frame_2.png" height="52" width="52" ></Image>
                                                    <div className="absolute inset-0 left-6-px top-7-px">
                                                        <Image src="/img/robo/robo_lv2.png" height="40" width="40" ></Image>
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <Image src="/img/robo/frame_unselected.png" height="50" width="50" ></Image>
                                                    <div className="absolute inset-0 left-5-px top-5-px">
                                                        <Image src="/img/robo/robo_lv2.png" height="40" width="40" ></Image>
                                                    </div>
                                                </div>}
                                        </div>
                                    </div>
                                    <div className="flex m-2">
                                        <div className="relative">
                                            <div className="relative">
                                                {selector.id == 2 ?
                                                    <div>
                                                        <Image src="/img/robo/frame_2.png" height="52" width="52" ></Image>
                                                        <div className="absolute inset-0 left-6-px top-7-px">
                                                            <Image src="/img/robo/robo_lv3.png" height="40" width="40" ></Image>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        <Image src="/img/robo/frame_unselected.png" height="50" width="50" ></Image>
                                                        <div className="absolute inset-0 left-5-px top-5-px">
                                                            <Image src="/img/robo/robo_lv3.png" height="40" width="40" ></Image>
                                                        </div>
                                                    </div>}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="flex m-2">
                                        <button onClick={()=> next()}>
                                            <Image src="/img/robo/next.png" height="30" width="30" ></Image>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* robo title */}
                        <div className="flex pr-4">
                            <div className="flex mb:robo-banner-title-position lg:robo-banner-title-position md:robo-banner-title-position">
                                <div className="relative mb:robo-banner-title sm:robo-banner-title md:robo-banner-title xl:robo-banner-title lg:robo-banner-title">
                                    <Image src="/img/frame/frame_text_field_robo.png" layout="fill"></Image>
                                    <div className="absolute inset-0 mb:robo-title-position sm:robo-title-position md:robo-title-position lg:robo-title-position xl:robo-title-position">
                                        <p className="text-base sm:text-base lg:text-xl xl:text-2xl text-white uppercase font-bold">{selector.title}</p>
                                        <p className="text-xs sm:text-base lg:text-base xl:text-2xl text-center text-lightBlue-400 uppercase font-bold">{selector.type}</p>
                                    </div>
                                </div>

                            </div>
                        </div>


                        {/* robo 3D */}
                        <div className="flex mb:display sm:display-none lg:display-none xl:display-none">
                            <div className="relative pt-6">
                                <Image src="/img/frame/main_frame.png" width="300" height="180"></Image>
                                <div className="absolute inset-0 iframe-position">
                                        <iframe title="lv3" frameBorder="0" allowFullScreen mozallowfullscreen="true"
                                                webkitallowfullscreen="true"
                                                allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking
                                                execution-while-out-of-viewport execution-while-not-rendered web-share
                                                width="270" height="150"
                                                src={selector.link}></iframe>
                                </div>
                            </div>
                        </div>

                        {/* robo introduction */}
                        <div className="mb:display sm:display-none lg:display-none xl:display-none">
                            <div className="mx-auto flex">
                                <div className="relative">
                                    <div className="relative mb:robo-banner sm:robo-banner lg:robo-banner">
                                        <Image src="/img/frame/frame_content_field_robo.png" layout="fill"></Image>
                                        <div className="absolute inset-0 mb:robo-content-position sm:robo-content-position lg:robo-content-position mb:mr-2 sm:mr-4 lg:mr-8">
                                            <p className="text-xs lg:text-base text-white font-bold">{selector.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb:display-none sm:display lg:display xl:display sm:ml-4 pt-6">
                            <div className="mx-auto flex">
                                <div className="relative">
                                    <div className="relative sm:robo-banner lg:robo-banner xl:robo-banner">
                                        <Image src="/img/frame/frame_text_field.png" layout="fill"></Image>
                                        <div className="absolute inset-0 sm:robo-content-position lg:robo-content-position xl:robo-content-position sm:mr-8 lg:mr-8">
                                            <p className="text-xs lg:text-base text-white font-bold">{selector.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto flex mb:display-none sm:display lg:display xl:display w-full">
                    {/* robo tile */}
                    <div className=" flex flex-row mt-8">
                        <div className="mx-auto">
                            <button>
                                <p className="text-xl text-white uppercase font-bold underline" >Robo</p>
                            </button>
                        </div>
                        <div className="mx-auto">
                            <button>
                                <p className="text-xl text-white uppercase font-bold" >Resources</p>
                            </button>
                        </div>
                        <div className="mx-auto">
                            <button>
                                <p className="text-xl text-white uppercase font-bold" >Map</p>
                            </button>
                        </div>
                    </div>
                    {/* robo selection */}
                    <div className="mb-12 mt-2">
                        <div className="container flex flex-col justify-center pt-6">
                            <div className="mx-auto flex lg:flex-row">
                                <div className="flex m-2">
                                    <button onClick={()=> previous()}>
                                        <Image src="/img/robo/previous.png" height="30" width="30" ></Image>
                                    </button>
                                </div>
                                <div className="flex m-2">
                                    <div className="relative">
                                        {selector.id == 0 ?
                                            <div>
                                                <Image src="/img/robo/frame_2.png" height="52" width="52" ></Image>
                                                <div className="absolute inset-0 left-6-px top-7-px">
                                                    <Image src="/img/robo/robo_lv1.png" height="40" width="40" ></Image>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <Image src="/img/robo/frame_unselected.png" height="50" width="50" ></Image>
                                                <div className="absolute inset-0 left-5-px top-5-px">
                                                    <Image src="/img/robo/robo_lv1.png" height="40" width="40" ></Image>
                                                </div>
                                            </div>}
                                    </div>
                                </div>
                                <div className="flex m-2">
                                    <div className="relative">
                                        {selector.id == 1 ?
                                            <div>
                                                <Image src="/img/robo/frame_2.png" height="52" width="52" ></Image>
                                                <div className="absolute inset-0 left-6-px top-7-px">
                                                    <Image src="/img/robo/robo_lv2.png" height="40" width="40" ></Image>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <Image src="/img/robo/frame_unselected.png" height="50" width="50" ></Image>
                                                <div className="absolute inset-0 left-5-px top-5-px">
                                                    <Image src="/img/robo/robo_lv2.png" height="40" width="40" ></Image>
                                                </div>
                                            </div>}
                                    </div>
                                </div>
                                <div className="flex m-2">
                                    <div className="relative">
                                        <div className="relative">
                                            {selector.id == 2 ?
                                                <div>
                                                    <Image src="/img/robo/frame_2.png" height="52" width="52" ></Image>
                                                    <div className="absolute inset-0 left-6-px top-7-px">
                                                        <Image src="/img/robo/robo_lv3.png" height="40" width="40" ></Image>
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <Image src="/img/robo/frame_unselected.png" height="50" width="50" ></Image>
                                                    <div className="absolute inset-0 left-5-px top-5-px">
                                                        <Image src="/img/robo/robo_lv3.png" height="40" width="40" ></Image>
                                                    </div>
                                                </div>}
                                        </div>
                                    </div>

                                </div>
                                <div className="flex m-2">
                                    <button onClick={()=> next()}>
                                        <Image src="/img/robo/next.png" height="30" width="30" ></Image>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* robo 3D */}
                    <div className="flex xl:pt-6">
                        <div className="mx-auto">
                            <div className="ml-2 md:ml-2">
                                <div className="relative sm:frame-iframe lg:frame-iframe xl:frame-iframe">
                                    <Image src="/img/frame/main_frame.png" layout='fill'></Image>
                                    <div className="absolute inset-0 sm:iframe-position sm:display lg:display-none xl:display-none">
                                        <iframe title="" frameBorder="0" allowFullScreen mozallowfullscreen="true"
                                                webkitallowfullscreen="true"
                                                allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking
                                                execution-while-out-of-viewport execution-while-not-rendered web-share
                                                width="340" height="280"
                                                src={selector.link}></iframe>
                                    </div>
                                    <div className="lg:display xl:display-none sm:display-none absolute inset-0 lg:iframe-position">
                                        <iframe title="" frameBorder="0" allowFullScreen mozallowfullscreen="true"
                                                webkitallowfullscreen="true"
                                                allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking
                                                execution-while-out-of-viewport execution-while-not-rendered web-share
                                                width="540" height="320"
                                                src={selector.link}></iframe>
                                    </div>
                                    <div className="lg:display-none xl:display sm:display-none absolute inset-0 xl:iframe-position">
                                        <iframe title="" frameBorder="0" allowFullScreen mozallowfullscreen="true"
                                                webkitallowfullscreen="true"
                                                allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking
                                                execution-while-out-of-viewport execution-while-not-rendered web-share
                                                width="625" height="350"
                                                src={selector.link}></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoboSelector
