import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import Layout from './Layout';
import formatQuery from './../../../utilities/formatQuery.js'
var Loader = require('halogen/PulseLoader');
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      start: '',
      end: '',
      trend: '',
      storyPoint: {},
      loader: false,
      history: [],
      userHistory: [],
      selectedDate: null,
      loggedIn: false
    };
    this.collectData = this.collectData.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.setTrend = this.setTrend.bind(this);
    this.handleChartClick = this.handleChartClick.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.searchterm) {
      this.collectData(this.props.match.params.searchterm.split('+').join(' '));
    }
    this.getSearchHistory();
    if (cookies.get('loggedIn') === 'true') {
      this.getUserSearchHistory();
    }
    this.loggedIn();
  }

  loggedIn() {
    if (cookies.get('loggedIn') === 'true') {
      this.setState({loggedIn: !this.state.loggedIn})
    }
  }

  collectData(trend, startTime, endTime) {
    this.setState({
      loader: <div className="text-center"><Loader color="#dc3c3c" size="16px" margin="4px"/></div>,
      storyPoint: {}
    });
    axios.get('/api/timeline', {
      params: { 
       q: trend,
       start: startTime,
       end: endTime
      }
    })
    .then(response => {
      if (response.data.timeline === null) {
        this.setState({
          loader: <div className="text-center"><h6>Sorry, try a less obscure trend.</h6></div>
        });
      } else {
        let timeline = response.data.timeline;
        let trendCapitalized = response.data.trend[0].toUpperCase() + response.data.trend.slice(1);
        this.setState({
          trend: trendCapitalized,
          start: timeline[0].date,
          end: timeline[timeline.length - 1].date,
          storyPoint: this.findStoryPoint(timeline),
          data: this.makeChartPoints(timeline),
          loader: false
        });
        return this.postSearchHistory(trend);
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  makeChartPoints (timeline) {
    let dataTuple = [['Date', 'Popularity', {'type': 'string', 'role': 'style'}]];
    timeline.forEach( point => {
      if (point.stories) {
        dataTuple.push( [new Date(point.date * 1000), point.popularity, 'point { size: 6; shape-type: diamond; visible: true; }'] );
      } else {
        dataTuple.push( [new Date(point.date * 1000), point.popularity, null] );
      }
    });
    return dataTuple;
  }

  findStoryPoint (timeline) {
    for (let point of timeline) {
      if ('stories' in point) {
        return point;
      }
    }
  }

  getSearchHistory() {
    axios.get('/api/history')
    .then(response => {
      this.setState({
        history: response.data
      });
    });
  }

   getUserSearchHistory() {
    axios.get('/api/history/user')
    .then(response => {
      console.log('!!!!RESPONSE FROM GET USER HISTORY', response)
      this.setState({
        userHistory: response.data
      });
    });
  }

  postSearchHistory(trend) {
    axios.post('/api/history', {
      search: trend
    }).then(response => {
      this.getSearchHistory();
    }).catch(err => {
      console.log(err);
    });
  }

  handleStartDateChange(date) {
    this.setState({
      start: date
    });
  }

  handleEndDateChange(date) {
    this.setState({
      end: date
    });
  }

  setTrend(trend) {
    this.setState({trend: trend}, () => {
      collectData(this.state.trend, this.state.start, this.state.end)
    })
  }
  
  handleChartClick(date) {
    let trend = this.state.trend;
    axios.get('/api/articles', {
      params: {
        trend: trend,
        date: date
      }
    })
    .then(response => {
      var newStoryPoint = JSON.parse(JSON.stringify(this.state.storyPoint));
      newStoryPoint.stories = response.data[0].stories;
      this.setState({'storyPoint': newStoryPoint});
      let options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
      }
      this.setState({'selectedDate': date.toLocaleDateString("en-us", options)});
    })
    .catch(error => {
      console.log(error)
      this.setState({'storyPoint': []});
    })
  }
  
  render () {
    return (
      <Layout
        addStart={this.handleStartDateChange}
        addEnd={this.handleEndDateChange}
        chartData={this.state}
        collectData={this.collectData}
        storyPoint={this.state.storyPoint}
        history={this.state.history}
        userHistory={this.state.userHistory}
        setTrend={this.setTrend}
        trend={this.state.trend}
        getChartClick={this.handleChartClick}
        selectedDate={this.state.selectedDate}
        loggedIn={this.state.loggedIn}
      />
    );
  }
}

export default App;
