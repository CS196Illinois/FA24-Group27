// import './ListPage.css';
import React from "react";
import { useState } from "react";
import PlusButton from "./components/PlusButton";
import ListCard from "./components/ListCard";
import PopupForm from "./components/PopupForm";

// All firebase data store/retrieval actions are
// done through PopupForm.jsx (from the form itself)

function ListPage() {
  const [showForm, setShowForm] = useState(false);
  const toggleShowForm = () => setShowForm(!showForm);
  const [spotListData, setSpotListData] = useState([
    { name: "Illini Union", location: "1401 W Green St ", noise: "1" },
  ]);

  function reRenderListData() {
    setSpotListData(JSON.parse(sessionStorage.getItem("spotListData")));
  }

  return (
    <>
      <div className="background" />{" "}
      {/* needed to hide form (+ easier darkmode?) */}
      <PlusButton formOpen={showForm} onClick={toggleShowForm} />{" "}
      {/* absolute */}
      <ul className="services-content">
        {spotListData.map((item, index) => (
          <ListCard item={item} key={index} />
        ))}
      </ul>
      <PopupForm
        isShown={showForm}
        onClose={() => {
          toggleShowForm();
          reRenderListData();
          console.log(spotListData);
        }}
      />
    </>
  );
}

export default ListPage;
