import React, {useEffect} from 'react';
import Image from "next/image";
import useWindowDimensions from "../../Hooks/useWindowDimension";

const IndexSocialLink = ({link, imageLink, iconWidth, iconHeight , ml , pb}) => {

    return (
        <>
            <div className="relative m-2 pt-2">
                <a href={link}>
                    <div className={` mb:social-icon sm:social-icon mb:ml-${ml} sm:ml-${ml} pb-${pb}`}>
                        <div className="relative mb:display sm:display-none">
                            <Image src={imageLink} width={iconWidth} height={iconHeight}></Image>
                        </div>
                        <div className="relative mb:display-none sm:display">
                            <Image src={imageLink} width={iconWidth * 3/2} height={iconHeight * 3/2}></Image>
                        </div>
                    </div>
                </a>
            </div>
        </>
    );

}

export default IndexSocialLink
