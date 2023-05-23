import React, {useCallback, useEffect, useRef} from 'react';
import Footer from "../components/Footer/Footer";
import Image from 'next/image';
import IndexNavbar from "../components/Navbar/IndexNavbar";
import EnvironmentSelector from "../components/Cards/mining/EnvironmentSelector";
import IndexSocialLink from "../components/Cards/index/IndexSocialLink";
import GamePlay from "../components/Cards/mining/GamePlay";
import MiningSocialLink from "../components/Cards/mining/MiningSocialLink";
import Cyborgs from "../components/Cards/mining/Cyborgs";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import {bindActionCreators} from "redux";
import {logoutWallet, signature, startWalletInit} from "../store/wallet/action";
import {connect} from "react-redux";
import getConfig from "next/config";
import Modal from "react-modal";
import {toast, ToastContainer} from "react-toastify";
const { publicRuntimeConfig } = getConfig()

const customStyles = {
    content: {
        backgroundImage: 'url("/img/web/background/a.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 100,
        margin: 'auto',
        top: '0%',
        left: '10px',
        right: '10px',
        minWidth: '200px',
        maxWidth: "500px",
        height: '300px',
        transform: 'translate(0%, 0%)',
    },
};

const MiningSimulator = (props) => {

    const [showModal, setShowModal] = React.useState(false);

    const [currentPage, setCurrentPage] = React.useState(0)

    const notify = () => toast.warn("You must install MetaMask Extension !");

    const closeModal = () => {
        setShowModal(false);
    }

    const miningRef = useRef();

    const gameplayRef = useRef();

    const cyborgsRef = useRef();

    const environmentRef = useRef();

    useEffect(() => {
        props.startWalletInit();
        if (showModal) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    },[showModal])

    const changeModal = useCallback((showModal) => {
        setShowModal(showModal)
    }, [showModal]);

    const onLogout = useCallback(() => {
        console.log('logout')
        props.logOutWallet()
    }, []);

    return (
        <div>
            <div>
                <div ref={miningRef} className="max-w-full bg-cover bg-center bg-mining-page-1">
                    <IndexNavbar showModal={showModal} onClickModal={changeModal} enableConnect={props.enableConnect}
                                 enableSaleDeposit={props.enableSaleDeposit} onLogout={onLogout} fixed/>
                    <section id="mining" className="block relative sm:pt-32 lg:pt-32 xl:pt-32 pt-24 pb-24 flex">
                        <div className="container mx-auto">
                            <div className="mx-auto flex flex-col mb-8">
                                <div className="flex flex-col justify-center mx-auto">
                                    <div className="mx-auto relative mb:logo-mining sm:logo-mining lg:logo-mining">
                                        <Image src="/img/web/mining/logo/logo_mining.png" layout={'fill'}/>
                                    </div>
                                    <div className="flex mx-auto pt-12">
                                        <div className="relative">
                                            <a href="https://testnet.b-aoe.io/" target="_blank">
                                                <div className="relative mb:play-mining-frame sm:play-mining-frame lg:play-mining-frame">
                                                    <Image src="/img/web/mining/button/button_play.svg" layout={'fill'}/>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex mx-auto pt-12">
                                        <div className="mx-auto justify-center flex lg:flex-row flex-wrap pt-2">
                                            <MiningSocialLink link="https://t.me/BAoEGlobalOfficial" imageLink="/img/web/mining/button/button_social/frame_648.svg" iconWidth="40" iconHeight="40"/>

                                            <MiningSocialLink link="https://www.facebook.com/BAoE-Global-103220032176333/?ref=pages_you_manage" imageLink="/img/web/mining/button/button_social/frame_654.svg"
                                                              iconWidth="40" iconHeight="40"/>
                                            <MiningSocialLink link="https://medium.com/b-aoe" imageLink="/img/web/mining/button/button_social/frame_656.svg"
                                                              iconWidth="40" iconHeight="40"/>
                                            <MiningSocialLink link="https://discord.com/invite/YuWKKXQYsf" imageLink="/img/web/mining/button/button_social/frame_131.svg"
                                                              iconWidth="40" iconHeight="40"/>
                                            <MiningSocialLink link="https://www.twitch.tv/baoeglobal" imageLink="/img/web/mining/button/button_social/frame_652.svg"
                                                              iconWidth="40" iconHeight="40"/>
                                            <MiningSocialLink link="https://www.reddit.com/user/BAoEchannel" imageLink="/img/web/mining/button/button_social/frame_649.svg"
                                                              iconWidth="40" iconHeight="40"/>
                                            <MiningSocialLink link="https://twitter.com/baoebaoe1?s=21" imageLink="/img/web/mining/button/button_social/frame_657.svg"
                                                              iconWidth="40" iconHeight="40"/>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div ref={gameplayRef} className="max-w-full bg-cover bg-center bg-mining-page-2">
                    <section id="gameplay" className="block relative sm:pt-32 lg:pt-32 xl:pt-32 pt-24 pb-24 flexx">
                        <div className="container mx-auto">
                            <div className="mx-auto flex justify-center">
                                <GamePlay />
                            </div>
                        </div>
                    </section>
                </div>
                <div ref={cyborgsRef} className="max-w-full bg-cover bg-center bg-mining-page-3">
                    <section id="cyborgs" className="block relative sm:pt-32 lg:pt-32 xl:pt-32 pt-24 pb-24 flex ">
                        <div className="container mx-auto">
                            <Cyborgs />
                        </div>
                    </section>
                </div>
                <div>
                    <EnvironmentSelector />
                </div>
                <div ref={environmentRef}>
                    <Footer />
                </div>

            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={customStyles} >
                <div>
                    <div className="">
                        {/*content*/}
                        <div className="">
                            {/*header*/}
                            <div className="flex items-start justify-between">
                                <div className="mx-auto px-2 py-2 pt-6 pl-10">
                                    <p className="text-xl text-white font-bold font-exo-2 uppercase text-center mb-2">Choose a wallet</p>
                                </div>
                                <div className="">
                                    <button
                                        className="px-2 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none fonts-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                   <span className="bg-transparent text-gray-500 opacity-5 h-6 w-6 text-4xl block outline-none focus:outline-none">
                     ×
                   </span>
                                    </button>
                                </div>

                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <div className="">
                                    <button className="px-12 py-2 w-full border-solid-3 bg-black-light  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            onClick={() => {
                                                let res = isMetaMaskInstaller();
                                                if(!res) {
                                                    notify();
                                                } else {
                                                    props.signature()
                                                    setShowModal(false)
                                                }
                                            }}>
                                        <img className="m-2 inline-block" src="/img/wallet/metamask.svg" alt="metamask" height="30" width="30"/>
                                        <div className="inline-block opacity-5 font-bold text-xs m-2" >
                                            <p className="text-base text-white font-exo-2 font-bold text-center" >Connect Metamask</p>
                                        </div>
                                    </button>
                                    {/*<div className="m-2 rounded bg-blue-light border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">*/}
                                    {/*  <a>*/}
                                    {/*    <img className="inline-block m-2" src="/img/wallet/icon-bnb.svg"  alt="metamask"  width="30" height="30" />*/}
                                    {/*    <div className="inline-block opacity-5 font-bold m-2" >*/}
                                    {/*      <p className="text-xs text-white font-bold text-center">Connect Binance Wallet</p>*/}
                                    {/*    </div>*/}
                                    {/*  </a>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* toast error */}
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

MiningSimulator.getInitialProps = async () => {
    return {
        enableSaleDeposit: publicRuntimeConfig.PRIVATE_SALE_DEPOSIT,
        enableConnect: publicRuntimeConfig.ENABLED_CONNECT,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startWalletInit: bindActionCreators(startWalletInit, dispatch),
        signature: bindActionCreators(signature, dispatch),
        logOutWallet: bindActionCreators(logoutWallet, dispatch),
    }
}

const mapStateToProps = (state) => ({
    wallet: state.wallet,
})

const isMetaMaskInstaller = () => {
    // Have to check function to see if the MetaMask extension is installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
}


export default connect(mapStateToProps, mapDispatchToProps) (MiningSimulator)
