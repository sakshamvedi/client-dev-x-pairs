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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
type Props = {}

function SigninButton({ }: Props) {
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
                            <Input id="name" className="col-span-3" placeholder='Unique Username ' />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4" >
                            <Label htmlFor="username" className="text-right">
                                Password
                            </Label>
                            <Input id="username" placeholder='Must be Not a Simple Password' className="col-span-3" type='password' />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Log In</Button>

                        <Button type="submit" className='bg-green-900 text-white hover:text-black'>Register </Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default SigninButton