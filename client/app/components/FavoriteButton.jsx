import React from 'react';
import axios from 'axios';

class FavoriteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavored: false
    }
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  componentDidMount() {
    // var that = this;
    console.log('term ->', this.props.term);
    
    axios.get('/api/favorite/user', {
      params: {
        trend: this.props.term
      }
    })
      .then(response => {
        console.log('***********************');
        console.log('response.data[0].favorite ->', response.data[0].favorite);
        console.log('response.data ->', response.data);
        this.setState({
          isFavored: response.data[0].favorite
        })
      }).catch(function(error) {
        console.log('Error! inside componentDidMount/FavoriteButton.jsx ->', error);
      });
  }

  toggleFavorite() {
    axios.post('/api/favorite/user', {
        trend: this.props.term,
    })
    .then(response => {
      this.setState({
        isFavored: !this.state.isFavored
      })
    })
    .catch(error => {
      console.log('Error! inside toggleFavorite/FavoriteButton.jsx', error);
    })
  }

  render() {
    let toggleFavoriteClass = this.state.isFavored ? "favorite-on" : "favorite-off";
    return (
        <span className={"heart2 " + toggleFavoriteClass} onClick={this.toggleFavorite}>❤</span>
    );
  }
}

export default FavoriteButton;



