import React from 'react';
import GoogleSignIn from './GoogleSignIn';
import ArticleList from './ArticleList';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Header extends React.Component {
  render () {
    let loggedIn;
    if (cookies.get('loggedIn') === 'true') {
      loggedIn = <div>Welcome Back! <a href="/logout">Logout</a></div>
    } else {
      loggedIn = <GoogleSignIn />
    }
    return (
      <div className="row">
        <div className="col mt-4 mb-4 text-center">
          {loggedIn}
          <h1>TrendGame</h1>
          <p className="text-muted">
            Find out <strong>when</strong> interest in a topic peaked and <strong>why.</strong>
          </p>
        </div>
      </div>
    );
  }
}
