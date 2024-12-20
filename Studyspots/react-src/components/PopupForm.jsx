import React from "react";
import { useState, useEffect } from "react";

import {
  addLocation,
  removeLocation,
  getLocation,
} from "../firebase/firestore-handle"; // provides functions for firebase

function PopupForm(props) {
  const [isFilledForm, setIsFilledForm] = useState(false);
  function validateForm() {
    let isValid = true;
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("location");

    // Check each field without a default
    if (!nameInput.value.trim()) {
      isValid = false;
    }
    if (!emailInput.value.trim()) {
      isValid = false;
    }
    setIsFilledForm(isValid);
  }

  const [spotName, setSpotName] = useState("");
  const [location, setLocation] = useState("");
  const [noiseLevel, setNoiseLevel] = useState(0); // default

  class Item {
    constructor(name, location, noise) {
      this.name = name;
      this.location = location;
      this.noise = noise;
    }
  }

  // FOR TESTING PURPOSES ONLY -- anything named "test" won't save
  async function clearTestData() {
    console.log("Removing test locations...");
    removeLocation("dev", "Test");
    removeLocation("dev", "test");
    removeLocation("dev", "Test2");
    await removeLocation("dev", "test2");
    console.log("Test locations removed");
    props.forceReRenderList();
  }
  useEffect(() => {
    clearTestData();
  }, []); // <-- EMPTY DEPENDENCY ARRAY -- runs once on mount

  let currentStorage = [];

  async function sendSaveFormData(submission) {
    submission.preventDefault();

    // call firestore functions using spotName, location, noiseLevel:
    await addLocation(localStorage.getItem("id"), spotName, location, noiseLevel);

    // currentStorage = JSON.parse(sessionStorage.getItem("spotListData"))
    //   ? JSON.parse(sessionStorage.getItem("spotListData"))
    //   : [];
    // currentStorage.push(new Item(spotName, location, noiseLevel));
    // sessionStorage.setItem("spotListData", JSON.stringify(currentStorage));

    props.onClose(); // close the form lol
    // also re-renders the list
    hardResetSavedFormData();
  }

  function hardResetSavedFormData() {
    document.getElementById("form").reset();
    setIsFilledForm(false);

    // hard reset values
    setSpotName(""); // these top two probably aren't really necessary
    setLocation(""); // since the user has to change them again anyway
    setNoiseLevel(0); // this one is important though!! (to match the default display)
  }

  return (
    <div className={props.isShown ? "popup-page" : "popup-page inactive"}>
      <form
        id="form"
        className="popup-box"
        onSubmit={(e) => sendSaveFormData(e)}
      >
        <ul className="form-input">
          <li className="input-item">
            <label htmlFor="name">STUDY SPOT NAME</label>
            <input
              className="input-name"
              type="text"
              name="name"
              id="name"
              required
              onChange={(e) => {
                validateForm();
                setSpotName(e.target.value);
              }}
            />
          </li>
          <li className="input-item">
            <label htmlFor="location">LOCATION</label>
            <input
              className="input-name"
              type="text"
              name="location"
              id="location"
              required
              onChange={(e) => {
                validateForm();
                setLocation(e.target.value);
              }}
            />
          </li>
          <li className="input-item">
            <label htmlFor="noise">NOISE LEVEL</label>
            <input
              className="number-selector"
              type="range"
              min="0"
              max="4"
              defaultValue="0"
              name="noise"
              id="noise"
              required
              onChange={(e) => setNoiseLevel(e.target.value)}
            />
          </li>
        </ul>
        <div className="button-container">
          <button
            className={isFilledForm ? "form-button" : "form-button invalid"}
          >
            CREATE{" "}
            {/* submit data and reset isFilledForm (type defaults to submit -> calls onSubmit)*/}
          </button>
          <button
            type="button"
            className="form-button"
            onClick={() => {
              props.onClose();
              hardResetSavedFormData();
            }}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}

export default PopupForm;
