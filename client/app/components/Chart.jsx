import React from 'react';
import { Chart } from 'react-google-charts';
import DateSelector from './DateSelector.jsx'


class TrendChart extends React.Component {
  constructor(props) {
    super(props)
    this.chartEvents = [
      {
        eventName: 'select',
        callback: (Chart) => {
          const selectedPoint = Chart.chart.getSelection()[0]
            // Returns Chart so you can access props
          if(selectedPoint) {
            this.handleChartClick(this.props.chartData.data[selectedPoint.row + 1][0]);
          }
        },
      }
    ];
    this.chartEvents[0].callback = this.chartEvents[0].callback.bind(this);
  }

  handleChartClick(dateClicked){
    this.props.getChartClick(dateClicked);
  }

  render() {
    let displayChart;
    let { data, trend, start, end, loader } = this.props.chartData;
    if (data.length === 0 || loader !== false) {
      displayChart = loader;
    } else {
      displayChart = (
        <span>
          <div>
            <DateSelector 
              trend={this.props.trend}
              collectData={this.props.collectData}
              setTrend={this.props.setTrend}
            />
          </div>
          <h2 className="h4 mb-4 chart-title">
            <strong>When</strong> did interest in <strong className="text-lowercase">{trend}</strong> peak? <strong>{this.props.storyPoint.formattedAxisTime}</strong>
          </h2>
          <Chart
            chartType="LineChart"
            data={data}
            options={{
              hAxis: { title: null, minValue: new Date(start * 1000), maxValue: new Date(end * 1000), gridlines: { color: 'none' } },
              vAxis: { title: null, minValue: 0, maxValue: 100 },
              chartArea: { width: '90%', height: '80%' },
              legend: 'none',
              series: {
                0: { color: '#dc3c3c' }
              },
              lineWidth: 3
            }}
            graph_id="LineChart"
            width="100%"
            height="400px"
            legend_toggle
            chartEvents={this.chartEvents}
          />
        </span>
      );
    }
    return (
      <div>
        <div className="row mb-5">
          <div className="col">
            {displayChart}
          </div>
        </div>
      </div>  
    );
  }

}
export default TrendChart;
