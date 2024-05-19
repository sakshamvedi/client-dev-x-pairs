import React from 'react'
import InputZone from './InputZone';
import PlayerZone from './PlayerZone';
type Props = {}

function Room({ }: Props) {
    const [usercode, setUsercode] = React.useState('');
    const [roomcode, setRoomcode] = React.useState('');

    return (

        <>
            <div className="room-main-container">
                {usercode == '' && roomcode == '' ? <InputZone /> : <PlayerZone />}
            </div>
        </>
    )
}

export default Room