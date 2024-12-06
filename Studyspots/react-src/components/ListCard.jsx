import React from "react";
// import './ListCard.css';

function ListCard(props) {
    return (
        <li className="service">
            <div className="service-description">
                <h2>{props.item.name}</h2>
                <p>{props.item.location}</p>
                <i>{props.item.noise}</i>
            </div>
        </li>
    )
}

export default ListCard;