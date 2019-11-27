import React, { useContext, useEffect } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';
import './styles.css';

const Message = (props) => {
  const { message, changeMessage } = useContext(MessagesContext);

  // delete message(if there is one) on url change
  useEffect(() => {
    if (message) changeMessage('');
  }, [props.location.pathname]);

  return message ? (<div className="message-container">{message}</div >) : null
}

export default Message;
