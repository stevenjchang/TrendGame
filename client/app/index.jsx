import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App.jsx';

<<<<<<< HEAD
render(
  <Router>
  <App/>
  </Router>
  
  , document.getElementById('app')
);
=======
class BoltOnRouter extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/:searchterm' component={App} />
        </Switch>
      </Router>
    )
  }
}
    
render(<BoltOnRouter />, document.getElementById('app'));

>>>>>>> Implement BoldOnRouter
