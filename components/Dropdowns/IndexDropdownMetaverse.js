import React from 'react';
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import Link from "next/link";
import Image from "next/image";

const IndexDropdownMetaverse = () => {

    const [openDropdown, setOpenDropdown] = useState(true)
    const [mouseOverButton, setMouseOverButton] = useState(false)
    const [mouseOverMenu, setMouseOverMenu] = useState(false)
    const [openSubCate, setOpenSubCate] = useState(false)

    const openSubCategory = () => {
        setOpenSubCate(true)
    }

    const closeSubCategory = () => {
        setOpenSubCate(false)
    }

    const changeSubCategory = () => {
        setOpenSubCate(!openSubCate);
    }

    const timeoutDuration = 200
    let timeoutButton
    let timeoutMenu

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
            <div className="mb:display-none sm:display-none lg:display w-full">
                <Menu as="div" className="relative inline-block text-left">
                    <div
                        onClick={() => setOpenDropdown(!openDropdown)}
                        onMouseEnter={onMouseEnterButton}
                        onMouseOver={() => {console.log("over")}}
                        onMouseDown={() => onMouseOverButton()}
                        onMouseLeave={onMouseLeaveButton}
                    >
                        <Menu.Button
                            className="hover:bg-blue-light text-white flex px-3 py-4 rounded-lg items-center text-lg uppercase font-bold focus:outline-none">
                            <p className="text-white text-xl uppercase letter-spacing-base font-evil">Metaverse</p>
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
                            className="absolute w-full mt-2 padding-dropdown bg-blue-light text-white divide-y divide-gray-100 rounded-md shadow-lg  ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <div className="">
                                            <Link href="/mining_simulator">
                                                <button
                                                    className={`${active ? 'text-white' : 'text-white'} + ' pl-5-px divider-border-bottom-category bg-blue-light float-left text-left text-sm py-2 px-4' +
                                                        'outline-none focus:outline-none fonts-normal block w-full whitespace-nowrap bg-transparent'
                                                    `}
                                                >
                                                    <p className=" text-xs font-semibold letter-spacing-base font-evil">Mining Simulator</p>
                                                </button>
                                            </Link>

                                        </div>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="px- py-1 ">
                                <Menu.Item>
                                    {({ active }) => (
                                        <div className="">
                                            <button
                                                className={`${active ? 'text-white' : 'text-white'} + ' pl-5-px bg-blue-light float-left text-left text-sm py-2 px-4' +
                                                        'outline-none focus:outline-none fonts-normal block w-full whitespace-nowrap bg-transparent'
                                                    `}
                                            >
                                                <p className=" text-xs font-semibold letter-spacing-base font-evil"> Coming soon ...</p>
                                            </button>
                                        </div>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <div className="mb:display sm:display lg:display-none w-full">

                <div>
                    <div className="flex flex-row justify-between">

                        <div className="flex">
                            <button className="text-white flex px-3 py-4 rounded-lg items-center text-lg uppercase font-bold focus:outline-none"
                                onClick={() => {changeSubCategory()}}
                            >
                                <p className="text-white text-xl uppercase letter-spacing-base font-evil">Metaverse</p>
                            </button>
                        </div>
                        <div className="flex">
                            { !openSubCate ? <div className="pt-4">
                                <button onClick={()=> openSubCategory()}
                                    className="focus:outline-none"
                                >
                                    <Image src="/img/web/item/arrow_back.png" width="10" height="20"
                                    />
                                </button>
                            </div> : <div className="pt-4">
                                <button onClick={()=> closeSubCategory()}
                                        className="focus:outline-none"
                                >
                                    <Image src="/img/web/item/arrow_down.png" width="20" height="10" />
                                </button>
                            </div>}
                        </div>
                    </div>
                    {openSubCate ? <ul>
                        <li>
                            <div className="pl-10">
                                <Link href="/mining_simulator">
                                    <button
                                        className={`pl-5-px mb:divider-border-bottom float-left text-left text-sm py-2 px-4' +
                                                        'outline-none focus:outline-none fonts-normal block w-full whitespace-nowrap bg-transparent'
                                                    `}

                                    >
                                        <p className=" text-xs font-semibold  text-white letter-spacing-base font-evil">Mining Simulator</p>
                                    </button>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="pl-10">
                                <button
                                    className={`pl-5-px mb:divider-border-bottom float-left text-left text-sm py-2 px-4' +
                                                        'outline-none focus:outline-none fonts-normal block w-full whitespace-nowrap bg-transparent'
                                                    `}
                                    onClick={() => window.open("https://docsend.com/view/epcux44vpbq8nmmv", "_blank")}

                                >
                                    <p className=" text-xs font-semibold text-white letter-spacing-base font-evil">Coming soon ...</p>
                                </button>
                            </div>
                        </li>
                    </ul> : <div></div>}
                </div>
            </div>

        </>
    );
}


export default IndexDropdownMetaverse;
