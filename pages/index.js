import React, {useEffect, useCallback, useState} from "react";
import Modal from 'react-modal';
import Image from 'next/image';
import moment from 'moment';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// local
import IndexNavbar from "../components/Navbar/IndexNavbar";
import RoboSelector from "../components/Cards/RoboSelector";
import IndexOurTeam from '../components/Cards/index/IndexOurTeam';
import IndexAdvisor from '../components/Cards/index/IndexAdvisor';
import IndexRoundMap from '../components/Cards/index/IndexRoundMap';
import Footer from '../components/Footer/Footer';
import IndexSocialLink from "../components/Cards/index/IndexSocialLink";
import IndexPartner from "../components/Cards/index/IndexPartner";
import IndexGameStory from "../components/Cards/index/IndexGameStory";
import IndexMiniGame from "../components/Cards/index/IndexMiniGame";

// redux
import { wrapper } from '../store/store';
import { serverRenderClock, startClock } from '../store/tick/action';
import {changeAccount, logoutWallet, signature, startWalletInit} from '../store/wallet/action';
import {buyPrivateSale, buyIDO, setLoading, setSuccess} from '../store/contract/action';
import GameVideoPlayer from "../components/Videos/GameVideo";
import ReactPlayer from "react-player";
import IndexTokenomics from "../components/Cards/index/IndexTokenomics";
import getConfig from "next/config";
import ApiRest from "../adapt/api/api_rest";
import {getVesting} from "../store/investing/action";
import {getIdoAddress, getIdoInfo, startLoading} from "../store/ido/action";
import { useForm } from 'react-hook-form';
import LoadingSpinner from "../components/Loading/LoadingSpinner";
import {integer} from "sharp/lib/is";
import Web3 from 'web3'

const { publicRuntimeConfig } = getConfig()


const formStyles = {
  content: {
    backgroundImage: 'url("/img/web/background/a.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 100,
    margin: 'auto',
    top: '0%',
    left: '10px',
    right: '10px',
    minWidth: '300px',
    maxWidth: "800px",
    height: '700px',
    transform: 'translate(0%, 0%)',
  },
};

const formSmallStyles = {
    content: {
        backgroundImage: 'url("/img/web/background/a.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 100,
        margin: 'auto',
        top: '0%',
        left: '10px',
        right: '10px',
        minWidth: '300px',
        maxWidth: "800px",
        height: '600px',
        transform: 'translate(0%, 0%)',
    },
};


