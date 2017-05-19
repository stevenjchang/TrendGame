import React from 'react';
import HistoryItem from './HistoryItem';

const History = ({ history, userHistory, collectData }) => {
  return (
    <div className="row mb-5">

      <div className="col text-center">
        <small>Recent searches</small>
        <ul className="list-inline text-center text-muted">
          {history.map((term, index) => {
            return <HistoryItem key={term} term={term} index={index} collectData={collectData}/>;
          })}
        </ul>
      </div>

      <div className="col text-center">
        <small>My searches</small>
        <ul className="list-inline text-center text-muted">
          {userHistory === undefined ? 
            <div></div> : 
            userHistory.map((term, index) => {
            return <HistoryItem key={term.name} term={term.name} index={index} collectData={collectData}/>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default History;
