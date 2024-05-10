import React from 'react'
import { Link } from "react-router-dom"
type Props = {}

export default function Home({ }: Props) {
    return (
        <div >Home
            <Link to="/dash">About</Link>

        </div>
    )
}