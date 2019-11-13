import React, { createContext, useState } from 'react';

export const MessagesContext = createContext();

const MessagesContextProvider = (props) => {
  const [message, setMessage] = useState('');

  const changeMessage = (message) => {
    setMessage(message);

    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  return (
    <MessagesContext.Provider value={{ message, changeMessage }}>
      {props.children}
    </MessagesContext.Provider>
  )
}

export default MessagesContextProvider;
