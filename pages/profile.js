import React, {useEffect, useState} from 'react';
import IndexNavbar from "../components/Navbar/IndexNavbar";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer/Footer";
import {bindActionCreators} from "redux";
import {logoutWallet, signature, startWalletInit} from "../store/wallet/action";
import getConfig from "next/config";
import {connect} from "react-redux";
import Modal from "react-modal";


const { publicRuntimeConfig } = getConfig()


const Profile = (props) => {

    const [showModal, setShowModal] = useState(false);

    const formatWalletAddress = (address) => {
        let res = address ? address.replace('"', '').slice(0,5) + "..." + address.replace('"', '').slice(-8, -1) : null;
        return res;
    }

    useEffect(() => {
        props.startWalletInit();

        if (showModal) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showModal])

    return (
      <>
          <div className="bg-cover bg-center bg-page-6">
              <IndexNavbar showModal={showModal} enableConnect={props.enableConnect} fixed/>
              <section id="marketplace" className="block relative mb:pt-24 lg:pt-32 xl:pt-32 pt-32 flex">
                  <div className="container mx-auto relative">
                      <div className="flex flex-col">
                          <div className="flex mx-auto">
                              <div className="">
                                  <p className="mb:text-3xl text-white font-evil sm:text-4xl letter-spacing-base">Information</p>
                              </div>
                          </div>
                          <div className="flex mx-auto relative">
                                <div className="relative mb:profile-info sm:profile-info md:profile-info lg:profile-info xl:profile-info">
                                    <Image src="/img/web/profile/frame.png" layout="fill" />
                                </div>
                              <div className="absolute mb:profile-content sm:profile-content md:profile-content lg:profile-content xl:profile-content">
                                  <div className="flex flex-row divider-border-bottom-category pb-4 xl:pb-6">
                                      <div className="flex mr-7 lg:mr-9">
                                          <p className="text-white font-exo-2 text-base font-bold xl:text-xl">Address</p>
                                      </div>
                                      <div className="flex ml-4 mb:display sm:display-none">
                                          <p className="text-white font-exo-2 text-base font-bold">{formatWalletAddress(props.wallet.address)}</p>
                                      </div>
                                      <div className="flex mb:display-none sm:display">
                                          <p className="text-white font-exo-2 text-base font-bold xl:text-xl">{props.wallet.address ? props.wallet.address.slice(1, -1) : ''}</p>
                                      </div>
                                  </div>
                                  <div className="flex flex-row pt-4 divider-border-bottom-category pb-4 xl:pb-6">
                                      <div className="flex mr-7 lg:mr-9">
                                          <p className="text-white font-exo-2 text-base font-bold xl:text-xl">Balance</p>
                                      </div>
                                      <div className="flex mb:ml-4">
                                          <p className="text-white font-exo-2 text-base font-bold xl:text-xl">0 BAoE</p>
                                      </div>
                                  </div>
                                  <div className="flex flex-row pt-4 xl:pt-6">
                                      <div className="flex mr-7 mb:display-none sm:display">
                                          <p className="text-white font-exo-2 text-base font-bold xl:text-xl">Token bridge</p>
                                      </div>
                                      <div className="flex mb:ml-4">
                                          <div className="flex mr-3 mb:display-none sm:display">
                                              <button className="bg-green-light px-6 py-1 border-solid-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                                  <p className="text-white font-exo-2 font-bold">Deposit</p>
                                              </button>
                                          </div>
                                          <div className="flex mb:display-none sm:display">
                                              <button className="bg-red-light px-4 py-1 border-solid-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                                  <p className="text-white font-exo-2 font-bold">Withdraw</p>
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="flex flex-col pt-6">
                          <div className="mx-auto flex mb:display sm:display-none">
                              <p className="text-white text-xl font-evil font-exo-2">Token Bridge</p>
                          </div>
                          <div className="mx-auto flex flex-row pt-1">
                              <div className="flex mr-3 mb:display sm:display-none ">
                                  <button className="bg-green-light px-6 py-1 border-solid-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                      <p className="text-white font-exo-2 font-bold">Deposit</p>
                                  </button>
                              </div>
                              <div className="flex mb:display sm:display-none">
                                  <button className="bg-red-light px-4 py-1 border-solid-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                      <p className="text-white font-exo-2 font-bold">Withdraw</p>
                                  </button>
                              </div>
                          </div>
                      </div>
                      <div className="flex pt-6 mb-6">
                          <div className="flex flex-col mx-auto w-full">
                              <div className="mx-auto flex">
                                  <p className="mb:text-3xl text-white sm:text-4xl font-evil letter-spacing-base">Transaction</p>
                              </div>
                              <div className="mx-auto flex pt-2">
                                  <div className="mb:transaction-table sm:transaction-table md:transaction-table lg:transaction-table xl:transaction-table w-full bg-blue-opacity">
                                      {/*<div className="flex flex-row pb-2 justify-between divider-border-bottom-category pt-2">*/}
                                      {/*    <div className="flex flex-row py-2">*/}
                                      {/*        <div className="relative mb:transaction-lead-image mr-4">*/}
                                      {/*            <Image src="/img/web/profile/plus.svg" layout='fill'/>*/}
                                      {/*        </div>*/}
                                      {/*        <div className="flex flex-col">*/}
                                      {/*              <div>*/}
                                      {/*                  <p className="text-green text-base uppercase font-bold font-exo-2">Deposit</p>*/}
                                      {/*              </div>*/}
                                      {/*            <div>*/}
                                      {/*                <p className="text-white text-xs font-exo-2">Dec 02, 2021</p>*/}
                                      {/*            </div>*/}
                                      {/*            <div>*/}
                                      {/*                <p className="text-white text-xs font-exo-2">12:30 AM</p>*/}
                                      {/*            </div>*/}
                                      {/*        </div>*/}
                                      {/*    </div>*/}
                                      {/*    <div className="flex flex-row py-2">*/}
                                      {/*        <div className="flex">*/}
                                      {/*            <div>*/}
                                      {/*                <p className="text-green text-base uppercase font-bold font-exo-2">+50.00 BAoE</p>*/}
                                      {/*            </div>*/}
                                      {/*        </div>*/}
                                      {/*    </div>*/}
                                      {/*</div>*/}
                                      {/*<div className="flex flex-row pb-2 justify-between">*/}
                                      {/*    <div className="flex flex-row py-2">*/}
                                      {/*        <div className="relative mb:transaction-lead-image mr-4">*/}
                                      {/*            <Image src="/img/web/profile/minus.svg" layout='fill'/>*/}
                                      {/*        </div>*/}
                                      {/*        <div className="flex flex-col">*/}
                                      {/*            <div>*/}
                                      {/*                <p className="text-red-500 text-base uppercase font-bold font-exo-2">Refill fuel</p>*/}
                                      {/*            </div>*/}
                                      {/*            <div>*/}
                                      {/*                <p className="text-white text-xs font-exo-2">Dec 02, 2021</p>*/}
                                      {/*            </div>*/}
                                      {/*            <div>*/}
                                      {/*                <p className="text-white text-xs font-exo-2">12:30 AM</p>*/}
                                      {/*            </div>*/}
                                      {/*        </div>*/}
                                      {/*    </div>*/}
                                      {/*    <div className="flex flex-row py-2">*/}
                                      {/*        <div className="flex">*/}
                                      {/*            <div>*/}
                                      {/*                <p className="text-red-500 text-base uppercase font-bold font-exo-2"> -50.00 BAoE</p>*/}
                                      {/*            </div>*/}
                                      {/*        </div>*/}
                                      {/*    </div>*/}
                                      {/*</div>*/}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
          </div>
          {/*<Modal*/}
          {/*    isOpen={showModalDeposit}*/}
          {/*    ariaHideApp={false}*/}
          {/*    // onRequestClose={closeModalPrivate}*/}
          {/*    style={privateStyles} >*/}
          {/*    <div>*/}
          {/*        <div className="">*/}
          {/*            /!*content*!/*/}
          {/*            <div className="">*/}
          {/*                /!*header*!/*/}
          {/*                <div className="flex items-start justify-between border-bottom-white">*/}
          {/*                    <div className="px-2 py-2 pt-6">*/}
          {/*                        <p className="text-2xl text-white font-bold font-evil letter-spacing-base uppercase text-left mb-2">Private sale</p>*/}
          {/*                    </div>*/}
          {/*                    <div className="">*/}
          {/*                        /!*<button*!/*/}
          {/*                        /!*    className="px-2 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none fonts-semibold outline-none focus:outline-none"*!/*/}
          {/*                        /!*    onClick={() => setShowModalPrivate(false)}*!/*/}
          {/*                        /!*>*!/*/}
          {/*                        /!*                  <span className="bg-transparent text-gray-500 opacity-5 h-6 w-6 text-4xl block outline-none focus:outline-none">*!/*/}
          {/*                        /!*                   ×*!/*/}
          {/*                        /!*                   </span>*!/*/}
          {/*                        /!*</button>*!/*/}
          {/*                    </div>*/}

          {/*                </div>*/}
          {/*                /!*body*!/*/}
          {/*                /!*body*!/*/}
          {/*                <div className="relative p-6 flex flex-col">*/}
          {/*                    <div className="flex flex-col pt-4">*/}
          {/*                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="busd">*/}
          {/*                            <p className="text-white font-exo-2 text-xl">Your BAoE Amount</p>*/}
          {/*                        </label>*/}
          {/*                        <input*/}
          {/*                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"*/}
          {/*                            id="busd_amount" type="text" readOnly={true} placeholder="" value={props.vesting.packageAmount + "USD - " +  props.vesting.packageToken + " BAoE"} />*/}
          {/*                    </div>*/}
          {/*                    <div className="flex mx-auto flex-row pt-4">*/}
          {/*                        <div className="">*/}
          {/*                            <button className={`bg-blue-light px-12 py-2 border-solid-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}*/}
          {/*                                    onClick={() => depositPrivateSale()}*/}
          {/*                            >*/}
          {/*                                <p className="text-white text-xl">Deposit</p>*/}
          {/*                            </button>*/}
          {/*                        </div>*/}
          {/*                    </div>*/}
          {/*                </div>*/}
          {/*            </div>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*</Modal>*/}
          <Footer />
      </>
    );
}

Profile.getInitialProps = async () => {
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

export default connect(mapStateToProps, mapDispatchToProps) (Profile)