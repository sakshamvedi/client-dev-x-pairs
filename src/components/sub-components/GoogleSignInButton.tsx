import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from '@/config/firebase.config';
import toast, { Toast, Toaster } from 'react-hot-toast';
import Profile from './Profile';
import {
    signInWithPopup,
    GoogleAuthProvider,
    getAuth
} from "firebase/auth";
import { json } from 'stream/consumers';
type Props = {}
function GoogleSignInButton({ }: Props) {
    const [state, setState] = React.useState(true);
    const error = () => { toast.error('Oops !!! Something Went Wrong') };
    useEffect(() => {
        if (localStorage.getItem("devxpairs")) {
            setState(false);
        }
    }, [])
    async function signinwithgoogle() {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result.user.providerData[0]);
            localStorage.setItem("devxpairs", JSON.stringify(result.user.providerData[0]));
            window.location.reload();
        } catch (error) {
            error();
            console.log(error);
        }
    }
    return (
        <>
            {
                state ? <Button variant='outline' onClick={signinwithgoogle}>
                    <FcGoogle size={25} className='mx-3' /> Sign Up With Google
                </Button> : <Profile />
            }

            <Toaster />
        </>
    )
}

export default GoogleSignInButton