import React from 'react';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ chartData, collectData, storyPoint, history, addStart, addEnd}) => {
  return (
    <div>
      <div className="container">
        <Header/>
        <Body
          addStart={addStart}
          addEnd={addEnd}
          chartData={chartData}
          collectData={collectData}
          storyPoint={storyPoint}
          history={history}
        />
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
