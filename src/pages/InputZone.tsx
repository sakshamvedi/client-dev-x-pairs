import React from 'react'
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
import { Check, ClipboardCheck, Code2Icon, Cross, Hammer, PanelTopClose, User } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast';

import { getSocket } from '../atoms/socketState';
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
    const [copyTexts, setCopyText] = React.useState(false);
    const [opponentCode, setOpponentCode] = React.useState('');
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
            success('User Is Online Sarting Match');
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

                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Bid Price 💵" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">10$ </SelectItem>
                                    <SelectItem value="dark">20$</SelectItem>
                                    <SelectItem value="system">30$</SelectItem>
                                </SelectContent>
                            </Select>

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
            </div>

            <Toaster toastOptions={{
            }} />
        </>
    )
}

export default InputZone