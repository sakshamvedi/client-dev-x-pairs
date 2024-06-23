import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";

import Navigation from "./components/Navigation";
import Room from "./pages/Room";
import PlayerZone from "./pages/PlayerZone";
import io from "socket.io-client";
const socket = io("https://sever-dev-x-pairs-real-time-server-1.onrender.com/");
import SocketProvider from "./atoms/SocketProvider";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import Wallet from "./pages/Wallet";
import WalletDashBoard from "./pages/WalletDashBoard";
import { Content } from "@radix-ui/react-dialog";
import Contests from "./components/sub-components/Contests";
function App() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={[<Navigation />, <Home />]} />
          <Route path="/room" element={[<Navigation />, <Contests />]} />
          <Route
            path="/playerzone"
            element={[<Navigation />, <PlayerZone />]}
          />
          <Route
            path="/wallet"
            element={[<Navigation />, <WalletDashBoard />]}
          />
          <Route path="/playground" element={[<Navigation />, <Room />]} />
        </Routes>
      </RecoilRoot>
    </>
  );
}

export default App;
