import React from 'react';
import uuid from 'uuid/v1';

function PageButtons({ onPageChange, numberOfPages, currentPageNumber }) {
  const buttons = [];

  if (numberOfPages !== null) {
    for (let i = 1; i <= numberOfPages; i++) {
      if (i === Number(currentPageNumber)) {
        buttons.push(<button onClick={onPageChange} key={uuid()} className="currentPageButton">{i}</button>);
      } else {
        buttons.push(<button onClick={onPageChange} key={uuid()}>{i}</button>);
      }
    }
  }

  return (
    <div className="pages">
      {buttons}
    </div>
  );
}

export default PageButtons;
