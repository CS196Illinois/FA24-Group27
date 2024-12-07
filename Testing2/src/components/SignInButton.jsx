import React, { useState, useEffect } from "react";
import { auth, provider } from './firebase/firebase-config.js';
import { signInWithPopup } from "firebase/auth";
import "./SignInButton.css";

export const SignInButton = () => {
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        signInWithPopup(auth, provider)
            .then((data) => {
                setValue(data.user.email);
                localStorage.setItem("id", data.user.uid);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error during sign-in", error); 
                setLoading(false);
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
            {loading ? (
                <p>Loading...</p>
            ) : value ? (
                <p>Signed in as: {value}</p>
            ) : (
                <button type="button" onClick={handleClick}>
                    Sign in with Google
                </button>
            )}
        </div>
    );
}