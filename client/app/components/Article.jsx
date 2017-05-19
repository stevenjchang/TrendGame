import React from 'react';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      media: this.props.story.media
    };
  }

  handleBrokenImage(event) {
    this.setState({media: ''});
  }

  render() {
    let theSentiment = this.props.story.sentiment;

    if(theSentiment) {
      if(theSentiment.polarity === 'negative'){
        theSentiment = <i className="fa fa-frown-o pull-right sentiment" aria-hidden="true"></i>
      } else if (theSentiment.polarity === 'neutral') {
        theSentiment = <i className="fa fa-meh-o pull-right sentiment" aria-hidden="true"></i>
      } else if (theSentiment.polarity === 'positive') {
        theSentiment = <i className="fa fa-smile-o pull-right sentiment" aria-hidden="true"></i>
      }
    }
    return (
      <div className="col-12 col-md-6">
        <a href={this.props.story.url} className="card-clickable" target="_blank">
          <div className="card">
            <img
              className="card-img-top img-fluid"
              src={this.state.media}
              onError={e => { this.handleBrokenImage(e); }}
            />
            <div className="card-block">
              {theSentiment}
              <h3 className="h4 card-title">{this.props.story.headline}</h3>
              <p className="card-text">{this.props.story.summary}</p>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default Article;
