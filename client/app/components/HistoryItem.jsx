import React from 'react';
import { Link } from 'react-router-dom'

const HistoryItem = ({ term, index, collectData }) => {
  let element = index === 0
    ? (
        <li className="list-inline-item">
          <a href={'/#/' + term} className="text-muted" onClick={() => collectData(term)}>{term}</a>
        </li>
      )
    : (
        <li className="list-inline-item">
          &middot; <a href={'/#/' + term.split(' ').join('+')} className="text-muted" onClick={() => collectData(term)}>{term}</a>
        <button className='btn btn-md btn-warning' onClick=''>Add to Favorites</button>        
        </li>
      );

  return element;
};


export default HistoryItem;