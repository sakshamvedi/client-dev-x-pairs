import React from 'react'

import logo from "../assets/user.png";
import { Link } from 'react-router-dom';
import SigninButton from './sub-components/SigninButton';
import { Button } from "@/components/ui/button"
import { EnvelopeOpenIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import NavBarValues from './data/NavBar';
import GoogleSignInButton from './sub-components/GoogleSignInButton';
type Props = {}

function Navigation({ }: Props) {
    return (
        <>
            <div className="main-header-pane px-2 py-2 flex justify-between items-center  border-b border-gray">
                <div className="flex justify-center items-center gap-4  phone:hidden">

                    {NavBarValues.items.map((item, index) => (
                        <Link to={item.path} className='text-md font-semibold hover:bg-white px-2  opacity-80  duration-200 hover:text-black hover:rounded-full hover:opacity-100 '>{item.pathname}</Link>
                    ))}
                </div>
                <div className="logo h-16 rounded flex justify-center items-center gap-4">
                    <img src={logo} className='h-11' ></img>
                    <p className='font-bold text-lg'>Code-Pair</p>
                </div>

                <div className="flex justify-center item-center  phone:hidden">
                    <GoogleSignInButton />
                </div>

                <div className='phone-menu hidden phone:block'>
                    <Drawer>
                        <DrawerTrigger><HamburgerMenuIcon /></DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                {NavBarValues.items.map((item, index) => (
                                    <Button key={index} className='mr-7' variant={'outline'}> <Link to={item.path}>{item.pathname}</Link></Button>
                                ))}
                                <GoogleSignInButton />
                            </DrawerHeader>
                        </DrawerContent>
                    </Drawer>

                </div>
            </div >
        </>
    )
}

export default Navigation