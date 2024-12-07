import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { useState } from "react";
import { SearchResultsList } from "./components/SearchResultsList";
import { SignInButton } from "./components/SignInButton"
import { SignOutButton } from "./components/SignOutButton"


function App() {
  const[results, setResults] = useState([]);

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults}/>
        <div><SearchResultsList results={results} /> </div>
      </div>
      <div><SignInButton /></div>
      <div><SignOutButton /></div>
    </div>
  )
}

export default App;
