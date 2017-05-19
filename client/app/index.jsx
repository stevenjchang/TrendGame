import React from 'react';
import {render} from 'react-dom';
import App from './components/App.jsx';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

class BoltOnRouter extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route path='/:searchterm' component={App} />
          <Route path='/' component={App} />
        </Switch>
      </Router>
    )
  } 
}


render(<BoltOnRouter />, document.getElementById('app'));

