import React from 'react';
import Image from "next/image";

const EnvironmentSelector = () => {

    const [element, setElement] = React.useState(0);

    const environments = [
        {
            ele : "Volcán de Magma",
            background: "bg-magma",
            content: "The asteroid named Vólcan de Magma is a two-billion-year-old exoplanet located in the " +
                "BAoE metaverse universe. On this planet, the measured surface temperature is up to 3200 degrees " +
                "Celsius. The difference is that this star has an atmosphere, while the strong radiation from it " +
                "should not have allowed the atmosphere to exist. The land of volcanoes with magma flows under the surface," +
                " reaching the planet’s inner core. Hidden deep under it is the most rare resource, arousing the curiosity and conquest of adventurers."
        },
        {
            ele : "Snowland",
            background: "bg-ice",
            content: "The Snowland Nebula was found in 3013, located 3.2 million light-years from Earth in the constellation Pintaurus. " +
                "It is the coldest region in the universe with a temperature of about -280.2 degrees Celsius, more than all cosmic background " +
                "radiation (-270.35 degrees Celsius) was formed after an explosion. Under the thick layers of ice lie abundant mineral reserves and" +
                "  only those with the spirit of a warrior can obtain this treasure."
        },
        {
            ele : "Arazonia",
            background: "bg-forest",
            content: "The “Arazonia” planet was discovered in 3094. This is also known as the green planet with 79% of the surface area covered by forest," +
                " surrounded by the rivers and waterfalls to provide enough water for this wonderful planet. This planet was discovered in the year..., and it " +
                "is a fertile land containing valuable minerals buried deep underground. " +
                "Typography"
        },
        {
            ele : "Satahama",
            background: "bg-desert",
            content: "The Satahama Desert is believed to be the place of an explosion when the comet collided with the ancient planet Satahama. This planet was found in 3021. This collision was so powerful that it formed a giant silicate glass region. Desert glass contains small but valuable mineral fragments, which are often found in meteorites falling on the land of Satahama. The desert is a barren area with ferocious heat to demoralize any living species. Only creatures with strong vitality can survive here. And everything has its own price, only those who are strong enough to endure and strong can exploit the extremely precious resources here.\n" +
                ""
        },
        {
            ele : "Metállo",
            background: "bg-mental",
            content: "Metállo is a body with a surface area of up to 187 km2 in the asteroid belt between the orbits of Pluto and Venus. Recent measurements of Metállo's surface temperature reveal that the asteroid is full of rare gems which everyone wishes to possess. This tiny planet was discovered in 3058. Metállo is believed to be 'the remnant of a large planetary embryo destroyed by strong collision during the formation of the BAoE."
        }
    ];

    const nextEnv = () => {
        if(element < environments.length - 1 ) {
            setElement(element + 1)
        } else {
            setElement(0)
        }

    }

    const prevEnv = () => {
        if(element !== 0) {
            setElement(element - 1)
        } else {
            setElement(4)
        }
    }

    return (
        <>
            <div className={`max-w-full bg-cover bg-center ${environments[element].background}` }>
                <section id="environments" className="block relative pt-48  pb-24 flex">
                    <div className="container mx-auto">
                        <div className="flex flex-col">
                            <div className="flex flex-row mx-auto sm:pt-8">
                                <div className="flex mx-4">
                                    <div>
                                        <button onClick={()=> prevEnv()} className="outline-none focus:outline-none">
                                            <Image src="/img/web/item/arrow_back.png" width="20" height="40"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex mx-4">
                                    <p className="text-5xl thickOutlined text-color-brown font-evil uppercase">{environments[element].ele}</p>
                                </div>
                                <div className="flex mx-4">
                                    <div>
                                        <button onClick={()=> nextEnv()} className="outline-none focus:outline-none">
                                            <Image src="/img/web/item/arrow_next.png" width="20" height="40"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mx-auto">
                                <div className="relative">
                                    <div className="relative mb:frame-environment sm:frame-environment lg:frame-environment">
                                        <Image src="/img/web/mining/frame/frame_text_1.png" layout={'fill'}/>
                                    </div>
                                    <div className="absolute inset-0 mb:frame-environment-content sm:frame-environment-content lg:frame-environment-content">
                                        <p className="text-white text-xs lg:text-base font-bold font-exo-2 text-justify">
                                            {environments[element].content}
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
                    </div>
                </section>
            </div>
        </>
    );
}

export default EnvironmentSelector
