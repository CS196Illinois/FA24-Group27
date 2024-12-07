import React, { useState, useEffect } from "react";
import { auth, provider } from '../firebase/firebase-config.js';
import { signInWithPopup } from "firebase/auth";
import "./SignInButton.css";

export const SignInButton = () => {
    const [value, setValue] = useState(null);
    const handleClick = () => {
        signInWithPopup(auth, provider)
            .then((data) => {
                setValue(data.user.email);
                localStorage.setItem("email", data.user.email)
                localStorage.setItem("id", data.user.uid);
                window.location.reload()
            })
            .catch((error) => {
                console.error("Error during sign-in", error); 
            });
    };

    useEffect(() => {
        const storedID= localStorage.getItem('id');
        if (storedID) {
            setValue(storedID);
        }
    }, []);

    return (
        <div className="SignInButton">
            {value ? (
                <p>Signed in as: {localStorage.getItem("email")}</p>
            ) : (
                <button type="button" onClick={handleClick}>
                    Sign in with Google
                </button>
            )}
        </div>
    );
}