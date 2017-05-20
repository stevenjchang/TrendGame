import React from 'react';
import HistoryItem from './HistoryItem';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const History = ({ history, userHistory, collectData}) => {
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
      { (cookies.get('loggedIn') === 'true') ?
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
      :
      <div></div>
      }
    </div>
  );
};

export default History;
