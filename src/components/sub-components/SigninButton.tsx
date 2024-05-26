import React from 'react'
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import axios from 'axios'
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, linkWithCredential, EmailAuthProvider, signInWithEmailLink, createUserWithEmailAndPassword } from 'firebase/auth';
import { create } from 'domain';
type Props = {}

function SigninButton({ }: Props) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [register, setregister] = React.useState(false);
    const { toast } = useToast()
    const auth = getAuth();

    function checkEmpty() {
        toast({
            description: "Please Do Not Submit Empty Field !! ",
        })

    }
    async function loginData() {
        if (username === "" || password === "") {
            checkEmpty();
        } else {
            try {
                const response = await signInWithEmailAndPassword(auth, username, password);
                console.log(response);
                localStorage.setItem("devxpairs", JSON.stringify(response.user.providerData[0]));
                window.location.reload();
            } catch (error) {
                console.log(error);
                toast({
                    description: "Invalid Credentials !! Please Click On Sign Up To Register",
                })
            }
        }
    }



    function registerData() {
        setregister(true);
        if (username === "" || password === "") {
            checkEmpty();
        }
        else {
            try {
                const response = createUserWithEmailAndPassword(auth, username, password);
                console.log(response);
            }
            catch (error) {
                console.log(error);
                toast({
                    description: "Invalid Credentials !!",
                })
            }

        }


        return (
            <>

                <Dialog>
                    <DialogTrigger asChild>
                        {
                            localStorage.getItem("devxpairs") ? <div></div> : <Button className='mr-7'>
                                <EnvelopeOpenIcon className="mr-2 h-3 w-4" />
                                Sign in
                            </Button>
                        }

                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Sign-In</DialogTitle>
                            {/* <DialogDescription>
                            Enter Email And Password So we create your unique table :)
                        </DialogDescription> */}
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Email
                                </Label>
                                <Input id="name" className="col-span-3" placeholder='Enter Your Email' onChange={(e) => { setUsername(e.target.value) }} />
                            </div>

                        </div>

                        <DialogFooter>
                            <Button type="submit" onClick={loginData}
                            >Generate OTP</Button>

                        </DialogFooter>
                    </DialogContent>
                </Dialog >


            </>
        )
    }
}

export default SigninButton;