import React from 'react';
import uuid from 'uuid/v1';
import './styles.css';

function PageNumberButtons({ onPageChange, numberOfPages, currentPageNumber, numberOfNeighbourPages = 2 }) {
  let buttons = [];

  if (numberOfPages === null) return null;

  for (let i = 1; i <= numberOfPages; i += 1) {
    if (numberOfPages > 6
      && (i !== 1 && i !== numberOfPages)
      && (i < (currentPageNumber - numberOfNeighbourPages) || i > (currentPageNumber + numberOfNeighbourPages))) {
      continue;
    }

    if (i === Number(currentPageNumber)) {
      buttons.push(<button onClick={onPageChange} key={uuid()} className="currentPageButton" disabled>{i}</button>);
    } else {
      buttons.push(<button onClick={onPageChange} key={uuid()}>{i}</button>);
    }
  }

  if (numberOfPages > 6 && currentPageNumber > (2 + numberOfNeighbourPages)) {
    buttons = [].concat(buttons[0], <button className="emptyButton" key={uuid()} disabled>...</button>, buttons.slice(1));
  }

  if (numberOfPages > 6 && currentPageNumber < (numberOfPages - (1 + numberOfNeighbourPages))) {
    buttons = [].concat(buttons.slice(0, -1), <button className="emptyButton" key={uuid()} disabled>...</button>, buttons.slice(-1));
  }

  return (
    <div className="pages">
      {buttons}
    </div>
  );
}

export default PageNumberButtons;
