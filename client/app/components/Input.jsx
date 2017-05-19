import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import backDate from './../../../utilities/backDate.js'
import { Route, Redirect } from 'react-router'


import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTrend: '',
      startTime: '',
      endTime: ''
      // theStream: null
    };
    this.handeInput = this.handeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({trend: this.props.trend});
  }

  // componentDidMount() {
  //   navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  //   .then(function(stream){
  //     this.setState({theStream: stream});
  //   });
  // }

  handeInput(e) {
    // console.log(window.location + e.target.value)
    this.setState({trend: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.collectData(this.state.trend, this.state.startTime, this.state.endTime)
    window.location.href = 'http://127.0.0.1:8080/#/' + this.state.trend.split(' ').join('+');
  }

  handleStartDateChange(date) {
    this.setState({
      startTime: date
    }, () => {
      this.props.collectData(this.state.trend, this.state.startTime, this.state.endTime)
    });
  }

  handleEndDateChange(date) {
    this.setState({
      endTime: date
    }, () => {
      this.props.collectData(this.state.trend, this.state.startTime, this.state.endTime)
    });
  }



  // handleStartRecord(e) {
  //   this.state.theStream
  // }

  // handleEndRecord(e) {
  //   console.log("up")
  // }

  render () {
    return (
      <div className="row mb-4">
        <div className="col">
          {/*<button className="get-audio" onMouseDown={this.handleStartRecord} onMouseUp={this.handleEndRecord}>Hello</button>*/}
          <form 
            action="submit"
            onSubmit={this.handleSubmit}
          >
            <div className="input-group speech">
              <input
                value={this.state.trend}
                className="form-control search-input"
                type="text"
                placeholder="Enter a topic"
                onChange={this.handeInput}
                autoFocus
              >
              </input>
              <span className="input-group-btn">
                <button className="btn btn-primary" type="submit">
                    Search
                </button>
              </span>
            </div>
          </form>
          <div>
            startTime  
            <DatePicker 
              className="form-control search-input"
              selected={this.state.startTime}
              onChange={this.handleStartDateChange}
              minDate={backDate(15)}
            />
            endTime  
            <DatePicker 
              className="form-control search-input"
              selected={this.state.endTime}
              onChange={this.handleEndDateChange}
              minDate={backDate(15)}
            />
          </div>
        </div>
      </div>
    );
  }
}