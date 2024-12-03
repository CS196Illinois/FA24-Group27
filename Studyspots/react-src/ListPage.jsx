// import './ListPage.css';
import React from "react";
import { useState } from "react"
import PlusButton from './components/PlusButton';
import ListCard from './components/ListCard';
import PopupForm from './components/PopupForm';

// THIS IS THE COPY FOR EDITING TO MERGE/EMBED INTO THE HTML PAGE!!!
// THIS IS NOT THE ORIGINAL COPY!!

function ListPage() {
  const [showForm, setShowForm] = useState(false)
  const toggleShowForm = () => setShowForm(!showForm)
  const [spotListData, setSpotListData] = useState([
    { name: "Illini Union", location: "1401 W Green St ", noise: "1" }
  ])
  // this likely doesn't need to be here (right now it's in PopupForm)
  // but it may be more useful here once firestore is connected?
  // probably not, but check it
  function Item(name, location, noise) {
    this.name = name;
    this.location = location;
    this.noise = noise;
  }

  function reRenderListData() {
    setSpotListData(JSON.parse(sessionStorage.getItem("spotListData")))
  }

  return (
    <>
      <div className="background" /> {/* needed to hide form (+ easier darkmode?) */}
      <PlusButton formOpen={showForm} onClick={toggleShowForm} /> {/* absolute */}
      <ul className="services-content">
        {spotListData.map((item, index) => (
          <ListCard item={item} key={index} />
        ))}
      </ul>
      <PopupForm isShown={showForm} onClose={() => { toggleShowForm(); reRenderListData(); console.log(spotListData) }} />
    </>
  );
}

export default ListPage;
