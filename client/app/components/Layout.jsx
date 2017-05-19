import React from 'react';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ selectedDate, chartData, collectData, storyPoint, history, addStart, addEnd, getChartClick, setTrend, trend}) => {
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
          getChartClick={getChartClick}
          selectedDate={selectedDate}
          setTrend={setTrend}
          trend={trend}
        />
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
