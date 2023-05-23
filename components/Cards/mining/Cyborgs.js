import React from 'react';
import Image from "next/image";

const Cyborgs = () => {

    const [selectedProp, setSelectedProp] = React.useState(0);

    const cyborgProps = [
        "/img/web/mining/icon/icon-pro/frame_4.svg",
        "/img/web/mining/icon/icon-pro/frame_5.svg",
        "/img/web/mining/icon/icon-pro/frame_1.svg",
        "/img/web/mining/icon/icon-pro/frame_2.svg",
        "/img/web/mining/icon/icon-pro/frame_3.svg",
    ];

    const cyborgs = [
        {
            elements: [
                <Image src={"/img/web/mining/robo/card-01.png"} layout="fill" priority={true}/>,
                <Image src={"/img/web/mining/robo/card-05.png"} layout="fill" priority={true}/>,
                <Image src={"/img/web/mining/robo/card-02.png"} layout="fill" priority={true}/>,
                <Image src={"/img/web/mining/robo/card-06.png"} layout="fill" priority={true}/>
            ]
        },
        {
            elements: [
                <Image src={"/img/web/mining/robo/card-04.png"} layout="fill" priority={true}/>,
                <Image src={"/img/web/mining/robo/card-09.png"} layout="fill" priority={true}/>,
                <Image src={"/img/web/mining/robo/card-10.png"} layout="fill" priority={true}/>,
                <Image src={"/img/web/mining/robo/card-11.png"} layout="fill" priority={true}/>
            ]
        },
        {
            elements: [
                <Image src={"/img/web/mining/robo/card-07.png"} layout="fill" priority={true}/>,
                <Image src={"/img/web/mining/robo/card-15.png"} layout="fill" priority={true}/>,
                <Image src={"/img/web/mining/robo/card-16.png"} layout="fill" priority={true}/>,
                <Image src={"/img/web/mining/robo/card-17.png"} layout="fill" priority={true}/>
            ]
        },
        {
            elements: [
                <Image src={"/img/web/mining/robo/card-03.png"} layout="fill" priority={true}/>,
                <Image src={"/img/web/mining/robo/card-12.png"} layout="fill" priority={true}/>,
                <Image src={"/img/web/mining/robo/card-13.png"} layout="fill" priority={true}/>,
                <Image src={"/img/web/mining/robo/card-14.png"} layout="fill" priority={true}/>
            ]
        },
        {
            elements: [
                <Image src={"/img/web/mining/robo/card-20.png"} layout="fill" priority={true}/>,
                <Image src={"/img/web/mining/robo/card-19.png"} layout="fill" priority={true}/>,
                <Image src={"/img/web/mining/robo/card-18.png"} layout="fill" priority={true}/>,
                <Image src={"/img/web/mining/robo/card-08.png"} layout="fill" priority={true}/>
            ]
        }
    ];

    const nextProps = () => {
        if(selectedProp < 4) {
            setSelectedProp( selectedProp + 1);
        } else {
            setSelectedProp( 0);
        }
    }

    const prevProps = () => {
        if(selectedProp !== 0) {
            setSelectedProp( selectedProp - 1);
        } else {
            setSelectedProp( 4);
        }
    }

    return (
        <>
            <div>
                <div className="flex flex-col lg:pt-32">
                    <div className="flex flex-row mx-auto">
                        <div className="flex mx-4">
                            <p className="mb:text-2xl lg:text-4xl text-white font-evil uppercase">cyborgs</p>
                        </div>
                        <div className="flex mx-4">
                            <p className="mb:text-2xl lg:text-4xl text-gray-500 font-evil uppercase">items</p>
                        </div>
                    </div>
                    <div className="mx-auto flex flex-row pt-2">
                        <div className="flex mx-4 pt-3">
                            <div>
                                <button onClick={()=> prevProps()} className="outline-none focus:outline-none">
                                    <Image src="/img/web/item/arrow_back.png" width="20" height="40"/>
                                </button>
                            </div>
                        </div>
                        <div className="flex mx-4">
                            {
                                cyborgProps.map((each, index) => (
                                    <div key={index}>
                                        {
                                            index === selectedProp ? <button>
                                                <div className="relative">
                                                    <Image src={cyborgProps[index]} width={60} height={60}/>
                                                </div>
                                            </button> : <div className="opacity-50">
                                                <button>
                                                    <div className="relative">
                                                        <Image src={cyborgProps[index]} width={60} height={60}/>
                                                    </div>
                                                </button>
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex pt-3 mx-4">
                            <div>
                                <button onClick={()=> nextProps()} className="outline-none focus:outline-none">
                                    <Image src="/img/web/item/arrow_next.png" width="20" height="40"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mx-auto pt-2">
                        <div className="flex flex-row lg:pt-12">
                            <div className="flex relative mx-4 mb:cyborgs-hx lg:cyborgs-hx">
                                { cyborgs.map(function (item, i){
                                  if (i == selectedProp) {
                                      return <div key={'a-' + i} className="display-block"> { cyborgs[selectedProp].elements[0] } </div>
                                  } else  {
                                      return <div key={'a-' + i} className="display-none"> { cyborgs[i].elements[0] } </div>
                                  }
                                })}
                            </div>
                            <div className="flex relative mx-4 mb:cyborgs-hx lg:cyborgs-hx">
                                {
                                    cyborgs.map(function (item, i) {
                                        if (i == selectedProp) {
                                            return <div key={'b-' + i} className="display-block"> { cyborgs[selectedProp].elements[1] } </div>
                                        } else {
                                            return <div key={'b-' + i} className="display-none"> { cyborgs[i].elements[1] } </div>
                                        }
                                    })
                                }
                            </div>
                            <div className="flex relative mx-4 mb:cyborgs-hx lg:cyborgs-hx mb:display-none sm:display-none md:display-none lg:display">
                                {
                                    cyborgs.map(function (item, i) {
                                        if (i == selectedProp) {
                                            return <div key={'c-' + i} className="display-block"> { cyborgs[selectedProp].elements[2] } </div>

                                        } else  {
                                            return <div key={'c-' + i} className="display-none"> { cyborgs[i].elements[2] } </div>
                                        }
                                    })
                                }
                            </div>
                            <div className="flex relative mx-4 mb:cyborgs-hx lg:cyborgs-hx mb:display-none sm:display-none md:display-none lg:display">
                                {
                                    cyborgs.map(function (item, i) {
                                        if (i == selectedProp) {
                                            return <div key={'d-' + i} className="display-block"> { cyborgs[selectedProp].elements[3] } </div>
                                        } else {
                                            return <div key={'d-' + i} className="display-none"> { cyborgs[i].elements[3] } </div>
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex relative mx-4 mb:display sm:display md:display lg:display-none mb:cyborgs-hx lg:cyborgs-hx">
                                {
                                    cyborgs.map(function (item, i) {
                                        if (i == selectedProp) {
                                            return <div key={'e-' + i} className="display-block"> { cyborgs[selectedProp].elements[2] } </div>
                                        } else {
                                            return <div key={'e-' + i} className="display-none"> { cyborgs[i].elements[2] } </div>
                                        }
                                    })
                                }
                            </div>
                            <div className="flex relative mx-4 mb:display sm:display md:display lg:display-none mb:cyborgs-hx lg:cyborgs-hx">
                                {
                                    cyborgs.map(function (item, i){
                                        if (i == selectedProp) {
                                            return <div key={'f-' + i} className="display-block"> { cyborgs[selectedProp].elements[3] } </div>
                                        } else {
                                            return <div key={'f-' + i} className="display-none"> { cyborgs[i].elements[3] } </div>
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export  default Cyborgs
