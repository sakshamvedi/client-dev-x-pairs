import React, { useEffect } from 'react'
import Wallet from './Wallet';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import Carousal from '@/components/sub-components/Carousal';
import { IndianRupee, WalletIcon } from 'lucide-react';
import axios from 'axios';
type Props = {}
function WalletDashBoard({ }: Props) {
    const userInfoStorage = localStorage.getItem('userInfo');
    let userData = {
        "displayName": "User",
        "displayPicture": "dummy.png",
        "email": "S",
        "uid": 'we',
    };
    if (localStorage.getItem("devxpairs") != null) {
        userData = JSON.parse(localStorage.getItem("devxpairs"));
    }
    const [userInfo, setUserInfo] = React.useState(userData);
    const [userBalance, setUserBalance] = React.useState(0);
    console.log(userInfo);
    useEffect(() => {
        let data = {
            "uid": userInfo.uid
        };
        console.log(data);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3001/walletmoney',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data.balance));
                setUserBalance(response.data.balance);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);
    return (
        <>
            <div className='flex  justify-between m-4 w-full px-7' >

                <h2 className='text-xl bg-black w-1/2 flex justify-start px-7 items-center gap-4 stripe-box-shadow' > <span className='text-yellow-300 font-bold'>{userInfo.displayName}</span> Dashboard</h2>
                <hr className='border-white' ></hr>


                <div className='flex m-4 justify-end gap-4'>
                    <div>
                        <Button variant='outline' className='text-xl text-white-300 bg-gray-700 border-white-300' onClick={() => {
                            window.location.reload();
                        }}><ReloadIcon /></Button>
                    </div>
                    <div>
                        <Wallet />
                    </div>
                </div>
            </div >
            <div className=' border border-white-100 m-12 px-7'>

            </div>
            <div className='w-full m-4 px-7'>
                <div className='wallet-balance'>
                    <p className='text-md text-gray-200 flex gap-2 '> Wallet Balance</p>
                    <p className='text-4xl font-bold my-2 flex items-center gap-2 roboto-mono' > <IndianRupee></IndianRupee>{userBalance}</p>
                </div>
            </div>

        </>
    )
}

export default WalletDashBoard;