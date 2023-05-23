import React from "react";
import Image from "next/image";
import IndexSocialLink from "../Cards/index/IndexSocialLink";

const Footer = () => {

    return (
    <div className="relative bg-cover bg-page-8">
      <div className="relative bg-cover bg-footer">
          <div className="relative flex flex-col">
              <div className="flex flex-col">
                  <div className="mx-auto relative mb:logo-footer">
                      <Image src="/img/web/logo/logo-03.png" layout='fill'></Image>
                  </div>
                  {/*<div className="absolute inset-0 mb:address-position sm:address-position lg:address-position xl:address-position">*/}
                  {/*    <div className="flex flex-col">*/}
                  {/*        <div>*/}
                  {/*            <p className="text-base text-white text-center"> Address: 68 Upper Seragoon View, Singapore</p>*/}
                  {/*        </div>*/}
                  {/*        <div>*/}
                  {/*            <p className="text-base text-white text-center">Contact email: contact@b-aoe.io</p>*/}
                  {/*        </div>*/}
                  {/*    </div>*/}
                  {/*</div>*/}
                  <div className="mx-auto justify-center flex lg:flex-row flex-wrap pt-2">
                      <IndexSocialLink link="https://t.me/BAoEGlobalOfficial" imageLink="/img/icon/telegram.png" iconWidth="20" iconHeight="20"/>

                      <IndexSocialLink link="https://www.facebook.com/BAoE-Global-103220032176333/?ref=pages_you_manage" imageLink="/img/icon/facebook.png"
                                       iconWidth="13" iconHeight="20" ml={1}/>
                      <IndexSocialLink link="https://medium.com/b-aoe" imageLink="/img/icon/icon_1.png"
                                       iconWidth="20" iconHeight="18"/>
                      <IndexSocialLink link="https://discord.com/invite/YuWKKXQYsf" imageLink="/img/icon/discord.png"
                                       iconWidth="21" iconHeight="18"/>
                      <IndexSocialLink link="https://www.twitch.tv/baoeglobal" imageLink="/img/icon/snapchat.png"
                                       iconWidth="20" iconHeight="20"/>
                      <IndexSocialLink link="https://www.reddit.com/user/BAoEchannel" imageLink="/img/icon/reddit.png"
                                       iconWidth="22" iconHeight="21" pb={2}/>
                      <IndexSocialLink link="https://twitter.com/baoebaoe1?s=21" imageLink="/img/icon/twitter-02.png"
                                       iconWidth="22" iconHeight="21" pb={2}/>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default Footer
