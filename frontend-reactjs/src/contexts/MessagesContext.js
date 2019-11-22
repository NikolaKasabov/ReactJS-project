import React, { createContext, useState } from 'react';

export const MessagesContext = createContext();

const MessagesContextProvider = (props) => {
  const [message, setMessage] = useState('');

  const changeMessage = (message, shouldDeleteMessage = false, delay = 2000) => {
    setMessage(message);

    if (shouldDeleteMessage) {
      setTimeout(() => {
        setMessage('');
      }, delay);
    }
  }

  return (
    <MessagesContext.Provider value={{ message, changeMessage }}>
      {props.children}
    </MessagesContext.Provider>
  )
}

export default MessagesContextProvider;
