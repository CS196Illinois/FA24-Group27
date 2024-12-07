import React from 'react'
import "./SearchResult.css"
import { addLocation } from './firebase/firestore-handle.js'

export const SearchResult = ({ result }) => {
  const id = localStorage.getItem("id")
  return (
    <div className="search-result" onClick={(e) => addLocation(id, result.name, result.phone, result.website)}>{result.name}</div>
  )
}
