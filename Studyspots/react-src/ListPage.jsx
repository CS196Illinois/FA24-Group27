// import './ListPage.css';
import React from "react";
import { useState, useEffect } from "react";
import PlusButton from "./components/PlusButton";
import ListCard from "./components/ListCard";
import PopupForm from "./components/PopupForm";
import { SignInButton } from "./components/SignInButton";
import { SignOutButton } from "./components/SignOutButton";

import { getAllLocations, removeLocation } from "./firebase/firestore-handle";

function ListPage() {
  const [showForm, setShowForm] = useState(false);
  const toggleShowForm = () => setShowForm(!showForm);
  const [spotListData, setSpotListData] = useState([
    // spotListData is an array!
    { name: "Login to use!", location: "See your locations here!", noise: "1" },
  ]);

  const user = localStorage.getItem("id");

  async function reRenderListData() {
    // setSpotListData(JSON.parse(sessionStorage.getItem("spotListData")));
    console.log("Retrieving data for user " + localStorage.getItem("email") + "...:");
    const userDataSnapshot = await getAllLocations(user);
    setSpotListData(userDataSnapshot);
    console.log(userDataSnapshot);
  }

  const deleteLocationFromDatabase = async (location) => {
    console.log("Deleting entry for " + location);
    await removeLocation(user, location);
    reRenderListData();
  };

  // currently being done by test-data-remover in PopupForm.jsx
  // useEffect(() => {
  //   reRenderListData();
  // }, []); // <-- EMPTY DEPENDENCY ARRAY -- runs once on mount

  return (
    <>
      <div>
        <SignInButton />
      </div>
      <div>
        <SignOutButton />
      </div>
      <div className="background" /> {/* needed to hide form */}
      <PlusButton formOpen={showForm} onClick={toggleShowForm} />{" "}
      {/* absolute */}
      <ul className="services-content">
        {spotListData.map((item, index) => (
          <ListCard
            item={item}
            key={index}
            delete={deleteLocationFromDatabase}
          />
        ))}
      </ul>
      <PopupForm
        isShown={showForm}
        onClose={() => {
          reRenderListData();
          toggleShowForm();
        }}
        forceReRenderList={() => {
          reRenderListData();
        }}
      />
    </>
  );
}

export default ListPage;
