import React, { useContext } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';

const Message = (props) => {
  const { message } = useContext(MessagesContext);

  return (
    <div className="message" >
      {message ? <h3>{message}</h3> : ''}
    </div >
  )
}

export default Message;
