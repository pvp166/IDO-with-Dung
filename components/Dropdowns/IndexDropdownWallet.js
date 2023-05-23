import React, { useState, Fragment } from 'react';
import {Menu, Transition} from "@headlessui/react";
import Image from "next/image";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {logoutWallet} from "../../store/wallet/action";
import {removeVesting} from "../../store/investing/action";
import Link from 'next/link';

const IndexDropdownWallet = (props) => {

    const [openDropdown, setOpenDropdown] = useState(true)
    const [mouseOverButton, setMouseOverButton] = useState(false)
    const [mouseOverMenu, setMouseOverMenu] = useState(false)

    const timeoutDuration = 0
    let timeoutButton
    let timeoutMenu

    const formatWalletAddress = (address) => {
        let res = address ? address.replace('"', '').slice(0,5) + "..." + address.replace('"', '').slice(-4, -1) : null;
        return res;
    }

    const logout = () => {
        props.logoutWallet();
        props.removeVesting();
    }

    const onMouseEnterButton = () => {
        clearTimeout(timeoutButton)
        setOpenDropdown(true)
        setMouseOverButton(true)
    }

    const onMouseOverButton = () => {
        clearTimeout(timeoutButton)
        setOpenDropdown(true)
        setMouseOverButton(true)
    }
    const onMouseLeaveButton = () => {
        timeoutButton = setTimeout(() => setMouseOverButton(false), timeoutDuration)
    }

    const onMouseEnterMenu = () => {
        clearTimeout(timeoutMenu)
        setMouseOverMenu(true)
    }
    const onMouseLeaveMenu = () => {
        timeoutMenu = setTimeout(() => setMouseOverMenu(false), timeoutDuration)
    }

    const show = openDropdown && (mouseOverMenu || mouseOverButton)

    return (
        <>
            <div className="mb:display-none sm:display-none lg:display ">
                <Menu as="div" className="relative inline-block text-left">
                    <div
                        onClick={() => setOpenDropdown(!openDropdown)}
                        onMouseEnter={onMouseEnterButton}
                        onMouseDown={() => onMouseOverButton()}
                        onMouseLeave={onMouseLeaveButton}
                    >
                        <Menu.Button
                            className="">
                            <div className="relative wallet-hx mt-1">
                                <Image src="/img/web/item/icon_wallet.png" layout="fill"/>
                                <div className="absolute inset-0 wallet-address-position-2">
                                    <p className="text-green-light text-base font-exo-2 font-bold"> { formatWalletAddress(props.wallet.address) }</p>
                                </div>
                            </div>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        show={show}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            onMouseEnter={onMouseEnterMenu}
                            onMouseLeave={onMouseLeaveMenu}
                            className="absolute w-full mt-2 padding-dropdown bg-blue-light text-white rounded-md shadow-lg  ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1">
                                {/*<Menu.Item>*/}
                                {/*    {({ active }) => (*/}
                                {/*        <div className="">*/}
                                {/*            <Link href='/profile'>*/}
                                {/*                <button*/}
                                {/*                    className={`${active ? 'text-white' : 'text-white'} + ' pl-5-px divider-border-bottom-category bg-blue-light float-left text-left text-sm py-2 px-4' +*/}
                                {/*                        'outline-none focus:outline-none fonts-normal block w-full whitespace-nowrap bg-transparent'*/}
                                {/*                    `}*/}
                                {/*                >*/}
                                {/*                    <p className=" text-xs font-semibold letter-spacing-base font-evil">Profile</p>*/}
                                {/*                </button>*/}
                                {/*            </Link>*/}
                                {/*        </div>*/}
                                {/*    )}*/}
                                {/*</Menu.Item>*/}
                                <Menu.Item>
                                    {({ active }) => (
                                        <div className="">
                                            <button
                                                className={`${active ? 'text-white' : 'text-white'} + ' pl-5-px  bg-blue-light float-left text-left text-sm py-2 px-4' +
                                                        'outline-none focus:outline-none fonts-normal block w-full whitespace-nowrap bg-transparent'
                                                    `}
                                                onClick={() => {
                                                    logout();
                                                    window.location.reload();
                                                }}
                                            >
                                                <p className=" text-xs font-semibold letter-spacing-base font-evil">Logout</p>
                                            </button>
                                        </div>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    wallet: state.wallet,
})

const mapDispatchToProps = (dispatch) => {
    return {
        logoutWallet: bindActionCreators(logoutWallet, dispatch),
        removeVesting: bindActionCreators(removeVesting, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (IndexDropdownWallet)