import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import backDate from './../../../utilities/backDate.js'

class DateSelector extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      startTime: '',
      endTime: ''
    }

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.trend !== this.props.trend) {
      this.setState({startTime: '', endTime: ''});
    }
  }

  handleStartDateChange(date) {
    this.setState({
      startTime: date
    }, () => {
      this.props.collectData(this.props.trend, this.state.startTime, this.state.endTime)
    });

    this.setState({})
  }

  handleEndDateChange(date) {
    this.setState({
      endTime: date
    }, () => {
      this.props.collectData(this.props.trend, this.state.startTime, this.state.endTime)
    });
  }

  render () {
    return (
      <div>
        <div className="date-input">Start Date:  
          <DatePicker 
            className="form-control search-input"
            selected={this.state.startTime}
            onChange={this.handleStartDateChange}
            minDate={backDate(15)}
          />
        </div>
        <div className="date-input">End Date:
          <DatePicker 
            className="form-control search-input"
            selected={this.state.endTime}
            onChange={this.handleEndDateChange}
            minDate={backDate(15)}
          />
        </div>
      </div>
    )
  } 
}
export default DateSelector;