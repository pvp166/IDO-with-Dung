import React from 'react';
import Image from 'next/image'

const IndexTokenomics = () => {

    const tableData = [
        {
            rate: "4.0",
            urlImage: "/img/web/mining/color/color_1.svg",
            title: "Technical Advisor",
            price: "40.000.000"
        },
        {
            rate: "5.0",
            urlImage: "/img/web/mining/color/color_2.svg",
            title: "Strategy Advisor",
            price: "50.000.000"
        },
        {
            rate: "2.5",
            urlImage: "/img/web/mining/color/color_3.svg",
            title: "Seed",
            price: "25.000.000"
        },
        {
            rate: "8.5",
            urlImage: "/img/web/mining/color/color_4.svg",
            title: "Private Sales",
            price: "85.000.000"
        },
        {
            rate: "2.0",
            urlImage: "/img/web/mining/color/color_5.svg",
            title: "IDO",
            price: "20.000.000"
        },
        {
            rate: "1.0",
            urlImage: "/img/web/mining/color/color_6.svg",
            title: "Public Sales",
            price: "10.000.000"
        },
        {
            rate: "14.0",
            urlImage: "/img/web/mining/color/color_7.svg",
            title: "Team",
            price: "140.000.000"
        },
        {
            rate: "5.0",
            urlImage: "/img/web/mining/color/color_8.svg",
            title: "Platform Development",
            price: "50.000.000"
        },
        {
            rate: "6.0",
            urlImage: "/img/web/mining/color/color_9.svg",
            title: "Marketing",
            price: "60.000.000"
        },
        {
            rate: "40.0",
            urlImage: "/img/web/mining/color/color_10.svg",
            title: "Marketing",
            price: "60.000.000"
        },
        {
            rate: "1.0",
            urlImage: "/img/web/mining/color/color_11.svg",
            title: "Airdrop",
            price: "10.000.000"
        },
        {
            rate: "4.0",
            urlImage: "/img/web/mining/color/color_12.svg",
            title: "Liquidity",
            price: "40.000.000"
        },
        {
            rate: "7.0",
            urlImage: "/img/web/mining/color/color_13.svg",
            title: "Reserve",
            price: "70.000.000"
        },
    ];

    return (
        <>
            <div className="flex flex-col pt-6 pb-6">
                <div className="flex mx-auto">
                    <div className="relative mb:pie-chart-hx sm:pie-chart-hx lg:pie-chart-hx xl:pie-chart-hx">
                        <Image src="/img/web/mining/tokenomic.png" layout={'fill'}/>
                    </div>
                </div>
                <div className="flex pt-6 mx-auto">
                    <div className="relative">
                        <div className="relative mb:frame-table-hx sm:frame-table-hx lg:frame-table-hx xl:frame-table-hx">
                            <Image src="/img/web/mining/tokenomic.svg" layout={'fill'}/>
                        </div>
                        {/*<div className="absolute inset-0 mb:table-token sm:table-token lg:table-token xl:table-token mx-4">*/}
                        {/*    <table className="table-fixed">*/}
                        {/*        <tbody>*/}
                        {/*            {*/}
                        {/*                tableData.map((ea, index) => (*/}
                        {/*                    <tr key={index}>*/}
                        {/*                        <td className="mb:cell-1 sm:cell-1 lg:cell-1 xl:cell-1" >*/}
                        {/*                            <div className="relative mb:selection-color">*/}
                        {/*                                <Image src={tableData[index].urlImage} layout={'fill'} />*/}
                        {/*                            </div>*/}
                        {/*                        </td>*/}
                        {/*                        <td className="mb:cell-2 sm:cell-2 lg:cell-2 xl:cell-2" ><p className="text-mc sm:text-xs xl:text-md  text-white font-exo-2 font-bold text-center">{tableData[index].rate + "%"}</p></td>*/}
                        {/*                        <td className="mb:cell-3 sm:cell-3 lg:cell-3 xl:cell-3" ><p className="text-mc sm:text-xs xl:text-md   text-white font-exo-2 font-bold text-left">{tableData[index].title}</p></td>*/}
                        {/*                        <td className="mb:cell-4 sm:cell-4 lg:cell-2 xl:cell-4"><p className="text-mc sm:text-xs xl:text-md   text-white font-exo-2 font-bold text-right">{tableData[index].price}</p></td>*/}
                        {/*                    </tr >*/}
                        {/*                ))*/}
                        {/*            }*/}
                        {/*            <tr className="border-t">*/}
                        {/*                <td className="mb:cell-1 sm:cell-1 lg:cell-1 xl:cell-1" >*/}
                        {/*                </td>*/}
                        {/*                <td className="mb:cell-2 sm:cell-2 lg:cell-2 xl:cell-2" ></td>*/}
                        {/*                <td className="mb:cell-3 sm:cell-3 lg:cell-3 xl:cell-3" ></td>*/}
                        {/*                <td className="mb:cell-4 sm:cell-4 lg:cell-2 xl:cell-4"><p className="text-mc sm:text-xs xl:text-md text-white font-exo-2 font-bold text-right">1.000.000.000</p></td>*/}
                        {/*            </tr >*/}
                        {/*        </tbody>*/}
                        {/*    </table>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    );
}

export default IndexTokenomics
