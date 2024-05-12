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
type Props = {}

function SigninButton({ }: Props) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { toast } = useToast()
    function checkEmpty() {
        toast({
            description: "Please Do Not Submit Empty Field !! ",
        })

    }
    async function loginData() {

        if (username.length == 0 || password.length == 0) {
            checkEmpty();
            return;
        }

        await axios.post('https://sever-dev-x-pairs-4.onrender.com/login', {
            "username": username,
            "password": password,
        }).then((response) => {

        }).catch((error) => {
            function calltoat() {
                toast({
                    description: "Sorry Either Username or Password is Invalid , If First Time please click Register",
                    action: (
                        <ToastAction altText="Goto schedule to undo" className='bg-green-800 text-white border-green-900'>Register</ToastAction>
                    ),
                })

            }
            calltoat();
        });
    }

    async function registerData() {
        if (username.length == 0 || password.length == 0) {
            checkEmpty();
            return;
        }
        await axios.post('https://sever-dev-x-pairs-4.onrender.com/signup', {
            "username": username,
            "password": password,
        }).then((response) => {
            /// api success logic 

        }).catch((error) => {
            function calltoat() {
                toast({
                    description: "User Already Exist !!! ",
                    action: (
                        <ToastAction altText="Goto schedule to undo" className='bg-green-800 text-white border-green-900'>Register</ToastAction>
                    ),
                })

            }
            calltoat();
        });
    }


    return (
        <>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className='mr-7'>
                        <EnvelopeOpenIcon className="mr-2 h-3 w-4" />
                        Sign in
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Sign-In</DialogTitle>
                        <DialogDescription>
                            Enter Username And Password So we create your unique table :)
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                UserName
                            </Label>
                            <Input id="name" className="col-span-3" placeholder='Unique Username ' onChange={(e) => { setUsername(e.target.value) }} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4" >
                            <Label htmlFor="username" className="text-right">
                                Password
                            </Label>
                            <Input id="username" placeholder='Must be Not a Simple Password' className="col-span-3" type='password' onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={loginData}>Log In</Button>
                        <Button type="submit" className='bg-green-900 text-white hover:text-black' onClick={registerData}>Register </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >


        </>
    )
}

export default SigninButton