import React from 'react';
import Article from './Article.jsx';

const ArticleList = ({ selectedDate, trend, storyPoint }) => {
  console.log("in article list:", typeof selectedDate, selectedDate);
  let articles;
  let articleHeader;
  if (selectedDate) {
    articleHeader = <h2 className="h4 mb-4">
                      Here are the top stories for <strong className="text-lowercase">{trend}</strong> on {selectedDate}.
                    </h2>
  } else {
    articleHeader = <h2 className="h4 mb-4">
                      <strong>Why</strong> did <strong className="text-lowercase">{trend}</strong> peak?
                    </h2>
  }

  if (storyPoint.hasOwnProperty('stories') && storyPoint.stories.length === 0 && selectedDate) {
    articles = (
      <div>
        <h6>No stories on this trend found for {selectedDate}.</h6>
      </div>
    );
  } else if (storyPoint.hasOwnProperty('stories') && storyPoint.stories.length === 0) {
      articles = (
        <div>
          <h6>No stories on this trend found for {storyPoint.formattedTime}.</h6>
        </div>
      );
  } else if (storyPoint.hasOwnProperty('stories')) {
    articles = (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              {articleHeader}
            </div>
          </div>
          <div className="row">
            {storyPoint.stories.map(story => {
              return <Article key={story.url} story={story}/>;
            })}
          </div>
        </div>
      </div>
    );
  } else {
    articles = <div></div>;
  }
  return articles;
};

export default ArticleList;
