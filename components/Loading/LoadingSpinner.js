import React, {useState} from "react";
import { css } from "@emotion/react";
import Image from 'next/image';
import BeatLoader
    from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #FFFFFF;
`;

const LoadingSpinner  = () => {
    return (
      <>
          <div
               className="fixed top-0 bg-loading left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 flex flex-col items-center justify-center">
              <Image className="absolute index-0 top-0" src='/img/web/gif/scanbot.gif' width={160} height={160}/>
          </div>
      </>
    );
}

export default LoadingSpinner