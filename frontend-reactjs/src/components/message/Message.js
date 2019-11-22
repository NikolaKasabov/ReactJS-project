import React, { useContext, useEffect } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';

const Message = (props) => {
  const { message, changeMessage } = useContext(MessagesContext);

  // delete message(if there is one) on url change
  useEffect(() => {
    if (message) changeMessage('');

  }, [props.location.pathname]);

  return (
    <div className="message" >
      {message ? <h3>{message}</h3> : null}
    </div >
  )
}

export default Message;
