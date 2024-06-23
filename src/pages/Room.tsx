import React, { useEffect, useRef } from "react";
import InputZone from "./InputZone";
import PlayerZone from "./PlayerZone";
import { Button } from "@/components/ui/button";

type Props = {};

function Room({}: Props) {
  const [usercode, setUsercode] = React.useState("");
  const [roomcode, setRoomcode] = React.useState("");
  const [modelopen, setModel] = React.useState(false);
  // Assuming you have a state to control dialog visibility

  return (
    <>
      <div className="room-main-container">
        {usercode == "" && roomcode == "" ? <InputZone /> : <PlayerZone />}
      </div>
    </>
  );
}

export default Room;
