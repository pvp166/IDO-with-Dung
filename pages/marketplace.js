import React from 'react';
import IndexNavbar from "../components/Navbar/IndexNavbar";
import Image from 'next/image';
import Link from 'next/link';

import getConfig from 'next/config'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {signature, startWalletInit} from "../store/wallet/action";
import {approve, deposit, initContract} from "../store/contract/action";
import {getVesting} from "../store/investing/action";

const { publicRuntimeConfig } = getConfig()

const MarketPlace = (props) => {

    // console.log("publicRuntimeConfig", props.disableConnect)
    return (
        <>
            <div className="bg-cover bg-center bg-page-5">
                <IndexNavbar showModal={showModal} fixed/>
                <section id="marketplace" className="block relative mb:pt-24 lg:pt-32 xl:pt-32 pt-32 flex h-screen">
                    <div className="container mx-auto">
                        <div className="flex flex-col">
                            <div className="flex mx-auto">
                                {/*<p className="text-2xl lg:text-5xl letter-spacing-base text-white font-evil uppercase font-bol">{`${props.disableConnect}`}</p>*/}
                                {/*<p className="text-2xl lg:text-5xl letter-spacing-base text-white font-evil uppercase font-bol">{`${publicRuntimeConfig.DISABLE_CONNECT}`}</p>*/}
                            </div>
                            <div className="flex mx-auto relative mb:robo-marketplace sm:robo-marketplace">
                                <Image src="/img/web/marketplace/robo_loading.svg" layout={'fill'}/>
                            </div>
                            <div className="flex mx-auto pt-6">
                                <p className="text-2xl lg:text-4xl letter-spacing-base text-white font-evil uppercase font-bol">Coming soon...</p>
                            </div>
                            <div className="flex mx-auto relative mb:gohome-marketplace sm:gohome-marketplace mt-10">
                                <Link href="/">
                                    <Image src="/img/web/marketplace/go_home.svg" layout={'fill'}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

MarketPlace.getInitialProps = async () => {
    return {
        enableSaleDeposit: publicRuntimeConfig.PRIVATE_SALE_DEPOSIT,
        enableConnect: publicRuntimeConfig.ENABLED_CONNECT,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startWalletInit: bindActionCreators(startWalletInit, dispatch),
    }
}

const mapStateToProps = (state) => ({
    wallet: state.wallet,
})


export default connect(mapStateToProps, mapDispatchToProps) (MarketPlace)

