import React from 'react';
import uuid from 'uuid/v1';
import './styles.css';

function PageNumberButtons({ onPageChange, numberOfPages, currentPageNumber }) {
  let buttons = [];

  if (numberOfPages === null) return null;

  for (let i = 1; i <= numberOfPages; i += 1) {
    if (numberOfPages > 6
      && (i > 1 && i < numberOfPages)
      && (i < currentPageNumber - 1 || i > currentPageNumber + 1)) {
      continue;
    }

    if (i === Number(currentPageNumber)) {
      buttons.push(<button onClick={onPageChange} key={uuid()} className="currentPageButton" disabled>{i}</button>);
    } else {
      buttons.push(<button onClick={onPageChange} key={uuid()}>{i}</button>);
    }
  }

  if (numberOfPages > 6 && currentPageNumber > 3) {
    buttons = [].concat(buttons[0], <button className="emptyButton" key={uuid()} disabled>...</button>, buttons.slice(1));
  }

  if (numberOfPages > 6 && currentPageNumber < (numberOfPages - 2)) {
    buttons = [].concat(buttons.slice(0, -1), <button className="emptyButton" key={uuid()} disabled>...</button>, buttons.slice(-1));
  }

  return (
    <div className="pages">
      {buttons}
    </div>
  );
}

export default PageNumberButtons;
