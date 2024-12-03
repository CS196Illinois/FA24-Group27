import React from 'react'
import "./SearchResult.css"
import { AddLocation } from '../firebase/firestore-handle'

export const SearchResult = ({ result }) => {
  const id = "user"
  return (
    <div className="search-result" onClick={(e) => AddLocation(id, result.name, result.phone, result.website)}>{result.name}</div>
  )
}
