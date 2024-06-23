import React from "react";
import { Button } from "@/components/ui/button";
import { GitBranchIcon, GithubIcon } from "lucide-react";
import { signInWithPopup, GithubAuthProvider, getAuth } from "firebase/auth";
import { auth, gitauthprovider } from "@/config/firebase.config";
import toast, { Toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
type Props = {};

const error = () => {
  toast.error("Oops !!! I think you already Registered with this Email :) ");
};

function GithubSignInButton({}: Props) {
  async function signinwithgithub() {
    const auth = getAuth();
    await signInWithPopup(auth, gitauthprovider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const { displayName, email, phoneNumber, photoURL, providerId, uid } =
          result.user.providerData[0];
        console.log(result.user.providerData[0]);
        localStorage.setItem("saathisessiontoken", uid);
        try {
          let data = JSON.stringify({
            email: email,
            displayName: displayName,
            photoURL: photoURL,
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
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
      });
  }

  return (
    <>
      <Button
        variant="outline"
        className="mx-7 flex gap-7 border-solid border-2 border-green-800 rounded-lg"
        onClick={signinwithgithub}
      >
        <GitBranchIcon />
        Github Sign In
      </Button>
      <Toaster />
    </>
  );
}

export default GithubSignInButton;
