import React,{ useEffect } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Image from 'next/image';
import dynamic from 'next/dynamic'

import {logoutWallet, startWalletInit} from '../../store/wallet/action';
import IndexDropdownMetaverse from "../Dropdowns/IndexDropdownMetaverse";

import IndexDropdownDocs from "../Dropdowns/IndexDropdownDocs";
import IndexDropdownWallet from "../Dropdowns/IndexDropdownWallet";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig()

const  Navbar = ({onClickModal, showModal, showFormModal, showPrivateSaleModal, wallet, enableConnect, enableSaleDeposit, onLogout, success}) => {

  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const formatWalletAddress = (address) => {
    let res = address ? address.replace('"', '').slice(0,5) + "..." + address.replace('"', '').slice(-4, -1) : null;
    return res;
  }

  return (
      <div className="relative">
        <div className={`top-0 fixed ${showModal || showFormModal || showPrivateSaleModal ||success ? '' : 'z-50'} w-full flex flex-wrap items-center justify-between bg-cover navbar-expand-lg  bg-frame-navbar`}>
          <div className=" z-50 container w-full px-4 mx-auto flex mb:flex-col lg:flex-row items-center justify-start">
            <div className="flex lg:flex-row list-none w-full m-2 bg-primary-color justify-center mb:display-none sm:display-none md:display-none lg:display">
              <div className="lg:logo-hx xl:logo-hx relative">
                <Image src="/img/web/logo/logo-03.png" layout={"fill"} priority></Image>
              </div>
            </div>
            <div className="w-full relative flex mt-2 mb:mr-2 item-centers lg:w-auto lg:static lg:block lg:justify-start lg:px-10 mr-4 pt-2">
              { !navbarOpen ? <div className="flex w-full justify-between">
                <div className="flex">
                  <button
                      className={"cursor-pointer text-xl leading-none text-white border-transparent rounded bg-transparent" +
                      "block lg:hidden outline-none focus:outline-none"}
                      type="button"
                      onClick={() => setNavbarOpen(!navbarOpen)}
                  >
                    <div className="flex m-2">
                      <div className="relative">
                        <img src={"/img/web/item/menu.svg"} width={"35"} height={"50"} />
                      </div>
                    </div>
                  </button>
                </div>
                {wallet.address != null && enableConnect === '1' ? <div className="flex mb:display lg:display-none">
                  <div className="relative">
                      <Image src="/img/web/item/icon_wallet.png" width="170" height="50"/>
                      <div className="absolute inset-0 wallet-address-position">
                        <p className="text-green-light text-base font-bold"> { formatWalletAddress(wallet.address) }</p>
                      </div>
                  </div>
                </div> :        <div className="flex">
                  { enableConnect === '1' ? <button
                      className={"w-full button-hx bg-white rounded-full button-connect-color text-xs font-bold uppercase px-4 py-2 shadow hover:shadow-lg outline-none " +
                      "focus:outline-none ml-3 mb-3 ease-linear transition-all duration-150 lg:hidden"
                      }
                      onClick={ () => {
                        onClickModal(!showModal);
                      }}
                  >
                    <p className="text-base font-evil uppercase">Connect</p>
                  </button> : null }
                </div>}

              </div> : null}

              {navbarOpen ? <button
                  className="p-1 mb-2 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none fonts-semibold outline-none focus:outline-none"
                  onClick={() => setNavbarOpen(!navbarOpen)}
              >
                   <span className="bg-transparent text-white opacity-5 h-6 w-6 text-4xl block outline-none focus:outline-none">
                     ×
                   </span>
              </button> : null}
            </div>
            <div
                className={
                  "lg:flex flex-grow items-center bg-primary-color jus lg:p-2 lg:bg-opacity-0 lg:shadow-none" +
                  (navbarOpen ? " block" : " hidden") +
                  (navbarOpen ? "h-screen" : "")
                }
            >
              <div className="flex mb:display  lg:display-none xl:display-none">
                { wallet.address != null && enableConnect === '1' ?  <div className="flex">
                  <div className="relative">
                    <Image src="/img/web/item/icon_wallet_1.png" width="170" height="50"/>
                    <div className="absolute inset-0 wallet-address-position-1">
                      <p className="text-green-light text-base font-bold">{formatWalletAddress(wallet.address)}</p>
                    </div>
                  </div>
                </div> :
                    <div>
                    { enableConnect === '1' ?   <button
                        className={"w-full button-hx bg-white rounded-full button-connect-color text-xs font-bold uppercase px-4 py-2 shadow hover:shadow-lg outline-none " +
                        "focus:outline-none ease-linear transition-all duration-150 lg:hidden"
                        }
                        type="button"
                        onClick={ () => {
                          onClickModal(!showModal);
                        }}
                    >
                      <p className="text-base font-evil uppercase">Connect</p>
                    </button> : null }
                    </div>
                }
              </div>

              <ul className="flex flex-col lg:flex-row list-none w-full bg-primary-color lg:justify-center">
                <li className="flex items-center mr-6 mb:divider-border-bottom justify-start sm:divider-border-bottom">
                  <a
                      href="/"
                      className="hover:bg-blue-light  lg:mr-6 text-white flex px-3 py-4 rounded-lg items-center text-lg uppercase font-bold"
                  >
                    <p className="text-white text-xl font-evil letter-spacing-base uppercase">home</p>
                  </a>
                </li>
                <li className="flex items-center lg:mr-6 mr-6 mb:divider-border-bottom sm:divider-border-bottom">
                  {/*<IndexDropdownMetaverse />*/}
                  <a
                      href="https://testnet.b-aoe.io/"
                      target="_blank"
                      className="hover:bg-blue-light text-white flex px-3 py-4 min-width-200px rounded-lg items-center text-lg uppercase font-bold"
                  >
                    <p className="text-white text-xl font-evil  letter-spacing-base uppercase">Play on testnet</p>
                  </a>
                </li>
                { enableSaleDeposit === '1' ? <li className="flex items-center mr-2 lg:mr-6  mb:divider-border-bottom sm:divider-border-bottom">
                  <a
                      href="/project"
                      className="hover:bg-blue-light text-white px-3 py-4 flex items-center text-lg uppercase font-bold rounded-lg"
                  >
                    <p className="text-white text-xl font-evil  letter-spacing-base uppercase">vesting</p>
                  </a>
                </li> : null}
                <li className="flex items-center mr-4 lg:mr-6 w-150-px  mb:divider-border-bottom sm:divider-border-bottom">
                  {/*<IndexDropdownDocs />*/}
                  <a
                      href="https://docsend.com/view/bb7vn2pgdf722dhn"
                      target="_blank"
                      className="hover:bg-blue-light lg:mr-6 text-white flex px-3 py-4 min-width-120px rounded-lg items-center text-lg uppercase font-bold"
                  >
                    <p className="text-white text-xl font-evil letter-spacing-base uppercase">Pitch deck</p>
                  </a>
                </li>
                <li className="flex items-center mr-4">
                  <a
                      href="https://whitepaper.b-aoe.io"  target="_blank"
                      className="hover:bg-blue-light text-white px-3 py-4 flex items-center text-lg uppercase font-bold rounded-lg"
                  >
                    <p className="text-white text-xl font-evil letter-spacing-base uppercase">whitepaper</p>
                  </a>
                </li>

                {
                  wallet.address ? <li className="flex items-center mr-4 mb:display lg:display-none">
                    <a
                        className="hover:bg-blue-light text-white px-3 py-4 flex items-center text-lg uppercase font-bold rounded-lg"
                        onClick={() => onLogout()}
                    >
                      <p className="text-white text-xl font-evil letter-spacing-base uppercase pr-2">Logout </p>
                      <Image src={'/img/web/item/logout.png'} height={'30'} width={'30'}/>
                    </a>
                  </li> : null
                }

                <li className="flex items-center mr-4 mb:display-none lg:display xl:display lg:w-2/12 m-2">
                  <div>
                    { wallet.address != null && enableConnect === '1' ? <>
                      <IndexDropdownWallet />
                    </> : null}
                    { wallet.address == null && enableConnect === '1' ?
                        <button
                            className="w-full bg-white rounded-full button-connect-color text-xs font-bold uppercase px-4 py-2 shadow hover:shadow-lg outline-none focus:outline-none lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                            type="button"
                            onClick={ () => {
                              onClickModal(!showModal);
                            }}
                        >
                          <p className="text-xl letter-spacing-base uppercase font-evil">Connect</p>
                        </button>
                        : null}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
}


const mapStateToProps = (state) => ({
  wallet: state.wallet,
})

const mapDispatchToProps = (dispatch) => {
  return {
    startWalletInit: bindActionCreators(startWalletInit, dispatch),
    logout: bindActionCreators(logoutWallet, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar)

