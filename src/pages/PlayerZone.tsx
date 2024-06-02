import React from 'react'
import { useLocation } from 'react-router-dom'
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { Code, Code2Icon, Play, Rocket, RussianRubleIcon } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { javascript } from '@codemirror/lang-javascript';
import { getSocket } from '../atoms/socketState';
import toast, { Toaster } from 'react-hot-toast';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResumeIcon } from '@radix-ui/react-icons';
import { set } from 'date-fns';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from 'axios';


function PlayerZone() {
    const socket = getSocket();
    const location = useLocation();
    const success = (data) => { { toast.success(data); } }
    const errorModal = (data) => { { toast.error(data); } }
    const { userCode, opponentCode } = location.state;
    const [value, setValue] = React.useState("return function twosum(nums , target){//write your code here//}");
    const [errors, setError] = React.useState("");
    const [isActive, setIsActive] = React.useState(false);
    const className = isActive ? 'bg-black h-screen w-screen fixed top-0 left-0 ' : '';
    const [isOpen, setIsOpen] = React.useState(false);
    const [userJoined, setUserJoined] = React.useState(false);
    const [opponentSocketName, setOpponentSocketName] = React.useState('');
    const [opponentUid, setOpponentUid] = React.useState('');

    let userData = {
        "displayName": "User",
        "displayPicture": "dummy.png",
        "email": "S",
        "uid": "we",
    };
    if (localStorage.getItem("devxpairs") != null) {
        userData = JSON.parse(localStorage.getItem("devxpairs"));
    }
    const [userInfo, setUserInfo] = React.useState(userData);


    function useCustomToaters(data) {
        alert(data);
    }
    const onChange = React.useCallback((val, viewUpdate) => {

        setValue(val);
    }, []);
    React.useEffect(() => {
        socket.on('checkstatus', (data) => {
            setIsActive(true);
            errorModal("Sorry You Losed !!!! :( ");

        });
        return () => {
            socket.off('connection');
        };
    }, []);
    socket.emit('userJoined', { opponentCode });
    socket.on('request', (data) => {
        setUserJoined(true);
    }
    );
    React.useEffect(() => {

        let data = JSON.stringify({
            "socketid": opponentCode
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://sever-dev-x-pairs-4.onrender.com/getSocketUserInfo',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setOpponentUid(response.data.userid);
                setOpponentSocketName(response.data.username);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [userJoined]);




    function runcode() {
        try {
            const nums = [[2, 7], [3, 4]];
            const targets = [9, 7];

            // The user's code is stored in the `value` state variable
            const userFunction = new Function(value);
            const result = userFunction();
            var sum = 0;
            var flag = true;
            nums.forEach((testCases, idx) => {
                const ans = result(testCases, targets[idx]);
                if (ans != targets[idx]) {
                    flag = false;
                    setError(testCases + "expected   " + targets[idx] + "output  " + ans);
                    errorModal("Sorry Test Case Failed");
                }
            });

            if (flag) {
                const winner = "hey another one is winner"
                socket.emit('winner', { winner, opponentCode });
                success("All Test Cases is Passed , You are the Winner");
                let data = JSON.stringify({
                    "from": opponentUid,
                    "to": userInfo.uid,
                    "amount": "50"
                });

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://sever-dev-x-pairs-4.onrender.com/transfermoney',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                axios.request(config)
                    .then((response) => {
                        console.log(JSON.stringify(response.data));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            else {
                errorModal("Sorry Test Case Failed");
            }
        } catch (error) {

            setError(error.message);
            errorModal("Syntax Error");

        }
    }
    return (

        <>
            <div className="player-zone-header flex justify-end items-center p-2 bg-color--gray">
                <button onClick={runcode} className='bg-gray-700 text-white stick  p-2 rounded-md flex gap-2'>
                    <Play color='green' />
                    <p>Run</p>
                </button>
            </div>
            <div className='player-zone-container flex justify-center'>
                <div className='question-side-header w-1/2 '>
                    <div className="problem-page rounded-md border-solid-white p-7 m-4  bg-color--leetcode">
                        <h1 className='text-2xl tracking-normal roboto-mono'>1.Sum Of Digits of Array</h1>
                        <div className='badge my-4 flex gap-2'>
                            <Badge className='bg-green-200'>Easy</Badge>
                            <Badge className='bg-yellow-100'>Two Pointers , Maths </Badge>
                            <Badge className='bg-red-100'>{opponentSocketName}</Badge>
                        </div>
                        <div className='problem-description'>
                            <p className='roboto-mono text-sm my-7' > Given an array of integers nums return the sum of all digits present in the Array Nums.</p>
                        </div>
                        <div className='problem-input roboto-mono bg-black p-7 rounded-md'>
                            <h2 className='text-lg font-bold my-2 text-yellow-300'>Input</h2>
                            <p className='roboto-mono text-sm mx-2'>nums = [2,7,11,15]</p>
                            <h2 className='text-lg font-bold my-2 text-green-200'>Output</h2>
                            <p className='roboto-mono text-sm mx-2'>[35]</p>
                        </div>
                    </div>
                </div>
                <div className='code-side-header w-1/2 m-4 '>
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className='w-full flex justify-start'>
                            <TabsTrigger value="code" className='w-1/2'> <Code2Icon className='mx-2 text-green-400' />  Code</TabsTrigger>
                            <TabsTrigger value="result" className='w-1/2'> <ResumeIcon className='mx-2 text-red-200' /> Results</TabsTrigger>
                        </TabsList>
                        <TabsContent value="code"> <CodeMirror value={value}
                            height="91vh"
                            extensions={[javascript({ jsx: true })]}
                            theme={vscodeDark}

                            onChange={onChange}
                        /></TabsContent>
                        <TabsContent value="result" className='bg-gray-800 p-7 rounded-md roboto-mono text-red-500'>{errors}</TabsContent>
                    </Tabs>

                </div>
            </div>
            <div className={className}>
            </div>
            <Toaster />

        </>
    )
}

export default PlayerZone;