const privateStyles = {
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

const successStyles = {
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

const Index = (props) => {

  const [showModal, setShowModal] = React.useState(false);

  const [showFormModal, setShowFormModal] = React.useState(false);

  const [showModalPrivate, setShowModalPrivate] = React.useState(false);

  const [selectedValue, setSelectedValue] = React.useState(1);

  const [walletValue, setWalletValue] = React.useState('');

  const [showDetailTable, setShowDetailTable] = React.useState(true);

  const {
        register,
        handleSubmit,
        formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
      console.log('123')
      if((props.ido.mineBoughtRound3 < props.ido.idoUserMax) && props.wallet.address &&
          ((props.ido.idoRound === 1 && props.ido.totalRaise < props.ido.idoPool1) || (props.ido.idoRound === 3 && (props.ido.totalRaise < props.ido.idoPool2)))
          && (props.ido.isIdoWhitelist === 1)) {
          props.setLoading({state: true});
          await props.buyIDO({price: data.busdIDOSubmit, BUSDAddress: props.ido.contractAddressBUSD, idoReceiveAddress: props.ido.receiverBUSD})
          setShowFormModal(false);
      }
  };

  async function listenMMAccount() {
      if (window.ethereum !== undefined && localStorage.getItem('walletAddress')) {
        window.ethereum.on("accountsChanged", async function() {
          // Time to reload your interface with accounts[0]!
          await props.changeAccount();
          // await props.signature()
          window.location.reload();
        });
      }
  }

  useEffect(async () => {
    await props.getIdoInfo();
    await props.startClock()
    await props.startWalletInit();
    await props.getIdoAddress();
    // props.getVesting();
    if (showModal || props.contract.showSuccess || props.contract.showLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    listenMMAccount();
  }, [showModal, props.contract.showSuccess, props.contract.showLoading]);

  const formatWalletAddress = (address) => {
      let res = address ? address.replace('"', '').slice(0,5) + "..." + address.replace('"', '').slice(-4, -1) : null;
      return res;
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const closeFormModal = () => {
    setShowFormModal(false);
  }

  const closeModalPrivate = () => {
    setShowModalPrivate(false);
  }

  const closeModalSuccess = () => {
    props.setSuccess({state: false})
  }


  const depositPrivateSale = async () => {
      let busd = props.vesting.packageAmount;
      props.setLoading({state: true});
      await props.buyPrivateSale({price: busd})
      setShowModalPrivate(false);
  }

  const checkShowCountDown = (t) => {
    if (props.ido.idoCountdown === null || props.tick.time === '') {
      return true;
    }
    let dayStartPrivateSale = moment.utc(props.ido.idoCountdown, "YYYY-MM-DD HH:mm:ss");
    let sec = parseInt(moment.duration(dayStartPrivateSale.diff(t)).asSeconds(), 10);
    return (sec > 0) ;
  }

  const format = (t) => {
    if(t === '') {
        return ["00", "00", "00", "00"];
    }
    let dayStartPrivateSale = moment.utc(props.ido.idoCountdown, "YYYY-MM-DD HH:mm:ss");
      if(moment.duration(dayStartPrivateSale.diff(t)).asDays() < 0) {
          return ['00', '00', '00', '00'];
      }
      let days = (parseInt(moment.duration(dayStartPrivateSale.diff(t)).asDays(), 10));
      let hours = (parseInt(moment.duration(dayStartPrivateSale.diff(t)).asHours(), 10));
      let mins = (parseInt(moment.duration(dayStartPrivateSale.diff(t)).asMinutes(), 10));
      let secs = (parseInt(moment.duration(dayStartPrivateSale.diff(t)).asSeconds(), 10));
    // ('0' + days).slice(-2) + '  :  ' + ('0' + (hours % 24)).slice(-2)  + " : " + ('0' + (mins % 60)).slice(-2)  + " : " + ('0' + ((secs - (mins * 60 - 30)) % 60)).slice(-2)
    return  [
      ( days == '-0' ? "00" : "0" + days).slice(-2),
        ('0' + (hours % 24)).slice(-2),
      ('0' + (mins % 60)).slice(-2),
      ('0' + ((secs - (mins * 60)) % 60)).slice(-2)
    ]
  }
    const formatIDOTime = ({t}) => {
        if(props.ido.idoEndtime !== '') {
            let dayStartPrivateSale = moment.utc(props.ido.idoEndtime, "YYYY-MM-DD HH:mm:ss");
            if(moment.duration(dayStartPrivateSale.diff(t)).asDays() < 0) {
                return '00d: 00h: 00m: 00s';
            }
            let days = (parseInt(moment.duration(dayStartPrivateSale.diff(t)).asDays(), 10));
            let hours = (parseInt(moment.duration(dayStartPrivateSale.diff(t)).asHours(), 10));
            let mins = (parseInt(moment.duration(dayStartPrivateSale.diff(t)).asMinutes(), 10));
            let secs = (parseInt(moment.duration(dayStartPrivateSale.diff(t)).asSeconds(), 10));
            let res = ("0" + days).slice(-2) + 'd : ' + ('0' + (hours % 24)).slice(-2)  + "h : " + ('0' + (mins % 60)).slice(-2) + "m : " + ('0' + ((secs - (mins * 60)) % 60)).slice(-2) +"s"
            return res;
        } else {
            return '00d: 00h: 00m: 00s';
        }
    }


  const notify = () => toast.warn("You must install MetaMask Extension !");

  const success = () => toast.success("You sent private sale successful !")

  const error = () => toast.success("Error !")


  const changeModal = useCallback((showModal) => {
    setShowModal(showModal)
  }, [showModal]);

  const onLogout = useCallback(() => {
    props.logOutWallet()
  }, []);

  const formatProgress = ({number, total}) => {
    let round = 0;
    if(number > 0) {
       round =  Math.round((((number)/total) * 100 + 1));
       round >= 100 ? round = 100: round;
    }
    return round;
  }

  const formatProgress2 = ({number, total}) => {
        let round = 0;
        if(number > 0) {
            round =  Math.round(((number/total) * 100 + 1));
            round >= 100 ? round = 100: round;
        }
        return round;
  }

  const formatProgress3 = ({number}) => {
      if(number < props.ido.idoPool1) {
          return 0;
      } else if (number > props.ido.idoPool2){
          return 100;
      } else {
         return (((number - props.ido.idoPool1)/ (props.ido.idoPool2 - props.ido.idoPool1)) * 100).toFixed(2);
      }
  }

    // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   let fullName = event.target.name.value;
  //   let email = event.target.email.value;
  //   let phone = event.target.phone.value;
  //   let wallet = event.target.wallet.value;
  //   let pkg = selectedValue;
  //
  //   let options = {
  //     method: 'POST',
  //     prefix: 'ddapp/private-sale/request',
  //     usingHeaders: false
  //   }
  //
  //   let params = {
  //   }
  //
  //   let data = new FormData();
  //   data.append('fullName', fullName)
  //   data.append('email', email)
  //   data.append('phone', phone)
  //   data.append('wallet', wallet)
  //   data.append('pkg', pkg)
  //
  //   let res = await ApiRest({options, params, data});
  //
  //   // let res = props.submitPrivateSale({fullName, email, phone, wallet, pkg});
  //   if(res.status) {
  //     setShowFormModal(false)
  //     success()
  //   } else {
  //     setShowFormModal(false)
  //     error()
  //   }
  // }

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
  }

  const onChangeWalletValue = (event) => {
    setWalletValue(event.target.value)
  }

  return (
    <div>
      <div>
        <div className="max-w-full bg-cover bg-center bg-page-1">
          <IndexNavbar onClickModal={changeModal} showModal={showModal} showFormModal={showFormModal} showPrivateSaleModal={showModalPrivate}
                       enableConnect={props.enableConnect}  enableSaleDeposit={props.enableSaleDeposit}  onLogout={onLogout} success={props.contract.showSuccess} fixed />
          <section id="home" className={`${ checkShowCountDown(props.tick.time) || props.ido.idoRound === 0 ? 'h-screen' : ''} block relative mb:pt-32 lg:pt-32 xl:pt-32 pt-32 flex pb-32`}>
            <div className="container mx-auto">
              <div className="flex justify-center">
                <div className="relative w-full">
                  <div className="items-center flex flex-col w-screen">
                      { !checkShowCountDown(props.tick.time) && props.ido.idoRound !== 0 ?  <div className={`${showDetailTable ? 'mb:form-ido sm:form-ido' : 'mb:form-small-ido sm:form-small-ido'}`}>
                          <div className="pl-4 pr-4 pt-4">
                              {/*content*/}
                              <div>
                                  {/*header*/}
                                  <div className="flex items-start justify-between border-bottom-white">
                                      <div className="px-2 py-2">
                                          <p className="text-3xl text-white letter-spacing-base font-bold font-evil uppercase text-center mb-2">IDO ROUND</p>
                                      </div>
                                      <div className="">
                                          <button
                                              className="px-2 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none fonts-semibold outline-none focus:outline-none"
                                              onClick={() => setShowFormModal(false)}
                                          >
                                          </button>
                                      </div>
                                  </div>

                                  {/*body*/}
                                <div>
                                  <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mx-auto flex flex-col mt-4">
                                      <div className="flex flex-col w-full pt-4 rounded-lg pl-4 bg-white-grey pr-4">
                                        <div className="flex sm:flex-row mb:flex-col w-full">
                                          <div className="flex mb:w-full sm:w-1/2">
                                            <p className="text-xl font-exo-2"> 1 BAoE = 0.035 BUSD</p>
                                          </div>
                                          <div className="flex mb:w-full sm:w-1/2">
                                            <p className="text-xl font-exo-2 ">Your deposit: {Intl.NumberFormat().format(props.ido.idoRound === 1 ? (props.ido.mineBoughtRound1 ? props.ido.mineBoughtRound1: 0) : (props.ido.mineBoughtRound3 ? props.ido.mineBoughtRound3: 0))} BUSD</p>
                                          </div>
                                        </div>
                                        <div className="flex pt-2">
                                          <p className="text-xl font-exo-2">Total raise</p>
                                        </div>
                                        <div className="flex sm:flex-row mb:flex-col">
                                          <div className="flex mb:w-full sm:w-1/2">
                                            <p className="sm:text-3xl mb:text-2xl font-exo-2 font-bold"> {Intl.NumberFormat().format(props.ido.idoRound === 1 ? props.ido.totalRaise: ((props.ido.totalRaise - props.ido.idoPool1) > (props.ido.idoPool2 - props.ido.idoPool1) ? (props.ido.idoPool2 - props.ido.idoPool1)  : (props.ido.totalRaise - props.ido.idoPool1)))} BUSD</p>
                                          </div>
                                          <div className="flex mb:w-full sm:w-1/2">
                                            <p className="sm:text-2xl mb:text-xl font-exo-2 font-bold">{ props.ido.idoRound === 1 ? 'Guaranteed Whitelist': props.ido.idoRound === 3 ? ' First Come First Served': '' }</p>
                                          </div>
                                        </div>
                                        <div className="flex pt-2">
                                          <p className="text-xl font-exo-2"> Progress</p>
                                        </div>
                                        <div className="flex flex-col relative pt-1">
                                          <div className="flex flex-row">
                                            {
                                              props.ido.idoRound === 1 ?   <div className={`w-100/100 overflow-hidden h-2 mb-2 text-xs flex bg-white rounded relative flex flex-row`}>
                                                <div className={`w-${formatProgress({number: props.ido.totalRaise, total: props.ido.idoPool1})}/100 shadow-none flex text-center whitespace-nowrap text-white justify-center bg-progress-blue`}></div>
                                              </div> : null
                                            }

                                            {
                                              props.ido.idoRound === 3 ? <div className="overflow-hidden h-2 mb-2 text-xs flex bg-white rounded relative flex flex-row w-100/100">
                                                <div className={`w-${formatProgress2({number: (props.ido.totalRaise - props.ido.idoPool1), total: (props.ido.idoPool2 - props.ido.idoPool1)})}/100 shadow-none flex text-center whitespace-nowrap text-white justify-center bg-progress-blue`}></div>
                                              </div> : null
                                            }
                                          </div>
                                          <div className="flex flex-row items-center mb-2 justify-between">
                                            <div className="flex">
                                                                <span className="text-base inline-block px-2 font-exo-2 font-bold">
                                                                    0%
                                                                </span>
                                            </div>
                                            {
                                              props.ido.idoRound === 1 ? <div className={`${props.ido.idoRound === 1 ? 'w-80/100 text-center' : 'w-40/100'} flex`}>
                                                <p className="sm:text-base mb:text-xss inline-block px-2 font-exo-2 font-bold text-gray-500 ">
                                                  (Guaranteed Whitelist)
                                                </p>
                                              </div>: null
                                            }

                                            {/*{*/}
                                            {/*  props.ido.idoRound === 3 ?  <div className={`flex w-60/100 pl-4`}>*/}
                                            {/*                    <span className="sm:text-base mb:text-xss inline-block px-2 font-exo-2 font-bold text-gray-500">*/}
                                            {/*                         (First Come First Serve)*/}
                                            {/*                    </span>*/}
                                            {/*  </div> : null*/}
                                            {/*}*/}
                                            <div className="flex">
                                                                 <span className="font-bold inline-block text-amber-600 px-2">
                                                                     {props.ido.idoRound === 1 ? ((props.ido.totalRaise/props.ido.idoPool1) *100) > 100 ? 100: ((props.ido.totalRaise/props.ido.idoPool1) * 100).toFixed(2) :
                                                                         formatProgress3({number: props.ido.totalRaise})
                                                                     }%
                                                                 </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex mb:flex-col sm:flex-row justify-between mb-2">
                                          <div className="flex flex-col">
                                            <div>
                                              <p className="font-exo-2 text-base">{props.ido.idoTxtTime}</p>
                                            </div>
                                            <div>
                                              <p className="font-exo-2 text-base font-bold">{formatIDOTime(props.tick.time)}</p>
                                            </div>
                                          </div>
                                          <div className="flex">
                                            {/*<div>*/}
                                            {/*  <button onClick={() => setShowDetailTable(!showDetailTable)} type='button'>*/}
                                            {/*    {showDetailTable ? <p className="font-exo-2 text-base font-bold text-view-detail focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ">Less details</p> :*/}
                                            {/*        <p className="font-exo-2 text-base font-bold text-view-detail focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ">View details</p>}*/}
                                            {/*  </button>*/}
                                            {/*</div>*/}
                                          </div>
                                        </div>
                                        <div className={`${showDetailTable ? 'display' : 'display-none'} flex pt-1`}>
                                          <div className="w-full pb-4 mb:display-none sm:display">
                                            <table className="items-center w-full bg-transparent border-collapse rounded-lg">
                                              <thead>
                                              <tr>
                                                <th className="px-2 text-white bg-header-table-ido rounded-tl align-middle border-blueGray-100 py-3 text-base font-exo-2 whitespace-nowrap font-semibold text-left">
                                                  Pool Information
                                                </th>
                                                <th className="px-6 text-white bg-header-table-ido align-middle rounded-tr border-blueGray-100 py-3 text-base font-exo-2 border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-left">
                                                  Token Information
                                                </th>
                                              </tr>
                                              </thead>
                                              <tbody className="bg-table-ido">
                                              <tr>
                                                <th>
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold">Token Distribution</p>
                                                    </div>
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold pr-2">{props.ido.tokenDistribution}</p>
                                                    </div>
                                                  </div>
                                                </th>
                                                <th>
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold pl-2">Name</p>
                                                    </div>
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold">{props.ido.name}</p>
                                                    </div>
                                                  </div>
                                                </th>
                                              </tr>
                                              <tr>
                                                <th>
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold">Total Users Participated</p>
                                                    </div>
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold pr-2">{props.ido.idoRound === 1 ? props.ido.totalPeopleRaiseRound1 : props.ido.totalPeopleRaiseRound3}</p>
                                                    </div>
                                                  </div>
                                                </th>
                                                <th>
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold pl-2">Address</p>
                                                    </div>
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold">{props.ido.address}</p>
                                                    </div>
                                                  </div>
                                                </th>
                                              </tr>
                                              <tr>
                                                <th>
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold">Hard Cap</p>
                                                    </div>
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold pr-2">{Intl.NumberFormat().format(props.ido.idoRound === 1 ? props.ido.idoPool1 : (props.ido.idoPool2- props.ido.idoPool1))}</p>
                                                    </div>
                                                  </div>
                                                </th>
                                                <th>
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold pl-2">Total Supply</p>
                                                    </div>
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold">{Intl.NumberFormat().format(props.ido.totalSupply)}</p>
                                                    </div>
                                                  </div>
                                                </th>
                                              </tr>
                                              <tr>
                                                <th className="">
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold">Access type</p>
                                                    </div>
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold pr-2">{props.ido.accessType}</p>
                                                    </div>
                                                  </div>
                                                </th>
                                                <th>
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold pl-2">Decimals</p>
                                                    </div>
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold">{props.ido.decimals}</p>
                                                    </div>
                                                  </div>
                                                </th>
                                              </tr>
                                              <tr>
                                                <th className="pb-2">
                                                  <div className="flex flex-row justify-between">
                                                  </div>
                                                </th>
                                                <th className="pb-2">
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold pl-2">Symbol</p>
                                                    </div>
                                                    <div className="flex px-2">
                                                      <p className="text-xs font-exo-2 font-bold">{props.ido.symbol}</p>
                                                    </div>
                                                  </div>
                                                </th>
                                              </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                          <div className="mb:display sm:display-none w-full pb-2">
                                            <div className="flex flex-col">
                                              <div className="flex flex-col">
                                                <div className="w-full px-2 py-2 bg-header-table-ido rounded-t-lg">
                                                  <p className="font-bold font-exo-2 text-white">Pool Information</p>
                                                </div>
                                                <div className="flex flex-col bg-table-ido py-2 rounded-b-lg">
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold">Token Distribution</p>
                                                    </div>
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold pr-2">{props.ido.tokenDistribution}</p>
                                                    </div>
                                                  </div>
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold">Total Users Participated</p>
                                                    </div>
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold pr-2">{props.ido.idoRound === 1 ? props.ido.totalPeopleRaiseRound1 : props.ido.totalPeopleRaiseRound3}</p>
                                                    </div>
                                                  </div>
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold">Hard Cap</p>
                                                    </div>
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold pr-2">{Intl.NumberFormat().format(props.ido.idoRound === 1 ? props.ido.idoPool1 : (props.ido.idoPool2- props.ido.idoPool1))}</p>
                                                    </div>
                                                  </div>
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold">Access type</p>
                                                    </div>
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold pr-2">{props.ido.accessType}</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="flex flex-col pt-2">
                                                <div className="w-full px-2 py-2 bg-header-table-ido rounded-t-lg">
                                                  <p className="font-bold font-exo-2 text-white">Token Information</p>
                                                </div>
                                                <div className="flex flex-col bg-table-ido py-2 rounded-b-lg">
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold">Name</p>
                                                    </div>
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold">{props.ido.name}</p>
                                                    </div>
                                                  </div>
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold">Address</p>
                                                    </div>
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold">{props.ido.address}</p>
                                                    </div>
                                                  </div>
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold">Total Supply</p>
                                                    </div>
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold">{Intl.NumberFormat().format(props.ido.totalSupply)}</p>
                                                    </div>
                                                  </div>
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold">Decimals</p>
                                                    </div>
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold">{props.ido.decimals}</p>
                                                    </div>
                                                  </div>
                                                  <div className="flex flex-row justify-between">
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold">Symbol</p>
                                                    </div>
                                                    <div className="flex px-2 py-1">
                                                      <p className="text-xs font-exo-2 font-bold">{props.ido.symbol}</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex flex-col pt-4 relative">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="busd">
                                          <p className="text-white text-xl letter-spacing-base font-bold font-evil uppercase">Join pool:</p>
                                        </label>
                                        <div className="flex flex-row">
                                          <input
                                              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                              id="busd_amount_ido" type="number" value={props.ido.idoUserMax} {...register('busdIDOSubmit', { required: true, max: props.ido.idoUserMax, min: props.ido.idoUserMax })}/>
                                          <div className="z-10 absolute right-0  sm:mr-7 mb:mr-2 mt-2">
                                            <p className="font-exo-2 font-bold text-gray-500">BUSD</p>
                                          </div>
                                        </div>
                                        <div>
                                          {errors.busdIDOSubmit && <p className="text-xl font-exo-2 text-red-500">Please enter amount of busd in {props.ido.idoUserMax} BUSD.</p>}
                                        </div>
                                      </div>
                                      <div className="flex mx-auto flex-row pt-4">
                                        <div>
                                          <button className={`${((props.ido.mineBoughtRound3 < props.ido.idoUserMax) && props.wallet.address && ((props.ido.idoRound === 1 && props.ido.totalRaise < props.ido.idoPool1) || (props.ido.idoRound === 3 && props.ido.totalRaise < (props.ido.idoPool2)))
                                              &&  (props.ido.isIdoWhitelist === 1))  ? 'bg-orange-button' : 'bg-gray-200'}  px-12 py-2 border-solid-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                                                  type="submit"
                                                  disabled={!((props.ido.mineBoughtRound3 < props.ido.idoUserMax) && props.wallet.address && ((props.ido.idoRound === 1 && props.ido.totalRaise < props.ido.idoPool1) || (props.ido.idoRound === 3 && props.ido.totalRaise < (props.ido.idoPool2)))
                                                      &&  (props.ido.isIdoWhitelist === 1)) }
                                          >
                                            <p className="text-white font-evil text-3xl">Deposit</p>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                {/*<div>*/}
                                {/*    { (props.ido.mineBoughtRound3 < props.ido.idoUserMax) ? <form onSubmit={handleSubmit(onSubmit)}>*/}
                                {/*      <div className="mx-auto flex flex-col mt-4">*/}
                                {/*        <div className="flex flex-col w-full pt-4 rounded-lg pl-4 bg-white-grey pr-4">*/}
                                {/*          <div className="flex">*/}
                                {/*            <p className="text-xl font-exo-2"> 1 BAoE = 0.035 BUSD</p>*/}
                                {/*          </div>*/}
                                {/*          <div className="flex pt-2">*/}
                                {/*            <p className="text-xl font-exo-2">Total raise</p>*/}
                                {/*          </div>*/}
                                {/*          <div className="flex sm:flex-row mb:flex-col justify-between">*/}
                                {/*            <div className="flex">*/}
                                {/*              <p className="sm:text-3xl mb:text-2xl font-exo-2 font-bold"> {props.ido.idoRound === 1 ? props.ido.totalRaise: (props.ido.totalRaise - props.ido.idoPool1) > props.ido.idoPool2 ? props.ido.idoPool2 : (props.ido.totalRaise - props.ido.idoPool1)} BUSD</p>*/}
                                {/*            </div>*/}
                                {/*            <div className="flex">*/}
                                {/*              <p className="sm:text-2xl mb:text-xl font-exo-2 font-bold">{ props.ido.idoRound === 1 ? 'Guaranteed Whitelist': props.ido.idoRound === 3 ? ' First Come First Serve': '' }</p>*/}
                                {/*            </div>*/}
                                {/*          </div>*/}
                                {/*          <div className="flex pt-2">*/}
                                {/*            <p className="text-xl font-exo-2"> Progress</p>*/}
                                {/*          </div>*/}
                                {/*          <div className="flex flex-col relative pt-1">*/}
                                {/*            <div className="flex flex-row">*/}
                                {/*              {*/}
                                {/*                  props.ido.idoRound === 1 ?   <div className={`w-100/100 overflow-hidden h-2 mb-2 text-xs flex bg-white rounded relative flex flex-row`}>*/}
                                {/*                    <div className={`w-${formatProgress({number: props.ido.totalRaise, total: props.ido.idoPool1})}/100 shadow-none flex text-center whitespace-nowrap text-white justify-center bg-progress-blue`}></div>*/}
                                {/*                  </div> : null*/}
                                {/*              }*/}

                                {/*              {*/}
                                {/*                props.ido.idoRound === 3 ? <div className="overflow-hidden h-2 mb-2 text-xs flex bg-white rounded relative flex flex-row w-100/100">*/}
                                {/*                  <div className={`w-${formatProgress2({number: (props.ido.totalRaise - props.ido.idoPool1), total: (props.ido.idoPool2 - props.ido.idoPool1)})}/100 shadow-none flex text-center whitespace-nowrap text-white justify-center bg-progress-blue`}></div>*/}
                                {/*                </div> : null*/}
                                {/*              }*/}
                                {/*            </div>*/}
                                {/*            <div className="flex flex-row items-center mb-2 justify-between">*/}
                                {/*              <div className="flex">*/}
                                {/*                                <span className="text-base inline-block px-2 font-exo-2 font-bold">*/}
                                {/*                                    0%*/}
                                {/*                                </span>*/}
                                {/*              </div>*/}
                                {/*              {*/}
                                {/*                props.ido.idoRound === 1 ? <div className={`${props.ido.idoRound === 1 ? 'w-80/100 text-center' : 'w-40/100'} flex`}>*/}
                                {/*                    <p className="sm:text-base mb:text-xss inline-block px-2 font-exo-2 font-bold text-gray-500 ">*/}
                                {/*                      (Guaranteed Whitelist)*/}
                                {/*                    </p>*/}
                                {/*                  </div>: null*/}
                                {/*              }*/}

                                {/*              {*/}
                                {/*                props.ido.idoRound === 3 ?  <div className={`flex w-60/100 pl-4`}>*/}
                                {/*                                <span className="sm:text-base mb:text-xss inline-block px-2 font-exo-2 font-bold text-gray-500">*/}
                                {/*                                     (First Come First Serve)*/}
                                {/*                                </span>*/}
                                {/*                </div> : null*/}
                                {/*              }*/}
                                {/*              <div className="flex">*/}
                                {/*                                 <span className="font-bold inline-block text-amber-600 px-2">*/}
                                {/*                                     {props.ido.idoRound === 1 ? ((props.ido.totalRaise/props.ido.idoPool1) *100) > 100 ? 100: ((props.ido.totalRaise/props.ido.idoPool1) * 100).toFixed(2) :*/}
                                {/*                                         formatProgress3({number: props.ido.totalRaise})*/}
                                {/*                                     }%*/}
                                {/*                                 </span>*/}
                                {/*              </div>*/}
                                {/*            </div>*/}
                                {/*          </div>*/}
                                {/*          <div className="flex mb:flex-col sm:flex-row justify-between mb-2">*/}
                                {/*            <div className="flex flex-col">*/}
                                {/*              <div>*/}
                                {/*                <p className="font-exo-2 text-base">{props.ido.idoTxtTime}</p>*/}
                                {/*              </div>*/}
                                {/*              <div>*/}
                                {/*                <p className="font-exo-2 text-base font-bold">{formatIDOTime(props.tick.time)}</p>*/}
                                {/*              </div>*/}
                                {/*            </div>*/}
                                {/*            <div className="flex">*/}
                                {/*              <div>*/}
                                {/*                <button onClick={() => setShowDetailTable(!showDetailTable)} type='button'>*/}
                                {/*                  {showDetailTable ? <p className="font-exo-2 text-base font-bold text-view-detail focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ">Less details</p> :*/}
                                {/*                      <p className="font-exo-2 text-base font-bold text-view-detail focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ">View details</p>}*/}
                                {/*                </button>*/}
                                {/*              </div>*/}
                                {/*            </div>*/}
                                {/*          </div>*/}
                                {/*          <div className={`${showDetailTable ? 'display' : 'display-none'} flex pt-1`}>*/}
                                {/*            <div className="w-full pb-4 mb:display-none sm:display">*/}
                                {/*              <table className="items-center w-full bg-transparent border-collapse rounded-lg">*/}
                                {/*                <thead>*/}
                                {/*                <tr>*/}
                                {/*                  <th className="px-2 text-white bg-header-table-ido rounded-tl align-middle border-blueGray-100 py-3 text-base font-exo-2 whitespace-nowrap font-semibold text-left">*/}
                                {/*                    Pool Information*/}
                                {/*                  </th>*/}
                                {/*                  <th className="px-6 text-white bg-header-table-ido align-middle rounded-tr border-blueGray-100 py-3 text-base font-exo-2 border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-left">*/}
                                {/*                    Token Information*/}
                                {/*                  </th>*/}
                                {/*                </tr>*/}
                                {/*                </thead>*/}
                                {/*                <tbody className="bg-table-ido">*/}
                                {/*                <tr>*/}
                                {/*                  <th>*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">Token Distribution</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold pr-2">{props.ido.tokenDistribution}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                  </th>*/}
                                {/*                  <th>*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold pl-2">Name</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">{props.ido.name}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                  </th>*/}
                                {/*                </tr>*/}
                                {/*                <tr>*/}
                                {/*                  <th>*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">Total Users Participated</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold pr-2">{props.ido.totalPeopleRaise}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                  </th>*/}
                                {/*                  <th>*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold pl-2">Address</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">{props.ido.address}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                  </th>*/}
                                {/*                </tr>*/}
                                {/*                <tr>*/}
                                {/*                  <th>*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">Hard Cap</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold pr-2">{Intl.NumberFormat().format(props.ido.idoRound === 1 ? props.ido.idoPool1 : (props.ido.idoPool2- props.ido.idoPool1))}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                  </th>*/}
                                {/*                  <th>*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold pl-2">Total Supply</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">{Intl.NumberFormat().format(props.ido.totalSupply)}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                  </th>*/}
                                {/*                </tr>*/}
                                {/*                <tr>*/}
                                {/*                  <th className="">*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">Access type</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold pr-2">{props.ido.accessType}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                  </th>*/}
                                {/*                  <th>*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold pl-2">Decimals</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">{props.ido.decimals}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                  </th>*/}
                                {/*                </tr>*/}
                                {/*                <tr>*/}
                                {/*                  <th className="pb-2">*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                    </div>*/}
                                {/*                  </th>*/}
                                {/*                  <th className="pb-2">*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold pl-2">Symbol</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">{props.ido.symbol}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                  </th>*/}
                                {/*                </tr>*/}
                                {/*                </tbody>*/}
                                {/*              </table>*/}
                                {/*            </div>*/}
                                {/*            <div className="mb:display sm:display-none w-full pb-2">*/}
                                {/*              <div className="flex flex-col">*/}
                                {/*                <div className="flex flex-col">*/}
                                {/*                  <div className="w-full px-2 py-2 bg-header-table-ido rounded-t-lg">*/}
                                {/*                    <p className="font-bold font-exo-2 text-white">Pool Information</p>*/}
                                {/*                  </div>*/}
                                {/*                  <div className="flex flex-col bg-table-ido py-2 rounded-b-lg">*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">Token Distribution</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold pr-2">{props.ido.tokenDistribution}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">Total Users Participated</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold pr-2">{props.ido.totalPeopleRaise}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">Hard Cap</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold pr-2">{Intl.NumberFormat().format(props.ido.idoRound === 1 ? props.ido.idoPool1 : (props.ido.idoPool2- props.ido.idoPool1))}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">Access type</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold pr-2">{props.ido.accessType}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                  </div>*/}
                                {/*                </div>*/}
                                {/*                <div className="flex flex-col pt-2">*/}
                                {/*                  <div className="w-full px-2 py-2 bg-header-table-ido rounded-t-lg">*/}
                                {/*                    <p className="font-bold font-exo-2 text-white">Token Information</p>*/}
                                {/*                  </div>*/}
                                {/*                  <div className="flex flex-col bg-table-ido py-2 rounded-b-lg">*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">Name</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">{props.ido.name}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">Address</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">{props.ido.address}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">Total Supply</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">{Intl.NumberFormat().format(props.ido.totalSupply)}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">Decimals</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">{props.ido.decimals}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                    <div className="flex flex-row justify-between">*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">Symbol</p>*/}
                                {/*                      </div>*/}
                                {/*                      <div className="flex px-2 py-1">*/}
                                {/*                        <p className="text-xs font-exo-2 font-bold">{props.ido.symbol}</p>*/}
                                {/*                      </div>*/}
                                {/*                    </div>*/}
                                {/*                  </div>*/}
                                {/*                </div>*/}
                                {/*              </div>*/}
                                {/*            </div>*/}
                                {/*          </div>*/}
                                {/*        </div>*/}
                                {/*        <div className="flex flex-col pt-4 relative">*/}
                                {/*          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="busd">*/}
                                {/*            <p className="text-white text-xl letter-spacing-base font-bold font-evil uppercase">Join pool:</p>*/}
                                {/*          </label>*/}
                                {/*          <div className="flex flex-row">*/}
                                {/*            <input*/}
                                {/*                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"*/}
                                {/*                id="busd_amount_ido" type="number" value={props.ido.idoUserMax} {...register('busdIDOSubmit', { required: true, max: props.ido.idoUserMax, min: props.ido.idoUserMax })}/>*/}
                                {/*            <div className="z-10 absolute right-0  sm:mr-7 mb:mr-2 mt-2">*/}
                                {/*              <p className="font-exo-2 font-bold text-gray-500">BUSD</p>*/}
                                {/*            </div>*/}
                                {/*          </div>*/}
                                {/*          <div>*/}
                                {/*            {errors.busdIDOSubmit && <p className="text-xl font-exo-2 text-red-500">Please enter amount of busd in {props.ido.idoUserMax} BUSD.</p>}*/}
                                {/*          </div>*/}
                                {/*        </div>*/}
                                {/*        <div className="flex mx-auto flex-row pt-4">*/}
                                {/*          <div>*/}
                                {/*            <button className={`${((props.ido.mineBoughtRound3 < props.ido.idoUserMax) && props.wallet.address*/}
                                {/*                &&  (props.ido.isIdoWhitelist === 1))  ? 'bg-orange-button' : 'bg-gray-200'}  px-12 py-2 border-solid-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}*/}
                                {/*                    type="submit"*/}
                                {/*                    disabled={!((props.ido.mineBoughtRound3 < props.ido.idoUserMax) && props.wallet.address*/}
                                {/*                        &&  (props.ido.isIdoWhitelist === 1)) }*/}
                                {/*            >*/}
                                {/*              <p className="text-white font-evil text-3xl">Deposit</p>*/}
                                {/*            </button>*/}
                                {/*          </div>*/}
                                {/*        </div>*/}
                                {/*      </div>*/}
                                {/*    </form> :*/}
                                {/*        <div className="mx-auto flex flex-col mt-4 w-full rounded-lg pl-4 bg-white-grey pr-4">*/}
                                {/*          <div className="pt-4">*/}
                                {/*            <p className="text-xl font-exo-2 font-bold uppercase">Information: </p>*/}
                                {/*          </div>*/}
                                {/*          <div className="flex flex-row mb-2 pt-4 justify-between">*/}
                                {/*            <div className="flex flex-row ">*/}
                                {/*              <p className="text-xl font-exo-2">Round: </p>*/}
                                {/*              <p className="text-xl font-exo-2 uppercase font-bold ml-2">Guaranteed Whitelist</p>*/}
                                {/*            </div>*/}
                                {/*          </div>*/}

                                {/*          <div className="flex sm:flex-row mb:flex-col pt-2 justify-between border-b-2">*/}
                                {/*            <div className="flex sm:flex-col mb:flex-row">*/}
                                {/*              <p className="text-xl font-exo-2">Total raise: </p>*/}
                                {/*              <p className="text-xl font-exo-2 uppercase font-bold ml-2">150,000 BUSD</p>*/}
                                {/*            </div>*/}
                                {/*            <div className="flex sm:flex-col mb:flex-row mb:pt-4 sm:pt-0 mb-2">*/}
                                {/*              <p className="text-xl flex text-left">Your Pool: </p>*/}
                                {/*              <p className="text-xl font-exo-2 font-bold ml-2">{props.ido.mineBoughtRound1 ? props.ido.mineBoughtRound1: 0 } BUSD</p>*/}
                                {/*            </div>*/}
                                {/*          </div>*/}

                                {/*          <div className="flex flex-row mb-2 pt-4 justify-between">*/}
                                {/*            <div className="flex flex-rows">*/}
                                {/*              <p className="text-xl font-exo-2">Round: </p>*/}
                                {/*              <p className="text-xl font-exo-2 uppercase font-bold ml-2">IDO Round 2</p>*/}
                                {/*            </div>*/}
                                {/*          </div>*/}

                                {/*          <div className="flex sm:flex-row mb:flex-col pt-2 justify-between border-b-2">*/}
                                {/*            <div className="flex sm:flex-col mb:flex-row">*/}
                                {/*              <p className="text-xl font-exo-2">Total raise: </p>*/}
                                {/*              <p className="text-xl font-exo-2 uppercase font-bold ml-1">250,000 BUSD</p>*/}
                                {/*            </div>*/}
                                {/*            <div className="flex sm:flex-col mb:flex-row mb:pt-4 sm:pt-0 mb-2">*/}
                                {/*              <p className="text-xl flex text-left">Your Pool: </p>*/}
                                {/*              <p className="text-xl font-exo-2 font-bold ml-1">{props.ido.mineBoughtRound2 ? props.ido.mineBoughtRound2 : 0} BUSD</p>*/}
                                {/*            </div>*/}
                                {/*          </div>*/}

                                {/*          <div className="flex flex-row mb-2 pt-4 justify-between">*/}
                                {/*            <div className="flex flex-row">*/}
                                {/*              <p className="text-xl font-exo-2">Round: </p>*/}
                                {/*              <p className="text-xl font-exo-2 uppercase font-bold ml-1">First Come First Serve</p>*/}
                                {/*            </div>*/}
                                {/*          </div>*/}

                                {/*          <div className="flex sm:flex-row mb:flex-col pt-2 justify-between border-b-2">*/}
                                {/*            <div className="flex sm:flex-col mb:flex-row">*/}
                                {/*              <p className="text-xl font-exo-2">Total raise: </p>*/}
                                {/*              <p className="text-xl font-exo-2 uppercase font-bold ml-1">350,000 BUSD</p>*/}
                                {/*            </div>*/}
                                {/*            <div className="flex sm:flex-col mb:flex-row mb:pt-4 sm:pt-0 mb-2">*/}
                                {/*              <p className="text-xl flex text-left">Your Pool: </p>*/}
                                {/*              <p className="text-xl font-exo-2 font-bold ml-1">{props.ido.mineBoughtRound3 ? props.ido.mineBoughtRound3 : 0} BUSD</p>*/}
                                {/*            </div>*/}
                                {/*          </div>*/}
                                {/*        </div>*/}
                                {/*    }*/}
                                {/*  </div>*/}
                              </div>
                          </div>
                      </div> : null}

                      { checkShowCountDown(props.tick.time) || (!checkShowCountDown(props.tick.time) && props.ido.idoRound === 0) ?  <div className="relative mb:frame-logo sm:frame-logo lg:frame-logo xl:frame-logo">
                          <Image src="/img/web/logo/logo-03.png" layout='fill' />
                      </div> : null}

                    { checkShowCountDown(props.tick.time) || (!checkShowCountDown(props.tick.time) && props.ido.idoRound === 0) ? <>
                      <div className="pt-2">
                        <p className="mb:text-3xl xl:text-5xl lg:text-4xl sm:text-3xl uppercase text-white font-bold text-shadow-blue">IDO</p>
                      </div>
                    </> : null }
                    { checkShowCountDown(props.tick.time) || (!checkShowCountDown(props.tick.time) && props.ido.idoRound === 0) ? <>
                        <div className="absolute inset-0 mb:count-banner-position sm:count-banner-position
                          lg:count-banner-position xl:count-banner-position">
                          <div className="relative">
                            <div className="relative mb:count-banner sm:count-banner lg:count-banner md:count-banner xl:count-banner">
                              <Image src="/img/web/item/clock_counter.png" layout='fill' />
                            </div>
                            <div className="absolute inset-0 flex flex-col mb:count-banner-text-2 sm:count-banner-text-2 md:count-banner-text-2 lg:count-banner-text-2 xl:count-banner-text-2">
                              <table>
                                <tbody>
                                <tr className="lg:ml-4">
                                  <td className="text-4xl lg:text-4xl xl:text-5xl uppercase text-white font-digital mb:clock-text-format lg:clock-text-format xl:clock-text-format">{format(props.tick.time)[0] + " :"}</td>
                                  <td className="text-4xl lg:text-4xl xl:text-5xl uppercase text-white font-digital mb:clock-text-format lg:clock-text-format xl:clock-text-format">{format(props.tick.time)[1] + " :"}</td>
                                  <td className="text-4xl lg:text-4xl xl:text-5xl uppercase text-white font-digital mb:clock-text-format lg:clock-text-format xl:clock-text-format">{format(props.tick.time)[2] + " :"}</td>
                                  <td className="text-4xl lg:text-4xl xl:text-5xl uppercase text-white font-digital mb:clock-text-format lg:clock-text-format xl:clock-text-format">{format(props.tick.time)[3]}</td>
                                </tr>
                                <tr className="">
                                  <td className="text-xl lg:text-2xl xl:text-3xl uppercase text-white font-bold font-digital  uppercase text-white font-digital mb:clock-text-format-2 lg:clock-text-format-2 xl:clock-text-format-2">{"Day   "}</td>
                                  <td className="text-xl lg:text-2xl xl:text-3xl uppercase text-white font-bold font-digital  uppercase text-white font-digital mb:clock-text-format-2 lg:clock-text-format-2 xl:clock-text-format-2">{"Hrs   "}</td>
                                  <td className="text-xl lg:text-2xl xl:text-3xl uppercase text-white font-bold font-digital  uppercase text-white font-digital mb:clock-text-format-2 lg:clock-text-format-2 xl:clock-text-format-2">{"Min   "}</td>
                                  <td className="text-xl lg:text-2xl xl:text-3xl uppercase text-white font-bold font-digital  uppercase text-white font-digital mb:clock-text-format-2 lg:clock-text-format-2 xl:clock-text-format-2">{"  Sec"}</td>
                                </tr>
                                </tbody>
                              </table>
                              {/*<p className="text-4xl lg:text-4xl xl:text-5xl uppercase text-white font-digital pt-2 sm:ml-2 xl:ml-1 xl:mt-1 lg:mt-1">{format(props.tick.time)}</p>*/}
                            </div>
                          </div>
                        </div>
                      </> : null
                    }
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*<div id="play_and_earn" className="w-screen">*/}
          {/*  <section className="items-center flex pt-32 pb-24 max-h-1080-px">*/}
          {/*    <div className="container mx-auto">*/}
          {/*      <div className="flex justify-center">*/}
          {/*        <div className="relative w-full md:w-8/12 lg:w-5/12 xl:w-6/12 flex flex-col">*/}
          {/*          <div className="items-center flex flex-col w-screen">*/}
          {/*            <div className="flex">*/}
          {/*              /!*<p className="text-2xl lg:text-4xl text-white text-center font-bold  letter-spacing-base font-evil mx-2">Build your own empire in BAoE Metaverse</p>*!/*/}
          {/*              <div className="relative mb:game-play-title-hx sm:game-play-title-hx lg:game-play-title-hx">*/}
          {/*                <Image src="/img/web/item/game_play_title.png" layout={'fill'}/>*/}
          {/*              </div>*/}
          {/*            </div>*/}
          {/*            <div className="pt-6">*/}
          {/*              <div className="relative">*/}
          {/*                <div className="relative mb:frame-game-screen sm:frame-game-screen lg:frame-game-screen xl:frame-game-screen">*/}
          {/*                  <Image src="/img/web/item/frame_vid.png" layout='fill' />*/}
          {/*                </div>*/}
          {/*                <div className="absolute inset-0 mb:game-screen-position sm:game-screen-position*/}
          {/*                     lg:game-screen-position xl:game-screen-position">*/}
          {/*                  <div className="relative mb:game-screen sm:game-screen lg:game-screen xl:game-screen">*/}
          {/*                    <ReactPlayer*/}
          {/*                        url="https://youtu.be/Vqtc5FKhcbM"*/}
          {/*                        width='100%'*/}
          {/*                        height='100%'*/}
          {/*                        autoPlay*/}
          {/*                        controls={true}*/}
          {/*                        config={{*/}
          {/*                          file: {*/}
          {/*                            attributes: {*/}
          {/*                              poster: '/img/thumbnail/thumbnail_game_play.png'*/}
          {/*                            }*/}
          {/*                          }*/}
          {/*                        }}*/}
          {/*                    />*/}
          {/*                  </div>*/}
          {/*                </div>*/}
          {/*              </div>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </section>*/}
          {/*</div>*/}

          {/*<div className="w-screen">*/}
          {/*  <section className="w-screen items-center flex pb-16">*/}
          {/*    <div className="container mx-auto items-center xl:p-16">*/}
          {/*      <div className="flex flex-col">*/}
          {/*        <div className="mx-auto">*/}
          {/*          <p className="text-2xl lg:text-4xl letter-spacing-base text-white font-evil uppercase font-bold">Mini Games</p>*/}
          {/*        </div>*/}
          {/*        <IndexMiniGame />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </section>*/}
          {/*</div>*/}

        </div>

        <div className="w-screen bg-cover bg-center bg-page-wireframe-2">
          <div className="w-screen">
            <section className="items-center flex max-h-860-px">
              <div className="container mx-auto items-center xl:p-16">
                <IndexGameStory />
              </div>
            </section>
          </div>
          <div className="">
            <section className="items-center flex">
              <div className="container mx-auto items-center mb:pt-16 xl:p-16">
                <div className="flex flex-col">
                  <div className="mx-auto">
                    <p className="text-2xl lg:text-4xl letter-spacing-base text-white font-evil uppercase font-bold">tokenomics</p>
                  </div>
                  <IndexTokenomics />
                </div>
              </div>
            </section>
          </div>
          <IndexOurTeam />
        </div>



        {/*<div id="robo" className="w-screen bg-cover bg-center mb:bg-index-6 sm:bg-index-5">*/}
        {/*  <section className="relative items-center flex">*/}
        {/*    <div className="container mx-auto items-center">*/}
        {/*      <div className="flex flex-col">*/}
        {/*        <RoboSelector />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </section>*/}
        {/*</div>*/}

        <div id="" className="w-screen bg-cover bg-center bg-page-7">
          <div className="w-screen pt-12">
            <section className="relative items-center flex max-h-1080-px">
              <div className="container mx-auto items-center">
                <div className="flex flex-col">
                  <div className="mx-auto">
                    <p className="text-2xl lg:text-4xl letter-spacing-base text-white font-evil uppercase font-bold">Advisors</p>
                  </div>
                  <div className="mx-auto pt-2 lg:pt-6">
                    <p className="text-xs sm:text-base lg:text-base text-white font-exo-2 text-center mx-4"> Gathering a team which has 20 years of experience in technology and investment.</p>
                  </div>
                  <div className="pt-4 sm:pt-2 lg:pt-4">
                    <IndexAdvisor />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="pt-12">
            <section className="relative items-center flex max-h-1080-px">
              <div className="container mx-auto items-center lg:pt-12 mb:pt-16">
                <div className="flex flex-col">
                  <div className="mx-auto">
                    <p className="text-2xl lg:text-4xl text-white letter-spacing-base font-evil uppercase font-bold">ROAD MAP</p>
                  </div>
                  <div className="mx-auto pt-2">
                    <p className="mx-4 text-xs sm:text-base font-exo-2 lg:text-base text-white text-center">We are trying our best to deliver, with the following milestones in plan</p>
                  </div>
                  <div className="container mx-auto items-center pt-12">
                    <IndexRoundMap />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <IndexPartner />
        </div>

        {/* Partners */}

        <Footer />

        {/* Modal connect wallet*/}

      </div>

      {props.contract.showLoading ? <LoadingSpinner /> : null}

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
                          onClick={ async () => {
                            let res = isMetaMaskInstaller();
                            if(!res) {
                              notify();
                            } else {
                              await props.signature()
                              setShowModal(false)
                              // if(localStorage.getItem('psTransfer') != undefined && localStorage.getItem('psTransfer').slice(1,-1) === '0'
                              //     && localStorage.getItem('psWhitelist').slice(1,-1) === '1') {
                              //   setShowModalPrivate(true);
                              // }
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

      {/*<Modal*/}
      {/*  isOpen={showFormModal}*/}
      {/*  onRequestClose={closeFormModal}*/}
      {/*  ariaHideApp={false}*/}
      {/*  style={showDetailTable ? formStyles : formSmallStyles}*/}
      {/*>*/}
      {/*  <div>*/}
      {/*    /!*content*!/*/}
      {/*    <div>*/}
      {/*      /!*header*!/*/}
      {/*      <div className="flex items-start justify-between border-bottom-white">*/}
      {/*        <div className="px-2 py-2">*/}
      {/*          <p className="text-3xl text-white letter-spacing-base font-bold font-evil uppercase text-center mb-2">IDO ROUND</p>*/}
      {/*        </div>*/}
      {/*        <div className="">*/}
      {/*          <button*/}
      {/*              className="px-2 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none fonts-semibold outline-none focus:outline-none"*/}
      {/*              onClick={() => setShowFormModal(false)}*/}
      {/*          >*/}
      {/*             <span className="bg-transparent text-gray-500 opacity-5 h-6 w-6 text-4xl block outline-none focus:outline-none">*/}
      {/*               ×*/}
      {/*             </span>*/}
      {/*          </button>*/}
      {/*        </div>*/}

      {/*      </div>*/}

      {/*      /!*body*!/*/}
      {/*      <div>*/}
      {/*          <form onSubmit={handleSubmit(onSubmit)}>*/}
      {/*              <div className="mx-auto flex flex-col mt-4">*/}
      {/*                  <div className="flex flex-col w-full pt-4 rounded-lg pl-4 bg-white-grey pr-4">*/}
      {/*                      <div className="flex">*/}
      {/*                          <p className="text-xl font-exo-2"> 1 BAoE = 0.055 BUSD</p>*/}
      {/*                      </div>*/}
      {/*                      <div className="flex pt-2">*/}
      {/*                          <p className="text-xl font-exo-2"> Total raise</p>*/}
      {/*                      </div>*/}
      {/*                      <div className="flex">*/}
      {/*                          <p className="text-3xl font-exo-2 font-bold"> {props.ido.totalRaise} BUSD</p>*/}
      {/*                      </div>*/}
      {/*                      <div className="flex pt-2">*/}
      {/*                          <p className="text-xl font-exo-2"> Progress</p>*/}
      {/*                      </div>*/}
      {/*                      <div className="flex flex-col relative pt-1">*/}
      {/*                          <div className="overflow-hidden h-2 mb-2 text-xs flex bg-white rounded">*/}
      {/*                              <div className={`w-${formatProgress({number: props.ido.totalRaise, total: props.ido.tokenFundsSwapped})}/100 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-progress-blue`}></div>*/}
      {/*                          </div>*/}
      {/*                          <div className="flex flex-row items-center justify-between mb-2">*/}
      {/*                              <div className="flex">*/}
      {/*                              <span className="text-base inline-block px-2 font-exo-2 font-bold">*/}
      {/*                                  0%*/}
      {/*                              </span>*/}
      {/*                              </div>*/}
      {/*                              <div className="flex">*/}
      {/*                              <span className="text-base font-bold inline-block text-amber-600 px-2">*/}
      {/*                                  100%*/}
      {/*                              </span>*/}
      {/*                              </div>*/}
      {/*                          </div>*/}
      {/*                      </div>*/}
      {/*                      <div className="flex flex-row justify-between mb-2">*/}
      {/*                          <div className="flex flex-col">*/}
      {/*                              <div>*/}
      {/*                                  <p className="font-exo-2 text-base">Open in</p>*/}
      {/*                              </div>*/}
      {/*                              <div>*/}
      {/*                                  <p className="font-exo-2 text-base font-bold">10d: 23h: 12m: 23s</p>*/}
      {/*                              </div>*/}
      {/*                          </div>*/}
      {/*                          <div className="flex">*/}
      {/*                              <div>*/}
      {/*                                  <button onClick={() => setShowDetailTable(!showDetailTable)} type='button'>*/}
      {/*                                      {showDetailTable ? <p className="font-exo-2 text-base font-bold text-view-detail focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ">Less details</p> :*/}
      {/*                                          <p className="font-exo-2 text-base font-bold text-view-detail focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ">View details</p>}*/}
      {/*                                  </button>*/}
      {/*                              </div>*/}
      {/*                          </div>*/}
      {/*                      </div>*/}
      {/*                  </div>*/}
      {/*                  <div className={`${showDetailTable ? 'display' : 'display-none'} flex pt-4`}>*/}
      {/*                      <table className="items-center w-full bg-transparent border-collapse rounded-lg">*/}
      {/*                          <thead>*/}
      {/*                          <tr>*/}
      {/*                              <th className="px-2 text-white bg-header-table-ido rounded-tl align-middle border-blueGray-100 py-3 text-base font-exo-2 whitespace-nowrap font-semibold text-left">*/}
      {/*                                  Pool Information*/}
      {/*                              </th>*/}
      {/*                              <th className="px-6 text-white bg-header-table-ido align-middle rounded-tr border-blueGray-100 py-3 text-base font-exo-2 border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-left">*/}
      {/*                                  Token Information*/}
      {/*                              </th>*/}
      {/*                          </tr>*/}
      {/*                          </thead>*/}
      {/*                          <tbody className="bg-table-ido">*/}
      {/*                          <tr>*/}
      {/*                              <th>*/}
      {/*                                  <div className="flex flex-row justify-between">*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold">Token Distribution</p>*/}
      {/*                                      </div>*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold pr-2">{props.ido.tokenDistribution}</p>*/}
      {/*                                      </div>*/}
      {/*                                  </div>*/}
      {/*                              </th>*/}
      {/*                              <th>*/}
      {/*                                  <div className="flex flex-row justify-between">*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold pl-2">Name</p>*/}
      {/*                                      </div>*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold">{props.ido.name}</p>*/}
      {/*                                      </div>*/}
      {/*                                  </div>*/}
      {/*                              </th>*/}
      {/*                          </tr>*/}
      {/*                          <tr>*/}
      {/*                              <th>*/}
      {/*                                  <div className="flex flex-row justify-between">*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold">Token Funds Swapped</p>*/}
      {/*                                      </div>*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold pr-2">${ Intl.NumberFormat().format(props.ido.tokenFundsSwapped)}</p>*/}
      {/*                                      </div>*/}
      {/*                                  </div>*/}
      {/*                              </th>*/}
      {/*                              <th>*/}
      {/*                                  <div className="flex flex-row justify-between">*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold pl-2">Address</p>*/}
      {/*                                      </div>*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold">{props.ido.address}</p>*/}
      {/*                                      </div>*/}
      {/*                                  </div>*/}
      {/*                              </th>*/}
      {/*                          </tr>*/}
      {/*                          <tr>*/}
      {/*                              <th>*/}
      {/*                                  <div className="flex flex-row justify-between">*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold">Total Users Participated</p>*/}
      {/*                                      </div>*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold pr-2">{props.ido.totalUsersParticipated}</p>*/}
      {/*                                      </div>*/}
      {/*                                  </div>*/}
      {/*                              </th>*/}
      {/*                              <th>*/}
      {/*                                  <div className="flex flex-row justify-between">*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold pl-2">Total Supply</p>*/}
      {/*                                      </div>*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold">{Intl.NumberFormat().format(props.ido.totalSupply)}</p>*/}
      {/*                                      </div>*/}
      {/*                                  </div>*/}
      {/*                              </th>*/}
      {/*                          </tr>*/}
      {/*                          <tr>*/}
      {/*                              <th>*/}
      {/*                                  <div className="flex flex-row justify-between">*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold">Hard Cap</p>*/}
      {/*                                      </div>*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold pr-2">{Intl.NumberFormat().format(props.ido.hardCap)}</p>*/}
      {/*                                      </div>*/}
      {/*                                  </div>*/}
      {/*                              </th>*/}
      {/*                              <th>*/}
      {/*                                  <div className="flex flex-row justify-between">*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold pl-2">Decimals</p>*/}
      {/*                                      </div>*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold">{props.ido.decimals}</p>*/}
      {/*                                      </div>*/}
      {/*                                  </div>*/}
      {/*                              </th>*/}
      {/*                          </tr>*/}
      {/*                          <tr>*/}
      {/*                              <th className="pb-2">*/}
      {/*                                  <div className="flex flex-row justify-between">*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold">Access type</p>*/}
      {/*                                      </div>*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold pr-2">{props.ido.accessType}</p>*/}
      {/*                                      </div>*/}
      {/*                                  </div>*/}
      {/*                              </th>*/}
      {/*                              <th className="pb-2">*/}
      {/*                                  <div className="flex flex-row justify-between">*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold pl-2">Symbol</p>*/}
      {/*                                      </div>*/}
      {/*                                      <div className="flex px-2">*/}
      {/*                                          <p className="text-xs font-exo-2 font-bold">{props.ido.symbol}</p>*/}
      {/*                                      </div>*/}
      {/*                                  </div>*/}
      {/*                              </th>*/}
      {/*                          </tr>*/}
      {/*                          </tbody>*/}
      {/*                      </table>*/}
      {/*                  </div>*/}
      {/*                  <div className="flex flex-col pt-4">*/}
      {/*                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="busd">*/}
      {/*                          <p className="text-white text-xl letter-spacing-base font-bold font-evil uppercase">Join pool:</p>*/}
      {/*                      </label>*/}
      {/*                      <div className="flex flex-row">*/}
      {/*                          <input*/}
      {/*                              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"*/}
      {/*                              id="busd_amount_ido" type="number" {...register('busdIDOSubmit', { required: true, max: 1000, min: 100 })}/>*/}
      {/*                          <div className="z-10 absolute right-0 mr-7 mt-2">*/}
      {/*                              <p className="font-exo-2 font-bold text-gray-500">BUSD</p>*/}
      {/*                          </div>*/}
      {/*                      </div>*/}
      {/*                      <div>*/}
      {/*                          {errors.busdIDOSubmit && <p className="text-xl font-exo-2 text-red-500">Please enter amount of busd in range 100-1000 BUSD.</p>}*/}
      {/*                      </div>*/}
      {/*                  </div>*/}
      {/*                  <div className="flex mx-auto flex-row pt-4">*/}
      {/*                      <div>*/}
      {/*                          <button className={`${(props.ido.mineRaise < 1000) && props.wallet.address ? 'bg-orange-button' : 'bg-gray-200'}  px-12 py-2 border-solid-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}*/}
      {/*                                  type="submit"*/}
      {/*                                  disabled={!((props.ido.mineRaise < 1000) && props.wallet.address )}*/}
      {/*                          >*/}
      {/*                              <p className="text-white font-evil text-3xl">Deposit</p>*/}
      {/*                          </button>*/}
      {/*                      </div>*/}
      {/*                  </div>*/}
      {/*              </div>*/}
      {/*          </form>*/}
      {/*        /!*<form onSubmit={handleSubmit}>*!/*/}
      {/*        /!*  <div className="mx-auto flex flex-col sm:px-16">*!/*/}
      {/*        /!*    <div className="flex flex-row pt-6">*!/*/}
      {/*        /!*      <div className="flex w-4/12 pt-2">*!/*/}
      {/*        /!*        <label className="block text-white font-exo-2 font-bold text-left"*!/*/}
      {/*        /!*               htmlFor="name">*!/*/}
      {/*        /!*          Name :*!/*/}
      {/*        /!*        </label>*!/*/}
      {/*        /!*      </div>*!/*/}
      {/*        /!*      <div className="flex w-8/12">*!/*/}
      {/*        /!*        <input*!/*/}
      {/*        /!*            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"*!/*/}
      {/*        /!*            id="name" type="text"/>*!/*/}
      {/*        /!*      </div>*!/*/}
      {/*        /!*    </div>*!/*/}
      {/*        /!*    <div className="flex flex-row pt-6">*!/*/}
      {/*        /!*      <div className="flex w-4/12 pt-2">*!/*/}
      {/*        /!*        <label className=" block text-white font-exo-2 font-bold"*!/*/}
      {/*        /!*               htmlFor="email">*!/*/}
      {/*        /!*          Email :*!/*/}
      {/*        /!*        </label>*!/*/}
      {/*        /!*      </div>*!/*/}
      {/*        /!*      <div className="flex w-8/12">*!/*/}
      {/*        /!*        <input*!/*/}
      {/*        /!*            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"*!/*/}
      {/*        /!*            id="email" type="text"/>*!/*/}
      {/*        /!*      </div>*!/*/}
      {/*        /!*    </div>*!/*/}
      {/*        /!*    <div className="flex flex-row pt-6">*!/*/}
      {/*        /!*      <div className="flex w-4/12 pt-2">*!/*/}
      {/*        /!*        <label className="block text-white font-exo-2 font-bold"*!/*/}
      {/*        /!*               htmlFor="phone">*!/*/}
      {/*        /!*          Phone Number :*!/*/}
      {/*        /!*        </label>*!/*/}
      {/*        /!*      </div>*!/*/}
      {/*        /!*      <div className="flex w-8/12">*!/*/}
      {/*        /!*        <input*!/*/}
      {/*        /!*            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"*!/*/}
      {/*        /!*            id="phone" type="text"/>*!/*/}
      {/*        /!*      </div>*!/*/}
      {/*        /!*    </div>*!/*/}
      {/*        /!*    <div className="flex flex-row pt-6">*!/*/}
      {/*        /!*      <div className="flex w-4/12 pt-2">*!/*/}
      {/*        /!*        <label className="block text-white font-exo-2 font-bold"*!/*/}
      {/*        /!*               htmlFor="wallet">*!/*/}
      {/*        /!*          Wallet :*!/*/}
      {/*        /!*        </label>*!/*/}
      {/*        /!*      </div>*!/*/}
      {/*        /!*      <div className="flex w-8/12">*!/*/}
      {/*        /!*        <input*!/*/}
      {/*        /!*            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"*!/*/}
      {/*        /!*            id="wallet" type="text" value={walletValue} onChange={onChangeWalletValue} />*!/*/}
      {/*        /!*      </div>*!/*/}
      {/*        /!*    </div>*!/*/}
      {/*        /!*    <div className="flex flex-row pt-6">*!/*/}
      {/*        /!*      <div className="flex w-4/12 pt-2">*!/*/}
      {/*        /!*        <label className="block text-white font-exo-2 font-bold"*!/*/}
      {/*        /!*               htmlFor="package">*!/*/}
      {/*        /!*          Package :*!/*/}
      {/*        /!*        </label>*!/*/}
      {/*        /!*      </div>*!/*/}
      {/*        /!*      <div className="flex w-8/12">*!/*/}
      {/*        /!*        <select value={selectedValue} onChange={handleChange}*!/*/}
      {/*        /!*            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-ellipsis">*!/*/}
      {/*        /!*          <option value="1">Package 1 - $5.000 - 200.000</option>*!/*/}
      {/*        /!*          <option value="2">Package 2 - $10.000 - 400.000</option>*!/*/}
      {/*        /!*          <option  value="3">Package 3 - $15.000 - 600.000</option>*!/*/}
      {/*        /!*          <option value="4">Package 4 - $25.000 - 1.000.000</option>*!/*/}
      {/*        /!*          <option value="5">Package 5 - $50.000 - 2.000.000</option>*!/*/}
      {/*        /!*          <option value="6">Package 6 - $100.000 - 4.000.000</option>*!/*/}
      {/*        /!*        </select>*!/*/}

      {/*        /!*        /!*<input*!/*!/*/}
      {/*        /!*        /!*    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"*!/*!/*/}
      {/*        /!*        /!*    id="inline-full-name" type="text"/>*!/*!/*/}
      {/*        /!*      </div>*!/*/}
      {/*        /!*    </div>*!/*/}
      {/*        /!*    <div className="flex mx-auto pt-6">*!/*/}
      {/*        /!*      <input className=" bg-blue-light px-4 py-4 outline-none focus:outline-none rounded-lg text-white font-exo-2 text-base font-bold"*!/*/}
      {/*        /!*             type="submit" value="Confirm" />*!/*/}
      {/*        /!*      /!*<input className=" bg-blue-light px-4 py-4 outline-none focus:outline-none rounded-lg">*!/*!/*/}
      {/*        /!*      /!*  <p className="text-white font-exo-2 text-base font-bold">Confirm</p>*!/*!/*/}
      {/*        /!*      /!*</input>*!/*!/*/}
      {/*        /!*    </div>*!/*/}
      {/*        /!*  </div>*!/*/}
      {/*        /!*</form>*!/*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</Modal>*/}


      <Modal
          isOpen={showModalPrivate}
          ariaHideApp={false}
          // onRequestClose={closeModalPrivate}
          style={privateStyles} >
        <div>
          <div className="">
            {/*content*/}
            <div className="">
              {/*header*/}
              <div className="flex items-start justify-between border-bottom-white">
                <div className="px-2 py-2 pt-6">
                  <p className="text-2xl text-white font-bold font-evil letter-spacing-base uppercase text-left mb-2">Private sale</p>
                </div>
                <div className="">
                  {/*<button*/}
                  {/*    className="px-2 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none fonts-semibold outline-none focus:outline-none"*/}
                  {/*    onClick={() => setShowModalPrivate(false)}*/}
                  {/*>*/}
                  {/*                  <span className="bg-transparent text-gray-500 opacity-5 h-6 w-6 text-4xl block outline-none focus:outline-none">*/}
                  {/*                   ×*/}
                  {/*                   </span>*/}
                  {/*</button>*/}
                </div>

              </div>
              {/*body*/}
              {/*body*/}
              <div className="relative p-6 flex flex-col">
                <div className="flex flex-col pt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="busd">
                    <p className="text-white font-exo-2 text-xl">Your BAoE Amount</p>
                  </label>
                  <input
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="busd_amount" type="text" readOnly={true} placeholder="" value={props.vesting.packageAmount + "USD - " +  props.vesting.packageToken + " BAoE"} />
                </div>
                <div className="flex mx-auto flex-row pt-4">
                  <div className="">
                    <button className={`bg-blue-light px-12 py-2 border-solid-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                            onClick={() => depositPrivateSale()}
                    >
                      <p className="text-white text-xl">Deposit</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
          isOpen={props.contract.showSuccess}
          onRequestClose={closeModalSuccess}
          ariaHideApp={false}
          style={successStyles} >
        <div>
          <div className="">
            {/*content*/}
            <div className="">
              {/*header*/}
              <div className="flex items-start justify-between">
                <div className="mx-auto px-2 py-2 pt-6 pl-10">
                </div>
                <div className="">
                  <button
                      className="px-2 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none fonts-semibold outline-none focus:outline-none"
                      onClick={() => closeModalSuccess()}
                  >
                                    <span className="bg-transparent text-gray-500 opacity-5 h-6 w-6 text-4xl block outline-none focus:outline-none">
                                     ×
                                     </span>
                  </button>
                </div>
              </div>
              {/*body*/}
              <div className="relative p-6 flex flex-col">
                <div className="mx-auto flex pt-4">
                  <p className="text-white text-xl font-exo-2 uppercase font-bold">congratulations!</p>
                </div>
                <div className="flex mx-auto pt-4">
                  <p className="text-white text-base font-exo-2 font-bold">The transaction completed!</p>
                </div>
                <div className="flex mx-auto pt-4">
                  <button className="px-12 py-2 border-solid-3 bg-blue-light focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    onClick={()=> closeModalSuccess()}
                  >
                    <p className="text-white font-exo-2">Done</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

    </div>

  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    startClock: bindActionCreators(startClock, dispatch),
    startWalletInit: bindActionCreators(startWalletInit, dispatch),
    signature: bindActionCreators(signature, dispatch),
    changeAccount: bindActionCreators(changeAccount, dispatch),
    buyIDO: bindActionCreators(buyIDO, dispatch),
    buyPrivateSale: bindActionCreators(buyPrivateSale, dispatch),
    setSuccess: bindActionCreators(setSuccess, dispatch),
    logOutWallet: bindActionCreators(logoutWallet, dispatch),
    getIdoInfo: bindActionCreators(getIdoInfo, dispatch),
    setLoading: bindActionCreators(setLoading, dispatch),
    getIdoAddress: bindActionCreators(getIdoAddress, dispatch),
  }
}

const isMetaMaskInstaller = () => {
  // Have to check function to see if the MetaMask extension is installed
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
}

Index.getInitialProps = async () => {
  return {
    enableSaleDeposit: publicRuntimeConfig.PRIVATE_SALE_DEPOSIT,
    enableConnect: publicRuntimeConfig.ENABLED_CONNECT,
    enableSaleRegister: publicRuntimeConfig.PRIVATE_SALE_REGISTER,
  }
}

const mapStateToProps = (state) => ({
  tick: state.tick,
  wallet: state.wallet,
  contract: state.contract,
  vesting: state.vesting,
  ido: state.ido
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
