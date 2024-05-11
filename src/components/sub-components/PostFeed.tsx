import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { get } from 'http';
import { Button } from '../ui/button';
import { link } from 'fs';
type Props = {}

function PostFeed({ }: Props) {
    const [state, setState] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://dev.to/api/articles?latest?per_page=5');
                console.log(response.data)
                setState(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();

    }, []);



    return (
        <div className='p-7'>
            <h1 className='text-2xl font-bold py-7 '>What's New In Tech🔥</h1>
            <div className='flex flex-wrap gap-16 iphone:flex-col'>
                {
                    state.length > 0 ? state.map((post: any) => {
                        return (
                            <>
                                <div className='card flex flex-col bg-gray-900 rounded-2xl mx-7 p-3 w-1/4 phone:w-full'>
                                    <h2 className='text-lg font-bold'>{post.title}</h2>
                                    <img src={post.cover_image} alt={post.title} className='h-32 my-7 rounded-lg' />
                                    <Button variant='outline' className='bg-white text-black text-md font-bold'>
                                        <a href={post.url} target='_blank'>Read More</a>
                                    </Button>
                                </div>

                            </>
                        )
                    }) : <p>Loading...</p>
                }
            </div>
        </div>
    )
}

export default PostFeed