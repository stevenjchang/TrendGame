import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trend: '',
      startTime: '',
      endTime: ''
    };
    this.handeInput = this.handeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  handeInput(e) {
    this.setState({trend: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    document.querySelector('.search-input').blur();
    this.props.collectData(this.state.trend);
    window.location.href = 'http://localhost:8080/#/' + this.state.trend;
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

  render () {
    return (
      <div className="row mb-4">
        <div className="col">
          <form 
            action="submit"
            onSubmit={this.handleSubmit}
          >
            <div className="input-group">
              <input
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
            />
            endTime
            <DatePicker 
              className="form-control search-input"
              selected={this.state.endTime}
              onChange={this.handleEndDateChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
