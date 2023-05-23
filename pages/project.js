import React, {useCallback, useEffect, useState} from 'react';
import IndexNavbar from "../components/Navbar/IndexNavbar";
import Footer from "../components/Footer/Footer";
import Image from "next/image";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {startClock} from "../store/tick/action";
import {logoutWallet, signature, startWalletInit} from "../store/wallet/action";
import getConfig from "next/config";
import ApiRest from "../adapt/api/api_rest";
import {getVesting} from "../store/investing/action";
import Modal from "react-modal";
import {toast, ToastContainer} from "react-toastify";

const { publicRuntimeConfig } = getConfig()

const depositStyles = {
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

const Project = (props) => {

    const [showModal, setShowModal] =  useState(false);

    const [showModalDeposit, setShowModalDeposit] = useState(false);

    const [showModalSuccess, setShowModalSuccess] = useState(false);

    const [approved, setApproved] = useState(false);

    useEffect(() => {
        props.startWalletInit();
        // props.getVesting();

        if (showModalDeposit || showModal || showModalSuccess) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showModalDeposit, showModal, showModalSuccess])

    const changeModal = useCallback((showModal) => {
        setShowModal(showModal)
    }, [showModal]);

    const onLogout = useCallback(() => {
        console.log('logout')
        props.logOutWallet()
    }, []);

    const closeModal = () => {
        setShowModal(false)
    }

    const closeModalDeposit = () => {
        setShowModalDeposit(false)
    }

    const closeModalSuccess = () => {
        setShowModalSuccess(false)
    }

    const notify = () => toast.warn("You must install MetaMask Extension !");

    return (
        <>
            <div className="max-w-full bg-cover bg-center bg-page-6">
                <IndexNavbar onClickModal={changeModal} showModal={showModal} showFormModal={showModalDeposit} enableConnect={props.enableConnect}
                 enableSaleDeposit={props.enableSaleDeposit} onLogout={onLogout} fixed/>
                <section id="project" className={` ${props.vesting !== null && props.vesting.vestingInfo !== null
                && props.vesting.vestingInfo.length > 0 ? '' : 'h-screen'} block w-full relative sm:pt-32 lg:pt-32 xl:pt-32 pt-24 flex`}>
                    <div className="container mx-auto w-full items-center mb:display-none sm:display">
                        <div className="flex flex-col">
                            {/* deposit info*/}
                            <div className="flex flex-row justify-between">
                                <div className="flex pt-6">
                                    <div className="flex mx-auto">
                                        <div className="relative sm:frame-logo-project md:frame-logo-project lg:frame-logo-project xl:frame-logo-project">
                                            <Image src="/img/web/vesting/frame.png" layout='fill'></Image>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex mx-auto relative">
                                        <div className="relative sm:frame-package-project md:frame-package-project lg:frame-package-project xl:frame-package-project">
                                            <Image src="/img/web/vesting/group.png" layout='fill'/>
                                        </div>
                                        <div className="absolute inset-0 sm:package-project-info md:package-project-info lg:package-project-info xl:package-project-info">
                                            <div className= "flex flex-col">
                                                <div>
                                                    <p className="text-white font-exo-2 font-bold sm:text-xs lg:text-xl">Total Achieved Token:</p>
                                                </div>
                                                <div className="pt-2">
                                                    <p className="text-white font-exo-2 font-bold sm:text-base lg:text-2xl xl:text-3xl">{props.vesting != null && props.vesting.packageAmount ? props.vesting.packageAmount : 'No Package Available.'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-white font-exo-2 font-bold sm:text-xs lg:text-xl pt-6">Total Released Token:</p>
                                                </div>
                                                <div className="pt-2">
                                                    <p className="text-white font-exo-2 font-bold sm:text-base lg:text-2xl xl:text-3xl">{props.vesting != null && props.vesting.packageToken ? props.vesting.packageToken + " BAoE"  : 'No Token Available.'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* claim info*/}
                            <div className="flex pt-12">
                                <div className="block w-full overflow-x-auto mb-12">
                                    {/* Projects table */}
                                    <table className="items-center w-full bg-transparent border-collapse">
                                        <thead>
                                        <tr>
                                            <th className="px-6 bg-primary text-white align-middle border border-solid border-blueGray-100 py-3 text-base font-exo-2 border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-left">
                                                Schedule Claim
                                            </th>
                                            <th className="px-6 bg-primary text-white align-middle border border-solid border-blueGray-100 py-3 text-base font-exo-2 border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-left">
                                                Date to Claim
                                            </th>
                                            <th className="px-6 bg-primary text-white align-middle border border-solid border-blueGray-100 py-3 text-base font-exo-2 border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-left">
                                                Rate
                                            </th>
                                            <th className="px-6 bg-primary text-white align-middle border border-solid border-blueGray-100 py-3 text-base font-exo-2 border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-left">
                                                Amount of BAoE
                                            </th>
                                            <th className="px-6 bg-primary text-white align-middle border border-solid border-blueGray-100 py-3 text-base font-exo-2 border-l-0 border-r-0 border-t-0 whitespace-nowrap font-semibold text-left">
                                                Status
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            props.vesting !== null && props.vesting.vestingInfo !== null
                                            && props.vesting.vestingInfo.length > 0 ?
                                                props.vesting.vestingInfo.map((each, index) => (
                                                        <tr key={index}>
                                                        <th className="border-t-0 px-6 text-white align-middle border-l-0 border-r-0 text-base font-bold font-exo-2  whitespace-nowrap p-4 text-left">
                                                            {props.vesting.vestingInfo[index].vestingNamed}
                                                        </th>
                                                        <td className="border-t-0 px-6 text-white align-middle border-l-0 border-r-0 text-base font-bold font-exo-2  whitespace-nowrap p-4">
                                                            {props.vesting.vestingInfo[index].date}
                                                        </td>
                                                        <td className="border-t-0 px-6 text-white align-middle border-l-0 border-r-0 text-base font-bold font-exo-2  whitespace-nowrap p-4">
                                                            {props.vesting.vestingInfo[index].rate}
                                                        </td>
                                                        <td className="border-t-0 px-6 text-white align-middle border-l-0 border-r-0 text-base font-bold font-exo-2 whitespace-nowrap p-4">
                                                            {props.vesting.vestingInfo[index].qtyToken}
                                                        </td>
                                                        <td className="border-t-0 px-6 text-white align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                                                            {props.vesting.vestingInfo[index].receive === 1 ? <div className="">
                                                                <p className="text-white text-base font-exo-2 font-bold bg-yellow-light rounded-lg text-center py-2">Claimed</p>
                                                            </div> : <div>
                                                                <p className="text-white text-base font-exo-2 font-bold bg-blue-light rounded-lg text-center py-2">Claim</p>
                                                            </div> }
                                                        </td>
                                                    </tr>
                                                    )
                                                ) : <tr>
                                                    <th className="text-white font-exo-2 text-base pt-2"> No data.</th>
                                                </tr>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto w-full items-center mb:display sm:display-none">
                        <div className="mx-auto flex flex-col justify-center pt-12">
                            <div className="mx-auto flex">
                                <div className="relative">
                                    <Image src="/img/web/vesting/frame.png" width="360" height="180" />
                                </div>
                            </div>
                            <div className="mx-auto flex flex-col pt-6">
                                <div className="flex mx-auto relative">
                                    <div className="relative mb:frame-package-project">
                                        <Image src="/img/web/vesting/group.png" layout='fill'/>
                                    </div>
                                    <div className="absolute inset-0 mb:package-project-info w-full">
                                        <div className= "flex flex-col">
                                            <div>
                                                <p className="text-white font-exo-2 mb:text-base font-bold sm:text-xs lg:text-xl text-center">Total Achieved Token :</p>
                                            </div>
                                            <div className="pt-2">
                                                <p className="text-white font-exo-2 mb:text-xl font-bold sm:text-base lg:text-2xl xl:text-3xl text-center">{props.vesting != null && props.vesting.packageAmount ? props.vesting.packageAmount + " BAoE" : 'No Package Available.'}</p>
                                            </div>
                                            <div>
                                                <p className="text-white font-exo-2 font-bold sm:text-xs lg:text-xl pt-2 text-center">Total Released Token :</p>
                                            </div>
                                            <div className="pt-2">
                                                <p className="text-white font-exo-2  mb:text-xl font-bold sm:text-base lg:text-2xl xl:text-3xl text-center">{props.vesting != null && props.vesting.packageToken ? props.vesting.packageToken + " BAoE" : 'No Token Available.'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* claim info*/}
                            <div className="flex pt-6">
                                <div className="block overflow-x-auto mb-12">
                                    {/* Projects table */}
                                    <table className="items-center w-full bg-transparent border-collapse">
                                        <thead>
                                        <tr>
                                            <th className={`${props.vesting !== null && props.vesting.vestingInfo !== null
                                            && props.vesting.vestingInfo.length > 0 ? '' : 'px-2'} bg-primary text-white align-middle border border-solid border-blueGray-100 py-3 text-xs font-exo-2 border-l-0 border-r-0 border-t-0  font-semibold text-center`}>
                                                Schedule Claim
                                            </th>
                                            <th className={`${props.vesting !== null && props.vesting.vestingInfo !== null
                                            && props.vesting.vestingInfo.length > 0 ? '' : 'px-2'} bg-primary text-white align-middle border border-solid border-blueGray-100 py-3 text-xs font-exo-2 border-l-0 border-r-0 border-t-0  font-semibold text-center`}>
                                                Date to Claim
                                            </th>
                                            <th className={`${props.vesting !== null && props.vesting.vestingInfo !== null
                                            && props.vesting.vestingInfo.length > 0 ? '' : 'px-2'} bg-primary text-white align-middle border border-solid border-blueGray-100 py-3 text-xs font-exo-2 border-l-0 border-r-0 border-t-0  font-semibold text-center`}>
                                                Rate
                                            </th>
                                            <th className={`${props.vesting !== null && props.vesting.vestingInfo !== null
                                            && props.vesting.vestingInfo.length > 0 ? '' : 'px-2'} bg-primary text-white align-middle border border-solid border-blueGray-100 py-3 text-xs font-exo-2 border-l-0 border-r-0 border-t-0  font-semibold text-center`}>
                                                Amount of BAoE
                                            </th>
                                            <th className={`${props.vesting !== null && props.vesting.vestingInfo !== null
                                            && props.vesting.vestingInfo.length > 0 ? '' : 'px-2'} bg-primary text-white align-middle border border-solid border-blueGray-100 py-3 text-xs font-exo-2 border-l-0 border-r-0 border-t-0  font-semibold text-center`}>
                                                Status
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            props.vesting !== null && props.vesting.vestingInfo !== null
                                            && props.vesting.vestingInfo.length > 0 ?
                                                props.vesting.vestingInfo.map((each, index) => (
                                                        <tr key={index}>
                                                            <th className="border-t-0 text-white align-middle border-l-0 border-r-0 text-xs font-bold font-exo-2  p-4 text-left">
                                                                {props.vesting.vestingInfo[index].vestingNamed}
                                                            </th>
                                                            <td className="border-t-0  text-white align-middle border-l-0 border-r-0 text-xs font-bold font-exo-2  p-4">
                                                                {props.vesting.vestingInfo[index].date}
                                                            </td>
                                                            <td className="border-t-0  text-white align-middle border-l-0 border-r-0 text-xs font-bold font-exo-2  p-4">
                                                                {props.vesting.vestingInfo[index].rate}
                                                            </td>
                                                            <td className="border-t-0  text-white align-middle border-l-0 border-r-0 text-xs font-bold font-exo-2 p-4">
                                                                {props.vesting.vestingInfo[index].qtyToken + " BAoE"}
                                                            </td>
                                                            <td className="border-t-0  text-white align-middle border-l-0 border-r-0 text-xs p-4">
                                                                {props.vesting.vestingInfo[index].receive === 1 ? <div className="">
                                                                    <p className="text-white text-xs font-exo-2 font-bold bg-yellow-light rounded-lg text-center py-2">Claimed</p>
                                                                </div> : <div>
                                                                    <p className="text-white text-xs font-exo-2 font-bold bg-blue-light rounded-lg text-center py-2">Claim</p>
                                                                </div> }
                                                            </td>
                                                        </tr>
                                                    )
                                                ) : <tr>
                                                    <th className="text-white font-exo-2 text-base pt-2"> No data.</th>
                                                </tr>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>

            <Modal
                isOpen={showModalDeposit}
                onRequestClose={closeModalDeposit}
                ariaHideApp={false}
                style={depositStyles} >
                <div>
                    <div className="">
                        {/*content*/}
                        <div className="">
                            {/*header*/}
                            <div className="flex items-start justify-between border-bottom-white">
                                <div className="mx-auto px-2 py-2 pt-6 pl-10">
                                    <p className="text-xl text-white font-bold font-exo-2 uppercase text-center mb-2">Join BAoE Pool</p>
                                </div>
                                <div className="">
                                    <button
                                        className="px-2 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none fonts-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModalDeposit(false)}
                                    >
                                    <span className="bg-transparent text-gray-500 opacity-5 h-6 w-6 text-4xl block outline-none focus:outline-none">
                                     ×
                                     </span>
                                    </button>
                                </div>

                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex flex-col">
                                <div className="flex flex-col pt-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="busd">
                                       <p className="text-white font-exo-2 text-xl">BUSD Amount</p>
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="busd_amount" type="number" placeholder="" value={props.vesting.packageAmount}/>
                                </div>
                                <div className="flex mx-auto pt-4">
                                    <button className="px-12 py-2 border-solid-3 bg-black-light  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    >
                                        <p className="text-white text-xl">Joint</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={showModalSuccess}
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
                                        onClick={() => setShowModalSuccess(false)}
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
                                    <button className="px-12 py-2 border-solid-3 bg-black-light  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                        <p className="text-white font-exo-2">Done</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

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
                                                    await props.signature();
                                                    // await props.getVesting();
                                                    setShowModal(false);
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
        </>
    );
}

const isMetaMaskInstaller = () => {
    // Have to check function to see if the MetaMask extension is installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
}

Project.getInitialProps = async () => {
    return {
        enableSaleDeposit: publicRuntimeConfig.PRIVATE_SALE_DEPOSIT,
        enableConnect: publicRuntimeConfig.ENABLED_CONNECT,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startWalletInit: bindActionCreators(startWalletInit, dispatch),
        getVesting: bindActionCreators(getVesting, dispatch),
        signature: bindActionCreators(signature, dispatch),
        logOutWallet: bindActionCreators(logoutWallet, dispatch),
    }
}

const mapStateToProps = (state) => ({
    wallet: state.wallet,
    contract: state.contract,
    vesting: state.vesting
})

export default connect(mapStateToProps, mapDispatchToProps) (Project)
