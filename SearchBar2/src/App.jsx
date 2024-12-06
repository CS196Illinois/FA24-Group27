import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { useState } from "react";
import { SearchResultsList } from "./components/SearchResultsList";
import { db } from "./firebase/firebase-config"

function App() {
  const[results, setResults] = useState([]);
  const [personList, setPersonList] = useState([]);
  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults}/>
        <div><SearchResultsList results={results} /> </div>
      </div>
    </div>
  )
}

export default App;
