import React from 'react';
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton';

const HistoryItem = ({ term, index, collectData, displayFavorite }) => {
  let showFavoriteButton = displayFavorite === "true"
    ? (
        <FavoriteButton key={term} term={term} />
      )
    : (
        <div></div>
      );
    
  let element = index === 0
    ? (
        <li className="list-inline-item">
          <a href={'/#/' + term} className="text-muted" onClick={() => collectData(term)}>{term}</a>
          &nbsp;          
          {showFavoriteButton}          
        </li>
      )
    : (
        <li className="list-inline-item">
          &middot; <a href={'/#/' + term.split(' ').join('+')} className="text-muted" onClick={() => collectData(term)}>{term}</a>
          &nbsp;
          {showFavoriteButton}
        </li>
      );

  return element;
};

export default HistoryItem;