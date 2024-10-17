import React, { useState } from "react";
import { db } from "../firebase";

function AddStudySpotForm() {
  const [spotName, setSpotName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (spotName && location) {
      db.collection("studySpots").add({
        name: spotName,
        location: location,
      });

      setSpotName("");
      setLocation("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Study Spot Name"
        value={spotName}
        onChange={(e) => setSpotName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Add Study Spot</button>
    </form>
  );
}

export default AddStudySpotForm;
