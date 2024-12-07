import React from "react";
// import './ListCard.css';

function ListCard(props) {
  const handleDelete = () => {
    props.delete(props.item.name);
  };

  return (
    <li className="service">
      <div className="service-description">
        <h2>{props.item.name}</h2>
        <p>{props.item.location}</p>
        <h3>Noise level: {props.item.noise}</h3>
      </div>
      <button className="service-delete-icon" onClick={handleDelete}>
        +
      </button>
    </li>
  );
}

export default ListCard;
