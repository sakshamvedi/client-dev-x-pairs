import React, { useEffect } from "react";
import logo from "../assets/user.png";
import { Link } from "react-router-dom";
import SigninButton from "./sub-components/SigninButton";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { EnvelopeOpenIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import NavBarValues from "./data/NavBar";

import GoogleSignInButton from "./sub-components/GoogleSignInButton";
import GithubSignInButton from "./sub-components/GithubSignInButton";
import Profile from "./sub-components/Profile";
type Props = {};
function Navigation({}: Props) {
  const [activePage, setActivePage] = React.useState("");
  const [state, setState] = React.useState(true);
  const [user, setUser] = React.useState({});
  useEffect(() => {
    let url = window.location.href;
    let path = url.split("/").pop();
    console.log(path); // Output: room
    setActivePage(path);
  }, [window.location.href]);

  useEffect(() => {
    let data = JSON.stringify({
      token: localStorage.getItem("saathisessiontoken"),
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/validatetoken",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setState(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="main-header-pane px-2 py-2 flex justify-between items-center  border-b border-gray">
        <div className="flex justify-center items-center gap-4  phone:hidden">
          {NavBarValues.items.map((item, index) =>
            item.path == "/" + activePage ? (
              <Link
                to={item.path}
                className="text-md font-semibold bg-white px-2 opacity-100 duration-200 text-black rounded-full"
              >
                {item.pathname}
              </Link>
            ) : (
              <Link
                to={item.path}
                className="text-md font-semibold hover:bg-white px-2 opacity-80 duration-200 hover:text-black hover:rounded-full hover:opacity-100"
              >
                {item.pathname}
              </Link>
            )
          )}
        </div>
        <div className="logo h-16 rounded flex justify-center items-center gap-4">
          <img src={logo} className="h-11"></img>
          <p className="font-bold text-lg">Saathi</p>
        </div>

        <div className="flex justify-center item-center  phone:hidden">
          {state ? (
            <>
              <GoogleSignInButton />
              <GithubSignInButton />
            </>
          ) : (
            <Profile />
          )}
        </div>

        <div className="phone-menu hidden phone:block">
          <Drawer>
            <DrawerTrigger>
              <HamburgerMenuIcon />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                {NavBarValues.items.map((item, index) => (
                  <Button key={index} className="mr-7" variant={"outline"}>
                    {" "}
                    <Link to={item.path}>{item.pathname}</Link>
                  </Button>
                ))}
                {state ? (
                  <>
                    <GoogleSignInButton />
                    <GithubSignInButton />
                  </>
                ) : (
                  <Profile />
                )}
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
}

export default Navigation;
