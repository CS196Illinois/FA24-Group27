import React from 'react';
import "./SearchResultsList.css";
import { SearchResult } from './SearchResult';

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
        {
            results.map((results, id) => {
                return <SearchResult result={results} key={id}/>
            })
        }
    </div>
  )
}
