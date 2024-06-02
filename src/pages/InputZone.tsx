import React, { useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ClipboardIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import io from "socket.io-client";
import { useNavigate } from 'react-router-dom'
import { set } from 'date-fns'
import { Check, ClipboardCheck, Code2Icon, Cross, Hammer, IndianRupee, PanelTopClose, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge';
import toast, { Toaster } from 'react-hot-toast';

import { getSocket } from '../atoms/socketState';
import axios from 'axios'
type Props = {}

const success = (data) => { { toast.success(data); } }
const error = (data) => { { toast.error(data); } }
function InputZone() {
    const navigate = useNavigate();
    const socket = getSocket();
    const [usercode, setUsercode] = React.useState('');
    console.log(usercode);
    React.useEffect(() => {

        socket.on('connect', () => {
            setUsercode(socket.id);
            console.log("Connected A User");
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off('connection');
        };
    }, []);

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
    const [copyTexts, setCopyText] = React.useState(false);
    const [opponentCode, setOpponentCode] = React.useState('');
    const [isMatchValid, setIsMatchValid] = React.useState(true);
    const [walletBalance, setWalletBalance] = React.useState(0);
    const [userBalance, setUserBalance] = React.useState(0);
    const [sufficientBalance, setSufficientBalance] = React.useState(true);
    const [userTransactions, setUserTransactions] = React.useState(0);
    useEffect(() => {
        let data = {
            "uid": userInfo.uid,
        };
        console.log(data);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://sever-dev-x-pairs-4.onrender.com/walletmoney',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data.balance));
                setUserBalance(response.data.balance);
                setUserTransactions(response.data.count);
                if (response.data.balance < 50) {
                    setSufficientBalance(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);
    useEffect(() => {
        if (localStorage.getItem('devxpairs') != null) {
            setIsMatchValid(false);
        }

        if (!sufficientBalance) {
            error("Insufficient Balance Please Add Money To Wallet");
            setTimeout(() => {
                navigate('/wallet');
            }, 1000);
        }
    }, [userBalance, sufficientBalance, isMatchValid])

    function copyText() {
        navigator.clipboard.writeText(usercode);
        setCopyText(true);
    }
    function checkValidMatch() {
        if (opponentCode == '') {
            error("Please Enter Opponent Code To Start Match");
            return;
        }
        socket.emit('checkValidMatches', { usercode, opponentCode });


        socket.on('matchValid', (data) => {
            success('Setting Up The Environment............');
            let userSdata = JSON.stringify({
                "socketid": usercode,
                "username": userInfo.displayName,
                "userid": userInfo.uid,
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://sever-dev-x-pairs-4.onrender.com/socketsync',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: userSdata
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });

            setTimeout(() => {
                navigate('/playerzone', { state: { usercode, opponentCode } });
            }, 1000);
        });
        socket.on('matchInvalid', (data) => {
            error('User Is Offline / Code Incorrect');
        });

    }
    const date = new Date().toDateString();
    return (
        <>
            <div className='input-zone-container flex  justify-center align-center'>
                <div className="card-input-container p-7 bg-black  w-4/5 rounded-xl h-full">
                    <div className='upper-bar flex justify-between p-2'>
                        <div className='select-box'>

                            {
                                isMatchValid ? <Badge className='text-md bg-green-900 text-white' >Practice Match :No Data Shared  </Badge> : <><Badge className='text-md bg-red-900 text-white' >Bidding Amount : <IndianRupee height={"17px"} />50</Badge> <Badge className='text-md bg-green-900 text-white'> Balance:  <IndianRupee height={"17px"} /> {userBalance}</Badge></>
                            }


                        </div>
                        <div className='date'>
                            <p>{date}</p>
                        </div>
                    </div>
                    <div className='middle-bar p-2'>
                        <Label htmlFor="text" className='my-5 block text-md text-gray-400'>Your ID : (Share to Your Friend)</Label>
                        <span className='flex gap-2'>
                            <Input type="text" id="email" placeholder="" value={usercode} readOnly />
                            <Button onClick={copyText}>{copyTexts ? <ClipboardCheck /> : <ClipboardIcon />}</Button>
                        </span>
                        <hr className='border-2 my-7 rounded'></hr>
                        <Label htmlFor="text" className='my-5 block text-md text-gray-400'>Your Opponent ID : (Paste Your Opponent Id )</Label>
                        <span className='flex gap-2'>
                            <Input type="text" id="email" placeholder="" onChange={(e) => setOpponentCode(e.target.value)} />
                            <Button variant='outline'><User /></Button>
                        </span>
                    </div>
                    <div className='lower-bar p-2 w-full flex justify-center'>
                        <Button variant='outline' className='bg-white text-black hover:text-green-800' onClick={checkValidMatch}>Start Contest</Button>
                    </div>
                </div>
            </div >

            <Toaster toastOptions={{
            }} />
        </>
    )
}

export default InputZone