import "./SignOutButton.css";
import React from "react";

export const SignOutButton = () => {
    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <div className="SignOutButton">
            <button type="button" onClick={logout}>
                    Sign out
                </button>
        </div>
    )
}