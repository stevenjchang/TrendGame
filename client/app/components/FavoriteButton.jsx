import React from 'react';
import axios from 'axios';

class FavoriteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavored: false
    }
  }

  toggleFavorite(user) {
    axios.get('/api/favorite/user', {
      params: {
        name: this.props.term
      }
    })
  }

  consoleLog() {
    console.log('checkbox label worked');
  }

  render() {
    return (
      <div>
      
      <input id="toggle-heart" type="checkbox" onClick={this.consoleLog} />
      <label for="toggle-heart">❤</label>
      </div>
    );
  }
}

export default FavoriteButton;


