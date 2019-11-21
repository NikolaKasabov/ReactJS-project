import React, { createContext, useState } from 'react';

export const MessagesContext = createContext();

const MessagesContextProvider = (props) => {
  const [message, setMessage] = useState('');

  const changeMessage = (message, delay = 2000) => {
    setMessage(message);

    setTimeout(() => {
      setMessage('');
    }, delay);
  }

  return (
    <MessagesContext.Provider value={{ message, changeMessage }}>
      {props.children}
    </MessagesContext.Provider>
  )
}

export default MessagesContextProvider;
