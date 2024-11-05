import React, { useState, useEffect } from "react";
import { db } from './firebase';
import AddStudySpotForm from "./components/AddStudySpotForm";
import StudySpotList from "./components/StudySpotList";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="App">
      {!user ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <h1>Study Spot Finder</h1>
          <button onClick={handleLogout}>Logout</button>
          <AddStudySpotForm />
          <StudySpotList />
        </>
      )}
    </div>
  );
}

export default App;