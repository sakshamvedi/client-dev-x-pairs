import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import { Badge, LogOut, LogOutIcon } from 'lucide-react';
import { Alert } from '../ui/alert';
import { signOut } from 'firebase/auth';
import { Link, To } from 'react-router-dom';

import { auth } from '@/config/firebase.config';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

type Props = {}

function Profile({ }: Props) {
    let userData = {
        "displayName": "User",
        "displayPicture": "dummy.png",
        "email": "S",
        "uid": 'we',
    };
    if (localStorage.getItem("devxpairs") != null) {
        userData = JSON.parse(localStorage.getItem("devxpairs"));
    }
    const [profile, setprofile] = useState(userData);
    useEffect(() => {
        setprofile(userData);
    }, [])
    console.log(profile);
    function logOutFunction() {
        signOut(auth)
        localStorage.removeItem("devxpairs");
        window.location.reload();

    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger><Button className='rounded-full text-xl font-bold border-color-red flex gap-7 ' variant='outline'>{profile.displayName.slice(0, 1)} <HamburgerMenuIcon className='font-bold'></HamburgerMenuIcon></Button> </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem >
                        <Link to="/wallet">Wallet </Link></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logOutFunction}> Log Out</DropdownMenuItem>
                    {/* <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}

export default Profile;