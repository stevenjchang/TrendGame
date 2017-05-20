import React from 'react';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';


const Layout = ({ selectedDate, chartData, collectData, storyPoint, history, userHistory, addStart, addEnd, getChartClick, setTrend, trend, userInfo}) => {
  return (
    <div>
      <div className="container">
        <Header userInfo={userInfo} />
        <Body
          addStart={addStart}
          addEnd={addEnd}
          chartData={chartData}
          collectData={collectData}
          storyPoint={storyPoint}
          history={history}
          setTrend={setTrend}
          trend={trend}
          getChartClick={getChartClick}
          selectedDate={selectedDate}
          userHistory={userHistory}
        />
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
