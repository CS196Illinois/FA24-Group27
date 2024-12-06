import React from 'react'
import "./SearchResult.css"
import { addLocation } from '../firebase/firestore-handle'

export const SearchResult = ({ result }) => {
  const id = "people"
  return (
    <div className="search-result" onClick={(e) => addLocation(id, result.name, result.phone, result.website)}>{result.name}</div>
  )
}
