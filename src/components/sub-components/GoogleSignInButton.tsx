import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "@/config/firebase.config";
import toast, { Toast, Toaster } from "react-hot-toast";
import Profile from "./Profile";
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";
import { json } from "stream/consumers";
import Cryptr from "cryptr";
import axios from "axios";
import { set } from "date-fns";
type Props = {};
function GoogleSignInButton({}: Props) {
  const cryptr = new Cryptr("maxbozsaathiasuswithhp");

  const [user, setUser] = React.useState({});
  const error = () => {
    toast.error("Oops !!! Something Went Wrong");
  };

  async function signinwithgoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user.providerData[0]);
      const { displayName, email, photoURL, uid } = result.user.providerData[0];
      localStorage.setItem("saathisessiontoken", uid);
      try {
        let data = JSON.stringify({
          email: email,
          username: displayName,
          photourl: photoURL,
          uid: uid,
        });

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "http://localhost:3001/signup",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <>
        <Button
          variant="outline"
          onClick={signinwithgoogle}
          className=" border-solid border-2 border-orange-800 rounded-lg"
        >
          <FcGoogle size={25} className="mx-3" /> Sign Up With Google
        </Button>
      </>

      <Toaster />
    </>
  );
}

export default GoogleSignInButton;
