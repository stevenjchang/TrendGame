import React from 'react';
import { Link } from 'react-router-dom'

const HistoryItem = ({ term, index, collectData }) => {
  let element = index === 0
    ? (
        <li className="list-inline-item">
<<<<<<< HEAD
          <a href={'/#/'+ term} className="text-muted" onClick={() => collectData(term)}>{term}</a>
=======
          <a href={'/#/' + term} className="text-muted" onClick={() => collectData(term)}>{term}</a>
>>>>>>> Make links clickable with react router
        </li>
      )
    : (
        <li className="list-inline-item">
<<<<<<< HEAD
          &middot; <a href={'/#/' + term} className="text-muted" onClick={() => collectData(term)}>{term}</a>
=======
          &middot; <a href={'/#/' + term.split(' ').join('+')} className="text-muted" onClick={() => collectData(term)}>{term}</a>
>>>>>>> Make links clickable with react router
        </li>
      );

  return element;
};

export default HistoryItem;