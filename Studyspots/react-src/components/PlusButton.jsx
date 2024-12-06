import React from "react";
// import "./PlusButton.css";

function PlusButton(props) {
    return (
        <button
            className={props.formOpen ? "plus-button holdopen" : "plus-button"}
            onClick={props.onClick}>
            +
        </button>
    )
}

export default PlusButton;