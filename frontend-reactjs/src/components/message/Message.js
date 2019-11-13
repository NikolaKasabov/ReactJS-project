import React, { useContext } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';

const Message = (props) => {
  const { message } = useContext(MessagesContext);

  return (
    <div className="message" >
      <h2>{message}</h2>
    </div >
  )
}

export default Message;
