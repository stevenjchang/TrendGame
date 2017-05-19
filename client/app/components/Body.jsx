import React from 'react';
import Cookies from 'universal-cookie';
import GoogleSignIn from './GoogleSignIn';
import TrendChart from './Chart';
import Input from './Input';
import History from './History';
import ArticleList from './ArticleList';

const cookies = new Cookies();

class Body extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    
    let login;
    if (cookies.get('loggedIn') === 'true') {
      login = <div>Welcome Back! <a href="/logout">Logout</a></div>
    }
    else {
      login = <GoogleSignIn />;
    }
    return (
      <div className="row">
        {login}
      <div className="col col-m-10 offset-m-1 col-lg-8 offset-lg-2">
        <Input 
          collectData={this.props.collectData}
          addStart={this.props.addStart}
          addEnd={this.props.addEnd}
          setTrend={this.props.setTrend}
          trend={this.props.trend}
        />
        <History history={this.props.history} userHistory={this.props.userHistory} collectData={this.props.collectData}/>
        <TrendChart getChartClick={this.props.getChartClick} chartData={this.props.chartData} storyPoint={this.props.storyPoint}/>
        <ArticleList selectedDate={this.props.selectedDate} trend={this.props.chartData.trend} storyPoint={this.props.storyPoint}/>
      </div>
    </div>
    );
  }
}



export default Body;
