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
      endTime: '',
      listening: false
    };
    this.handeInput = this.handeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.startDictation = this.startDictation.bind(this);
    this.eatClick = this.eatClick.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({trend: this.props.trend});
  }

  handeInput(e) {
    this.setState({trend: e.target.value});
  }

  handleSubmit(e) {
<<<<<<< HEAD
    e.preventDefault();
=======
    if(e){
      e.preventDefault();
    }

    document.querySelector('.search-input').blur();
>>>>>>> Add speech recognition functionality to the input
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

  startDictation() {
    console.log("started");
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
      this.setState({listening: true});

      var recognition = new webkitSpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = (e) => {
        document.getElementById('transcript').value = e.results[0][0].transcript;
        this.setState({trend: document.getElementById('transcript').value});
        this.handleSubmit();
        recognition.stop();
        this.setState({listening: false});
      };

      recognition.onerror = function(e) {
        recognition.stop();
        this.setState({listening: false});
      }
    }
  }

  eatClick(e) {
    e.preventDefault();
  }

  render () {
    let micIcon;
    if (this.state.listening) {
      micIcon = <i className="fa fa-circle-o-notch fa-fw fa-spin mic-icon"></i>;
    } else {
      micIcon = <i className="fa fa-microphone fa-fw mic-icon" aria-hidden="true"></i>;
    }

    return (
      <div className="row mb-4">
        <div className="col">
          <form 
            id="the-form"
            action="submit"
            onSubmit={this.handleSubmit}
          >
            <div className="input-group speech">
              <input
                value={this.state.trend}
                id="transcript"
                className="form-control search-input"
                type="text"
                placeholder="Enter a topic"
                onChange={this.handeInput}
                autoFocus
              >
              </input><a href="" onClick={this.eatClick}><div className="mic-button" onClick={this.startDictation}>{micIcon}</div></a>
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
  };
};