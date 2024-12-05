import React, {useState} from "react";
import "./SearchBar.css";

export const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("")
    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((value) => value.json())
            .then((json) => {
                const results = json.filter((user) => {
                    return value && user && user.name && user.name.toLowerCase().includes(value.toLowerCase())
                });
                setResults(results);
                console.log(results)
        });
    }
    const handleChange = (value) => {
        setInput(value);
        fetchData(value);

    }
  return (
    <div className="input-wrapper">
        <input placeholder="Find ur person!"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        />
    </div>
  )
}
