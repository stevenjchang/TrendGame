import React from 'react';
import TrendChart from './Chart';
import Input from './Input';
import History from './History';
import ArticleList from './ArticleList';

const Body = ({ collectData, history, chartData, storyPoint, addStart, addEnd, setTrend, trend}) => {
  return (
    <div className="row">
      <div className="col col-m-10 offset-m-1 col-lg-8 offset-lg-2">
        <Input 
          collectData={collectData}
          addStart={addStart}
          addEnd={addEnd}
          setTrend={setTrend}
          trend={trend}
        />
        <History history={history} collectData={collectData}/>
        <TrendChart chartData={chartData} storyPoint={storyPoint}/>
        <ArticleList trend={chartData.trend} storyPoint={storyPoint}/>
      </div>
    </div>
  );
};

export default Body;
