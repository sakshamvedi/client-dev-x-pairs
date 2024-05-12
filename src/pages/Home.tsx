import PostFeed from '@/components/sub-components/PostFeed'
import { Button } from '@/components/ui/button'
import { Toaster } from "@/components/ui/toaster"
import React from 'react'
import { Link } from "react-router-dom"
type Props = {}

export default function Home({ }: Props) {
    return (
        <div className="main-hero-header  h-screen bg-center bg-fill bg-no-repeat ">
            <div className='flex flex-col justify-center items-center gap-4 h-screen glass-effect'>
                <div className='button'>
                    <Button className='text-xl text-purple-300 border-purple-300' variant='outline'>What's Different about code-pairs</Button>
                </div>
                <div className='just-a-paragraph'>
                    <p className='text-xl my-7 font-bold'>We Help You To Win Big Bounties as well as Learn , Compete On a same Plane !</p>
                </div>

                <div className="just-few-cards">
                    <div className='flex justify-center items-center gap-10 px-10 phone:flex-col'>
                        <div className='card bg-01 flex flex-col justify-end  bg-center bg-fill bg-no-repeat rounded-lg box-shadow-type-01 '>
                            <div className='card-content p-7 bg-black opacity-80'>
                                <p className='text-xl font-bold'>Compete</p>
                                <p className='text-md'>Compete with other developers and win big bounties</p>
                            </div>
                        </div>
                        <div className='card bg-02 flex flex-col justify-end  bg-center bg-fill bg-no-repeat rounded-lg box-shadow-type-01'>
                            <div className='card-content  p-7 bg-black opacity-80'>
                                <p className='text-xl font-bold'>Learn</p>
                                <p className='text-md'>Learn from the best developers and grow your skills</p>
                            </div>
                        </div>
                        <div className='card bg-03 flex flex-col justify-end  bg-center bg-fill bg-no-repeat rounded-lg box-shadow-type-01'>
                            <div className='card-content  p-7 bg-black opacity-80'>
                                <p className='text-xl font-bold'>Collaborate</p>
                                <p className='text-md'>Collaborate with other developers and grow your network</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PostFeed />
            <Toaster />
        </div>


    )
}